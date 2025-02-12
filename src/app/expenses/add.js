import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ExpenseEntry() {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessage("บันทึกค่าใช้จ่ายเรียบร้อยแล้ว!");
        reset();
      } else {
        setMessage("เกิดข้อผิดพลาด! โปรดลองอีกครั้ง");
      }
    } catch (error) {
      setMessage("เกิดข้อผิดพลาด! โปรดลองอีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">บันทึกรายจ่าย</h2>
      
      {message && (
        <p className="text-center text-green-600 mb-4">{message}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700">ชื่อรายการ</label>
          <input
            {...register("name", { required: true })}
            className="w-full p-2 border rounded"
            placeholder="เช่น ค่าอาหาร, ค่าเดินทาง"
          />
        </div>

        <div>
          <label className="block text-gray-700">หมวดหมู่</label>
          <select {...register("category")} className="w-full p-2 border rounded">
            <option value="อาหาร">อาหาร</option>
            <option value="เดินทาง">เดินทาง</option>
            <option value="ที่พัก">ที่พัก</option>
            <option value="อื่น ๆ">อื่น ๆ</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700">จำนวนเงิน (บาท)</label>
          <input
            type="number"
            {...register("amount", { required: true })}
            className="w-full p-2 border rounded"
            placeholder="เช่น 500"
          />
        </div>

        <div>
          <label className="block text-gray-700">วันที่</label>
          <input
            type="date"
            {...register("date", { required: true })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700">หมายเหตุ (ถ้ามี)</label>
          <textarea
            {...register("note")}
            className="w-full p-2 border rounded"
            placeholder="รายละเอียดเพิ่มเติม"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "กำลังบันทึก..." : "บันทึกค่าใช้จ่าย"}
        </button>
      </form>
    </div>
  );
}
