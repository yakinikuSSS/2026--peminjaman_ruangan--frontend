import axios from "./axios";

export interface HistoryBooking {
    id: number;
    borrowerName: string;
    purpose: string;
    startTime: string;
    endTime: string;
    status: number;
    room: {
        name: string;
        code: string;
    };
}

export interface HistoryQueryParams {
    search?: string;
    status?: number;
    startDate?: string;
    endDate?: string;
    sortBy?: string;
    desc?: boolean;
}

export const getBookingHistory = async (
    params: HistoryQueryParams
): Promise<HistoryBooking[]> => {
    const response = await axios.get("/bookings/history", { params });
    return response.data;
};
