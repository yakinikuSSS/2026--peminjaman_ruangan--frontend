import { useState, useEffect } from "react";
import { useRooms } from "../../hooks/useRooms";
import RoomTable from "../../components/room/RoomTable";
import "./RoomList.css";

const buildings = [
    "SAW",
    "Pasca Sarjana",
    "Gedung D4",
    "Gedung D3",
];

const RoomList = () => {
    const {
        rooms,
        loading,
        error,
        pageNumber,
        totalPages,
        setPageNumber,
        building,
        setBuilding,
    } = useRooms();

    const [pageInput, setPageInput] = useState(pageNumber.toString());

    useEffect(() => {
        setPageInput(pageNumber.toString());
    }, [pageNumber]);

    const handlePageSubmit = () => {
        const number = Number(pageInput);

        if (!isNaN(number) && number >= 1 && number <= totalPages) {
            setPageNumber(number);
        } else {
            setPageInput(pageNumber.toString());
        }
    };

    if (loading) {
        return (
            <div className="loading-room">
                <div>Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-room">
                <div className="error-text">{error}</div>
            </div>
        );
    }

    return (
        <div className="room-page-container">
            {/* Animated particles */}
            <div className="room-particle"></div>
            <div className="room-particle"></div>
            <div className="room-particle"></div>
            <div className="room-particle"></div>
            <div className="room-particle"></div>

            <div className="room-content-wrapper">
                <div className="room-container">
                    <h1>Room List</h1>

                    <div className="filter-container">
                        <label>Filter by Building: </label>
                        <select
                            value={building}
                            onChange={(e) => {
                                setPageNumber(1);
                                setBuilding(e.target.value);
                            }}
                        >
                            <option value="">All</option>
                            {buildings.map((b) => (
                                <option key={b} value={b}>
                                    {b}
                                </option>
                            ))}
                        </select>
                    </div>

                    <RoomTable rooms={rooms} />

                    <div className="pagination">
                        <button
                            disabled={pageNumber === 1}
                            onClick={() => setPageNumber(pageNumber - 1)}
                        >
                            Previous
                        </button>

                        <span>Page</span>

                        <input
                            type="number"
                            min={1}
                            max={totalPages}
                            value={pageInput}
                            onChange={(e) => setPageInput(e.target.value)}
                            onBlur={handlePageSubmit}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handlePageSubmit();
                                }
                            }}
                        />

                        <span>of {totalPages}</span>

                        <button
                            disabled={pageNumber === totalPages}
                            onClick={() => setPageNumber(pageNumber + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomList;