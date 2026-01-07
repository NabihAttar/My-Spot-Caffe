import Counter from '../counter/Counter';

interface DataType {
    title: string;
    end: number;
    operator: string;
}

const SingleFact = ({ fact }: { fact: DataType }) => {
    const { title, end, operator } = fact

    return (
        <>
            <div className="fun-fact">
                <div className="counter">
                    <div className="timer">
                        <Counter end={end} />
                    </div>
                    <div className="operator">{operator}</div>
                </div>
                <span className="medium">{title}</span>
            </div>
        </>
    );
};

export default SingleFact;