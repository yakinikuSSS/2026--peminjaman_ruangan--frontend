import { useState } from "react";

interface Props {
    onFilter: (filters: {
        status?: number;
        startDate?: string;
        endDate?: string;
    }) => void;
}

const HistoryFilter = ({ onFilter }: Props) => {
    const [status, setStatus] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleApply = () => {
        onFilter({
            status: status ? Number(status) : undefined,
            startDate: startDate || undefined,
            endDate: endDate || undefined,
        });
    };

    return (
        <div className="history-filter">
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option value="">All Status</option>
                <option value="2">Rejected</option>
                <option value="3">Completed</option>
                <option value="4">Cancelled</option>x
            </select>

            <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />

            <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />

            <button onClick={handleApply}>Apply</button>
        </div>
    );
};

export default HistoryFilter;
