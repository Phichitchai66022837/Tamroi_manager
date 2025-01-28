"use client";

import { useState, useEffect, useRef } from "react"; // เพิ่ม useRef
import { useRouter } from "next/navigation"; // ใช้สำหรับเปลี่ยนเส้นทาง
import { Roboto } from "next/font/google";
import Image from "next/image";

const roboto = Roboto({
    weight: ["400", "500"],
    subsets: ["latin"],
});

// Mockup Account
const mockAccounts = [
    { email: "user1@example.com", password: "password123" },
    { email: "user2@example.com", password: "securePass456" },
    { email: "admin@example.com", password: "adminPass789" },
];

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isEmailEmpty, setIsEmailEmpty] = useState(false);
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
    const [isInvalidEmail, setIsInvalidEmail] = useState(false); // สำหรับตรวจสอบรูปแบบอีเมล
    const router = useRouter();

    const emailRef = useRef(null); // Ref สำหรับ Email Input
    const passwordRef = useRef(null); // Ref สำหรับ Password Input

    const isValidEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const authenticateUser = (email, password) => {
        return mockAccounts.some(
            (account) => account.email === email && account.password === password
        );
    };

    const handleLogin = () => {
        let hasError = false;

        // ตรวจสอบว่าผู้ใช้กรอกทั้งสองช่องหรือไม่
        if (!email && !password) {
            setError("Please fill in both fields");
            setIsEmailEmpty(true);
            setIsPasswordEmpty(true);
            hasError = true;
            emailRef.current.focus();  // Focus email input if both are empty
        } else {
            if (!email) {
                setError("Please enter your email");
                setIsEmailEmpty(true);
                setIsPasswordEmpty(false);
                hasError = true;
                emailRef.current.focus();  // Focus email input if email is empty
            } else if (!isValidEmail(email)) {
                setError("Invalid email format");
                setIsEmailEmpty(false);
                setIsInvalidEmail(true);
                setIsPasswordEmpty(false);
                hasError = true;
                emailRef.current.focus();  // Focus email input if email format is invalid
            } else {
                setIsEmailEmpty(false);
                setIsInvalidEmail(false);
            }

            if (!password) {
                if (email) {
                    setError("Please enter your password");
                }
                setIsPasswordEmpty(true);
                hasError = true;
                passwordRef.current.focus();  // Focus password input if password is empty
            } else {
                setIsPasswordEmpty(false);
            }
        }

        if (hasError) {
            return; // หยุดการดำเนินการเมื่อมีข้อผิดพลาด
        }

        // ตรวจสอบข้อมูลบัญชี
        if (!authenticateUser(email, password)) {
            setError("Invalid email or password");
            return;
        }
        // หากข้อมูลถูกต้อง
        setError("");
        router.push("/homepage");
    };

    // Add event listener for Enter key press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Enter") {
                handleLogin();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [email, password]); // Re-run when email or password changes

    const handleSpanClick = (inputRef) => {
        if (inputRef && inputRef.current) {
            inputRef.current.focus(); // โฟกัสไปที่ input ที่เกี่ยวข้อง
        }
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
                            Login
                        </span>

                        {/* Input Email */}
                        <div className="w-full relative mb-3">
                            <input
                                ref={emailRef}
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`peer w-full h-[40px] rounded border text-black pl-4 outline-sky-400 ${isEmailEmpty || isInvalidEmail ? "border-red-500" : ""
                                    }`}
                            />
                            <span
                                onClick={() => handleSpanClick(emailRef)}
                                className={`peer absolute left-4 text-gray-400 select-none text-center bg-white transition-all duration-200 pointer-events-none peer-focus:top-[-11px] peer-focus:w-16 peer-focus:text-sky-400 ${email ? "top-[-10px] w-16 text-sky-400" : "top-2"
                                    }`}
                            >
                                Email
                            </span>
                        </div>

                        {/* Input Password */}
                        <div className="w-full relative mb-3">
                            <input
                                ref={passwordRef}
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`peer w-full h-[40px] rounded border text-black pl-4 outline-sky-400 ${isPasswordEmpty ? "border-red-500" : ""
                                    }`}
                            />
                            <span
                                onClick={() => handleSpanClick(passwordRef)}
                                className={`peer absolute left-4 text-gray-400 select-none text-center bg-white transition-all duration-200 pointer-events-none peer-focus:top-[-11px] peer-focus:w-24 peer-focus:text-sky-400 ${password ? "top-[-10px] w-24 text-sky-400" : "top-2"
                                    }`}
                            >
                                Password
                            </span>
                        </div>

                        {/* แสดงข้อความ error */}
                        {error && (
                            <span className="text-red-500 text-[14px] mb-3">{error}</span>
                        )}

                        <a href="/forgot" className="text-[14px] mt-3 text-blue-400">
                            Forgot Password?
                        </a>
                        <button
                            onClick={handleLogin}
                            className="w-full h-[40px] bg-blue-500 duration-300 text-white rounded mt-3 hover:bg-blue-600"
                        >
                            Login
                        </button>
                        <div className="flex justify-center items-center mt-2">
                            <span className="text-gray-400 text-[14px]">
                                Don&#39;t have an account?
                            </span>
                            <a href="/register" className="text-blue-400 text-[14px] ml-1">
                                Signup
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
