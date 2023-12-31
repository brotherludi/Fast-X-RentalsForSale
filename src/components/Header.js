import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Header.css";

const Header = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const handlelogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo italic bigger">
            Fast-X-RentalsForSale
          </Link>

          {user && user.user_type === "buyer" && (
            <ul className="nav-menu">
              <ul className="small-nav">
                <li className="nav-item">
                  <Link to="/" className="nav-links">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/cars" className="nav-links">
                    Cars for Sale
                  </Link>
                </li>
                {/* <li className="nav-item">
              <Link to="/sell" className="nav-links">Sell Your Car</Link>
            </li> */}
                <li className="nav-item">
                  <Link to="/about" className="nav-links">
                    About Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/contact" className="nav-links">
                    Contact
                  </Link>
                </li>
              </ul>
              <li className="nav-item">
                <button className="nav-links logout" onClick={handlelogout}>
                  Logout
                </button>
              </li>
            </ul>
          )}

          {user && user.user_type === "seller" && (
            <ul className="nav-menu">
              <ul className="small-nav">
                <li className="nav-item">
                  <Link to="/" className="nav-links">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/cars" className="nav-links">
                    Cars for Sale
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/sell" className="nav-links">
                    Sell Your Car
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/about" className="nav-links">
                    About Us
                  </Link>
                </li>
              </ul>
              <li className="nav-item">
                <button className="nav-links logout" onClick={handlelogout}>
                  Logout
                </button>
              </li>
            </ul>
          )}

          {!user && (
            <Link to="/login" className="nav-links">
              Login/Register
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
