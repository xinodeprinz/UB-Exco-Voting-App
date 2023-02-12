import styles from "../modules/login.module.css";
import UBLogo from "../images/ub-logo.png";
import vote from "../images/vote-img.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/home");
  };
  return (
    <div className={styles.main}>
      <div className={styles.center}>
        <div className="container">
          <div className="row g-0">
            <div
              className={`col-md-6 col-lg-5 bg-white py-5 px-3 px-md-5 ${styles.form}`}
            >
              <div className="text-center mb-5">
                <img
                  src={UBLogo}
                  className={styles.logo}
                  alt="University of Buea"
                />
                <h1 className={styles.title}>{process.env.REACT_APP_NAME}</h1>
              </div>

              {/* <h1 className={styles.subtitle}>welcome back</h1> */}

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <input
                    type="text"
                    id="matricule"
                    placeholder="Matricule"
                    className={`form-control ${styles.formControl}`}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className={`form-control ${styles.formControl}`}
                  />
                </div>
                <div className={styles.check}>
                  <div className="form-check mb-3">
                    <input
                      className={`form-check-input ${styles.checkInput}`}
                      id="remember"
                      type="checkbox"
                    />
                    <label
                      className={`form-check-label ${styles.checkText}`}
                      htmlFor="remember"
                    >
                      Keep me logged in
                    </label>
                  </div>
                  <button type="submit" className={`btn ${styles.loginBtn}`}>
                    Login
                  </button>
                </div>
              </form>
            </div>
            <div className="col-md-6 col-lg-7 d-none d-md-block">
              <img
                src={vote}
                className={`${styles.voteBackground} h-100 w-100`}
                alt="Voting background"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
