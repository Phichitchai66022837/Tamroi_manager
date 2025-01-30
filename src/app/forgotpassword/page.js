"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Roboto } from "next/font/google";
import Image from "next/image";

const roboto = Roboto({
    weight: ["400", "500"],
    subsets: ["latin"],
});

export default function ResetPassword() {
    const [formData, setFormData] = useState({ email: "" });
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const emailRef = useRef(null);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const focusField = (fieldRef) => {
        if (fieldRef && fieldRef.current) {
            fieldRef.current.focus();
        }
    };

    const handleResetPassword = () => {
        const { email } = formData;

        if (!email) {
            setError("Email is required.");
            focusField(emailRef);
            return;
        }

        if (!emailPattern.test(email)) {
            setError("Invalid email format");
            focusField(emailRef);
            return;
        }

        setError("");
        setIsModalOpen(true);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleResetPassword();
        }
    };

    useEffect(() => {
        // Add event listener for Enter key press
        window.addEventListener("keydown", handleKeyDown);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [formData.email]); // Re-run when email changes

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className={`w-screen h-screen flex justify-center items-center bg-[#dfdfdf] relative ${roboto.className}`}>            
            {isModalOpen && (
                <div className="overlay absolute top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-10">
                    <div className="modal bg-white p-6 rounded shadow-lg text-center">
                        <p className="text-black mb-4">Password reset link sent to your email</p>
                        <button onClick={() => setIsModalOpen(false)} className="bg-blue-500 text-white px-4 py-2 rounded">OK</button>
                    </div>
                </div>
            )}
            <Image
                src="/image/background2.jpg"
                alt="Logo"
                layout="fill"
                objectFit="cover"
                className="brightness-50 contrast-125"
            />
            <div className="bg-white w-[80%] h-[80%] rounded drop-shadow-xl relative flex justify-center items-center">
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
                            Forgot password?
                        </span>

                        {/* Input Email */}
                        <div className="w-full relative mb-3">
                            <input
                                ref={emailRef}
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`peer w-full h-[40px] rounded border text-black pl-4 outline-sky-400 autofill:bg-white ${!formData.email && error.includes("Email") ? "border-red-500" : ""}`}
                                style={{
                                    WebkitBoxShadow: "0 0 0px 1000px white inset"
                                }}
                            />
                            <span
                                onClick={() => focusField(emailRef)}
                                className={`peer absolute left-4 text-gray-400 select-none text-center bg-white transition-all duration-200 pointer-events-none peer-focus:top-[-11px] peer-focus:w-16 peer-focus:text-sky-400 ${formData.email ? "top-[-11px] w-16 text-sky-400" : "top-2"}`}
                            >
                                Email
                            </span>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <span className="text-red-500 text-[14px] mb-3">{error}</span>
                        )}

                        {/* Reset Password Button */}
                        <button
                            onClick={handleResetPassword}
                            className="w-full h-[40px] bg-blue-500 duration-300 text-white rounded mt-3 hover:bg-blue-600"
                        >
                            Reset password
                        </button>

                        <div className="flex justify-center items-center mt-2">
                            <span className="text-gray-400 text-[14px]">
                                Remember your password?
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
