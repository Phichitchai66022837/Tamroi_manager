
import CategoryExpenses from "../chart/CategoryExpenses"
import DonutChart from "../chart/Donutchart_allmoney"
import CategoryRevenue from "../chart/CategoryRevenue"
import LineChartAllCategory from "../chart/Linechart_allCategory"
export default function DashbordContent() {
    return (
        <div className="flex justify-center items-center w-[84%] h-screen select-none">
            <div className="w-[95%] h-[95%] bg-white rounded flex overflow-hidden">
                <div className="w-[40%] h-full flex flex-col justify-center items-center">
                    <div className="w-[80%] h-[90%] flex flex-col justify-center items-center bg-gradient-to-r from-[#004c90] to-[#00a7be] rounded p-3">
                        <span className="text-white font-bold text-4xl">Category</span>
                        <span className="text-white font-bold text-xl mt-5">Total Balance</span>
                        <div className="w-[150px] flex flex-col justify-center items-center mt-3"><DonutChart/></div>
                        <span className="text-white font-bold text-xl mt-3">Revenue</span>
                        <div className="w-[150px] flex flex-col justify-center items-center mt-3"><CategoryRevenue/></div>
                        <span className="text-white font-bold text-xl mt-3">Expenses</span>
                        <div className="w-[150px] flex flex-col justify-center items-center mt-3"><CategoryExpenses/></div>
                    </div>
                </div>
                <div className="w-[60%] h-full flex justify-center items-center">
                    <LineChartAllCategory/>
                </div>
            </div>
        </div>
    )
}