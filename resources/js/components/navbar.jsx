import styles from "../../css/modules/navbar.module.css";
import { useEffect, useState, Fragment } from "react";
import Links from "./links";
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "@inertiajs/react";
import axios from '../components/axios';

const Navbar = ({ isLoading = false, top }) => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const { data } = await axios.get('/user');
    setUser(data);
  }

  const logout = () => { }

  return (
    <Fragment>
      {user && (
        <nav className={`navbar navbar-expand-lg shadow-lg ${styles.navbar}`}>
          <div className="container-fluid">
            <div className="navbar-brand">
              <div className={styles.faculty}>{user.faculty}</div>
              <div className={styles.dept}>{user.department}</div>
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
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={'/storage/' + user.photo}
                      className={styles.photo}
                      alt={user.name}
                    />
                    <div className={styles.info}>
                      <div>{user.name}</div>
                      <div>{user.matricule}</div>
                    </div>
                  </Link>
                  <ul className={`dropdown-menu ${styles.dropdownMenu}`}>
                    <li>
                      <button className="dropdown-item" onClick={logout}>
                        <FaSignOutAlt />
                        <span className="ms-1">Logout</span>
                      </button>
                    </li>
                  </ul>
                </li>
                <div className="d-lg-none">
                  <Links uri={'/home'} styles={styles} />
                </div>
              </ul>
            </div>
          </div>
        </nav>
      )}
    </Fragment>
  );
};

export default Navbar;
