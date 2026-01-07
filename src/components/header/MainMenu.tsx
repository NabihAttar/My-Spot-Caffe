import Link from 'next/link';
import Image from 'next/image';

interface DataType {
    isOpen: boolean;
    closeMenu: () => void;
    toggleSubMenu: (menuId: string) => void;
    isMenuOpen: (menuId: string) => boolean;
    getMenuStyle: (menuId: string) => React.CSSProperties;
    navbarPlacement: string;
}

const MainMenu = ({ isOpen, closeMenu, navbarPlacement, toggleSubMenu, isMenuOpen, getMenuStyle }: DataType) => {
    return (
        <>
            <div className={`collapse navbar-collapse collapse-mobile ${isOpen ? "show" : ""}`} id="navbar-menu">
                <Image src="/assets/img/logo-2.png" width={675} height={332} alt="Logo" />
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu" onClick={closeMenu}>
                    <i className="fa fa-times"></i>
                </button>
                <ul className={`nav navbar-nav ${navbarPlacement}`} data-in="fadeInDown" data-out="fadeOutUp">
                    <li className={`dropdown megamenu-fw ${isMenuOpen('home') ? 'on' : ''}`}>
                        <Link
                            href="#"
                            className="dropdown-toggle"
                            data-toggle="dropdown"
                            onClick={(e) => {
                                e.preventDefault();
                                toggleSubMenu('home');
                            }}
                        >
                            Home
                        </Link>
                        <ul
                            className="dropdown-menu megamenu-content"
                            role="menu"
                            style={getMenuStyle('home')}
                        >
                            <li>
                                <div className="col-menu-wrap">
                                    <div className="col-item">
                                        <div className="menu-thumb">
                                            <Image src="/assets/img/demo/home-1.jpg" width={300} height={360} alt="Image Not Found" />
                                            <div className="overlay">
                                                <Link href="/">Light Version</Link>
                                                <Link href="/home-1-dark">Dark Version</Link>
                                            </div>
                                        </div>
                                        <h6 className="title"><Link href="/">Home One</Link></h6>
                                    </div>
                                    <div className="col-item">
                                        <div className="menu-thumb">
                                            <Image src="/assets/img/demo/home-2.jpg" width={300} height={360} alt="Image Not Found" />
                                            <div className="overlay">
                                                <Link href="/home-2">Light Version</Link>
                                                <Link href="/home-2-dark">Dark Version</Link>
                                            </div>
                                        </div>
                                        <h6 className="title"><Link href="/home-2">Home Two</Link></h6>
                                    </div>
                                    <div className="col-item">
                                        <div className="menu-thumb">
                                            <Image src="/assets/img/demo/home-6.jpg" width={300} height={360} alt="Image Not Found" />
                                            <div className="overlay">
                                                <Link href="/home-3">Light Version</Link>
                                                <Link href="/home-3-dark">Dark Version</Link>
                                            </div>
                                        </div>
                                        <h6 className="title"><Link href="/home-3">Home Three</Link></h6>
                                    </div>
                                    <div className="col-item">
                                        <div className="menu-thumb">
                                            <Image src="/assets/img/demo/home-3.jpg" width={300} height={360} alt="Image Not Found" />
                                            <div className="overlay">
                                                <Link href="/home-4">Light Version</Link>
                                                <Link href="/home-4-dark">Dark Version</Link>
                                            </div>
                                        </div>
                                        <h6 className="title"><Link href="/home-4">Home Four</Link></h6>
                                    </div>
                                    <div className="col-item">
                                        <div className="menu-thumb">
                                            <Image src="/assets/img/demo/home-4.jpg" width={300} height={360} alt="Image Not Found" />
                                            <div className="overlay">
                                                <Link href="/home-5">Light Version</Link>
                                                <Link href="/home-5-dark">Dark Version</Link>
                                            </div>
                                        </div>
                                        <h6 className="title"><Link href="/home-5">Home Five</Link></h6>
                                    </div>
                                    <div className="col-item">
                                        <div className="menu-thumb">
                                            <Image src="/assets/img/demo/home-5.jpg" width={300} height={360} alt="Image Not Found" />
                                            <div className="overlay">
                                                <Link href="/home-6">Light Version</Link>
                                                <Link href="/home-6-dark">Dark Version</Link>
                                            </div>
                                        </div>
                                        <h6 className="title"><Link href="/home-6">Home Six</Link></h6>
                                    </div>
                                    <div className="col-item">
                                        <div className="menu-thumb">
                                            <Image src="/assets/img/demo/home-7.jpg" width={300} height={360} alt="Image Not Found" />
                                        </div>
                                        <h6 className="title"><Link href="#">Coming Soon</Link></h6>
                                    </div>
                                    <div className="col-item">
                                        <div className="menu-thumb">
                                            <Image src="/assets/img/demo/home-8.jpg" width={300} height={360} alt="Image Not Found" />
                                        </div>
                                        <h6 className="title"><Link href="#">Coming Soon</Link></h6>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li className={`dropdown ${isMenuOpen('pages') ? 'on' : ''}`}>
                        <Link
                            href="#"
                            className="dropdown-toggle"
                            data-toggle="dropdown"
                            onClick={(e) => {
                                e.preventDefault();
                                toggleSubMenu('pages');
                            }}
                            scroll={false}
                        >
                            Pages
                        </Link>
                        <ul
                            className="dropdown-menu animated"
                            style={getMenuStyle('pages')}
                        >
                            <li><Link href="/about-us">About Us</Link></li>
                            <li><Link href="/chef">Chef</Link></li>
                            <li><Link href="/chef-details/1">Chef Details</Link></li>
                            <li><Link href="/reservation">Reservation</Link></li>
                            <li><Link href="/contact">Contact Us</Link></li>
                            <li><Link href="/register">Register</Link></li>
                            <li><Link href="/login">Login</Link></li>
                            <li><Link href="/not-found">Error Page</Link></li>
                            <li className={`dropdown ${isMenuOpen('pages-dark') ? 'on' : ''}`}>
                                <Link
                                    href="#"
                                    className="dropdown-toggle"
                                    data-toggle="dropdown"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleSubMenu('pages-dark');
                                    }}
                                    scroll={false}
                                >
                                    Dark Version
                                </Link>
                                <ul
                                    className="dropdown-menu"
                                    style={getMenuStyle('pages-dark')}
                                >
                                    <li><Link href="/about-us-dark">About Us</Link></li>
                                    <li><Link href="/chef-dark">Chef</Link></li>
                                    <li><Link href="/chef-details-dark/1">Chef Details</Link></li>
                                    <li><Link href="/reservation-dark">Reservation</Link></li>
                                    <li><Link href="/contact-dark">Contact Us</Link></li>
                                    <li><Link href="/register-dark">Register</Link></li>
                                    <li><Link href="/login-dark">Login</Link></li>
                                    <li><Link href="/not-found-dark">Error Page</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li className={`dropdown ${isMenuOpen('menu') ? 'on' : ''}`}>
                        <Link
                            href="#"
                            className="dropdown-toggle"
                            data-toggle="dropdown"
                            onClick={(e) => {
                                e.preventDefault();
                                toggleSubMenu('menu');
                            }}
                        >
                            Menu
                        </Link>
                        <ul
                            className="dropdown-menu animated"
                            style={{ maxHeight: isMenuOpen('menu') ? '20000px' : '0' }}
                        >
                            <li><Link href="/food-menu">Menu Style One</Link></li>
                            <li><Link href="/food-menu-2">Menu Style Two</Link></li>
                            <li><Link href="/food-menu-3">Menu Style Three</Link></li>
                            <li className={`dropdown ${isMenuOpen('menu-dark') ? 'on' : ''}`}>
                                <Link
                                    href="#"
                                    className="dropdown-toggle"
                                    data-toggle="dropdown"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleSubMenu('menu-dark');
                                    }}
                                    scroll={false}
                                >
                                    Dark Version
                                </Link>
                                <ul
                                    className="dropdown-menu"
                                    style={{ maxHeight: isMenuOpen('menu-dark') ? '20000px' : '0' }}
                                >
                                    <li><Link href="/food-menu-dark">Menu Style One</Link></li>
                                    <li><Link href="/food-menu-2-dark">Menu Style Two</Link></li>
                                    <li><Link href="/food-menu-3-dark">Menu Style Three</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li className={`dropdown ${isMenuOpen('blog') ? 'on' : ''}`}>
                        <Link
                            href="#"
                            className="dropdown-toggle"
                            data-toggle="dropdown"
                            onClick={(e) => {
                                e.preventDefault();
                                toggleSubMenu('blog');
                            }}
                        >
                            Blog
                        </Link>
                        <ul
                            className="dropdown-menu animated"
                            style={{ maxHeight: isMenuOpen('blog') ? '20000px' : '0' }}
                        >
                            <li><Link href="/blog-standard">Blog Standard</Link></li>
                            <li><Link href="/blog-with-sidebar">Blog With Sidebar</Link></li>
                            <li><Link href="/blog-2-column">Blog Grid Two Column</Link></li>
                            <li><Link href="/blog-3-column">Blog Grid Three Column</Link></li>
                            <li><Link href="/blog-single/1">Blog Single</Link></li>
                            <li><Link href="/blog-single-with-sidebar/1">Blog Single With Sidebar</Link></li>
                            <li className={`dropdown ${isMenuOpen('blog-dark') ? 'on' : ''}`}>
                                <Link
                                    href="#"
                                    className="dropdown-toggle"
                                    data-toggle="dropdown"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleSubMenu('blog-dark');
                                    }}
                                    scroll={false}
                                >
                                    Dark Version
                                </Link>
                                <ul
                                    className="dropdown-menu"
                                    style={{ maxHeight: isMenuOpen('blog-dark') ? '20000px' : '0' }}
                                >
                                    <li><Link href="/blog-standard-dark">Blog Standard</Link></li>
                                    <li><Link href="/blog-with-sidebar-dark">Blog With Sidebar</Link></li>
                                    <li><Link href="/blog-2-column-dark">Blog Grid Two Column</Link></li>
                                    <li><Link href="/blog-3-column-dark">Blog Grid Three Column</Link></li>
                                    <li><Link href="/blog-single-dark/1">Blog Single</Link></li>
                                    <li><Link href="/blog-single-with-sidebar-dark/1">Blog Single With Sidebar</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li className={`dropdown ${isMenuOpen('shop') ? 'on' : ''}`}>
                        <Link
                            href="#"
                            className="dropdown-toggle"
                            data-toggle="dropdown"
                            onClick={(e) => {
                                e.preventDefault();
                                toggleSubMenu('shop');
                            }}
                        >
                            Shop
                        </Link>
                        <ul
                            className="dropdown-menu animated"
                            style={{ maxHeight: isMenuOpen('shop') ? '20000px' : '0' }}
                        >
                            <li><Link href="/shop">Shop</Link></li>
                            <li><Link href="/shop-single/1">Shop Single</Link></li>
                            <li><Link href="/shop-single-2/1">Shop Single Two</Link></li>
                            <li><Link href="/cart">Cart</Link></li>
                            <li><Link href="/checkout">Checkout</Link></li>
                            <li className={`dropdown ${isMenuOpen('shop-dark') ? 'on' : ''}`}>
                                <Link
                                    href="#"
                                    className="dropdown-toggle"
                                    data-toggle="dropdown"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleSubMenu('shop-dark');
                                    }}
                                    scroll={false}
                                >
                                    Dark Version
                                </Link>
                                <ul
                                    className="dropdown-menu"
                                    style={{ maxHeight: isMenuOpen('shop-dark') ? '20000px' : '0' }}
                                >
                                    <li><Link href="/shop-dark">Shop</Link></li>
                                    <li><Link href="/shop-single-dark/1">Shop Single</Link></li>
                                    <li><Link href="/shop-single-2-dark/1">Shop Single Two</Link></li>
                                    <li><Link href="/cart-dark">Cart</Link></li>
                                    <li><Link href="/checkout-dark">Checkout</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default MainMenu;