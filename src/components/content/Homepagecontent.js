import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyCheck, faCoins, faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";
import PieChartallmoney from "../chart/Donutchart_allmoney";
// ฟังก์ชันสำหรับการเพิ่ม , และย่อจำนวน
const formatNumber = (number) => {
    if (number >= 1_000_000) {
        // ถ้ามากกว่าหรือเท่ากับ 1 ล้าน ให้แสดงเป็น 'M'
        return (number / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (number >= 1_000) {
        // ถ้ามากกว่าหรือเท่ากับ 1,000 ให้เพิ่ม , (เช่น 1,000)
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return number;
};

export default function HomepageContent() {
    const totalAmount = 100000000;
    const totalTransactions = 15000;

    return (
        <div className="flex justify-center items-center w-[84%] h-screen select-none">
            <div className="w-[95%] h-[95%] bg-white rounded flex overflow-hidden ">
                <div className="w-[40%] h-full flex justify-center items-center pl-3">
                    <div className="w-[90%] h-[90%] rounded flex flex-col justify-center items-center">
                        <div className="w-full h-[40%] bg-gradient-to-r from-[#004c90] to-[#00a7be] rounded p-3 flex">
                            <div className="w-[60%] h-full flex flex-col overflow-hidden relative">
                                <div>
                                    <FontAwesomeIcon icon={faMoneyCheck} className="text-[24px] text-white mr-2" />
                                    <span className="text-white font-bold text-2xl">Total amount</span>
                                </div>
                                <span className="text-white font-bold text-4xl mt-5">
                                    {formatNumber(totalAmount)} ฿
                                </span>
                                <span className="text-white text-xl absolute bottom-0"> {formatNumber(totalTransactions)} Transactions</span>
                            </div>
                            <div className="w-[40%] h-full">
                                <PieChartallmoney />
                            </div>
                        </div>
                        <div className="w-full h-[60%] flex mt-3 justify-center items-center">
                            <div className="w-[50%] h-full flex flex-col bg-gradient-to-t from-[#B4FFEA]  via-[#63bd9c] p-3 to-[#007e50] rounded mr-2">
                                <div className="w-full flex justify-center h-[10%] items-center">
                                    <FontAwesomeIcon icon={faCoins} className="text-[24px] text-white mr-2" />
                                    <span className="text-white font-bold text-2xl ">Revenue</span>
                                </div>
                            </div>
                            <div className="w-[50%] h-full flex bg-gradient-to-t from-[#FF8989] via-[#c05044] to-[#7e1900] rounded p-3">
                                <div className="w-full flex justify-center h-[10%] items-center">
                                    <FontAwesomeIcon icon={faMoneyBillTransfer} className="text-[24px] text-white mr-2" />
                                    <span className="text-white font-bold text-2xl ">Expenses</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[60%] h-full flex justify-center items-center">
                    <div className="w-[90%] h-[90%] bg-red-400 rounded">asd</div>
                </div>
            </div>
        </div>
    );
}
