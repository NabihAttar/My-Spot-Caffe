"use client"
import MainMenu from './MainMenu';
import useSubMenuToggle from '@/hooks/useSubMenuToggle';
import useSidebarMenu from '@/hooks/useSidebarMenu';
import useSidebarInfo from '@/hooks/useSidebarInfo';
import Link from 'next/link';
import Image from 'next/image';
import HeaderCart from './HeaderCart';
import useStickyMenu from '@/hooks/useStickyMenu';
import SidebarInfoV2 from './SidebarInfoV2';

const HeaderV5 = () => {

    const { toggleSubMenu, isMenuOpen, getMenuStyle } = useSubMenuToggle();
    const { isOpen, openMenu, closeMenu } = useSidebarMenu();
    const { isInfoOpen, openInfoBar, closeInfoBar } = useSidebarInfo();
    const isMenuSticky = useStickyMenu();

    return (
        <>
            <header>
                <nav className={`navbar mobile-sidenav navbar-box logo-less navbar-default validnavs ${isOpen ? "force-sticky navbar-responsive" : ""} ${isMenuSticky ? "sticked" : ""}`}>

                    <div className="container nav-box d-flex justify-content-between align-items-center">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu" onClick={openMenu}>
                                <i className="fa fa-bars"></i>
                            </button>
                            <Link className="navbar-brand" href="/">
                                <Image src="/assets/img/logo-2.png" width={675} height={332} className="logo" alt="Logo" />
                            </Link>
                        </div>

                        <div className={`collapse navbar-collapse collapse-mobile ${isOpen ? "show" : ""}`} id="navbar-menu">
                            <Image src="/assets/img/logo-2.png" width={675} height={332} alt="Logo" />
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu" onClick={closeMenu}>
                                <i className="fa fa-times"></i>
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
                                    <li className="side-menu">
                                        <Link href="#" onClick={openInfoBar} >
                                            <span className="bar-1"></span>
                                            <span className="bar-2"></span>
                                            <span className="bar-3"></span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <SidebarInfoV2 closeInfoBar={closeInfoBar} isInfoOpen={isInfoOpen} />
                    </div>
                    <div className={`overlay-screen ${isOpen ? "opened" : ""}`} onClick={closeMenu}></div>
                </nav>
            </header>
        </>
    );
};

export default HeaderV5;