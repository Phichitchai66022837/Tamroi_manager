import Image from 'next/image'
import { Roboto, Open_Sans } from 'next/font/google'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Sidebar from './../../../components/sidebar/Sidebar'
import HomepageContent from './../../../components/content/Homepagecontent'

export default function Homepage() {
    return (
        <div className="bg-[#dfdfdf] w-screen h-screen flex box-border">
            <Sidebar />
            <HomepageContent/>
        </div>
    );
}
