"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Roboto } from "next/font/google";
import Image from "next/image";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../../../lib/firebaseConfig"; // ตรวจสอบเส้นทางนี้
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

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleLogin = async () => {
    let hasError = false;

    if (!email && !password) {
      setError("Please fill in both fields");
      setIsEmailEmpty(true);
      setIsPasswordEmpty(true);
      hasError = true;
      emailRef.current.focus();
    } else {
      if (!email) {
        setError("Please enter your email");
        setIsEmailEmpty(true);
        setIsPasswordEmpty(false);
        hasError = true;
        emailRef.current.focus();
      } else if (!isValidEmail(email)) {
        setError("Invalid email format");
        setIsEmailEmpty(false);
        setIsInvalidEmail(true);
        setIsPasswordEmpty(false);
        hasError = true;
        emailRef.current.focus();
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
        passwordRef.current.focus();
      } else {
        setIsPasswordEmpty(false);
      }
    }

    if (hasError) {
      return;
    }

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ตรวจสอบข้อมูลผู้ใช้ใน Firestore
      const q = query(collection(db, "users"), where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("Invalid email or password");
        return;
      }

      // เก็บข้อมูลการล็อกอินใน session storage
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("userEmail", email);

      setError("");
      router.push("/homepage");
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

  const handleSpanClick = (inputRef) => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      router.push("/homepage");
    }
  }, [router]);

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
                style={{
                  WebkitBoxShadow: "0 0 0px 1000px white inset"
                }}
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
                style={{
                  WebkitBoxShadow: "0 0 0px 1000px white inset"
                }}
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

            <a href="/forgotpassword" className="text-[14px] mt-3 text-blue-400">
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