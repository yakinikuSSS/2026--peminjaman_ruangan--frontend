import SummaryCard from "../../components/dashboard/SummaryCard";
import RecentBookingTable from "../../components/dashboard/RecentBookingTable";
import { useDashboard } from "../../hooks/useDashboard";
import "./Home.css"

const Home = () => {
    const { data, loading, error } = useDashboard();

    if (loading) {
        return <div style={{ padding: "20px" }}>Loading dashboard...</div>;
    }

    if (error || !data) {
        return (
        <div style={{ padding: "20px", color: "red" }}>
            {error ?? "Terjadi kesalahan."}
        </div>
        );
    }

    return (
        <div style={{ padding: "20px" }}>
        <h1>Dashboard</h1>

        <div
            style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginTop: "20px",
            }}
        >
            <SummaryCard title="Total Rooms" value={data.totalRooms} />
            <SummaryCard title="Total Bookings" value={data.totalBookings} />
            <SummaryCard title="Pending" value={data.pending} />
            <SummaryCard title="Approved" value={data.approved} />
            <SummaryCard title="Rejected" value={data.rejected} />
        </div>

        <div style={{ marginTop: "40px" }}>
            <RecentBookingTable bookings={data.recentBookings} />
        </div>
        </div>
    );
};

export default Home;
