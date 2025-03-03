"use client"; // ใช้ client component

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCaretLeft,
    faHouse,
    faChartLine,
    faClockRotateLeft,
    faBolt,
    faBell,
    faGear,
    faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import BarChart from "../chart/Barchart";

export default function Sidebar() {
    const pathname = usePathname(); // ดึง URL ปัจจุบัน
    const router = useRouter(); // ใช้ router สำหรับการนำทาง
    const menuItems = [
        { name: "Home", path: "/homepage", icon: faHouse },
        { name: "Dashboard", path: "/dashbord", icon: faChartLine },
        { name: "History", path: "/history", icon: faClockRotateLeft },
        { name: "Analyze", path: "/analyze", icon: faBolt },
    ];

    // Function to handle logout
    const handleLogout = () => {
        // Here, you can clear session data, tokens, or make an API call to logout
        // For now, we'll just redirect to the login page
        router.push("/login"); // Redirect user to the login page
    };

    return (
        <div className="bg-white w-[16%] h-screen relative">
            {/* Logo */}
            <div className="w-full flex justify-center items-center pt-4 pb-4 select-none mb-9 relative">
                <Image src="/image/Logo.png" alt="Logo" width={60} height={300} />
                <span className="text-black font-semibold text-[28px]">Tamroi</span>
            </div>

            {/* เมนู Sidebar */}
            <div className="w-full flex flex-col items-center select-none">
                {menuItems.map((item) => (
                    <a
                        key={item.path}
                        href={item.path}
                        className={`w-[80%] h-[40px] rounded flex items-center text-[16px] font-semibold pl-5 mb-2 duration-300 
              ${pathname === item.path ? "text-black bg-[#efefef]" : "text-[#7c7c7c] hover:bg-[#efefef] hover:text-black"}`}
                    >
                        <FontAwesomeIcon icon={item.icon} className="text-[20px] mr-3" />
                        {item.name}
                    </a>
                ))}
            </div>

            {/* User Profile */}
            <div className="absolute bottom-0 w-full flex justify-center items-center flex-col mb-5 select-none">
                <div className="border-t-2 w-[80%] h-1 mb-5"></div>
                <div className="w-full flex justify-center items-center flex-col">
                    <a href="home" className="text-[#7c7c7c] w-[80%] h-[40px] rounded flex items-center text-center text-[16px] duration-300 font-semibold pl-5 mb-2 hover:bg-[#efefef] hover:text-black">
                        <FontAwesomeIcon icon={faBell} className="text-[20px] mr-3" />
                        Notifications
                    </a>
                    <a href="/profile" className="text-[#7c7c7c] w-[80%] h-[40px] rounded flex items-center text-center text-[16px] duration-300 font-semibold pl-5 mb-2 hover:bg-[#efefef] hover:text-black">
                        <FontAwesomeIcon icon={faGear} className="text-[20px] mr-3" />
                        Settings
                    </a>
                    <div className="group w-[80%] pl-2 mt-3 flex justify-start items-center h-[50px] rounded duration-300 hover:bg-[#efefef]">
                        <div className="rounded-full bg-[#0F7CF0] w-[40px] h-[40px] flex justify-center items-center overflow-hidden mr-2">
                            <Image src="/image/sawako.jpeg" alt="Profile" width={40} height={300} />
                        </div>
                        <div className="flex flex-col w-[55%] max-w-full overflow-hidden whitespace-nowrap text-ellipsis mr-2">
                            <span className="text-[#0F7CF0] font-semibold">Sawako</span>
                            <span className="text-[#bdbdbd] font-semibold text-[10px]">66022837@up.ac.th</span>
                        </div>
                        <button
                            onClick={handleLogout} // Call the handleLogout function on click
                            className="flex justify-center items-center text-[#7c7c7c] group-hover:text-black"
                        >
                            <FontAwesomeIcon icon={faRightFromBracket} className="text-[20px] mr-3" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
