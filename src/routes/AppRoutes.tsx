import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home/Home";
import RoomList from "../pages/Room/RoomList";

const AppRoutes = () => {
    return (
        <Routes>
        <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<RoomList />} />
        </Route>
        </Routes>
    );
};

export default AppRoutes;
