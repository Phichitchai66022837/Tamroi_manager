import Image from 'next/image'
import { Roboto, Open_Sans } from 'next/font/google'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faHouse, faChartLine, faClockRotateLeft, faBolt, faBell, faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import FontAwesome from '@/app/fontawesome'

const roboto = Roboto({
    weight: ['400', '500'],
    subsets: ['latin'],
})

const openSans = Open_Sans({
    weight: ['300', '400', '600'],
    subsets: ['latin'],
})
export default function Homepage() {



    return (
        <div className={`bg-[#dfdfdf] w-screen h-screen flex box-border  ${roboto.className} ${openSans.className}`}>
            <div className="bg-white w-[16%] h-screen relative">
                <div className='w-full flex justify-center items-center pt-4 pb-4 select-none mb-9 relative'>
                    <Image
                        src="/image/Logo.png"
                        alt="Logo"
                        width={60}
                        height={300}
                    />
                    <span className='text-black font-semibold text-[28px]'>Tamroi</span>
                    <div className='absolute right-[-15px] bg-[#ffffff] w-8 h-8 flex justify-center items-center rounded-full'>
                        <FontAwesomeIcon icon={faCaretLeft} className='text-[24px] text-[#2cadff]' />
                    </div>
                </div>
                <div className='w-full flex justify-center items-center flex-col select-none'>
                    <a href='home' className='text-black bg-[#efefef] w-[80%] h-[40px] rounded flex items-center text-center text-[16px] font-semibold pl-5 mb-2 hover:bg-[#efefef] hover:text-black'>
                        <FontAwesomeIcon icon={faHouse} className='text-[20px] mr-3' />
                        Home
                    </a>
                    <a href='home' className='text-[#7c7c7c] w-[80%] h-[40px] rounded flex items-center text-center text-[16px] duration-300 font-semibold pl-5 mb-2 hover:bg-[#efefef] hover:text-black'>
                        <FontAwesomeIcon icon={faChartLine} className='text-[20px] mr-3' />
                        Dashboard
                    </a>
                    <a href='home' className='text-[#7c7c7c] w-[80%] h-[40px] rounded flex items-center text-center text-[16px] duration-300 font-semibold pl-5 mb-2 hover:bg-[#efefef] hover:text-black'>
                        <FontAwesomeIcon icon={faClockRotateLeft} className='text-[20px] mr-3' />
                        History
                    </a>
                    <a href='home' className='text-[#7c7c7c] w-[80%] h-[40px] rounded flex items-center text-center text-[16px] duration-300 font-semibold pl-5 mb-2 hover:bg-[#efefef] hover:text-black'>
                        <FontAwesomeIcon icon={faBolt} className='text-[20px] mr-3' />
                        Analyze
                    </a>
                </div>
                <div className='absolute bottom-0 w-full flex justify-center items-center flex-col mb-5 select-none'>
                    <div className='border-t-2 w-[80%] h-1 mb-5'></div>
                    <div className='w-full flex justify-center items-center flex-col'>
                        <a href='home' className='text-[#7c7c7c] w-[80%] h-[40px] rounded flex items-center text-center text-[16px] duration-300 font-semibold pl-5 mb-2 hover:bg-[#efefef] hover:text-black'>
                            <FontAwesomeIcon icon={faBell} className='text-[20px] mr-3' />
                            Notifications
                        </a>
                        <a href='home' className='text-[#7c7c7c] w-[80%] h-[40px] rounded flex items-center text-center text-[16px] duration-300 font-semibold pl-5 mb-2 hover:bg-[#efefef] hover:text-black'>
                            <FontAwesomeIcon icon={faGear} className='text-[20px] mr-3' />
                            Settings
                        </a>
                        <div className='group w-[80%] pl-2 mt-3 flex justify-start items-center h-[50px] rounded duration-300 hover:bg-[#efefef]'>
                            <div className='rounded-full bg-[#0F7CF0] w-[40px] h-[40px] flex justify-center items-center overflow-hidden mr-2'>
                                <Image
                                    src="/image/sawako.jpeg"
                                    alt="Profile"
                                    width={40}
                                    height={300}
                                />
                            </div>
                            <div className='flex flex-col w-[55%] max-w-full overflow-hidden whitespace-nowrap text-ellipsis mr-2'>
                                <span className='text-[#0F7CF0] font-semibold'>Sawako</span>
                                <span className='text-[#bdbdbd] font-semibold text-[10px]'>
                                    66022837@up.ac.th
                                </span>
                            </div>
                            <button className='flex justify-center items-center text-[#7c7c7c] group-hover:text-black'><FontAwesomeIcon icon={faRightFromBracket} className='text-[20px] mr-3' /></button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
