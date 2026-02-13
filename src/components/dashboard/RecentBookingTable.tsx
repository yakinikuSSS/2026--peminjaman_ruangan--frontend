import "./RecentBookingTable.css";

interface Booking {
    id: number;
    roomName: string;
    date: string;
    status: string;
}

interface Props {
    bookings: Booking[];
}

const RecentBookingTable = ({ bookings }: Props) => {
    return (
        <div className="table-container">
        <h3>Recent Bookings</h3>
        <table>
            <thead>
            <tr>
                <th>Room</th>
                <th>Date</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {bookings.map((b) => (
                <tr key={b.id}>
                <td>{b.roomName}</td>
                <td>{b.date}</td>
                <td>{b.status}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default RecentBookingTable;
