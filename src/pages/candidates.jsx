import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { useParams } from "react-router-dom";
import styles from "../modules/candidates.module.css";
import Candidate from "../components/candidate";

const Candidates = ({ isElection = false, isWinner = false }) => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 1 });
  useEffect(() => {
    votingTime();
  });

  const votingTime = () => {
    const timeout = setTimeout(() => {
      const { REACT_APP_START_TIME, REACT_APP_DURATION } = process.env;
      const startTime = new Date(REACT_APP_START_TIME).getTime();
      const duration = Number(REACT_APP_DURATION);
      const endTime = startTime + duration * 60 * 1000;
      const now = new Date().getTime();
      const distance = endTime - now;
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setTime({ hours, minutes, seconds });
    }, 1000);
    if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
      clearTimeout(timeout);
      alert("Time up");
    }
  };

  const { post } = useParams();
  return (
    <div className="row g-0">
      <div className="col-lg-4 col-xl-3">
        <Sidebar />
      </div>
      <div className="col-lg-8 col-xl-9">
        <Navbar />

        <main className="container-fluid my-4">
          <div className="row mb-3">
            <div className="col-sm-8 offset-sm-2 col-md-6 offset-md-3">
              <select id="post" className={`form-select ${styles.select}`}>
                <option value="">president</option>
                <option value="">vice president</option>
                <option value="">secretary general</option>
              </select>
            </div>
          </div>

          <div className="d-md-flex justify-content-between align-items-center">
            <div className={styles.sectionTitle}>
              <h1>{post} candidates</h1>
            </div>
            {isElection ? (
              <div className={`${styles.time} mb-3 mb-md-0`}>
                <span>voting ends in: </span>
                <span>
                  {time.hours.toString().padStart(2, 0)}:
                  {time.minutes.toString().padStart(2, 0)}:
                  {time.seconds.toString().padStart(2, 0)}
                </span>
              </div>
            ) : null}
          </div>

          <div className="row">
            {[1, 2, 3, 4].map((i) => (
              <div className="col-sm-6 col-xl-3 mb-3" key={i}>
                <Candidate isElection={isElection} isWinner={isWinner} />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Candidates;
