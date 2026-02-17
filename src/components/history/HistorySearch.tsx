import { useState } from "react";

interface Props {
    onSearch: (value: string) => void;
}

const HistorySearch = ({ onSearch }: Props) => {
    const [keyword, setKeyword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(keyword);
    };

    return (
        <form onSubmit={handleSubmit} className="history-search">
            <input
                type="text"
                placeholder="Cari nama, ruangan, kode, tujuan..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default HistorySearch;
