import styles from "../../css/modules/login.module.css";
import UBLogo from "../../images/ub-logo.png";
import vote from "../../images/vote-img.png";
import sweetAlert from "../components/alert";
import { useState } from "react";
import axios from "../components/axios";
import config from "../config";

const Login = () => {

    const [data, setData] = useState({ matricule: "", password: "" });

    const handleInput = (e) => {
        setData({ ...data, [e.target.id]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await axios.post('/', data);
        sweetAlert({ icon: "success", title: res.data.message });
        return setTimeout(() => {
            window.location.pathname = '/home';
        }, 4000);
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
                                <h1 className={styles.title}>{config.appName}</h1>
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
