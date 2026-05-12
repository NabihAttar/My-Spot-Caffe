interface Props {
    icon?: string;
    title: string;
    description?: string;
    action?: React.ReactNode;
}

const EmptyState = ({ icon = "fas fa-inbox", title, description, action }: Props) => (
    <div className="admin-empty">
        <div className="admin-empty__icon">
            <i className={icon} aria-hidden />
        </div>
        <h3 className="admin-empty__title">{title}</h3>
        {description && <p className="admin-empty__desc">{description}</p>}
        {action}
    </div>
);

export default EmptyState;
