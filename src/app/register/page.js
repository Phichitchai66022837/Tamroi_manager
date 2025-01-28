"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Roboto } from "next/font/google";
import Image from "next/image";

const roboto = Roboto({
    weight: ["400", "500"],
    subsets: ["latin"],
});

export default function Signup() {
    const [formData, setFormData] = useState({ email: "", password: "", username: "" });
    const [error, setError] = useState("");
    const router = useRouter();

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const usernameRef = useRef(null);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*\d).{8,}|.{15,}$/;
    const usernamePattern = /^(?!\d)[\w_]{5,15}$/;

    const focusField = (fieldRef) => {
        if (fieldRef && fieldRef.current) {
            fieldRef.current.focus();
        }
    };

    const handleSignup = () => {
        const { email, password, username } = formData;

        if (!email) {
            setError("Email is required.");
            focusField(emailRef);
            return;
        }

        if (!password) {
            setError("Password is required.");
            focusField(passwordRef);
            return;
        }

        if (!username) {
            setError("Username is required.");
            focusField(usernameRef);
            return;
        }

        if (!emailPattern.test(email)) {
            setError("Invalid email format");
            focusField(emailRef);
            return;
        }

        if (!passwordPattern.test(password)) {
            setError("Invalid password format");
            focusField(passwordRef);
            return;
        }

        if (!usernamePattern.test(username)) {
            setError("Invalid username format");
            focusField(usernameRef);
            return;
        }

        setError("");
        console.log({ email, password, username });
        router.push("/login");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSignup();
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [formData]);

    const handleSpanClick = (inputRef) => {
        if (inputRef && inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div
            className={`w-screen h-screen flex justify-center items-center bg-[#dfdfdf] relative ${roboto.className}`}
        >
            <Image
                src="/image/background2.jpg"
                alt="Logo"
                layout="fill"
                objectFit="cover"
                className="brightness-50 contrast-125"
            />
            <div className="bg-white w-[80%] h-[80%] rounded drop-shadow-xl flex">
                <div className="w-[65%] h-full rounded-l bg-black relative max-[479px]:hidden max-[767px]:w-[35%] max-[630px]:hidden max-[979px]:w-[45%] max-[1200px]:w-[60%]">
                    <Image
                        src="/image/background.png"
                        alt="Logo"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-l"
                    />
                </div>
                <div className="w-[35%] h-full flex justify-center items-center max-[479px]:w-full max-[767px]:w-[75%] max-[630px]:w-full max-[979px]:w-[55%] max-[1200px]:w-[40%]">
                    <div className="w-[80%] h-[80%] flex flex-col justify-center items-center max-[479px]:h-full">
                        <span className="text-black text-2xl select-none font-semibold mb-7">
                            Signup
                        </span>

                        {/* Input Email */}
                        <div className="w-full relative mb-3">
                            <input
                                ref={emailRef}
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`peer w-full h-[40px] rounded border text-black pl-4 outline-sky-400  ${!formData.email && error.includes("Email") ? "border-red-500" : ""}`}
                            />
                            <span
                                onClick={() => handleSpanClick(emailRef)}
                                className={`peer absolute left-4 text-gray-400 select-none text-center bg-white transition-all duration-200 pointer-events-none peer-focus:top-[-11px] peer-focus:w-16 peer-focus:text-sky-400 ${formData.email ? "top-[-11px] w-16 text-sky-400" : "top-2"}`}
                            >
                                Email
                            </span>
                        </div>

                        {/* Input Password */}
                        <div className="w-full relative mb-3">
                            <input
                                ref={passwordRef}
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`peer w-full h-[40px] rounded border text-black pl-4 outline-sky-400 ${!formData.password && error.includes("Password") ? "border-red-500" : ""}`}
                            />
                            <span
                                onClick={() => handleSpanClick(passwordRef)}
                                className={`peer absolute left-4 text-gray-400 select-none text-center bg-white transition-all duration-200 pointer-events-none peer-focus:top-[-11px] peer-focus:w-24 peer-focus:text-sky-400 ${formData.password ? "top-[-11px] w-24 text-sky-400" : "top-2"}`}
                            >
                                Password
                            </span>
                        </div>
                        <span className="text-gray-400 text-[11px] mb-4">
                            Password should be at least 15 characters OR at least 8 characters including a number and a lowercase letter.
                        </span>

                        {/* Input Username */}
                        <div className="w-full relative mb-3">
                            <input
                                ref={usernameRef}
                                name="username"
                                type="text"
                                value={formData.username}
                                onChange={handleChange}
                                className={`peer w-full h-[40px] rounded border text-black pl-4 outline-sky-400 ${!formData.username && error.includes("Username") ? "border-red-500" : ""}`}
                            />
                            <span
                                onClick={() => handleSpanClick(usernameRef)}
                                className={`peer absolute left-4 text-gray-400 select-none text-center bg-white transition-all duration-200 pointer-events-none peer-focus:top-[-11px] peer-focus:w-24 peer-focus:text-sky-400 ${formData.username ? "top-[-11px] w-24 text-sky-400" : "top-2"}`}
                            >
                                Username
                            </span>
                        </div>
                        <span className="text-gray-400 text-[11px] mb-4">
                            Username should be between 5-15 characters, contain only letters, numbers, and underscores, and must not start with a number.
                        </span>

                        {/* Error Message */}
                        {error && (
                            <span className="text-red-500 text-[14px] mb-3">{error}</span>
                        )}

                        {/* Signup Button */}
                        <button
                            onClick={handleSignup}
                            className="w-full h-[40px] bg-blue-500 duration-300 text-white rounded mt-3 hover:bg-blue-600"
                        >
                            Signup
                        </button>

                        <div className="flex justify-center items-center mt-2">
                            <span className="text-gray-400 text-[14px]">
                                Already have an account?
                            </span>
                            <a href="/login" className="text-blue-400 text-[14px] ml-1">
                                Login
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
