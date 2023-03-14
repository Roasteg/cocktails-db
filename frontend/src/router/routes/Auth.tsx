import React, { FormEvent, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import Loading from "../../components/Loading";
import { AppDispatch } from "../../redux/store";
import { createNotification } from "../../redux/reducers/notification.reducer";

const Auth = () => {
    const [loading, setLoading] = useState(false);
    const [login, setLogin] = useState(true);
    const password = useRef<HTMLInputElement>(null);
    const confirmPassword = useRef<HTMLInputElement>(null);

    const dispatch: AppDispatch = useDispatch();

    const checkMatchingPasswords= (): boolean => {
        if(password.current?.value !== confirmPassword.current?.value){
            dispatch(createNotification({text: "Passwords do not match!", type: "error", timeout: 3000}));
            return false;
        }
        return true;
    }

    return (
        <>
            <div className="flex h-screen">
                <form className="m-auto lg:w-3/6 transition-all shadow-md rounded-lg justify-center items-center p-10" action="" onSubmit={(e: FormEvent) => {
                    e.preventDefault();
                }}>
                    {login &&
                        <div className="flex flex-col transition-all ">
                            <label htmlFor="login" className="mb-4 font-semibold">Login</label>
                            <input id="login" placeholder="Login" className="form-input login" />
                            <label htmlFor="password" className="mt-5 mb-4 font-semibold">Password</label>
                            <input id="password" placeholder="Password" type={"password"} className="form-input password" />
                            <a onClick={(e) => {
                                e.preventDefault();
                                setLoading(!loading);
                                dispatch(createNotification({text: "Test",timeout: 3000, type: "success"}));
                            }} className="w-full h-14 p-3 rounded-xl overflow-hidden relative shadow-sm bg-black text-white text-center mt-6 font-semibold cursor-pointer">
                                <p className={`absolute left-0 transition-all right-0  ${!loading ? 'opacity-100' : 'opacity-0'}`}>Sign in</p>
                                <Loading className={`absolute transition-all left-0 w-full ${loading ? 'opacity-100' : 'opacity-0'}`} />
                            </a>
                            <div className="flex justify-center space-x-1 mt-3">
                                <p className="text-gray-600">Don't have an account?</p>
                                <a href="#" onClick={(e) => {
                                    e.preventDefault();
                                    setLogin(false);
                                }} className="text-blue-600 font-semibold transition-all hover:text-blue-700">Sign up</a>
                            </div>
                        </div>
                    }
                    {!login && 
                    <div className="flex flex-col transition-all ">
                            <label htmlFor="login" className="mb-4 font-semibold">Login</label>
                            <input id="login" placeholder="Login" className="form-input login" />
                            <label htmlFor="password" className="mt-5 mb-4 font-semibold">Password</label>
                            <input id="password" ref={password} placeholder="Password" type={"password"} className="form-input password" />
                            <input id="password" ref={confirmPassword} placeholder="Confirm password" type={"password"} className="form-input password" />
                            <a onClick={(e) => {
                                e.preventDefault();
                                setLoading(!loading);
                                checkMatchingPasswords();
                            }} className="w-full h-14 p-3 rounded-xl overflow-hidden relative shadow-sm bg-black text-white text-center mt-6 font-semibold cursor-pointer">
                                <p className={`absolute left-0 transition-all right-0  ${!loading ? 'opacity-100' : 'opacity-0'}`}>Create account</p>
                                <Loading className={`absolute transition-all left-0 w-full ${loading ? 'opacity-100' : 'opacity-0'}`} />
                            </a>
                            <div className="flex justify-center space-x-1 mt-3">
                                <p className="text-gray-600">Already a member?</p>
                                <a href="#" onClick={(e) => {
                                    e.preventDefault();
                                    setLogin(true);
                                }} className="text-blue-600 font-semibold transition-all hover:text-blue-700">Sign in</a>
                            </div>
                        </div>
                    }
                </form>
            </div>
        </>
    )
}

export default Auth;
