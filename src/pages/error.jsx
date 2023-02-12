import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import styles from "../modules/error.module.css";

const Error = () => {
  return (
    <div className="row g-0">
      <div className="col-lg-4 col-xl-3">
        <Sidebar />
      </div>
      <div className="col-lg-8 col-xl-9">
        <Navbar />

        <main className={`container-fluid my-4 ${styles.main}`}>
          <h1>Page not found</h1>
          <p>Opps!! The page you are looking for was not found</p>
          <Link className={`btn ${styles.btn}`}>
            <FaHome />
            <span className="ms-1">go to home page</span>
          </Link>
        </main>
      </div>
    </div>
  );
};

export default Error;
