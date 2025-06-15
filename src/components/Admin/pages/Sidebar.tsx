import { useState } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from "/logo1.png";

function Sidebar({ onSelect, active }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const navItems = [{ id: "blog", label: "Blog" }];

    const handleSelect = (id) => {
        onSelect(id);
        setMenuOpen(false);
    };

    const handleLogout = () => {
        alert("Logged out!");
    };

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                className="md:hidden fixed top-4 left-4 z-50"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-br from-purple-50 via-white to-purple-50  shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0`}
            >
                <div className="flex flex-col h-full py-6 px-4">
                    {/* Logo */}
                    <div
                        className="w-full flex items-center justify-center mb-6 cursor-pointer"
                        onClick={() => handleSelect("blog")}
                    >
                        <img
                            src={Logo}
                            alt="Logo"
                            className="w-40 h-10 transition-transform hover:scale-105"
                        />
                    </div>

                    <hr className="my-4 border-purple-100" />

                    {/* Navigation */}
                    <ul className="space-y-3 text-center font-medium text-gray-700">
                        {navItems.map(({ id, label }) => (
                            <li
                                key={id}
                                onClick={() => handleSelect(id)}
                                className={`py-2 px-4 rounded-lg transition-all duration-300 cursor-pointer transform ${active === id
                                    ? 'bg-purple-200 text-purple-900 font-semibold shadow-inner scale-[1.02]'
                                    : 'hover:bg-white/50 hover:text-blue-500 hover:shadow-md hover:scale-[1.03]'
                                    }`}
                            >
                                {label}
                            </li>
                        ))}
                    </ul>

                    <div className="flex-grow" />

                    {/* Logout */}
                    <Link to="/admin">
                        <div
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-3 text-red-600 font-medium rounded-lg cursor-pointer transition-all hover:text-purple-500 hover:bg-white/50 hover:shadow hover:scale-[1.02]"
                        >
                            <LogOut size={18} />
                            <span>Logout</span>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
