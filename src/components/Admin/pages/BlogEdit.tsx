import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { db } from "../config/Firebase";

interface Blog {
    id: string;
    image: string;
    timestamp: string;
    readingTime: string;
    heading: string;
    content: string;
}

interface BlogCardProps {
    id: string;
    image: string;
    timestamp: string;
    readingTime: string;
    heading: string;
    content: string;
    index: number;
    onDelete?: (id: string) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ id, image, timestamp, readingTime, heading, content, index, onDelete }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this blog?');
        if (!confirmDelete) return;
        if (onDelete) onDelete(id);
    };

    const handleEdit = () => {
        navigate('/blogform', {
            state: {
                blog: {
                    id,
                    image,
                    timestamp,
                    readingTime,
                    heading,
                    content,
                },
            },
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, index * 150);

        return () => clearTimeout(timer);
    }, [index]);

    return (
        <div
            className={`group relative overflow-hidden rounded-2xl transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                } hover:scale-105 hover:-translate-y-2`}
            style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50/95 to-purple-50/90 backdrop-blur-sm border border-pink-200/50 shadow-lg group-hover:shadow-2xl transition-all duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
            <div className="absolute inset-[2px] bg-gradient-to-br from-pink-50/98 to-purple-50/95 rounded-2xl"></div>

            <div className="relative z-10">
                <div className="relative overflow-hidden rounded-t-2xl">
                    <img
                        src={image}
                        alt={`Blog ${index + 1}`}
                        className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                <div className="p-6 relative">
                    <div className="flex items-center text-sm mb-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 rounded-full border border-pink-200/50 animate-pulse">
                            {timestamp}
                        </span>
                        <span className="mx-3 text-pink-300">•</span>
                        <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-pink-700 rounded-full border border-purple-200/50">
                            {readingTime} min read
                        </span>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight group-hover:text-purple-700 transition-colors duration-300">
                        {heading}
                    </h3>
                    <div
                        className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-6"
                        style={{ whiteSpace: 'pre-line' }}
                        dangerouslySetInnerHTML={{ __html: content }}
                    ></div>

                    <div className="absolute top-1 right-1 flex space-x-1">
                        <img
                            src="/edit.png"
                            onClick={handleEdit}
                            className="p-2 h-9 cursor-pointer rounded-md hover:scale-105 transition"
                            title="Edit Blog"
                        />
                        <img
                            src="/delete.png"
                            onClick={handleDelete}
                            className="p-2 h-9 cursor-pointer rounded-md hover:scale-105 transition"
                            title="Delete Blog"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const BlogEdit: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "NewBlogs", id));
            setBlogs((prev) => prev.filter((blog) => blog.id !== id));
        } catch (error) {
            console.error("Error deleting blog:", error);
            alert("Failed to delete blog.");
        }
    };

    useEffect(() => {
        const fetchBlogs = async () => {
            window.scrollTo(0, 0);
            try {
                const q = query(
                    collection(db, 'NewBlogs'),
                    orderBy('time', 'desc'),
                );
                const querySnapshot = await getDocs(q);
                const blogList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...(doc.data() as Omit<Blog, 'id'>), // merge the rest of Blog fields
                }));
                setBlogs(blogList);
            } catch (err) {
                console.error("Error fetching blogs:", err);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div
            className="relative flex items-center justify-center overflow-hidden"

        >

            <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full blur-3xl animate-pulse"></div>
            <div
                className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: '1s' }}
            ></div>
            <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-purple-200/10 to-pink-200/10 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: '2s' }}
            ></div>

            <div className="relative z-10 w-full py-2 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">

                    <h1 className="text-2xl md:text-2xl font-bold text-gray-900 mb-6 leading-tight">
                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Created Blogs</span>
                    </h1>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-pulse"></div>

                    {blogs.length === 0 ? (
                        <p className="text-gray-500 italic">No blogs are available.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.map((post, index) => (
                                <BlogCard
                                    id={post.id}
                                    key={post.id}
                                    index={index}
                                    image={post.image}
                                    timestamp={post.timestamp}
                                    readingTime={post.readingTime}
                                    heading={post.heading}
                                    content={post.content.slice(0, 100) + '...'}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogEdit;