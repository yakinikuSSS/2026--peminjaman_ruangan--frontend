import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home/Home";
import RoomList from "../pages/Room/RoomList";
import BookingList from "../pages/Booking/BookingList";
import BookingForm from "../pages/Booking/BookingForm";
import BookingDetail from "../pages/Booking/BookingDetail";
import HistoryPage from "../pages/History/HistoryPage";

const AppRoutes = () => {
    return (
        <Routes>
        <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<RoomList />} />
            <Route path="/bookings" element={<BookingList />} />
            <Route path="/bookings/create" element={<BookingForm />} />
            <Route path="/bookings/edit/:id" element={<BookingForm />} />
            <Route path="/bookings/:id" element={<BookingDetail />} />
            <Route path="/history" element={<HistoryPage />} />
        </Route>
        </Routes>
    );
};

export default AppRoutes;
