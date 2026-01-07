"use client"
import { useEffect } from 'react';

const BodyDark2 = () => {

    useEffect(() => {
        document.body.classList.add('bg-dark', 'color-style-two');

        return () => {
            document.body.classList.remove('bg-dark', 'color-style-two');
        };
    }, []);

    return (
        <>

        </>
    );
};

export default BodyDark2;