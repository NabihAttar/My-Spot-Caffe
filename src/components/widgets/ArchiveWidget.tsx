import Link from 'next/link';

const ArchiveWidget = () => {
    return (
        <>
            <div className="sidebar-item archives">
                <h4 className="title">Archives</h4>
                <div className="sidebar-info">
                    <ul>
                        <li><Link href="#">Aug 2023</Link></li>
                        <li><Link href="#">Sept 2023</Link></li>
                        <li><Link href="#">Nov 2023</Link></li>
                        <li><Link href="#">Dec 2023</Link></li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default ArchiveWidget;