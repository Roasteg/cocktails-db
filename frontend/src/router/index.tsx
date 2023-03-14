import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

import Notification from "../components/Notification";

const Auth = lazy(()=> import("./routes/Auth"));

const routes = [
    {
        path: "/login",
        element: <Auth />
    }
]

const Router = () => {
    return (
        <div className="container mx-auto min-h-screen">
            <Notification />
            <Routes>
                {routes.map((route)=>{
                    return (
                        <Route key={route.path} path={route.path} element={route.element} />
                    )
                })}
            </Routes>
        </div>
    )
}

export default Router;
