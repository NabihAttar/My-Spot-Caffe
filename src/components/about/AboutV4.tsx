"use client"
import Image from "next/image";
import Counter from "../counter/Counter";
import AboutV4Data from "@/assets/jsonData/about/AboutV4Data.json";
import AboutV4List from "./AboutV4List";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const AboutV4 = () => {

    const animateRef = useScrollAnimation();

    return (
        <>
            <div className="about-style-four-area default-padding">
                <div className="shape">
                    <Image src="/assets/img/shape/23.png" alt="Image Not Found" width={546} height={607} />
                </div>
                <div className="upDownScrol animate-up-down" ref={animateRef}>
                    <Image src="/assets/img/illustration/22.png" alt="Image Not Found" width={210} height={300} />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <div className="site-heading text-center">
                                <h4 className="sub-title">About Us</h4>
                                <h2 className="title">The best burgers offer a combination of tastes.</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-7">
                            <div className="about-four-thumb">
                                <div className="left">
                                    <Image src="/assets/img/thumb/11.jpg" alt="Image Not Found" width={600} height={773} />
                                </div>
                                <div className="right">
                                    <div className="fun-fact">
                                        <div className="counter">
                                            <div className="timer">
                                                <Counter end={18} />
                                            </div>
                                            <div className="operator">+</div>
                                        </div>
                                        <span className="medium">Types of burger</span>
                                    </div>
                                    <Image src="/assets/img/thumb/10.jpg" alt="Image Not Found" width={600} height={580} />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-5 pl-60 pl-md-15 pl-xs-15">
                            <div className="about-four-info">
                                <p>
                                    New had happen unable uneasy. Drawings can followed improved out sociable not. Earnestly so do instantly pretended. See general few civilly amiable pleased account carried. Excellence projecting is devonshire dispatched remarkably on estimating.
                                </p>
                                <ul className="list-style-one mt-40">
                                    {AboutV4Data.map(list =>
                                        <AboutV4List key={list.id} list={list} />
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutV4;