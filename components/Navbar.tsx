import Link from "next/link";
import LOGO from '../images/appLogo.png';
import Image from 'next/image'
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
    return (
        <div className="navbar-container">
            <div>
                <Image id="nav-img" src={LOGO} alt="Image" />
            </div>
            <div className="button-wrapper">
                <div >
                    <Link href="/" className="nav-link">Home</Link>
                </div>
                <div>
                    <Link href="/about" className="nav-link">About</Link>
                </div>
                <div>
                    <Link href="/sign-in" className="nav-link">Sign In</Link>
                </div>
            </div>
            
            <div className="search-container">
                <form action="/action_page.php">
                    <input type="text" placeholder="Search..." name="search"/>
                
                </form>
                <button type="submit"><FaSearch/></button>
            </div>
        </div>
    )
}

export default Navbar;