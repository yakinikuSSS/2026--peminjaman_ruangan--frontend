import { useEffect, useState } from "react"
import { createBooking, updateBooking, getBookingById } from "../../api/bookingApi"
import { getRooms } from "../../api/roomApi";
import type { Room } from "../../api/roomApi";
import { useNavigate, useParams } from "react-router-dom"
import "./BookingForm.css"

const BookingForm = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [rooms, setRooms] = useState<Room[]>([])

    const [form, setForm] = useState({
        roomId: "",
        borrowerName: "",
        borrowerPhone: "",
        purpose: "",
        startTime: "",
        endTime: "",
    })

    const [errors, setErrors] = useState<Record<string, string>>({})

    useEffect(() => {
        fetchRooms()

        if (id) {
            getBookingById(Number(id)).then((data) => {
                setForm({
                    roomId: data.roomId,
                    borrowerName: data.borrowerName,
                    borrowerPhone: data.borrowerPhone,
                    purpose: data.purpose,
                    startTime: data.startTime.slice(0, 16),
                    endTime: data.endTime.slice(0, 16),
                })
            })
        }
    }, [id])

    const fetchRooms = async () => {
        const result = await getRooms({ pageSize: 1000 });
        setRooms(result.data);
    };

    const validate = () => {
        const newErrors: Record<string, string> = {}

        if (!form.roomId) newErrors.roomId = "Ruangan wajib dipilih"
        if (!form.borrowerName.trim()) newErrors.borrowerName = "Nama wajib diisi"
        if (!form.borrowerPhone.trim()) newErrors.borrowerPhone = "No HP wajib diisi"
        if (!form.purpose.trim()) newErrors.purpose = "Tujuan wajib diisi"
        if (!form.startTime) newErrors.startTime = "Waktu mulai wajib diisi"
        if (!form.endTime) newErrors.endTime = "Waktu selesai wajib diisi"

        if (form.startTime && form.endTime) {
            if (new Date(form.startTime) >= new Date(form.endTime)) {
                newErrors.endTime = "Waktu selesai harus setelah waktu mulai"
            }
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validate()) return

        const payload = {
            ...form,
            roomId: Number(form.roomId),
        }

        try {
            if (id) {
                await updateBooking(Number(id), payload)
            } else {
                await createBooking(payload)
            }

            alert("Booking berhasil disimpan.")
            navigate("/bookings")

        } catch (err: any) {
            console.log("Error dari backend:", err.response?.data)
            alert(err.response?.data || "Terjadi kesalahan.")
        }
    }


    return (
        <div className="form-page-container">
            {/* Animated particles */}
            <div className="form-particle"></div>
            <div className="form-particle"></div>
            <div className="form-particle"></div>
            <div className="form-particle"></div>
            <div className="form-particle"></div>

            <div className="form-content-wrapper">
                <div className="booking-form-wrapper">
                    <div className="booking-form-card">
                        <h1>{id ? "Edit Booking" : "Tambah Booking"}</h1>
                        <button type="button" className="btn-back" onClick={() => navigate(-1)}>
                            ← Kembali
                        </button>
                        <form onSubmit={handleSubmit} className="booking-form">

                            <div className="form-group">
                                <label>Ruangan</label>
                                <select name="roomId" value={form.roomId} onChange={handleChange}>
                                    <option value="">-- Pilih Ruangan --</option>
                                    {rooms.map((room) => (
                                        <option key={room.id} value={room.id}>
                                            {room.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.roomId && <span className="error">{errors.roomId}</span>}
                            </div>

                            <div className="form-group">
                                <label>Nama Peminjam</label>
                                <input name="borrowerName" value={form.borrowerName} onChange={handleChange}/>
                                {errors.borrowerName && <span className="error">{errors.borrowerName}</span>}
                            </div>

                            <div className="form-group">
                                <label>No HP</label>
                                <input name="borrowerPhone" value={form.borrowerPhone} onChange={handleChange}/>
                                {errors.borrowerPhone && <span className="error">{errors.borrowerPhone}</span>}
                            </div>

                            <div className="form-group">
                                <label>Tujuan</label>
                                <input name="purpose" value={form.purpose} onChange={handleChange}/>
                                {errors.purpose && <span className="error">{errors.purpose}</span>}
                            </div>

                            <div className="form-group">
                                <label>Waktu Mulai</label>
                                <input type="datetime-local" name="startTime" value={form.startTime} onChange={handleChange}/>
                                {errors.startTime && <span className="error">{errors.startTime}</span>}
                            </div>

                            <div className="form-group">
                                <label>Waktu Selesai</label>
                                <input type="datetime-local" name="endTime" value={form.endTime} onChange={handleChange}/>
                                {errors.endTime && <span className="error">{errors.endTime}</span>}
                            </div>

                            <div className="form-actions">
                                <button type="submit">Simpan</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingForm