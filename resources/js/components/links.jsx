import {
  FaUser,
  FaUsers,
  FaCuttlefish,
  FaKaggle,
  FaTrophy,
} from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { Link } from "@inertiajs/react";

const Links = ({ uri, styles }) => {
  const { pathname } = window.location;
  const path = pathname.split("/").pop();

  return (
    <div>
      <li className="nav-item">
        <Link
          className={`nav-link ${uri === "/home" ? styles.active : ""} ${styles.link
            }`}
          href="/home"
        >
          <AiFillHome />
          <span className="ms-1">home</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className={`nav-link ${uri === "/posts" ? styles.active : ""} ${styles.link
            }`}
          href="/posts"
        >
          <FaUser />
          <span className="ms-1">become a candidate</span>
        </Link>
      </li>
      <li className="nav-item dropdown">
        <Link
          className={`nav-link dropdown-toggle ${styles.link} ${path === "candidates" ? styles.active : ""
            }`}
          data-bs-toggle="dropdown"
        >
          <FaUsers />
          <span className="ms-1">candidates</span>
        </Link>
        <div className="dropdown-menu">
          <Link href="/faculty/president/candidates" className="dropdown-item">
            Faculty
          </Link>
          <Link href="/department/president/candidates" className="dropdown-item">
            Departmental
          </Link>
        </div>
      </li>
      <li className="nav-item dropdown">
        <Link
          className={`nav-link dropdown-toggle ${styles.link} ${path === "elections" ? styles.active : ""
            }`}
          data-bs-toggle="dropdown"
        >
          <FaCuttlefish />
          <span className="ms-1">elections</span>
        </Link>
        <div className="dropdown-menu">
          <Link href="/faculty/president/elections" className="dropdown-item">
            Faculty
          </Link>
          <Link href="/department/president/elections" className="dropdown-item">
            Departmental
          </Link>
        </div>
      </li>
      <li className="nav-item dropdown">
        <Link
          className={`nav-link dropdown-toggle ${styles.link} ${path === "winners" ? styles.active : ""
            }`}
          data-bs-toggle="dropdown"
        >
          <FaTrophy />
          <span className="ms-1">winners</span>
        </Link>
        <div className="dropdown-menu">
          <Link href="/faculty/winners" className="dropdown-item">
            Faculty
          </Link>
          <Link href="/department/winners" className="dropdown-item">
            Departmental
          </Link>
        </div>
      </li>

      <li className="nav-item">
        <Link
          className={`nav-link ${uri === "/campaign" ? styles.active : ""} ${styles.link
            }`}
          href="/campaign"
        >
          <FaKaggle />
          <span className="ms-1">campaign</span>
        </Link>
      </li>
    </div>
  );
};

export default Links;
