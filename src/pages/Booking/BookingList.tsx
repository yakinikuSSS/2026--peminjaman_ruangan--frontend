import { useEffect, useState } from "react";
import { getBookings, changeStatus, deleteBooking } from "../../api/bookingApi";
import { Link } from "react-router-dom";
import "./BookingList.css";

const BookingStatus = {
    Pending: 0,
    Approved: 1,
    Rejected: 2,
    Completed: 3,
    Cancelled: 4,
} as const;

type BookingStatus = typeof BookingStatus[keyof typeof BookingStatus];

interface Booking {
    id: number;
    borrowerName: string;
    purpose: string;
    startTime: string;
    endTime: string;
    status: BookingStatus;
    room: {
        name: string;
        code: string;
    };
}

const BookingList = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        try {
            const data = await getBookings();
            setBookings(data);
        } catch (err) {
            alert("Gagal mengambil data booking.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleApprove = async (id: number) => {
        try {
            await changeStatus(id, BookingStatus.Approved);
            alert("Booking berhasil diapprove.");
            fetchBookings();
        } catch (err: any) {
            alert(err.response?.data || "Gagal approve booking.");
        }
    };

    const handleReject = async (id: number) => {
        try {
            await changeStatus(id, BookingStatus.Rejected);
            alert("Booking berhasil direject.");
            fetchBookings();
        } catch (err: any) {
            alert(err.response?.data || "Gagal reject booking.");
        }
    };

    const handleComplete = async (id: number) => {
        try {
            await changeStatus(id, BookingStatus.Completed);
            alert("Booking berhasil diselesaikan.");
            fetchBookings();
        } catch (err: any) {
            alert(err.response?.data || "Gagal menyelesaikan booking.");
        }
    };

    const handleCancel = async (id: number) => {
        try {
            await changeStatus(id, BookingStatus.Cancelled);
            alert("Booking berhasil dibatalkan.");
            fetchBookings();
        } catch (err: any) {
            alert(err.response?.data || "Gagal membatalkan booking.");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Yakin ingin menghapus booking?")) return;

        try {
            await deleteBooking(id);
            fetchBookings();
        } catch {
            alert("Gagal menghapus booking.");
        }
    };

    const getStatusLabel = (status: BookingStatus) => {
        switch (status) {
            case BookingStatus.Pending:
                return "Pending";
            case BookingStatus.Approved:
                return "Approved";
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

    const getStatusClass = (status: BookingStatus) => {
        switch (status) {
            case BookingStatus.Pending:
                return "pending";
            case BookingStatus.Approved:
                return "approved";
            case BookingStatus.Rejected:
                return "rejected";
            case BookingStatus.Completed:
                return "completed";
            case BookingStatus.Cancelled:
                return "cancelled";
            default:
                return "";
        }
    };

    if (loading) {
        return (
            <div className="loading-booking">
                <div>Loading...</div>
            </div>
        );
    }

    return (
        <div className="booking-page-container">
            <div className="booking-particle"></div>
            <div className="booking-particle"></div>
            <div className="booking-particle"></div>
            <div className="booking-particle"></div>
            <div className="booking-particle"></div>

            <div className="booking-content-wrapper">
                <div className="booking-container">
                    <h1>Daftar Booking</h1>

                    <Link to="/bookings/create" className="btn-add">
                        + Tambah Booking
                    </Link>

                    <table className="booking-table">
                        <thead>
                            <tr>
                                <th>Nama</th>
                                <th>Ruangan</th>
                                <th>Waktu</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {bookings.map((b) => (
                                <tr key={b.id}>
                                    <td>{b.borrowerName}</td>
                                    <td>{b.room.name}</td>
                                    <td>
                                        {new Date(b.startTime).toLocaleString()} <br />
                                        {new Date(b.endTime).toLocaleString()}
                                    </td>

                                    <td className="table-status">
                                        <span className={`status ${getStatusClass(b.status)}`}>
                                            {getStatusLabel(b.status)}
                                        </span>
                                    </td>

                                    <td>
                                        <div className="action-container">
                                            <div className="action-row">
                                                <Link to={`/bookings/${b.id}`} className="btn-action btn-info" title="Detail">
                                                    📄
                                                </Link>

                                                <Link to={`/bookings/edit/${b.id}`} className="btn-action btn-warning" title="Edit">
                                                    ✏️
                                                </Link>

                                                <button 
                                                    className="btn-action btn-danger" 
                                                    onClick={() => handleDelete(b.id)}
                                                    title="Delete"
                                                >
                                                    🗑️
                                                </button>
                                            </div>

                                            {b.status === BookingStatus.Pending && (
                                                <div className="action-row">
                                                    <button
                                                        className="btn-action btn-success"
                                                        onClick={() => handleApprove(b.id)}
                                                        title="Approve"
                                                    >
                                                        ✓ Approve
                                                    </button>

                                                    <button
                                                        className="btn-action btn-reject"
                                                        onClick={() => handleReject(b.id)}
                                                        title="Reject"
                                                    >
                                                        ✗ Reject
                                                    </button>
                                                </div>
                                            )}

                                            {b.status === BookingStatus.Approved && (
                                                <div className="action-row">
                                                    <button
                                                        className="btn-action btn-complete"
                                                        onClick={() => handleComplete(b.id)}
                                                        title="Complete"
                                                    >
                                                        ✓ Complete
                                                    </button>

                                                    <button
                                                        className="btn-action btn-cancel"
                                                        onClick={() => handleCancel(b.id)}
                                                        title="Cancel"
                                                    >
                                                        ✗ Cancel
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BookingList;