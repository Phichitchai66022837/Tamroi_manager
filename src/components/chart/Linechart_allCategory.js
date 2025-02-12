"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function LineChartAllCategory() {
    // Mockup ข้อมูลที่มีทั้งรายรับและรายจ่าย (6 หมวดหมู่)
    const mockData = [
        { date: "02-03", salary: 10000, extraIncome: 3000, investment: 2000, accommodation: 3000, food: 2000, entertainment: 1000 },
        { date: "02-04", salary: 15000, extraIncome: 4000, investment: 3000, accommodation: 4000, food: 2500, entertainment: 1500 },
        { date: "02-05", salary: 20000, extraIncome: 5000, investment: 4000, accommodation: 5000, food: 3000, entertainment: 2000 },
        { date: "02-06", salary: 30000, extraIncome: 7000, investment: 5000, accommodation: 7000, food: 3500, entertainment: 2500 },
        { date: "02-07", salary: 50000, extraIncome: 8000, investment: 6000, accommodation: 8000, food: 4000, entertainment: 3000 },
        { date: "02-08", salary: 25000, extraIncome: 5000, investment: 2000, accommodation: 4000, food: 3500, entertainment: 2000 },
        { date: "02-09", salary: 32000, extraIncome: 6000, investment: 4500, accommodation: 5000, food: 4500, entertainment: 2500 },
        { date: "02-10", salary: 28000, extraIncome: 4000, investment: 3500, accommodation: 5500, food: 4200, entertainment: 2200 },
        { date: "02-11", salary: 40000, extraIncome: 7000, investment: 6000, accommodation: 6000, food: 5000, entertainment: 3000 },
        { date: "02-12", salary: 45000, extraIncome: 8000, investment: 7000, accommodation: 6500, food: 5500, entertainment: 3500 },
    ];

    return (
        <ResponsiveContainer width="100%" height={630}>
            <LineChart data={mockData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="salary" stroke="#00c853" strokeWidth={2} dot={{ r: 4 }} connectNulls />
                <Line type="monotone" dataKey="extraIncome" stroke="#8e24aa" strokeWidth={2} dot={{ r: 4 }} connectNulls />
                <Line type="monotone" dataKey="investment" stroke="#03a9f4" strokeWidth={2} dot={{ r: 4 }} connectNulls />
                <Line type="monotone" dataKey="accommodation" stroke="#FF5733" strokeWidth={2} dot={{ r: 4 }} connectNulls />
                <Line type="monotone" dataKey="food" stroke="#FF8C00" strokeWidth={2} dot={{ r: 4 }} connectNulls />
                <Line type="monotone" dataKey="entertainment" stroke="#FFC107" strokeWidth={2} dot={{ r: 4 }} connectNulls />
            </LineChart>
        </ResponsiveContainer>
    );
}
