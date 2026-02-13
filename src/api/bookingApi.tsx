import api from "./axios"

export const getBookings = async () => {
    const res = await api.get("/bookings")
    return res.data
}

export const createBooking = async (data: any) => {
    const res = await api.post("/bookings", data)
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
