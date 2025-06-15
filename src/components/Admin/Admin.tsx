import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './pages/Sidebar';
import BlogEdit from './pages/BlogEdit';

const Admin = () => {
    const [activeSection, setActiveSection] = useState("blog");
    const navigate = useNavigate();

    const handleCreate = () => {
        navigate("/blogform");
    };

    return (
        <div className="flex flex-col sm:flex-row min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 overflow-x-hidden">
            {/* Sidebar */}
            <aside className="w-full sm:w-64 bg-white shadow-sm">
                <Sidebar onSelect={setActiveSection} active={activeSection} />
            </aside>

            {/* Main Content */}
            <div className="flex flex-col flex-1">
                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between gap-4 md:items-center px-4 sm:px-6 py-4 shadow-md border-b border-purple-100 bg-white">
                    <span className="text-2xl flex justify-center sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight">
                        Blog's Dashboard
                    </span>

                    <button
                        onClick={handleCreate}
                        className="bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg font-medium shadow transition-transform hover:scale-105 w-full md:w-auto"
                    >
                        Create New Blog
                    </button>
                </header>

                {/* Main Area */}
                <main className="flex-1 overflow-y-auto p-4">
                    <BlogEdit />
                </main>
            </div>
        </div>
    );
};

export default Admin;
