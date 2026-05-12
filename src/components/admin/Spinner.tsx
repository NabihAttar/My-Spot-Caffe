interface Props {
    large?: boolean;
    center?: boolean;
}

const Spinner = ({ large, center }: Props) => {
    const cls = `admin-spinner${large ? " admin-spinner--lg" : ""}`;
    if (center) {
        return (
            <div className="admin-spinner--center">
                <span className={cls} role="status" aria-label="Loading" />
            </div>
        );
    }
    return <span className={cls} role="status" aria-label="Loading" />;
};

export default Spinner;
