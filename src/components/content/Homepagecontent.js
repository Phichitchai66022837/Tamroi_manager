"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyCheck, faCoins, faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";
import PieChartallmoney from "../chart/Donutchart_allmoney";
import LineChartAllmoney from "../chart/Linechart_allmoney";
// ฟังก์ชันเพิ่ม , และย่อจำนวน
const formatNumber = (number) => {
    if (number >= 1_000_000) {
        return (number / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (number >= 1_000) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return number;
};

export default function HomepageContent() {
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [totalTransactions, setTotalTransactions] = useState(0);
    const [latestRevenue, setLatestRevenue] = useState([]);
    const [latestExpenses, setLatestExpenses] = useState([]);

    useEffect(() => {
        // จำลองข้อมูลรายรับ
        const fetchedRevenue = [
            { date: "02-07", amount: 500000 },
            { date: "02-06", amount: 30000 },
            { date: "02-05", amount: 20000 },
            { date: "02-04", amount: 15000 },
            { date: "02-03", amount: 10000 },
            { date: "02-02", amount: 5000 },
        ];
        setLatestRevenue(fetchedRevenue.slice(0, 10));

        // จำลองข้อมูลรายจ่าย
        const fetchedExpenses = [
            { date: "02-07", amount: 25000 },
            { date: "02-06", amount: 18000 },
            { date: "02-05", amount: 12000 },
            { date: "02-04", amount: 10000 },
            { date: "02-03", amount: 7000 },
            { date: "02-02", amount: 4000 },
        ];
        setLatestExpenses(fetchedExpenses.slice(0, 10));

        // จำลองค่ารวมรายรับ, รายจ่าย และจำนวนธุรกรรม
        setTotalRevenue(5000000);
        setTotalExpenses(2000000);
        setTotalTransactions(15000);
    }, []);

    return (
        <div className="flex justify-center items-center w-[84%] h-screen select-none">
            <div className="w-[95%] h-[95%] bg-white rounded flex overflow-hidden">
                <div className="w-[40%] h-full flex justify-center items-center pl-3">
                    <div className="w-[90%] h-[90%] rounded flex flex-col justify-center items-center">
                        <div className="w-full h-[40%] bg-gradient-to-r from-[#004c90] to-[#00a7be] rounded p-3 flex">
                            <div className="w-[60%] h-full flex flex-col overflow-hidden relative">
                                <div>
                                    <FontAwesomeIcon icon={faMoneyCheck} className="text-[24px] text-white mr-2" />
                                    <span className="text-white font-bold text-2xl">Total Balance</span>
                                </div>
                                <span className="text-white font-bold text-4xl mt-5">
                                    {formatNumber(totalRevenue - totalExpenses)} ฿
                                </span>
                                <span className="text-white text-xl absolute bottom-0">
                                    {formatNumber(totalTransactions)} Transactions
                                </span>
                            </div>
                            <div className="w-[40%] h-full">
                                <PieChartallmoney />
                            </div>
                        </div>
                        <div className="w-full h-[60%] flex mt-3 justify-center items-center">
                            {/* รายรับ */}
                            <div className="w-[50%] h-full flex flex-col bg-gradient-to-t from-[#B4FFEA] via-[#63bd9c] p-3 to-[#007e50] rounded mr-2">
                                <div className="w-full flex justify-center h-[10%] items-center">
                                    <FontAwesomeIcon icon={faCoins} className="text-[24px] text-white mr-2" />
                                    <span className="text-white font-bold text-2xl">Revenue</span>
                                </div>
                                <div className="w-full flex flex-col h-[90%] items-center mt-6 overflow-y-hidden">
                                    {latestRevenue.map((item, index) => (
                                        <div key={index} className="w-full flex justify-between pl-4 pr-4">
                                            <span className="text-xl font-semibold text-white">{item.date}</span>
                                            <span className="text-xl font-semibold text-white">+{formatNumber(item.amount)} ฿</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* รายจ่าย */}
                            <div className="w-[50%] h-full flex flex-col bg-gradient-to-t from-[#FF8989] via-[#c05044] to-[#7e1900] rounded p-3">
                                <div className="w-full flex justify-center h-[10%] items-center">
                                    <FontAwesomeIcon icon={faMoneyBillTransfer} className="text-[24px] text-white mr-2" />
                                    <span className="text-white font-bold text-2xl">Expenses</span>
                                </div>
                                <div className="w-full flex flex-col h-[90%] items-center mt-6 overflow-y-hidden">
                                    {latestExpenses.map((item, index) => (
                                        <div key={index} className="w-full flex justify-between pl-4 pr-4">
                                            <span className="text-xl font-semibold text-white">{item.date}</span>
                                            <span className="text-xl font-semibold text-white">-{formatNumber(item.amount)} ฿</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[60%] h-full flex justify-center items-center">
                    <div className="w-[90%] h-[90%]rounded">
                        <LineChartAllmoney/>
                    </div>
                </div>
            </div>
        </div>
    );
}
