"use client"
import Image from "next/image";
import MainMenu from "./MainMenu";
import Link from "next/link";
import useSidebarMenu from "@/hooks/useSidebarMenu";
import useSubMenuToggle from "@/hooks/useSubMenuToggle";
import HeaderCart from "./HeaderCart";
import useStickyMenu from "@/hooks/useStickyMenu";

interface DataType {
    logoWhite?: boolean
}

const HeaderV7 = ({ logoWhite }: DataType) => {

    const { toggleSubMenu, isMenuOpen, getMenuStyle } = useSubMenuToggle();
    const { isOpen, openMenu, closeMenu } = useSidebarMenu();
    const isMenuSticky = useStickyMenu();

    return (
        <>
            <header>
                <nav className={`navbar mobile-sidenav navbar-sticky navbar-default validnavs ${isMenuSticky ? "sticked" : ""}`}>
                    <div className="container d-flex justify-content-between align-items-center">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu" onClick={openMenu}>
                                <i className="fa fa-bars" />
                            </button>

                            <Link className="navbar-brand" href="/">
                                {logoWhite ?
                                    <Image src="/assets/img/logo-light.png" width={675} height={332} className="logo" alt="Logo" /> :
                                    <Image src="/assets/img/logo-2.png" width={675} height={332} className="logo" alt="Logo" />
                                }
                            </Link>
                        </div>

                        <div className={`collapse navbar-collapse collapse-mobile ${isOpen ? "show" : ""}`} id="navbar-menu">
                            <Image src="/assets/img/logo-2.png" width={675} height={332} className="logo" alt="Logo" />
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu" onClick={closeMenu}>
                                <i className="fa fa-times" />
                            </button>

                            <MainMenu
                                navbarPlacement="navbar-right"
                                isOpen={isOpen}
                                closeMenu={closeMenu}
                                toggleSubMenu={toggleSubMenu}
                                isMenuOpen={isMenuOpen}
                                getMenuStyle={getMenuStyle}
                            />

                        </div>

                        {/* Header Right */}
                        <div className="attr-right">
                            <div className="attr-nav attr-box">
                                <ul>
                                    <HeaderCart />
                                    <li className="button"><Link href="/contact">Reservation</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={`overlay-screen ${isOpen ? "opened" : ""}`} onClick={closeMenu}></div>
                </nav>
            </header>
        </>
    );
};

export default HeaderV7;