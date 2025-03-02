"use client";

import { useState, useEffect } from "react";

export default function Profile() {
    // State to hold the user data
    const [user, setUser] = useState(null);
    const [imagePreview, setImagePreview] = useState("https://randomuser.me/api/portraits/men/1.jpg"); // Default profile image
    const [selectedImage, setSelectedImage] = useState(""); // State for selected image
    const [newPassword, setNewPassword] = useState(""); // State for new password
    const [isPasswordChanging, setIsPasswordChanging] = useState(false); // Toggle state for password change

    // List of available images from the internet
    const availableImages = [
        "https://randomuser.me/api/portraits/men/1.jpg",
        "https://randomuser.me/api/portraits/women/3.jpg",
        "https://randomuser.me/api/portraits/men/2.jpg",
        "https://randomuser.me/api/portraits/women/8.jpg",
    ];

    // Fetch the logged-in user's data from localStorage
    useEffect(() => {
        const fetchUserData = () => {
            const localUserData = localStorage.getItem("userData");
            if (localUserData) {
                const userData = JSON.parse(localUserData);
                setUser(userData);
                setImagePreview(userData.profileImage || "https://randomuser.me/api/portraits/men/1.jpg");
            }
        };

        fetchUserData();
    }, []);

    // Function to handle image selection
    const handleImageSelect = (image) => {
        setSelectedImage(image);
        setImagePreview(image); // Update the image preview
    };

    // Function to handle image save (แค่แสดงภาพ ไม่บันทึกไป Firestore)
    const handleImageSave = () => {
        if (selectedImage) {
            // Update local user data
            const updatedUser = { ...user, profileImage: selectedImage };
            setUser(updatedUser);
            localStorage.setItem("userData", JSON.stringify(updatedUser));

            // Clear the selected image state
            setSelectedImage("");
        }
    };

    // Function to handle password change (แค่เปลี่ยนใน state ไม่บันทึกไป Firestore)
    const handlePasswordChange = () => {
        if (newPassword) {
            setUser({
                ...user,
                password: newPassword, // Update the password locally
            });
            setNewPassword(""); // Clear the input
            setIsPasswordChanging(false); // Close the password change input
        }
    };

    if (!user) {
        return <div>Loading...</div>; // Show a loading state while fetching user data
    }

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

                {/* Image selection */}
                <div className="w-full mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Select Profile Image</label>
                    <div className="flex gap-2">
                        {availableImages.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Profile ${index + 1}`}
                                className={`w-16 h-16 rounded-full border-4 ${selectedImage === image ? 'border-blue-500' : 'border-gray-300'} cursor-pointer`}
                                onClick={() => handleImageSelect(image)}
                            />
                        ))}
                    </div>
                </div>

                {/* Button to save the new profile image */}
                {selectedImage && (
                    <button
                        onClick={handleImageSave}
                        className="mt-3 w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition shadow-md"
                    >
                        Save New Profile Image
                    </button>
                )}

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
