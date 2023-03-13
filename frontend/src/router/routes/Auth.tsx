import React, { FormEvent, useState } from "react";

const Auth = () => {
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
                        <a className="w-full p-3 rounded-xl shadow-sm bg-black text-white text-center mt-6 font-semibold cursor-pointer">Sign in</a>
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
