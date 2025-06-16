import React from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Admin/config/Firebase";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Blog1: React.FC = () => {

  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBlog = async () => {
      try {
        const docRef = doc(db, "NewBlogs", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("No such blog found!");
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };
    fetchBlog();
  }, [id]);
  if (!post) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500 text-lg">Loading blog...</p>
        </div>
      </>
    );
  }

  return (
    <div
      className="relative min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50"
      style={{
        backgroundImage: `linear-gradient(rgba(147,51,234,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(147,51,234,0.05) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 animate-pulse"></div>

      {/* Full width image section */}
      <div className="relative z-10 w-full pt-24">
        <img
          src={post.image}
          alt="Blog"
          className="w-full h-100 sm:h-120 object-cover object-top"
        />
      </div>

      {/* Content section with side gaps */}
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16 xl:px-20 py-12">
        <div className="max-w-none">
          <a
            href="/blog"
            className="inline-block mb-6 text-purple-600 hover:text-pink-600 font-medium transition-colors duration-300"
            style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
          >
            ← Back to Blog
          </a>

          <div className="p-8 sm:p-12 border border-pink-200/50">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
              {post.heading}
            </h1>

            <div className="flex items-center text-sm text-gray-600 mb-8">
              <span className="px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 rounded-full border border-pink-200/50">
                {post.timestamp}
              </span>
              <span className="mx-4 text-pink-300">•</span>
              <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-pink-700 rounded-full border border-purple-200/50">
                {post.readingTime} min read
              </span>
            </div>

            <div
              className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
              style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog1;
