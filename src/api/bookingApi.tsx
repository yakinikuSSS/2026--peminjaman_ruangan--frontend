import api from "./axios"

export interface Booking {
    id: number;
    roomId: number;
    roomName?: string;
    borrowerName: string;
    borrowerPhone: string;
    purpose: string;
    startTime: string;
    endTime: string;
    status: number;
}

export const getBookings = async () => {
    const res = await api.get("/bookings")
    return res.data
}

export const getBookingById = async (id: number) => {
    const res = await api.get(`/bookings/${id}`)
    return res.data
}

export const createBooking = async (data: any) => {
    const res = await api.post("/bookings", data)
    return res.data
}

export const updateBooking = async (id: number, data: any) => {
    const res = await api.put(`/bookings/${id}`, data)
    return res.data
}

export const deleteBooking = async (id: number) => {
    await api.delete(`/bookings/${id}`)
}

export const changeStatus = async (id: number, status: number) => {
    const res = await api.patch(`/bookings/${id}/status`, {
        status,
        userId: 1
    })
    return res.data
}

export const getBookingHistory = async () => {
    const res = await api.get("/bookings/history");
    return res.data;
};

