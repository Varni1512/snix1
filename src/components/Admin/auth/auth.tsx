import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";


const Auth: React.FC = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const adminEmail = "admin123@gmail.com";
    const adminPassword = "admin@123";

    const isInvalid = email !== adminEmail || password !== adminPassword;

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isInvalid) {
            localStorage.setItem("admin", "true");
            navigate("/dashboard");
        } else {
            setError("Invalid Credentials");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <form
                    onSubmit={handleLogin}
                    className="flex flex-col justify-center items-center bg-white border border-purple-200 p-8 rounded-2xl shadow-xl transition-shadow duration-300 hover:shadow-purple-200 w-full"
                >
                    <h2 className="text-[30px] font-extrabold text-center text-purple-800 mb-6">
                        Admin Login
                    </h2>

                    <input
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError("");
                        }}
                        placeholder="Email"
                        className={`w-full mb-4 px-4 py-3 border rounded-lg text-purple-800 placeholder-purple-400 transition-all duration-200 focus:outline-none focus:ring-2 ${isInvalid && error ? "border-red-400 bg-red-50" : "border-purple-300 focus:ring-purple-500"
                            }`}
                        required
                    />

                    <div className="w-full relative mb-4">
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError("");
                            }}
                            placeholder="Password"
                            className={`w-full px-4 py-3 border rounded-lg text-purple-800 placeholder-purple-400 transition-all duration-200 focus:outline-none focus:ring-2 ${isInvalid && error ? "border-red-400 bg-red-50" : "border-purple-300 focus:ring-purple-500"
                                }`}
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <HiEyeOff className="text-purple-600 w-5 h-5" />
                            ) : (
                                <HiEye className="text-purple-600 w-5 h-5" />
                            )}
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={isInvalid}
                        className={`w-full py-3 px-8 font-bold rounded-lg transition-all duration-300 shadow-md ${isInvalid
                            ? "bg-gradient-to-r from-gray-400 to-gray-500 text-white cursor-not-allowed"
                            : "bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:shadow-lg hover:scale-[1.01]"
                            }`}
                    >
                        Login
                    </button>

                    {error && (
                        <p className="text-red-600 bg-red-100 mt-4 px-4 py-2 rounded text-center font-medium border border-red-300 w-full">
                            {error}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Auth;
