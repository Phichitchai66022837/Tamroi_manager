import Sidebar from '../../../components/sidebar/Sidebar'
import Historycontent from '@/components/content/Historycontent'
export default function History() {
    return (
        <div className="bg-[#dfdfdf] w-screen h-screen flex box-border">
            <Sidebar />
            <Historycontent />
        </div>
    )
}