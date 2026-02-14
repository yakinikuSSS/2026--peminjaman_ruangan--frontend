import axios from "./axios";

export interface RecentBooking {
    id: number;
    roomName: string;
    date: string;
    status: string;
}

export interface DashboardSummary {
    totalRooms: number;
    totalBookings: number;
    pending: number;
    approved: number;
    rejected: number;
    recentBookings: RecentBooking[];
}

export const getDashboardSummary = async (): Promise<DashboardSummary> => {
    const response = await axios.get("/dashboard/summary");
    return response.data;
};
