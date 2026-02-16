import SummaryCard from "../../components/dashboard/SummaryCard";
import RecentBookingTable from "../../components/dashboard/RecentBookingTable";
import { useDashboard } from "../../hooks/useDashboard";
import "./Home.css"

const Home = () => {
    const { data, loading, error } = useDashboard();

    if (loading) {
        return (
            <div className="loading-container">
                <div>Loading dashboard...</div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="error-container">
                {error ?? "Terjadi kesalahan."}
            </div>
        );
    }

    return (
        <div className="home-container">
            {/* Animated particles */}
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>

            <div className="content-wrapper">
                <h1 className="home-title">Dashboard</h1>

                <div className="summary-container">
                    <SummaryCard title="Total Rooms" value={data.totalRooms} />
                    <SummaryCard title="Total Bookings" value={data.totalBookings} />
                    <SummaryCard title="Pending" value={data.pending} />
                    <SummaryCard title="Approved" value={data.approved} />
                    <SummaryCard title="Rejected" value={data.rejected} />
                </div>

                <div className="recent-bookings-container">
                    <RecentBookingTable bookings={data.recentBookings} />
                </div>
            </div>
        </div>
    );
};

export default Home;