import {
  FaUser,
  FaUsers,
  FaCuttlefish,
  FaKaggle,
  FaTrophy,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

const Links = ({ uri, styles }) => {
  const { pathname } = window.location;
  const path = pathname.split("/").pop();

  return (
    <div>
      <li className="nav-item">
        <Link
          className={`nav-link ${uri === "/home" ? styles.active : ""} ${
            styles.link
          }`}
          to="/home"
        >
          <AiFillHome />
          <span className="ms-1">home</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className={`nav-link ${uri === "/posts" ? styles.active : ""} ${
            styles.link
          }`}
          to="/posts"
        >
          <FaUser />
          <span className="ms-1">become a candidate</span>
        </Link>
      </li>
      <li className="nav-item dropdown">
        <Link
          className={`nav-link dropdown-toggle ${styles.link} ${
            path === "candidates" ? styles.active : ""
          }`}
          data-bs-toggle="dropdown"
        >
          <FaUsers />
          <span className="ms-1">candidates</span>
        </Link>
        <div className="dropdown-menu">
          <Link to="/faculty/president/candidates" className="dropdown-item">
            Faculty
          </Link>
          <Link to="/department/president/candidates" className="dropdown-item">
            Departmental
          </Link>
        </div>
      </li>
      <li className="nav-item dropdown">
        <Link
          className={`nav-link dropdown-toggle ${styles.link} ${
            path === "elections" ? styles.active : ""
          }`}
          data-bs-toggle="dropdown"
        >
          <FaCuttlefish />
          <span className="ms-1">elections</span>
        </Link>
        <div className="dropdown-menu">
          <Link to="/faculty/president/elections" className="dropdown-item">
            Faculty
          </Link>
          <Link to="/department/president/elections" className="dropdown-item">
            Departmental
          </Link>
        </div>
      </li>
      <li className="nav-item dropdown">
        <Link
          className={`nav-link dropdown-toggle ${styles.link} ${
            path === "winners" ? styles.active : ""
          }`}
          data-bs-toggle="dropdown"
        >
          <FaTrophy />
          <span className="ms-1">winners</span>
        </Link>
        <div className="dropdown-menu">
          <Link to="/faculty/president/winners" className="dropdown-item">
            Faculty
          </Link>
          <Link to="/department/president/winners" className="dropdown-item">
            Departmental
          </Link>
        </div>
      </li>

      <li className="nav-item">
        <Link
          className={`nav-link ${uri === "/campaign" ? styles.active : ""} ${
            styles.link
          }`}
          to="/campaign"
        >
          <FaKaggle />
          <span className="ms-1">campaign</span>
        </Link>
      </li>
    </div>
  );
};

export default Links;
