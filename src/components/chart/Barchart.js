"use client"; // ใช้ client component ถ้าใช้ Next.js App Router

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// ลงทะเบียนโมดูลที่จำเป็น
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = () => {
  const data = {
    labels: ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค."],
    datasets: [
      {
        label: "ยอดขาย (บาท)",
        data: [12000, 19000, 3000, 5000, 20000],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full flex justify-center items-center h-[500px] p-4 bg-white rounded-lg shadow">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
