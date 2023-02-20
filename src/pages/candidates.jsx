import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { useParams } from "react-router-dom";
import styles from "../modules/candidates.module.css";
import Candidate from "../components/candidate";
import axios from "../components/axios";
import { posts } from "../data/posts";
import { useNavigate } from "react-router-dom";

const Candidates = ({ isElection = false, isWinner = false }) => {
  const { post, type } = useParams();
  const navigate = useNavigate();
  const { pathname } = window.location;

  const [time, setTime] = useState({ hours: 1, minutes: 0, seconds: 1 });
  const [showPosition, setShowPosition] = useState(false);
  const [timerColour, setTimerColour] = useState("time");
  const [candidates, setCandidates] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    votingTime();
    if (!isWinner) getCandidates();
  }, [pathname]);

  const getCandidates = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`/candidates/${type}/${post}`);
      setCandidates(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  setTimeout(async () => {
    try {
      const { data } = await axios.get(`/candidates/${type}/${post}`);
      setCandidates(data);
    } catch (error) {
      console.log("An error occurred.");
    }
  }, 5000);

  const handleVote = async (candidateId) => {
    try {
      setBtnLoading(true);
      const res = await axios.patch(`/vote/${candidateId}`);
      const { votes, hasVoted } = res.data;
      // Updating candidate's info
      candidates.forEach((c) => {
        if (c.candidate_id === candidateId) {
          c.hasVoted = hasVoted;
          c.votes = votes;
        }
      });
      setCandidates(candidates);
      setBtnLoading(false);
    } catch (error) {
      setBtnLoading(false);
    }
  };

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
      setShowPosition(true);
      alert("Time up");
    }

    if (time.hours === 0 && time.minutes < 11) {
      setTimerColour("lessTime"); //Changes the timer colour to red.
    }
  };

  const handlePost = (e) => {
    setIsLoading(true);
    const newPost = e.target.value;
    navigate(`/${type}/${newPost}/candidates`);
  };

  return (
    <div className="row g-0">
      <div className="col-lg-4 col-xl-3">
        <Sidebar />
      </div>
      <div className="col-lg-8 col-xl-9">
        <Navbar isLoading={isLoading} top="13rem" />

        <main className="container-fluid my-4">
          <div className="row mb-3">
            <div className="col-sm-8 offset-sm-2 col-md-6 offset-md-3">
              <select
                id="post"
                onChange={handlePost}
                className={`form-select ${styles.select}`}
              >
                {posts.map((p, i) => (
                  <option value={p.replaceAll(" ", "-")} key={i}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="d-md-flex justify-content-between align-items-center">
            <div className="section-title">
              <h1>{post.replaceAll("-", " ")} candidates</h1>
            </div>
            {isElection ? (
              <div className={`${styles[timerColour]} mb-3 mb-md-0`}>
                <span>voting ends in: </span>
                <span>
                  {time.hours.toString().padStart(2, 0)}:
                  {time.minutes.toString().padStart(2, 0)}:
                  {time.seconds.toString().padStart(2, 0)}
                </span>
              </div>
            ) : null}
          </div>

          {candidates && candidates.length > 0 && (
            <div className="row">
              {candidates.map((candidate, key) => (
                <div className="col-sm-6 col-xl-3 mb-3" key={key}>
                  <Candidate
                    isElection={isElection}
                    isWinner={isWinner}
                    candidate={candidate}
                    showPosition={showPosition}
                    handleVote={handleVote}
                    loading={btnLoading}
                  />
                </div>
              ))}
            </div>
          )}

          {candidates && candidates.length <= 0 && (
            <div className="alert alert-info text-center">
              There are no candidates for this post at the moment. Please try
              again later.
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Candidates;
