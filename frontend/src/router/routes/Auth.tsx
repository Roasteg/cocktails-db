import React, { FormEvent, useState } from "react";
import Loading from "../../components/Loading";

const Auth = () => {
    const [loading, setLoading] = useState(false);
    return (
        <>
            <div className="flex h-screen">
                <form className="m-auto lg:w-3/6 transition-all shadow-md rounded-lg justify-center items-center p-10" action="" onSubmit={(e: FormEvent) => {
                    e.preventDefault();
                }}>
                    <div className="flex flex-col transition-all ">
                        <label htmlFor="login" className="mb-4 font-semibold">Login</label>
                        <input id="login" placeholder="Login" className="form-input login"/>
                        <label htmlFor="password" className="mt-5 mb-4 font-semibold">Password</label>
                        <input id="password" placeholder="Password" type={"password"} className="form-input password" />
                        <a onClick={(e) => {
                            e.preventDefault();
                            setLoading(!loading);
                        }} className="w-full h-14 p-3 rounded-xl overflow-hidden relative shadow-sm bg-black text-white text-center mt-6 font-semibold cursor-pointer">
                            <p className={`absolute left-0 transition-all right-0  ${ !loading ? 'translate-x-0' : 'translate-x-full' }`}>Sign in</p>
                            <Loading className={`absolute transition-all mx-auto ${ loading ? 'translate-x-24' : '-translate-x-16' }`}/>
                        </a>
                        <div className="flex justify-center space-x-1 mt-3">
                            <p className="text-gray-600">Don't have an account?</p>
                            <a href="#" onClick={(e)=>{
                                e.preventDefault();
                            }} className="text-blue-600 font-semibold transition-all hover:text-blue-700">Sign up</a>
                        </div>
                    </div>

                </form>
            </div>
        </>
    )
}

export default Auth;
