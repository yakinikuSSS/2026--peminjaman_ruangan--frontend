import { useEffect, useState } from "react";
import type { Room, RoomResponse } from "../api/roomApi";
import { getRooms } from "../api/roomApi";

export const useRooms = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageSize] = useState<number>(10);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [building, setBuilding] = useState<string>("");

    const fetchRooms = async () => {
        try {
        setLoading(true);

        const result: RoomResponse = await getRooms({
            building: building || undefined,
            pageNumber,
            pageSize,
        });

        setRooms(result.data);
        setTotalPages(result.totalPages);
        } catch (err) {
        console.error(err);
        setError("Gagal memuat data ruangan.");
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, [pageNumber, building]);

    return {
        rooms,
        loading,
        error,
        pageNumber,
        totalPages,
        setPageNumber,
        building,
        setBuilding,
    };
};
