import styles from "../../css/modules/sidebar.module.css";
import UBLogo from "../../images/ub-logo.png";
import config from "../config";
import Links from "./links";

const Sidebar = () => {
  const { pathname } = window.location;

  return (
    <div className={styles.container}>
      <aside className={`${styles.sidebar} d-none d-lg-block py-4 pe-3`}>
        <div className={`container ${styles.relative}`}>
          <div className={`d-flex align-items-center ${styles.logo}`}>
            <img
              src={UBLogo}
              className={styles.logoImage}
              alt="UB Exco Voting App"
            />
            <h1 className={styles.title}>{config.appName}</h1>
          </div>

          <ul className="nav flex-column">
            <Links uri={pathname} styles={styles} />
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
