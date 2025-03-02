import Sidebar from "@/components/sidebar/Sidebar";
import SettingsContent from "../../../components/content/SettingsContent";

export default function SettingsPage() {
    return (
        <div className="bg-[#dfdfdf] w-screen h-screen flex box-border">
            <Sidebar />
            <SettingsContent />
        </div>
    );
}