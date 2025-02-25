"use client";
import { useState } from "react";

export default function Historycontent() {
    const [orders, setOrders] = useState([
        { date: "2025-02-15", list: "Paid order", price: 1000000, type: "Expenses" },
        { date: "2025-02-14", list: "Salary", price: 2000, type: "Revenue" },
    ]);

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.max(1, Math.ceil(orders.length / itemsPerPage));

    const [formData, setFormData] = useState({
        date: new Date().toISOString().split("T")[0],
        list: "",
        price: "",
        type: "Revenue",
    });

    const [inputErrors, setInputErrors] = useState({
        list: false,
        price: false,
        date: false, // เพิ่ม error สำหรับวันที่
    });

    const [errorMessage, setErrorMessage] = useState("");

    const formatNumber = (number) => {
        if (number >= 1_000_000) {
            return (number / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
        } else if (number >= 1_000) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
        return number;
    };

    const currentOrders = orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleDelete = (index) => {
        const updatedOrders = orders.filter((_, i) => i !== (currentPage - 1) * itemsPerPage + index);
        setOrders(updatedOrders);
        const newTotalPages = Math.max(1, Math.ceil(updatedOrders.length / itemsPerPage));
        setCurrentPage(Math.min(currentPage, newTotalPages));
    };

    const handleAddOrder = () => {
        let isValid = true;
        let errors = { list: false, price: false, date: false }; // เพิ่ม error สำหรับวันที่
        if (!formData.list) {
            isValid = false;
            errors.list = true;
        }
        if (!formData.price || isNaN(formData.price.replace(/,/g, ''))) {
            isValid = false;
            errors.price = true;
        }
        // เช็ควันที่ว่าถูกต้องหรือไม่
        if (new Date(formData.date) > new Date()) {
            isValid = false;
            errors.date = true;
            setErrorMessage("The date cannot be in the future. Please select a valid date.");
        }

        if (!isValid) {
            setInputErrors(errors);
        } else {
            const formattedPrice = formData.price.replace(/,/g, '');
            setOrders([...orders, { ...formData, price: Number(formattedPrice) }]);
            setFormData({ ...formData, list: "", price: "" });
            setErrorMessage("");
            setInputErrors({ list: false, price: false, date: false });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="flex justify-center items-center w-[84%] h-screen">
            <div className="w-[95%] h-[95%] bg-white rounded flex overflow-hidden">
                <div className="w-[70%] h-full flex flex-col items-center pt-7">
                    <table className="w-[90%] border border-black border-collapse text-black">
                        <thead>
                            <tr>
                                <th className="border border-black px-4 py-2">Date</th>
                                <th className="border border-black px-4 py-2">List</th>
                                <th className="border border-black px-4 py-2">Price</th>
                                <th className="border border-black px-4 py-2">Type</th>
                                <th className="border border-black px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentOrders.map((order, index) => (
                                <tr key={index}>
                                    <td className="border border-black px-4 py-2">{order.date}</td>
                                    <td className="border border-black px-4 py-2">{order.list}</td>
                                    <td className="border border-black px-4 py-2">{formatNumber(order.price)}</td>
                                    <td className={`border border-black px-4 py-2 ${order.type === "Revenue" ? "text-green-600" : "text-red-600"}`}>{order.type}</td>
                                    <td className="border border-black px-4 py-2 text-center">
                                        <button className="bg-gray-400 text-white rounded px-2 py-1 mr-2 hover:bg-gray-300">Edit</button>
                                        <button className="bg-red-500 text-white rounded px-2 py-1 hover:bg-red-400" onClick={() => handleDelete(index)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {orders.length === 0 ? (
                        <span className="text-gray-600 mt-4">No data available</span>
                    ) : (
                        <div className="mt-4 flex items-center gap-4">
                            <button
                                className="px-3 py-1 bg-blue-500 rounded disabled:opacity-50"
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Prev
                            </button>
                            <span className="text-gray-600">Page {currentPage} of {totalPages}</span>
                            <button
                                className="px-3 py-1 bg-blue-500 rounded disabled:opacity-50"
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>

                <div className="w-[30%] flex justify-center items-center p-4">
                    <div className="flex flex-col gap-4">
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            className={`border px-3 py-2 rounded text-black ${inputErrors.date ? 'border-red-500' : ''}`}
                        />
                        {inputErrors.date && <span className="text-red-500 text-sm">Please select a valid date (not in the future).</span>}

                        <input
                            type="text"
                            name="list"
                            value={formData.list}
                            onChange={handleInputChange}
                            placeholder="Event"
                            className={`border px-3 py-2 rounded text-black ${inputErrors.list ? 'border-red-500' : ''}`}
                        />
                        {inputErrors.list && <span className="text-red-500 text-sm">Please enter an event name.</span>}

                        <input
                            type="text"
                            name="price"
                            value={formData.price}
                            onChange={(e) => {
                                const formattedPrice = e.target.value.replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                                setFormData({ ...formData, price: formattedPrice });
                            }}
                            placeholder="Amount"
                            className={`border px-3 py-2 rounded text-black ${inputErrors.price ? 'border-red-500' : ''}`}
                        />
                        {inputErrors.price && <span className="text-red-500 text-sm">Please enter a valid price.</span>}

                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                            className="border px-3 py-2 rounded text-black"
                        >
                            <option value="Revenue">Revenue</option>
                            <option value="Expenses">Expenses</option>
                        </select>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                            onClick={handleAddOrder}
                        >
                            Add
                        </button>
                        {errorMessage && <span className="text-red-500 mt-2">{errorMessage}</span>}
                    </div>
                </div>
            </div>
        </div>
    );
}
