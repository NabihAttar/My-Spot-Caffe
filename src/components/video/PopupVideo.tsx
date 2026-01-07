"use client"
import Link from 'next/link';
import { useState } from 'react';
import ModalVideo from 'react-modal-video';

interface PopupVideoProps {
    videoClass: string;
    children: React.ReactNode;
    videoId: string;
}

const PopupVideo = ({ videoClass, children, videoId }: PopupVideoProps) => {
    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <ModalVideo channel='youtube' isOpen={isOpen} videoId={videoId} onClose={() => setOpen(false)} />

            <Link className={`${videoClass}`} onClick={() => setOpen(true)} href="#" scroll={false}>
                {children}
            </Link>
        </>
    );
};

export default PopupVideo;