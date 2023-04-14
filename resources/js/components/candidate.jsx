import { FaTrash } from "react-icons/fa";
import styles from "../../css/modules/candidate.module.css";

const Candidate = ({
  isElection = false,
  isWinner = false,
  showPosition = false,
  candidate,
  handleVote = null,
  canVote = true,
}) => {
  return (
    <div className={`card shadow-lg h-100 ${styles.card}`}>
      {isElection ? (
        <>
          <div className={styles.votes}>{candidate.votes} votes</div>
          {showPosition && (
            <div className={styles.position}>
              1<sup>st</sup>
              <span className={styles.winner}></span>
            </div>
          )}
        </>
      ) : null}

      <img
        src={'/storage/' + candidate.photo}
        alt={candidate.name}
        className={`card-img-top ${styles.image}`}
      />
      <div className={`card-body ${styles.cardBody}`}>
        <div className={styles.info}>
          <div>{candidate.name}</div>
          <div className={styles.matricule}>
            {candidate.matricule} ({candidate.option})
          </div>
          <div>{candidate.level}</div>
        </div>
        {isElection && canVote ? (
          <button
            className={`btn  d-flex justify-content-center align-items-center 
            ${candidate.hasVoted ? styles.voted : styles.btn
              }`}
            onClick={() => handleVote(candidate.candidate_id)}
          >
            {candidate.hasVoted && <FaTrash />}
            <span className={candidate.hasVoted ? "ms-1" : ""}>
              {candidate.hasVoted ? "unvote" : "vote"}
            </span>
          </button>
        ) : null}
        {isWinner ? <div className={styles.post}>COT president</div> : null}
      </div>
    </div>
  );
};

export default Candidate;
