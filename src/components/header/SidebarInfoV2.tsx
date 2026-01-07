"use client"
import Link from 'next/link';
import { toast } from 'react-toastify';
import SocialShare from '../social/SocialShare';
import Image from 'next/image';

interface FormEventHandler {
    (event: React.FormEvent<HTMLFormElement>): void;
}

interface DataType {
    isInfoOpen: boolean;
    closeInfoBar: () => void;
}

const SidebarInfoV2 = ({ closeInfoBar, isInfoOpen }: DataType) => {

    const handleSubscribe: FormEventHandler = (event) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement;
        form.reset()
        toast.success("Thanks For Subscribe!")
    }

    return (
        <>
            <div className={`side ${isInfoOpen ? "on" : ""}`}>
                <Link href="#" className="close-side" onClick={closeInfoBar}><i className="fas fa-times"></i></Link>
                <div className="widget">
                    <div className="logo">
                        <Image src="/assets/img/logo-ligh-solid.png" width={612} height={222} alt="Logo" />
                    </div>
                    <p>
                        Arrived compass prepare an on as. Reasonable particular on my it in sympathize. Size now easy eat hand how. Unwilling he departure elsewhere dejection at. Heart large seems may purse means few blind.
                    </p>
                </div>
                <div className="widget address">
                    <div>
                        <ul>
                            <li>
                                <div className="content">
                                    <p>Address</p>
                                    <strong>California, TX 70240</strong>
                                </div>
                            </li>
                            <li>
                                <div className="content">
                                    <p>Email</p>
                                    <a href="mailto:support@coderstation.com"><strong>support@coderstation.com</strong></a>
                                </div>
                            </li>
                            <li>
                                <div className="content">
                                    <p>Contact</p>
                                    <a href="tel:+44-20-7328-4499"> <strong>+44-20-7328-4499</strong></a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="widget newsletter">
                    <h4 className="title">Get Subscribed!</h4>
                    <form onSubmit={handleSubscribe}>
                        <div className="input-group stylish-input-group">
                            <input type="email" placeholder="Enter your e-mail" className="form-control" name="email" autoComplete='off' required />
                            <span className="input-group-addon">
                                <button type="submit">
                                    <i className="fas fa-arrow-right"></i>
                                </button>
                            </span>
                        </div>
                    </form>
                </div>
                <div className="widget social">
                    <ul className="link">
                        <SocialShare />
                    </ul>
                </div>
            </div>
        </>
    );
};

export default SidebarInfoV2;