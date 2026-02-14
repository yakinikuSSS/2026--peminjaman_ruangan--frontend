import type { Room } from "../../api/roomApi";
import "./RoomTable.css";

interface Props {
    rooms: Room[];
}

const RoomTable = ({ rooms }: Props) => {
    return (
        <table className="room-table">
        <thead>
            <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Building</th>
            <th>Capacity</th>
            <th>Status</th>
            </tr>
        </thead>
        <tbody>
            {rooms.map((room) => (
            <tr key={room.id}>
                <td>{room.name}</td>
                <td>{room.code}</td>
                <td>{room.building}</td>
                <td>{room.capacity}</td>
                <td>{room.isActive ? "Active" : "Inactive"}</td>
            </tr>
            ))}
        </tbody>
        </table>
    );
};

export default RoomTable;
