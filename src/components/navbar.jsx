import styles from "../modules/navbar.module.css";
import photo from "../images/empty.jpg";
import { Link } from "react-router-dom";
const Navbar = () => {
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
                  <a className="dropdown-item" href="/">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
