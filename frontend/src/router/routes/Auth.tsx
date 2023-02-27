import React, { FormEvent } from "react";

const Auth = () => {
    return (
        <>
            <div className="flex shadow-sm rounded-sm justify-center items-center mb-2">
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
