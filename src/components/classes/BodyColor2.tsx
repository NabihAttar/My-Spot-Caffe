"use client"
import { useEffect } from 'react';

const BodyColor2 = () => {

    useEffect(() => {
        document.body.classList.add('color-style-two');

        return () => {
            document.body.classList.remove('color-style-two');
        };
    }, []);

    return (
        <>

        </>
    );
};

export default BodyColor2;