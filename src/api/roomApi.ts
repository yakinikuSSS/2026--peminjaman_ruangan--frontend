import axios from "./axios";

export interface Room {
    id: number;
    name: string;
    code: string;
    building: string;
    capacity: number;
    isActive: boolean;
}

export interface RoomResponse {
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    data: Room[];
}

export interface RoomQueryParams {
    search?: string;
    building?: string;
    isActive?: boolean;
    pageNumber?: number;
    pageSize?: number;
}

export const getRooms = async (
    params: RoomQueryParams
): Promise<RoomResponse> => {
    const response = await axios.get("/rooms", { params });
    return response.data;
};
