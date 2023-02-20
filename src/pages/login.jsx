import styles from "../modules/login.module.css";
import UBLogo from "../images/ub-logo.png";
import vote from "../images/vote-img.png";
import { useNavigate } from "react-router-dom";
import sweetAlert from "../components/alert";
import { useState } from "react";
import axios from "../components/axios";
import { useDispatch } from "react-redux";
import { userActions } from "../store/userSlice";
import { ButtonSpinner } from "../components/helpers";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({ matricule: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleLogin = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post("/login", data);
      console.log(res);
      sweetAlert({ icon: "success", title: res.data.message });
      const token = res.data.token;
      const user = res.data.user;
      // Storing user in the redux store.
      dispatch(userActions.updateUser(user));
      localStorage.setItem("token", JSON.stringify(token));
      //  Clearing all input fields
      const inputs = document.querySelectorAll("input");
      inputs.forEach((i) => (i.value = ""));
      navigate("/home");
    } catch (error) {
      setIsLoading(false);
    }
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
                    onChange={handleInput}
                    placeholder="Matricule"
                    className={`form-control ${styles.formControl}`}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    id="password"
                    onChange={handleInput}
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
                  <button
                    type="submit"
                    className={`btn d-flex align-items-center 
                    justify-content-center text-capitalize ${styles.loginBtn}`}
                  >
                    {isLoading ? (
                      <ButtonSpinner color="white" text="loading..." />
                    ) : (
                      "Login"
                    )}
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
