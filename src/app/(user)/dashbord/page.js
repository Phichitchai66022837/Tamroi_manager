import Sidebar from '../../../components/sidebar/Sidebar'
import DashbordContent from '@/components/content/Dashbordcontent';
export default function Dashboard() {

    return (
        <div className="bg-[#dfdfdf] w-screen h-screen flex box-border">
            <Sidebar />
            <DashbordContent />
        </div>
    );
}