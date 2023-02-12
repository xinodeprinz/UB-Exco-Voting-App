import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import styles from "../modules/campaign.module.css";

const Campaign = () => {
  return (
    <div className="row g-0">
      <div className="col-lg-4 col-xl-3">
        <Sidebar />
      </div>
      <div className="col-lg-8 col-xl-9">
        <Navbar />

        <main className={`container-fluid my-4 ${styles.main}`}>Campaign</main>
      </div>
    </div>
  );
};

export default Campaign;
