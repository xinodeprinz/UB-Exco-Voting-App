import styles from "../modules/navbar.module.css";
import photo from "../images/empty.jpg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Links from "./links";
import { FaSignOutAlt } from "react-icons/fa";
const Navbar = () => {
  const [uri, setUri] = useState("");

  useEffect(() => {
    const { pathname } = window.location;
    setUri(pathname);
  }, []); //Pleas remove the dependency array for a proper functioning.

  return (
    <nav className={`navbar navbar-expand-lg shadow-lg ${styles.navbar}`}>
      <div className="container-fluid">
        <div className="navbar-brand">
          <div className={styles.faculty}>College of Technology - COT</div>
          <div className={styles.dept}>Computer Engineering</div>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar-support"
          aria-controls="navbar-support"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar-support">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className={`nav-item dropdown ${styles.dropdown}`}>
              <Link
                className={`nav-link dropdown-toggle d-flex align-items-center ${styles.toggle}`}
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src={photo} className={styles.photo} alt="Name" />
                <div className={styles.info}>
                  <div>Nfor Nde Nyambi</div>
                  <div>CT20A123</div>
                </div>
              </Link>
              <ul className={`dropdown-menu ${styles.dropdownMenu}`}>
                <li>
                  <button className="dropdown-item">
                    <FaSignOutAlt />
                    <span className="ms-1">Logout</span>
                  </button>
                </li>
              </ul>
            </li>
            <div className="d-lg-none">
              <Links uri={uri} styles={styles} />
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
