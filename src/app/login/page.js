import { Roboto } from 'next/font/google'

const roboto = Roboto({
    weight: ['400', '500'],
    subsets: ['latin'],
})

export default function Login() {
    return (
        <div className={`w-screen h-screen flex justify-center items-center bg-[#dfdfdf] ${roboto.className}`}>
            <div className="bg-white w-[80%] h-[80%] rounded drop-shadow-xl flex">
                <div className="w-[65%] h-full rounded-l bg-black">asdasd</div>
                <div className="w-[35%] h-full flex justify-center items-center">
                    <div className="w-[80%] h-[80%] flex flex-col justify-center items-center">
                        <span className="text-black text-2xl select-none font-semibold mb-7">Login</span>
                        <div className="w-full relative mb-3">
                            <input
                                type="email"
                                className="peer w-full h-[40px] rounded border text-black pl-4 outline-sky-400"
                            />
                            <span className="absolute left-4 top-2 select-none text-gray-400 w-[50px] text-center bg-white peer-focus:top-[-10px] peer-focus:text-sky-400 peer-focus:duration-200">
                                Email
                            </span>
                        </div>
                        <div className="w-full relative">
                            <input
                                type="password"
                                className="peer w-full h-[40px] rounded border outline-sky-400 text-black pl-4"
                            />
                            <span className="absolute left-4 top-2 select-none text-gray-400 w-[80px] text-center bg-white peer-focus:top-[-10px] peer-focus:text-sky-400 peer-focus:duration-200">
                                Password
                            </span>
                        </div>
                        <a href="/homepage" className="text-[14px] mt-3 text-blue-400">Forgot Password?</a>
                        <button className="w-full h-[40px] bg-blue-500 duration-300 text-white rounded mt-3 hover:bg-blue-600">Login</button>
                        <div className="flex justify-center items-center mt-2">
                            <span className="text-gray-400 text-[14px]">Don&#39;t have an account?</span>
                            <a href="/register" className="text-blue-400 text-[14px] ml-1">Signup</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
