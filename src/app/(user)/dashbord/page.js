'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../../../components/sidebar/Sidebar';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import styles from './Dashboard.module.css';

// Registering chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({ totalIncome: 0, totalExpense: 0, balance: 0 });
  const [filter, setFilter] = useState('all');
  const [newTransaction, setNewTransaction] = useState({ type: '', description: '', amount: '', date: '' });
  const [topExpenses, setTopExpenses] = useState([]);
  const handleAddTransaction = async () => {
    // ตรวจสอบว่า fields ทั้งหมดไม่ว่างเปล่า
    if (!newTransaction.type || !newTransaction.description || !newTransaction.amount) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
  
    try {
      // ส่งข้อมูลไปยัง API หรือเซิร์ฟเวอร์
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTransaction),
      });
  
      if (response.ok) {
        const addedTransaction = await response.json();
        setTransactions(prevTransactions => [...prevTransactions, addedTransaction]); // เพิ่มรายการใหม่ลงในรายการเดิม
        setNewTransaction({ type: '', description: '', amount: '', date: '' }); // รีเซ็ตฟอร์ม
      } else {
        alert('เกิดข้อผิดพลาดในการเพิ่มรายการ');
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
      alert('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    }
  };
  // Fetch transactions data
  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/transactions');
      const data = await response.json();
      setTransactions(data);
      calculateStats(data);
      findTopExpenses(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  // Calculate statistics
  const calculateStats = (data) => {
    const totalIncome = data.filter(item => item.type === 'income').reduce((acc, item) => acc + item.amount, 0);
    const totalExpense = data.filter(item => item.type === 'expense').reduce((acc, item) => acc + item.amount, 0);
    const balance = totalIncome - totalExpense;
    setStats({ totalIncome, totalExpense, balance });
  };

  // Find top 3 expenses
  const findTopExpenses = (data) => {
    const expenses = data.filter(item => item.type === 'expense');
    const sortedExpenses = expenses.sort((a, b) => b.amount - a.amount).slice(0, 3);
    setTopExpenses(sortedExpenses);
  };

  // Prepare chart data for comparison (Bar chart)
  const prepareComparisonChartData = () => {
    const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    const incomePerMonth = new Array(12).fill(0);
    const expensePerMonth = new Array(12).fill(0);

    transactions.forEach(transaction => {
      const month = new Date(transaction.date).getMonth();
      if (transaction.type === 'income') {
        incomePerMonth[month] += transaction.amount;
      } else {
        expensePerMonth[month] += transaction.amount;
      }
    });

    return {
      labels: months,
      datasets: [
        {
          label: 'รายรับ',
          data: incomePerMonth,
          backgroundColor: 'rgb(75, 192, 192)',
        },
        {
          label: 'รายจ่าย',
          data: expensePerMonth,
          backgroundColor: 'rgb(255, 99, 132)',
        },
      ],
    };
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.dashboardContent}>
        <h1 className={styles.title}>Dashboard</h1>

        {/* Stats Section */}
        <div className={styles.statsContainer}>
          <div className={styles.statBox}>
            <h3>รายได้รวม</h3>
            <p>{stats.totalIncome} บาท</p>
          </div>
          <div className={styles.statBox}>
            <h3>รายจ่ายรวม</h3>
            <p>{stats.totalExpense} บาท</p>
          </div>
          <div className={styles.statBox}>
            <h3>ยอดคงเหลือ</h3>
            <p>{stats.balance} บาท</p>
          </div>
        </div>

        {/* Filter Section */}
        <div className={styles.filterContainer}>
          <label htmlFor="filter" className={styles.filterLabel}>กรองข้อมูลตาม:</label>
          <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)} className={styles.filterSelect}>
            <option value="all">ทั้งหมด</option>
            <option value="income">รายรับ</option>
            <option value="expense">รายจ่าย</option>
          </select>
        </div>

        {/* Chart Section */}
        <div className={styles.chartContainer}>
          <h2 className={styles.chartTitle}>กราฟเปรียบเทียบรายรับและรายจ่าย</h2>
          <Bar data={prepareComparisonChartData()} />
        </div>

        {/* Top 3 Expenses Section */}
        <div className={styles.topExpensesContainer}>
          <h2 className={styles.sectionTitle}>รายการที่ใช้จ่ายสูงสุด</h2>
          <ul className={styles.topExpensesList}>
            {topExpenses.map(expense => (
              <li key={expense.id} className={styles.expenseItem}>
                <p><strong>{expense.description}</strong>: {expense.amount} บาท</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Add Transaction Form */}
        <div className={styles.addTransactionContainer}>
          <h2>เพิ่มรายการการใช้จ่าย</h2>
          <input
            type="text"
            placeholder="ประเภท (รายรับ/รายจ่าย)"
            value={newTransaction.type}
            onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="รายละเอียด"
            value={newTransaction.description}
            onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
            className={styles.input}
          />
          <input
            type="number"
            placeholder="จำนวนเงิน"
            value={newTransaction.amount}
            onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
            className={styles.input}
          />
          <button onClick={() => handleAddTransaction()} className={styles.addButton}>เพิ่มรายการ</button>
        </div>

        {/* Transaction List */}
        <div className={styles.transactionContainer}>
          <h2 className={styles.transactionTitle}>รายการรายรับและรายจ่าย</h2>
          <ul className={styles.transactionList}>
            {transactions.filter(transaction => filter === 'all' || transaction.type === filter).map(transaction => (
              <li key={transaction.id} className={styles.transactionItem}>
                <p className={styles.transactionType}>{transaction.type === 'income' ? 'รายรับ' : 'รายจ่าย'}</p>
                <p className={styles.transactionDescription}>{transaction.description}</p>
                <p className={styles.transactionAmount}>{transaction.amount} บาท</p>
                <p className={styles.transactionDate}>{new Date(transaction.date).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
