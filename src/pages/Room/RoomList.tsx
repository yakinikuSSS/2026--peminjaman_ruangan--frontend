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

    // Sync input ketika pageNumber berubah
    useEffect(() => {
        setPageInput(pageNumber.toString());
    }, [pageNumber]);

    const handlePageSubmit = () => {
        const number = Number(pageInput);

        if (!isNaN(number) && number >= 1 && number <= totalPages) {
        setPageNumber(number);
        } else {
        // Reset jika invalid
        setPageInput(pageNumber.toString());
        }
    };

    return (
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

        {loading && <p>Loading...</p>}
        {error && <p className="error-text">{error}</p>}

        {!loading && !error && (
            <>
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
            </>
        )}
        </div>
    );
};

export default RoomList;
