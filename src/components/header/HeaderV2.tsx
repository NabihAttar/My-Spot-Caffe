"use client"
import MainMenu from './MainMenu';
import useSubMenuToggle from '@/hooks/useSubMenuToggle';
import useSidebarMenu from '@/hooks/useSidebarMenu';
import Link from 'next/link';
import Image from 'next/image';
import HeaderCart from './HeaderCart';
import useStickyMenu from '@/hooks/useStickyMenu';
import SidebarInfo from './SidebarInfo';
import useSidebarInfo from '@/hooks/useSidebarInfo';

const HeaderV2 = () => {

    const { toggleSubMenu, isMenuOpen, getMenuStyle } = useSubMenuToggle();
    const { isOpen, openMenu, closeMenu } = useSidebarMenu();
    const isMenuSticky = useStickyMenu();
    const { isInfoOpen, openInfoBar, closeInfoBar } = useSidebarInfo();

    return (
        <>
            <header>
                <nav className={`navbar mobile-sidenav navbar-box navbar-default validnavs ${isOpen ? "force-sticky navbar-responsive" : ""} ${isMenuSticky ? "sticked" : ""}`}>

                    <div className="container nav-box d-flex justify-content-between align-items-center">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu" onClick={openMenu}>
                                <i className="fa fa-bars"></i>
                            </button>
                            <Link className="navbar-brand" href="/">
                                <Image src="/assets/img/logo-2.png" width={675} height={332} className="logo" alt="Logo" />
                            </Link>
                        </div>

                        <MainMenu
                            navbarPlacement="navbar-right"
                            isOpen={isOpen}
                            closeMenu={closeMenu}
                            toggleSubMenu={toggleSubMenu}
                            isMenuOpen={isMenuOpen}
                            getMenuStyle={getMenuStyle}
                        />

                        {/* Header Right */}
                        <div className="attr-right">
                            <div className="attr-nav attr-box">
                                <ul>
                                    <HeaderCart />
                                    <SidebarInfo closeInfoBar={closeInfoBar} isInfoOpen={isInfoOpen} openInfoBar={openInfoBar} />
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

export default HeaderV2;