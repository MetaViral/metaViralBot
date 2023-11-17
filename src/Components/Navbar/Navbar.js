import { MDBIcon } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../Assets/Image/metalogo.jpeg";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import app from "../../firebase.init";
const Navbar = () => {
  const auth = getAuth(app);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // const uid = user.uid;
        setUser(user);
      } else {
        setUser({});
      }
    });
  }, []);
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const handleSignOut = () => {
    setShowNavbar(false);
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
          <div className="logo" style={{ cursor: "pointer" }}>
            <img src={Logo} alt="" width="36px" height="36px" />
            <h2>MetaViral Bot</h2>
        </div>

        <div className="menu-icon" onClick={handleShowNavbar}>
          <MDBIcon icon="bars" />
        </div>
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <ul>
            <li>
              <NavLink to="/" onClick={() => setShowNavbar(false)}>
                Home
              </NavLink>
            </li>

            {user?.uid ? (
              <li>
                <NavLink onClick={() => setShowNavbar(false)} to="/chatbot">
                  Chatbot
                </NavLink>
              </li>
            ) : (
              ""
            )}

            {user?.uid ? (
              <li>
                <NavLink
                  onClick={() => setShowNavbar(false)}
                  to="/emailGenerator"
                >
                  Email generator
                </NavLink>
              </li>
            ) : (
              ""
            )}

            {user?.uid ? (
              <li>
                <NavLink onClick={() => setShowNavbar(false)} to="/recipe">
                  Recipe
                </NavLink>
              </li>
            ) : (
              ""
            )}

            <li>
              {user?.uid ? (
                <button className="logout-button" onClick={handleSignOut}>
                  Logout
                </button>
              ) : (
                <NavLink onClick={() => setShowNavbar(false)} to="/login">
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
