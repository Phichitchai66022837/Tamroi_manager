"use client";
import { useState } from "react";

export default function AnalyzeContent() {
    const [amount, setAmount] = useState("");
    const [calculated, setCalculated] = useState(false);
    const [result, setResult] = useState({
        essential: 0,
        wants: 0,
        savings: 0
    });
    const [error, setError] = useState(""); // สถานะสำหรับแสดงข้อความข้อผิดพลาด

    // ฟังก์ชันในการเพิ่มคอมม่าให้กับตัวเลข
    const formatNumberWithCommas = (value) => {
        // ลบคอมม่าก่อนเพื่อให้ตัวเลขไม่ซ้ำซ้อน
        const cleanedValue = value.replace(/,/g, "");
        if (!cleanedValue) return "";

        // เพิ่มคอมม่ากลับไป
        return Number(cleanedValue).toLocaleString();
    };

    const handleInputChange = (e) => {
        const value = e.target.value;

        // กรองให้แน่ใจว่าไม่ใส่ตัวอักษร
        const numericValue = value.replace(/[^0-9,]/g, ''); // กรองตัวอักษรออก
        setAmount(formatNumberWithCommas(numericValue));  // แสดงตัวเลขที่กรองแล้ว
        setError(""); // ล้างข้อความข้อผิดพลาดทุกครั้งที่มีการเปลี่ยนแปลง input
    };

    const handleCalculate = () => {
        const totalAmount = parseFloat(amount.replace(/,/g, '')); // Remove commas and convert to number
        
        // ตรวจสอบว่า totalAmount เป็นตัวเลขหรือไม่
        if (isNaN(totalAmount) || totalAmount <= 0) {
            setError("Please enter a valid number.");
            return;
        }

        // Calculate the 50-30-20 breakdown
        const essential = (totalAmount * 0.5).toFixed(2);
        const wants = (totalAmount * 0.3).toFixed(2);
        const savings = (totalAmount * 0.2).toFixed(2);

        setResult({
            essential: formatNumberWithCommas(essential),
            wants: formatNumberWithCommas(wants),
            savings: formatNumberWithCommas(savings)
        });

        setCalculated(true);
    };

    return (
        <div className="flex justify-center items-center w-[84%] h-screen">
            <div className="w-[95%] h-[95%] bg-white rounded flex overflow-hidden">
                <div className="flex justify-center items-center w-full h-screen bg-gradient-to-r from-blue-500 to-purple-600">
                    <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-xl space-y-6">
                        <h1 className="text-3xl font-semibold text-center text-gray-800">Money Distribution Calculator</h1>

                        <div className="space-y-4">
                            <input
                                type="text"
                                value={amount}
                                onChange={handleInputChange}
                                placeholder="Enter your amount"
                                className={`w-full p-3 text-lg rounded-md text-black border-2 ${error ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                            {error && <div className="text-red-500 text-sm">{error}</div>} {/* แสดงข้อความผิดพลาด */}

                            <button
                                className="w-full p-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-all"
                                onClick={handleCalculate}
                            >
                                Calculate
                            </button>
                        </div>

                        {calculated && (
                            <div className="space-y-4 mt-6">
                                <div className="text-lg font-semibold text-gray-700">Essential (50%): <span className="font-bold">{result.essential}฿</span></div>
                                <div className="text-lg font-semibold text-gray-700">Wants (30%): <span className="font-bold">{result.wants}฿</span></div>
                                <div className="text-lg font-semibold text-gray-700">Savings & Investments (20%): <span className="font-bold">{result.savings}฿</span></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
