"use client"; // ใช้ client component ถ้าใช้ Next.js App Router

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// ลงทะเบียนโมดูลที่จำเป็น
ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategoryRevenue() {
  // ข้อมูลสำหรับกราฟโดนัท
  const data = {
    labels: ["เงินเดือน", "รายได้เสริม", "การลงทุน"], // หมวดหมู่
    datasets: [
      {
        data: [50000, 10000, 15000], // รายรับแต่ละหมวด
        backgroundColor: ["#007e50", "#ffc107", "#4e73df"], // สีเขียว, แดง, น้ำเงิน สำหรับหมวดต่างๆ
        borderColor: ["#FFFFFF"], // สีขอบ
        borderWidth: 1,
        cutout: "40%", // ปรับขนาดตรงกลางให้เป็นโดนัท
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // ซ่อน legend
      },
      tooltip: {
        enabled: true, // เปิดใช้งาน tooltip
        callbacks: {
          label: (context) => {
            // เปลี่ยน tooltip ให้แสดงข้อมูลเพิ่มเติมเมื่อ hover
            return `${context.label}: ฿${context.raw.toLocaleString()}`;
          },
        },
      },
    },
  };

  return (
    <div className="w-[90%] flex justify-center items-center h-full">
      <Doughnut data={data} options={options} />
    </div>
  );
}
