"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function LineChartAllmoney() {
    // Mockup ข้อมูล 10 วันล่าสุด
    const mockData = [
        { date: "02-03", revenue: 10000, expenses: 7000 },
        { date: "02-04", revenue: 15000, expenses: 10000 },
        { date: "02-05", revenue: 20000, expenses: 12000 },
        { date: "02-06", revenue: 30000, expenses: 18000 },
        { date: "02-07", revenue: 50000, expenses: 25000 },
        { date: "02-08", revenue: 25000, expenses: null }, // ไม่มีค่าใช้จ่ายวันนั้น
        { date: "02-09", revenue: 32000, expenses: 21000 },
        { date: "02-10", revenue: null, expenses: 15000 }, // ไม่มีรายรับวันนั้น
        { date: "02-11", revenue: 28000, expenses: 20000 },
        { date: "02-12", revenue: 40000, expenses: 27000 },
    ];

    return (
        <ResponsiveContainer width="100%" height={630}>
            <LineChart data={mockData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#00c853" strokeWidth={2} dot={{ r: 4 }} connectNulls />
                <Line type="monotone" dataKey="expenses" stroke="#d32f2f" strokeWidth={2} dot={{ r: 4 }} connectNulls />
            </LineChart>
        </ResponsiveContainer>
    );
}
