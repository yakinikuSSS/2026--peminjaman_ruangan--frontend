import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import "./MainLayout.css";

const MainLayout = () => {
    return (
        <>
        <Navbar />
        <div className="main-container">
            <Outlet />
        </div>
        </>
    );
};

export default MainLayout;
