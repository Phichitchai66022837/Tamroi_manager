"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Roboto } from "next/font/google";
import Image from "next/image";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../../../lib/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

const roboto = Roboto({
  weight: ["400", "500"],
  subsets: ["latin"],
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const router = useRouter();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = sessionStorage.getItem("isLoggedIn");
      if (isLoggedIn) {
        router.replace("/homepage"); // ใช้ replace เพื่อกันย้อนกลับมา login
      }
    }
  }, [router]);

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleLogin = async () => {
    setError(""); // Reset error ก่อน
    let hasError = false;

    if (!email.trim() || !password.trim()) {
      setError("Please fill in both fields");
      setIsEmailEmpty(!email.trim());
      setIsPasswordEmpty(!password.trim());
      hasError = true;
    } else if (!isValidEmail(email)) {
      setError("Invalid email format");
      setIsInvalidEmail(true);
      hasError = true;
    }

    if (hasError) return;

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ค้นหาผู้ใช้ใน Firestore
      const q = query(collection(db, "users"), where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("Invalid email or password");
        return;
      }

      // เก็บ session
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("userEmail", email);

      router.replace("/homepage"); // ใช้ replace ป้องกันย้อนกลับไป login
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        handleLogin();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [email, password]);

  return (
    <div className={`w-screen h-screen flex justify-center items-center bg-[#dfdfdf] relative ${roboto.className}`}>
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
        <div className="w-[35%] h-full flex justify-center items-center">
          <div className="w-[80%] h-[80%] flex flex-col justify-center items-center">
            <span className="text-black text-2xl select-none font-semibold mb-7">Login</span>

            {/* Input Email */}
            <div className="w-full relative mb-3">
              <input
                ref={emailRef}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`peer w-full h-[40px] rounded border text-black pl-4 outline-sky-400 ${isEmailEmpty || isInvalidEmail ? "border-red-500" : ""}`}
              />
              <span className={`peer absolute left-4 text-gray-400 select-none text-center bg-white transition-all duration-200 pointer-events-none ${email ? "top-[-10px] w-16 text-sky-400" : "top-2"}`}>
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
                className={`peer w-full h-[40px] rounded border text-black pl-4 outline-sky-400 ${isPasswordEmpty ? "border-red-500" : ""}`}
              />
              <span className={`peer absolute left-4 text-gray-400 select-none text-center bg-white transition-all duration-200 pointer-events-none ${password ? "top-[-10px] w-24 text-sky-400" : "top-2"}`}>
                Password
              </span>
            </div>

            {/* แสดงข้อความ error */}
            {error && <span className="text-red-500 text-[14px] mb-3">{error}</span>}

            <a href="/forgotpassword" className="text-[14px] mt-3 text-blue-400">Forgot Password?</a>
            <button
              onClick={handleLogin}
              className="w-full h-[40px] bg-blue-500 duration-300 text-white rounded mt-3 hover:bg-blue-600"
            >
              Login
            </button>
            <div className="flex justify-center items-center mt-2">
              <span className="text-gray-400 text-[14px]">Don't have an account?</span>
              <a href="/register" className="text-blue-400 text-[14px] ml-1">Signup</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
