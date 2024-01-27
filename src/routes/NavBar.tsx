import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useRef, useState } from "react";
import { useAuthUser, useSignOut } from "react-auth-kit";
import { Link } from "react-router-dom";
import { API_URL, HTTP_PREFIX } from "../helper/Constants";

const NavBar = () => {
  const getAuth = useAuthUser();
  const auth = getAuth();
  const [email, setLoginEmail] = useState("");
  const [betfairConnected, setBetfairConnected] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const tokenRef = useRef(auth?.token || "default");
  const signOut = useSignOut();

  const toggle = () => setIsOpen(!isOpen);
  const handleNavLinkClick = () => {
    if (window.innerWidth <= 768) {
      // Bootstrap's breakpoint for small devices
      toggle();
    }
  };


  return (
    <nav className="navbar navbar-expand-sm fixed-top navbar-light bg-light">
      <button
        className="navbar-toggler"
        type="button"
        onClick={toggle}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <a className="navbar-brand" href="/">
        CGT-Share-Matching
      </a>
      <div
        className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
        id="navbarTogglerDemo03"
      >
        <ul className="navbar-nav mr-auto d-flex ml-auto">
          {" "}
          {/* Apply ml-auto here */}
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Main
            </Link>
          </li>
        
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
