"use client";
import { useState, useRef } from "react";

export default function Profile() {
    // Mockup data เก็บไว้ในตัวแปร
    const mockUser = {
        username: "johndoe",
        email: "johndoe@example.com",
        password: "securepassword123", // Mockup password
        profileImage: "/image/sawako.jpeg",
    };


    const [user, setUser] = useState(mockUser);
    const [imagePreview, setImagePreview] = useState(user.profileImage); // State for image preview
    const [newPassword, setNewPassword] = useState(""); // State for new password
    const [isPasswordChanging, setIsPasswordChanging] = useState(false); // Toggle state for password change

    // Reference for the file input
    const fileInputRef = useRef(null);

    // Function to handle image change
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Create a URL for the selected image
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl); // Update the image preview
            // You can also upload the image to a server or update the user profile here
        }
    };

    // Function to trigger the file input click when the button is clicked
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    // Function to handle password change
    const handlePasswordChange = () => {
        if (newPassword) {
            setUser({
                ...user,
                password: newPassword, // Update the password
            });
            setNewPassword(""); // Clear the input
            setIsPasswordChanging(false); // Close the password change input
        }
    };

    return (
        <div className="bg-gradient-to-r from-blue-200 to-purple-300 w-screen h-screen flex justify-center items-center">
            <div className="bg-white p-8 rounded-3xl shadow-xl w-96 flex flex-col items-center">
                <img
                    src={imagePreview}
                    alt="Profile Picture"
                    className="w-24 h-24 rounded-full border-4 border-blue-400 shadow-md object-cover"
                />
                <h2 className="text-2xl font-bold mt-4 text-gray-800">{user.username}</h2>
                <p className="text-gray-500 text-sm">{user.email}</p>

                <div className="w-full mt-5">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                    <input
                        type="text"
                        value={user.username}
                        className="w-full px-4 text-gray-700 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                        readOnly
                    />
                </div>

                <div className="w-full mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        value={user.email}
                        className="w-full px-4 py-2 border text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                        readOnly
                    />
                </div>

                <div className="w-full mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input
                        type="password"
                        value={isPasswordChanging ? newPassword : user.password}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-2 border text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                        readOnly={!isPasswordChanging}
                    />
                </div>

                {/* Hidden file input */}
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                />

                <button
                    onClick={handleButtonClick}
                    className="mt-5 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition shadow-md"
                >
                    Change Profile Image
                </button>

                {/* Button to toggle password change */}
                <button
                    onClick={() => setIsPasswordChanging(!isPasswordChanging)}
                    className="mt-3 w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-md"
                >
                    {isPasswordChanging ? "Cancel" : "Change Password"}
                </button>

                {/* Button to save the new password */}
                {isPasswordChanging && (
                    <button
                        onClick={handlePasswordChange}
                        className="mt-3 w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition shadow-md"
                    >
                        Save New Password
                    </button>
                )}
            </div>
        </div>
    );
}
