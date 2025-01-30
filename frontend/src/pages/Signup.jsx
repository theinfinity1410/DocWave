import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                navigate("/");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Signup error:", error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-center">DocWave Signup</h2>
                <form onSubmit={handleSignup}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium">Name</label>
                        <input
                            type="text"
                            id="name"
                            className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-sm text-center">
                    Already have an account? <a href="/" className="text-blue-500 hover:underline">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;