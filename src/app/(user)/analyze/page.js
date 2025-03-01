
import Sidebar from "@/components/sidebar/Sidebar"
import AnalyzeContent from "../../../components/content/Analyzecontent"

export default function Analyze() {
    return (
        <div className="bg-[#dfdfdf] w-screen h-screen flex box-border">
            <Sidebar />
            <AnalyzeContent />
        </div>
    )
}