"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Roboto } from "next/font/google";
import Image from "next/image";
import { getAuth, updatePassword } from "firebase/auth";
import { db } from "../../../lib/firebaseConfig"; // ตรวจสอบเส้นทางนี้
import { collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore";

const roboto = Roboto({
  weight: ["400", "500"],
  subsets: ["latin"],
});

export default function ResetPassword() {
  const [formData, setFormData] = useState({ email: "", username: "", newPassword: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const focusField = (fieldRef) => {
    if (fieldRef && fieldRef.current) {
      fieldRef.current.focus();
    }
  };

  const handleResetPassword = async () => {
    const { email, username, newPassword, confirmPassword } = formData;

    if (!email) {
      setError("Email is required.");
      focusField(emailRef);
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

    if (!newPassword) {
      setError("New password is required.");
      focusField(newPasswordRef);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      focusField(confirmPasswordRef);
      return;
    }

    try {
      // ตรวจสอบข้อมูลผู้ใช้ใน Firestore
      const q = query(collection(db, "users"), where("email", "==", email), where("username", "==", username));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("Invalid email or username");
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userRef = doc(db, "users", userDoc.id);

      // อัปเดตรหัสผ่านใหม่ใน Firestore
      await updateDoc(userRef, {
        password: newPassword
      });

      setError("");
      setIsModalOpen(true);
    } catch (error) {
      if (error.code === 'auth/too-many-requests') {
        setError("Too many requests. Please try again later.");
      } else {
        setError(error.message);
      }
    }
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
  }, [formData.email, formData.username, formData.newPassword, formData.confirmPassword]); // Re-run when email, username, newPassword, or confirmPassword changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={`w-screen h-screen flex justify-center items-center bg-[#dfdfdf] relative ${roboto.className}`}>
      {isModalOpen && (
        <div className="overlay absolute top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-10">
          <div className="modal bg-white p-6 rounded shadow-lg text-center">
            <p className="text-black mb-4">Password has been reset successfully</p>
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

            {/* Input Username */}
            <div className="w-full relative mb-3">
              <input
                ref={usernameRef}
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className={`peer w-full h-[40px] rounded border text-black pl-4 outline-sky-400 autofill:bg-white ${!formData.username && error.includes("Username") ? "border-red-500" : ""}`}
                style={{
                  WebkitBoxShadow: "0 0 0px 1000px white inset"
                }}
              />
              <span
                onClick={() => focusField(usernameRef)}
                className={`peer absolute left-4 text-gray-400 select-none text-center bg-white transition-all duration-200 pointer-events-none peer-focus:top-[-11px] peer-focus:w-24 peer-focus:text-sky-400 ${formData.username ? "top-[-11px] w-24 text-sky-400" : "top-2"}`}
              >
                Username
              </span>
            </div>

            {/* Input New Password */}
            <div className="w-full relative mb-3">
              <input
                ref={newPasswordRef}
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={formData.newPassword}
                onChange={handleChange}
                className={`peer w-full h-[40px] rounded border text-black pl-4 outline-sky-400 autofill:bg-white ${!formData.newPassword && error.includes("New password") ? "border-red-500" : ""}`}
                style={{
                  WebkitBoxShadow: "0 0 0px 1000px white inset"
                }}
              />
              <span
                onClick={() => focusField(newPasswordRef)}
                className={`peer absolute left-4 text-gray-400 select-none text-center bg-white transition-all duration-200 pointer-events-none peer-focus:top-[-11px] peer-focus:w-35 peer-focus:text-sky-400 ${formData.newPassword ? "top-[-11px] w-35 text-sky-400" : "top-2"}`}
              >
                New Password
              </span>
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-2 text-gray-400"
              >
                {showNewPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Input Confirm Password */}
            <div className="w-full relative mb-3">
              <input
                ref={confirmPasswordRef}
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`peer w-full h-[40px] rounded border text-black pl-4 outline-sky-400 autofill:bg-white ${!formData.confirmPassword && error.includes("Confirm password") ? "border-red-500" : ""}`}
                style={{
                  WebkitBoxShadow: "0 0 0px 1000px white inset"
                }}
              />
              <span
                onClick={() => focusField(confirmPasswordRef)}
                className={`peer absolute left-4 text-gray-400 select-none text-center bg-white transition-all duration-200 pointer-events-none peer-focus:top-[-11px] peer-focus:w-35 peer-focus:text-sky-400 ${formData.confirmPassword ? "top-[-11px] w-35 text-sky-400" : "top-2"}`}
              >
                Confirm Password
              </span>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-2 text-gray-400"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
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
