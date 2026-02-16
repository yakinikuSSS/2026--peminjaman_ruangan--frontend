import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookingById } from "../../api/bookingApi";
import "./BookingDetail.css";

interface BookingDetailType {
    id: number;
    borrowerName: string;
    borrowerPhone: string;
    purpose: string;
    startTime: string;
    endTime: string;
    status: number;
    createdAt: string;
    room: {
        id: number;
        name: string;
        code: string;
        building: string;
        capacity: number;
    };
}

const BookingDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState<BookingDetailType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        getBookingById(Number(id))
            .then((data) => setBooking(data))
            .catch(() => alert("Gagal mengambil detail booking."))
            .finally(() => setLoading(false));
    }, [id]);

    const getStatusLabel = (status: number) => {
        switch (status) {
            case 0:
                return "Pending";
            case 1:
                return "Approved";
            case 2:
                return "Rejected";
            default:
                return "Unknown";
        }
    };

    if (loading) {
        return (
            <div className="loading-detail">
                <div>Loading...</div>
            </div>
        );
    }

    if (!booking) {
        return (
            <div className="not-found-detail">
                <div>Data tidak ditemukan.</div>
            </div>
        );
    }

    return (
        <div className="detail-page-container">
            {/* Animated particles */}
            <div className="detail-particle"></div>
            <div className="detail-particle"></div>
            <div className="detail-particle"></div>
            <div className="detail-particle"></div>
            <div className="detail-particle"></div>

            <div className="detail-content-wrapper">
                <div className="detail-container">
                    <h1>Detail Booking</h1>

                    <div className="detail-card">
                        <div className="detail-section">
                            <h3>Informasi Peminjam</h3>
                            <p><strong>Nama:</strong> {booking.borrowerName}</p>
                            <p><strong>No HP:</strong> {booking.borrowerPhone}</p>
                            <p><strong>Tujuan:</strong> {booking.purpose}</p>
                        </div>

                        <div className="detail-section">
                            <h3>Informasi Ruangan</h3>
                            <p><strong>Nama:</strong> {booking.room.name}</p>
                            <p><strong>Kode:</strong> {booking.room.code}</p>
                            <p><strong>Gedung:</strong> {booking.room.building}</p>
                            <p><strong>Kapasitas:</strong> {booking.room.capacity}</p>
                        </div>

                        <div className="detail-section">
                            <h3>Waktu</h3>
                            <p>
                                <strong>Mulai:</strong>{" "}
                                {new Date(booking.startTime).toLocaleString()}
                            </p>
                            <p>
                                <strong>Selesai:</strong>{" "}
                                {new Date(booking.endTime).toLocaleString()}
                            </p>
                            <p>
                                <strong>Status:</strong>{" "}
                                {getStatusLabel(booking.status)}
                            </p>
                        </div>
                    </div>

                    <button className="btn-back" onClick={() => navigate("/bookings")}>
                        Kembali
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingDetail;