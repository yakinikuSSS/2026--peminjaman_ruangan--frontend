import "./SummaryCard.css";

interface Props {
    title: string;
    value: number;
}

const SummaryCard = ({ title, value }: Props) => {
    return (
        <div className="summary-card">
        <h4>{title}</h4>
        <h2>{value}</h2>
        </div>
    );
};

export default SummaryCard;
