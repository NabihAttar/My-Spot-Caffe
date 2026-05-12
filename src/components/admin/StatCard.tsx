interface Props {
    icon: string;
    label: string;
    value: string | number;
    variant?: "primary" | "accent" | "success" | "danger" | "info" | "warning";
}

const StatCard = ({ icon, label, value, variant = "primary" }: Props) => (
    <div className="stat-card">
        <div className={`stat-card__icon stat-card__icon--${variant}`}>
            <i className={icon} aria-hidden />
        </div>
        <div>
            <p className="stat-card__value">{value}</p>
            <p className="stat-card__label">{label}</p>
        </div>
    </div>
);

export default StatCard;
