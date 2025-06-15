import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import axios from "axios";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { db } from "../config/Firebase";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dttxony05/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "blog_website";

export default function BlogForm() {
    const editor = useRef(null);
    const navigate = useNavigate();
    const { state } = useLocation();
    const existingData = state?.blog;

    const [heading, setHeading] = useState(existingData?.heading || "");
    const [content, setContent] = useState(existingData?.content || "");
    const [readingTime, setReadingTime] = useState(existingData?.readingTime || "1");
    const [imagePreview, setImagePreview] = useState(existingData?.image || "");
    const [uploading, setUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleImageChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

        setUploading(true);
        try {
            const response = await axios.post(CLOUDINARY_URL, formData);
            setImagePreview(response.data.secure_url);
        } catch (error) {
            alert("Image upload failed.");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!heading || !content) {
            alert("Please fill all required fields.");
            return;
        }

        setIsSubmitting(true);

        const blogData = {
            heading,
            content,
            image: imagePreview,
            timestamp: new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            }),
            time: new Date().toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true
            }),
            readingTime,
        };

        try {
            if (existingData?.id) {
                const ref = doc(db, "NewBlogs", existingData.id);
                await updateDoc(ref, blogData);
            } else {
                await addDoc(collection(db, "NewBlogs"), blogData);
            }
            navigate("/dashboard", { state: { from: "blog" } })

        } catch (err) {
            alert("Failed to save blog.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen py-10 px-4">
            <div className="max-w-4xl w-full bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden transition-all">
                <div className="p-6 sm:p-8 space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {existingData?.id ? "Edit Blog" : "Create Blog"}
                    </h2>

                    {/* Image Upload */}
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700">Featured Image</label>
                        <div className="flex flex-col items-center gap-3">
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    className="w-full h-52 object-cover rounded-md border border-gray-300"
                                    alt="Preview"
                                />
                            )}
                            <input
                                id="fileUpload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            {uploading}
                            <label
                                htmlFor="fileUpload"
                                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-500 rounded-md cursor-pointer hover:scale-105 transition-transform duration-200"
                            >
                                {imagePreview ? "Change" : "Upload"}
                            </label>

                        </div>
                    </div>

                    {/* Heading Input */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Heading *</label>
                        <input
                            type="text"
                            value={heading}
                            onChange={(e) => setHeading(e.target.value)}
                            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            required
                        />
                    </div>

                    {/* Reading Time Select */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Estimated Reading Time</label>
                        <select
                            value={readingTime}
                            onChange={(e) => setReadingTime(e.target.value)}
                            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        >
                            {[1, 2, 3, 4, 5].map((min) => (
                                <option key={min} value={min}>
                                    {min} min read
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Content Editor */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Content *</label>
                        <JoditEditor
                            ref={editor}
                            value={content}
                            config={{ readonly: false, height: 300 }}
                            onBlur={(newContent) => setContent(newContent)}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="w-full cursor-pointer py-2 text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-green-500 rounded-md hover:opacity-90 transition disabled:opacity-50"
                        >
                            {isSubmitting
                                ? existingData?.id
                                    ? "Updating..."
                                    : "Publishing..."
                                : existingData?.id
                                    ? "Update Blog"
                                    : "Publish Blog"}
                        </button>
                        <button
                            onClick={() => navigate("/dashboard", { state: { from: "blog" } })}
                            className="w-full py-2 text-sm font-semibold text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
