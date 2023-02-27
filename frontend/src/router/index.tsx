import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

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
