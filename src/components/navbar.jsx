import styles from "../modules/navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, Fragment } from "react";
import Links from "./links";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "./axios";
import { userActions } from "../store/userSlice";
import { LoadingSpinner } from "./helpers";
import sweetAlert from "./alert";
const Navbar = ({ isLoading = false, top, text = "Loading..." }) => {
  const navigate = useNavigate();

  const [uri, setUri] = useState("");
  const initUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [user, setUser] = useState(initUser);

  useEffect(() => {
    const { pathname } = window.location;
    setUri(pathname);
    if (!user) {
      getUser();
    }
  }, []); //Please remove the dependency array for a proper functioning.

  const getUser = async () => {
    const { data } = await axios.get("/user");
    // Storing user in the redux store.
    dispatch(userActions.updateUser(data));
    setUser(data);
  };

  const logout = async () => {
    const res = await axios.post("/logout");
    localStorage.removeItem("token");
    sweetAlert({ icon: "success", title: res.data.message });
    navigate("/");
  };

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
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={process.env.REACT_APP_IMAGE + user.photo}
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
                  <Links uri={uri} styles={styles} />
                </div>
              </ul>
            </div>
          </div>
        </nav>
      )}
      {isLoading && <LoadingSpinner top={top} text={text} />}
    </Fragment>
  );
};

export default Navbar;
