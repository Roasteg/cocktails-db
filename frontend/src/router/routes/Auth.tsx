import React, { FormEvent } from "react";

const Auth = () => {
    return (
        <>
            <div className="flex justify-center items-center ">
                <form className="mt-auto" action="" onSubmit={(e: FormEvent)=>{
                    e.preventDefault();
                }}>
                    <input placeholder="Text"/>
                </form>
            </div>
        </>
    )
}

export default Auth;