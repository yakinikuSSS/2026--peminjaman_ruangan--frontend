import { useState } from "react";

interface Props {
    onSort: (sort: { sortBy?: string; desc?: boolean }) => void;
}

const HistorySort = ({ onSort }: Props) => {
    const [sortBy, setSortBy] = useState("createdAt");
    const [desc, setDesc] = useState(true);

    const handleApply = () => {
        onSort({
            sortBy,
            desc,
        });
    };

    return (
        <div className="history-sort">
            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
            >
                <option value="createdAt">Created At</option>
                <option value="startTime">Start Time</option>
                <option value="status">Status</option>
            </select>

            <select
                value={desc ? "desc" : "asc"}
                onChange={(e) => setDesc(e.target.value === "desc")}
            >
                <option value="desc">Desc</option>
                <option value="asc">Asc</option>
            </select>

            <button onClick={handleApply}>Sort</button>
        </div>
    );
};

export default HistorySort;
