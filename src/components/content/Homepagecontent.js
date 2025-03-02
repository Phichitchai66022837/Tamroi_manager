"use client"; // ใช้ client component ถ้าใช้ Next.js App Router

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "../../../lib/firebaseConfig";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, query, where } from "firebase/firestore";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";

// ลงทะเบียนโมดูลที่จำเป็น
ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale);

export default function HomepageContent() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [router]);

  const [totalAmount, setTotalAmount] = useState(0); // จำนวนเงินทั้งหมดที่จะใช้
  const [revenue, setRevenue] = useState(0); // รายรับ
  const [expenses, setExpenses] = useState(0); // รายจ่าย
  const [expenseCategories, setExpenseCategories] = useState({
    "ทั่วไป": 0,
    "ค่าน้ำค่าไฟ": 0,
    "ค่าอาหาร": 0,
    "ค่าที่พัก": 0,
  });
  const [inputTotalAmount, setInputTotalAmount] = useState("");
  const [inputRevenue, setInputRevenue] = useState("");
  const [inputExpenses, setInputExpenses] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("ทั่วไป");
  const [showChart, setShowChart] = useState(false); // สถานะเพื่อควบคุมการแสดงผลของกราฟโดนัท
  const [showHistory, setShowHistory] = useState(false); // สถานะเพื่อควบคุมการแสดงผลของประวัติรายรับรายจ่าย
  const [showLineChart, setShowLineChart] = useState(false); // สถานะเพื่อควบคุมการแสดงผลของกราฟเส้น
  const [history, setHistory] = useState([]); // ประวัติรายรับรายจ่าย
  const [selectedDate, setSelectedDate] = useState(""); // วันที่ที่เลือกสำหรับการบันทึก
  const [showSummary, setShowSummary] = useState(false); // สถานะเพื่อควบคุมการแสดงผลของสรุปค่าใช้จ่าย
  const [editIndex, setEditIndex] = useState(null); // สถานะเพื่อเก็บ index ของรายการที่กำลังถูกแก้ไข
  const [editItem, setEditItem] = useState(null); // สถานะเพื่อเก็บข้อมูลของรายการที่กำลังถูกแก้ไข

  useEffect(() => {
    const fetchData = async () => {
      const userEmail = sessionStorage.getItem("userEmail");
      const q = query(collection(db, "financialData"), where("userEmail", "==", userEmail));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs[0].data();
        setTotalAmount(data.totalAmount);
        setRevenue(data.revenue);
        setExpenses(data.expenses);
        setExpenseCategories(data.expenseCategories || {
          "ทั่วไป": 0,
          "ค่าน้ำค่าไฟ": 0,
          "ค่าอาหาร": 0,
          "ค่าที่พัก": 0,
        });
        setHistory(data.history || []);
      }
    };

    fetchData();
  }, []);

  const handleSetTotalAmount = async () => {
    const newTotalAmount = parseFloat(inputTotalAmount.replace(/,/g, ''));
    if (!isNaN(newTotalAmount)) {
      setTotalAmount(newTotalAmount);
      setInputTotalAmount("");

      // ดึงข้อมูลอีเมลและ uid ผู้ใช้จาก session storage
      const userEmail = sessionStorage.getItem("userEmail");
      const uid = sessionStorage.getItem("uid");

      await updateFinancialData(newTotalAmount, revenue, expenses, expenseCategories, history, userEmail, uid);
    }
  };

  const handleAddRevenue = async () => {
    const newRevenue = parseFloat(inputRevenue.replace(/,/g, ''));
    if (!isNaN(newRevenue)) {
      const updatedRevenue = revenue + newRevenue;
      setRevenue(updatedRevenue);
      setInputRevenue("");
      const date = selectedDate || new Date().toLocaleString();
      const newHistory = [...history, { type: "รายรับ", amount: newRevenue, date }];
      setHistory(newHistory);

      // ดึงข้อมูลอีเมลและ uid ผู้ใช้จาก session storage
      const userEmail = sessionStorage.getItem("userEmail");
      const uid = sessionStorage.getItem("uid");

      await updateFinancialData(totalAmount, updatedRevenue, expenses, expenseCategories, newHistory, userEmail, uid);
    }
  };

  const handleAddExpenses = async () => {
    const newExpenses = parseFloat(inputExpenses.replace(/,/g, ''));
    if (!isNaN(newExpenses)) {
      const updatedExpenses = expenses + newExpenses;
      const updatedExpenseCategories = {
        ...expenseCategories,
        [expenseCategory]: expenseCategories[expenseCategory] + newExpenses,
      };
      setExpenses(updatedExpenses);
      setExpenseCategories(updatedExpenseCategories);
      setInputExpenses("");
      const date = selectedDate || new Date().toLocaleString();
      const newHistory = [...history, { type: "รายจ่าย", category: expenseCategory, amount: newExpenses, date }];
      setHistory(newHistory);

      // ดึงข้อมูลอีเมลและ uid ผู้ใช้จาก session storage
      const userEmail = sessionStorage.getItem("userEmail");
      const uid = sessionStorage.getItem("uid");

      await updateFinancialData(totalAmount, revenue, updatedExpenses, updatedExpenseCategories, newHistory, userEmail, uid);
    }
  };

  const handleReset = async () => {
    const userEmail = sessionStorage.getItem("userEmail");
    const q = query(collection(db, "financialData"), where("userEmail", "==", userEmail));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docRef = doc(db, "financialData", querySnapshot.docs[0].id);
      await deleteDoc(docRef);
    }
    setTotalAmount(0);
    setRevenue(0);
    setExpenses(0);
    setExpenseCategories({
      "ทั่วไป": 0,
      "ค่าน้ำค่าไฟ": 0,
      "ค่าอาหาร": 0,
      "ค่าที่พัก": 0,
    });
    setHistory([]);
  };

  const handleDeleteHistoryItem = async (index) => {
    const item = history[index];
    const newHistory = history.filter((_, i) => i !== index);
    setHistory(newHistory);

    if (item.type === "รายรับ") {
      setRevenue(revenue - item.amount);
    } else if (item.type === "รายจ่าย") {
      setExpenses(expenses - item.amount);
      setExpenseCategories({
        ...expenseCategories,
        [item.category]: expenseCategories[item.category] - item.amount,
      });
    }

    // ดึงข้อมูลอีเมลและ uid ผู้ใช้จาก session storage
    const userEmail = sessionStorage.getItem("userEmail");
    const uid = sessionStorage.getItem("uid");

    await updateFinancialData(totalAmount, revenue, expenses, expenseCategories, newHistory, userEmail, uid);
  };

  const handleEditHistoryItem = (index) => {
    const item = history[index];
    setEditIndex(index);
    setEditItem(item);
    setInputRevenue(item.type === "รายรับ" ? item.amount.toString() : "");
    setInputExpenses(item.type === "รายจ่าย" ? item.amount.toString() : "");
    setExpenseCategory(item.category || "ทั่วไป");
    setSelectedDate(item.date);
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditItem(null);
    setInputRevenue("");
    setInputExpenses("");
    setExpenseCategory("ทั่วไป");
    setSelectedDate("");
  };

  const handleSaveEdit = async () => {
    if (editIndex !== null && editItem) {
      const newHistory = [...history];
      const updatedItem = {
        ...editItem,
        amount: parseFloat(inputRevenue || inputExpenses.replace(/,/g, '')),
        category: expenseCategory,
        date: selectedDate,
      };
      newHistory[editIndex] = updatedItem;
      setHistory(newHistory);

      // ดึงข้อมูลอีเมลและ uid ผู้ใช้จาก session storage
      const userEmail = sessionStorage.getItem("userEmail");
      const uid = sessionStorage.getItem("uid");

      await updateFinancialData(totalAmount, revenue, expenses, expenseCategories, newHistory, userEmail, uid);

      handleCancelEdit();
    }
  };

  const updateFinancialData = async (totalAmount, revenue, expenses, expenseCategories, history, userEmail, uid) => {
    const q = query(collection(db, "financialData"), where("userEmail", "==", userEmail));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docRef = doc(db, "financialData", querySnapshot.docs[0].id);
      await updateDoc(docRef, { totalAmount, revenue, expenses, expenseCategories, history, userId: uid, userEmail });
    } else {
      await addDoc(collection(db, "financialData"), { totalAmount, revenue, expenses, expenseCategories, history, userId: uid, userEmail });
    }
  };

  // ข้อมูลสำหรับกราฟโดนัท
  const doughnutData = {
    labels: ["รายรับ", "ค่าใช้จ่ายทั่วไป", "ค่าน้ำค่าไฟ", "ค่าอาหาร", "ค่าที่พัก"],
    datasets: [
      {
        data: [revenue, expenseCategories["ทั่วไป"], expenseCategories["ค่าน้ำค่าไฟ"], expenseCategories["ค่าอาหาร"], expenseCategories["ค่าที่พัก"]], // รายรับและรายจ่ายแยกตามหมวดหมู่
        backgroundColor: ["#007e50", "#e4614f", "#f39c12", "#3498db", "#8e44ad"], // สีเขียว (รายรับ), สีแดง (ค่าใช้จ่ายทั่วไป), สีส้ม (ค่าน้ำค่าไฟ), สีฟ้า (ค่าอาหาร), สีม่วง (ค่าที่พัก)
        borderColor: ["#FFFFFF"], // สีขอบ
        borderWidth: 1,
        cutout: "40%", // ปรับขนาดตรงกลางให้เป็นโดนัท
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true, // แสดง legend
        labels: {
          usePointStyle: true, // ใช้สไตล์จุดแทนสี่เหลี่ยม
          pointStyle: 'circle', // ใช้จุดวงกลม
        },
      },
      tooltip: {
        enabled: true, // เปิดใช้งาน tooltip
        callbacks: {
          label: (context) => {
            // เปลี่ยน tooltip ให้แสดงข้อมูลเพิ่มเติม
            return `${context.label}: ฿${context.raw.toLocaleString()}`;
          },
        },
      },
    },
  };

  // ข้อมูลสำหรับกราฟเส้น
  const lineData = {
    labels: [...new Set(history.map(item => new Date(item.date).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })))],
    datasets: [
      {
        label: 'รายรับ',
        data: history.filter(item => item.type === 'รายรับ').reduce((acc, item) => {
          const date = new Date(item.date).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' });
          acc[date] = (acc[date] || 0) + item.amount;
          return acc;
        }, {}),
        borderColor: 'green',
        fill: false,
      },
      {
        label: 'รายจ่าย',
        data: history.filter(item => item.type === 'รายจ่าย').reduce((acc, item) => {
          const date = new Date(item.date).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' });
          acc[date] = (acc[date] || 0) + item.amount;
          return acc;
        }, {}),
        borderColor: 'red',
        fill: false,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        type: 'category',
        labels: [...new Set(history.map(item => new Date(item.date).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })))],
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  // ฟังก์ชันเพื่อคำนวณวันไหนใช้เงินมากที่สุดและวันไหนได้รับเงินมากที่สุด
  const calculateSummary = () => {
    let maxExpenseDay = { date: "", amount: 0 };
    let maxRevenueDay = { date: "", amount: 0 };
    const dailyExpenses = {};
    const dailyRevenues = {};

    history.forEach(item => {
      const date = new Date(item.date).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' });
      if (item.type === "รายจ่าย") {
        dailyExpenses[date] = (dailyExpenses[date] || 0) + item.amount;
        if (dailyExpenses[date] > maxExpenseDay.amount) {
          maxExpenseDay = { date, amount: dailyExpenses[date] };
        }
      } else if (item.type === "รายรับ") {
        dailyRevenues[date] = (dailyRevenues[date] || 0) + item.amount;
        if (dailyRevenues[date] > maxRevenueDay.amount) {
          maxRevenueDay = { date, amount: dailyRevenues[date] };
        }
      }
    });

    return {
      totalRevenue: revenue,
      totalExpenses: expenses,
      maxExpenseDay,
      maxRevenueDay,
    };
  };

  // สถานะเพื่อควบคุมการแสดงผลของสรุปค่าใช้จ่าย
  const summary = calculateSummary();

  return (
    <div className="flex justify-center items-center w-[84%] h-screen select-none">
      <div className="w-[95%] h-[95%] bg-white rounded flex flex-col items-center overflow-hidden p-4 relative">
        {totalAmount === 0 ? (
          <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="flex gap-2 w-full max-w-md">
              <input
                type="text"
                value={inputTotalAmount}
                onChange={(e) => setInputTotalAmount(e.target.value)}
                placeholder="จำนวนเงินทั้งหมดที่จะใช้"
                className="border px-3 py-2 rounded flex-grow text-black"
              />
              <button
                onClick={handleSetTotalAmount}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                ตั้งจำนวนเงิน
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center gap-4 w-full max-w-md">
              <div className="flex gap-4 w-full mt-4">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="border px-3 py-2 rounded text-black"
                />
              </div>
              <div className="flex gap-4 w-full mt-4">
                <input
                  type="text"
                  value={inputRevenue}
                  onChange={(e) => setInputRevenue(e.target.value)}
                  placeholder="เพิ่มรายรับ"
                  className="border px-3 py-2 rounded flex-grow text-black"
                />
                <button
                  onClick={handleAddRevenue}
                  className="bg-green-500 text-white px-5 py-3 rounded mt-1"
                >
                  เพิ่มรายรับ
                </button>
              </div>
              <div className="flex gap-4 w-full">
                <input
                  type="text"
                  value={inputExpenses}
                  onChange={(e) => setInputExpenses(e.target.value)}
                  placeholder="เพิ่มรายจ่าย"
                  className="border px-25 py-4 rounded flex-grow text-black"
                />
                <select
                  value={expenseCategory}
                  onChange={(e) => setExpenseCategory(e.target.value)}
                  className="border px-25 py-4 rounded flex-grow text-black"
                >
                  <option value="ทั่วไป">ค่าใช้จ่ายทั่วไป</option>
                  <option value="ค่าน้ำค่าไฟ">ค่าน้ำค่าไฟ</option>
                  <option value="ค่าอาหาร">ค่าอาหาร</option>
                  <option value="ค่าที่พัก">ค่าที่พัก</option>
                </select>
                <button
                  onClick={handleAddExpenses}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  เพิ่มรายจ่าย
                </button>
              </div>
              <div className="text-center mt-4">
                <p className="text-xl font-semibold text-black">ยอดเงินคงเหลือทั้งหมด: ฿{(totalAmount + revenue - expenses).toLocaleString()}</p>
              </div>
            </div>
            {(revenue > 0 || expenses > 0) && (
              <div className="flex gap-2 mb-4 mt-4">
                <button
                  onClick={() => {
                    setShowChart(!showChart);
                    if (showHistory) setShowHistory(false);
                    if (showLineChart) setShowLineChart(false);
                    if (showSummary) setShowSummary(false);
                  }}
                  className="bg-gray-500 text-white px-12 py-3 rounded"
                >
                  {showChart ? "ซ่อน" : "กราฟโดนัท"}
                </button>
                <button
                  onClick={() => {
                    setShowHistory(!showHistory);
                    if (showChart) setShowChart(false);
                    if (showLineChart) setShowLineChart(false);
                    if (showSummary) setShowSummary(false);
                  }}
                  className="bg-gray-500 text-white px-12 py-3 rounded"
                >
                  {showHistory ? "ซ่อน" : "ประวัติค่าใช้จ่าย"}
                </button>
                <button
                  onClick={() => {
                    setShowLineChart(!showLineChart);
                    if (showChart) setShowChart(false);
                    if (showHistory) setShowHistory(false);
                    if (showSummary) setShowSummary(false);
                  }}
                  className="bg-gray-500 text-white px-12 py-3 rounded"
                  style={{ display: (revenue > 0 || expenses > 0) ? 'block' : 'none' }}
                >
                  {showLineChart ? "ซ่อน" : "กราฟเส้น"}
                </button>
                <button
                  onClick={() => {
                    setShowSummary(!showSummary);
                    if (showChart) setShowChart(false);
                    if (showHistory) setShowHistory(false);
                    if (showLineChart) setShowLineChart(false);
                  }}
                  className="bg-gray-500 text-white px-12 py-3 rounded"
                >
                  {showSummary ? "ซ่อน" : "สรุปค่าใช้จ่าย"}
                </button>
              </div>
            )}
            {showChart && (revenue > 0 || expenses > 0) && (
              <div className="w-full max-w-sm mb-4"> {/* ปรับขนาดกราฟโดนัท */}
                <Doughnut data={doughnutData} options={doughnutOptions} />
              </div>
            )}
            {showHistory && (
              <div className="w-full max-w-md mt-4 overflow-y-auto max-h-[30rem]">
                <h2 className="text-lg font-semibold text-black mb-2">ประวัติค่าใช้จ่าย (แก้ไข)</h2>
                <ul className="list-disc list-inside text-black">
                  {history.map((item, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span>
                        {item.date} - {item.type} {item.category ? `(${item.category})` : ""}: ฿{item.amount.toLocaleString()}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditHistoryItem(index)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded"
                        >
                          แก้ไข
                        </button>
                        <button
                          onClick={() => handleDeleteHistoryItem(index)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          ลบ
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                {editIndex !== null && (
                  <div className="mt-4">
                    <button
                      onClick={handleSaveEdit}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      บันทึก
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                    >
                      ยกเลิก
                    </button>
                  </div>
                )}
              </div>
            )}
            {showLineChart && (
              <div className="w-full max-w-2xl mb-4"> {/* ปรับขนาดกราฟเส้น */}
                <Line data={lineData} options={lineOptions} />
              </div>
            )}
            {showSummary && (
              <div className="w-full max-w-md mt-4">
                <h2 className="text-lg font-semibold text-black mb-2">สรุปค่าใช้จ่าย</h2>
                <p className="text-black">รายรับทั้งหมด: ฿{summary.totalRevenue.toLocaleString()}</p>
                <p className="text-black">รายจ่ายทั้งหมด: ฿{summary.totalExpenses.toLocaleString()}</p>
                <p className="text-black">ใช้เงินมากที่สุดในวัน: {summary.maxExpenseDay.date} (฿{summary.maxExpenseDay.amount.toLocaleString()})</p>
                <p className="text-black">ได้รับเงินมากที่สุดในวัน: {summary.maxRevenueDay.date} (฿{summary.maxRevenueDay.amount.toLocaleString()})</p>
              </div>
            )}
          </>
        )}
        <button
          onClick={handleReset}
          className="absolute bottom-4 left-4 bg-gray-500 text-white px-4 py-2 rounded"
        >
          รีเซ็ต
        </button>
      </div>
    </div>
  );
}