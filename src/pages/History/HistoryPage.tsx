import { useEffect, useState } from "react";
import { getBookingHistory } from "../../api/historyApi";
import type { HistoryBooking } from "../../api/historyApi";
import HistorySearch from "../../components/history/HistorySearch";
import HistoryFilter from "../../components/history/HistoryFilter";
import HistorySort from "../../components/history/HistorySort";
import "./HistoryPage.css";

const BookingStatus = {
    Rejected: 2,
    Completed: 3,
    Cancelled: 4,
} as const;

type BookingStatus =
    typeof BookingStatus[keyof typeof BookingStatus];

const HistoryPage = () => {
    const [data, setData] = useState<HistoryBooking[]>([]);
    const [loading, setLoading] = useState(true);

    // 🔥 SATU STATE UNTUK SEMUA QUERY
    const [query, setQuery] = useState({
        search: "",
        status: undefined as number | undefined,
        startDate: undefined as string | undefined,
        endDate: undefined as string | undefined,
        sortBy: "createdAt",
        desc: true,
    });

    // 🔥 FETCH SELALU MENGGUNAKAN QUERY TERBARU
    const fetchHistory = async () => {
        try {
            const result = await getBookingHistory(query);
            setData(result);
        } catch {
            alert("Gagal mengambil data history.");
        } finally {
            setLoading(false);
        }
    };

    // 🔥 AUTO FETCH SETIAP QUERY BERUBAH
    useEffect(() => {
        setLoading(true);
        fetchHistory();
    }, [query]);

    // 🔎 HANDLE SEARCH
    const handleSearch = (value: string) => {
        setQuery((prev) => ({
            ...prev,
            search: value,
        }));
    };

    // 🎯 HANDLE FILTER
    const handleFilter = (newFilters: any) => {
        setQuery((prev) => ({
            ...prev,
            ...newFilters,
        }));
    };

    // 🔀 HANDLE SORT
    const handleSort = (newSort: any) => {
        setQuery((prev) => ({
            ...prev,
            ...newSort,
        }));
    };

    const getStatusLabel = (status: number) => {
        switch (status) {
            case BookingStatus.Rejected:
                return "Rejected";
            case BookingStatus.Completed:
                return "Completed";
            case BookingStatus.Cancelled:
                return "Cancelled";
            default:
                return "Unknown";
        }
    };

    if (loading) {
        return (
            <div className="loading-history">
                <div>Loading...</div>
            </div>
        );
    }

    return (
        <div className="history-page-container">
            <div className="history-particle"></div>
            <div className="history-particle"></div>
            <div className="history-particle"></div>
            <div className="history-particle"></div>
            <div className="history-particle"></div>

            <div className="history-content-wrapper">
                <div className="history-container">
                    <h1>Riwayat Peminjaman</h1>

                    <HistorySearch onSearch={handleSearch} />
                    <HistoryFilter onFilter={handleFilter} />
                    <HistorySort onSort={handleSort} />

                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>Nama</th>
                                <th>Ruangan</th>
                                <th>Waktu</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((b) => (
                                <tr key={b.id}>
                                    <td>{b.borrowerName}</td>
                                    <td>
                                        {b.room.name} ({b.room.code})
                                    </td>
                                    <td>
                                        {new Date(b.startTime).toLocaleString()}
                                        <br />
                                        {new Date(b.endTime).toLocaleString()}
                                    </td>
                                    <td>{getStatusLabel(b.status)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {data.length === 0 && (
                        <div className="empty-history">
                            Tidak ada data ditemukan.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HistoryPage;
