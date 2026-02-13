import SummaryCard from "../../components/dashboard/SummaryCard";
import RecentBookingTable from "../../components/dashboard/RecentBookingTable";
import "./Home.css";

const Home = () => {
    const dummyBookings = [
        { id: 1, roomName: "A101", date: "2026-02-10", status: "Pending" },
        { id: 2, roomName: "B202", date: "2026-02-09", status: "Approved" },
        { id: 3, roomName: "C303", date: "2026-02-08", status: "Rejected" },
    ];

    return (
        <div>
            <h1>INI HOME BARU</h1>
            <h1 className="home-title">Dashboard</h1>

            <div className="summary-container">
                <SummaryCard title="Total Rooms" value={12} />
                <SummaryCard title="Total Bookings" value={35} />
                <SummaryCard title="Pending" value={5} />
                <SummaryCard title="Approved" value={25} />
                <SummaryCard title="Rejected" value={5} />
            </div>

            <RecentBookingTable bookings={dummyBookings} />
        </div>
    );
};

export default Home;
