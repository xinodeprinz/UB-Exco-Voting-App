import { FaTrash } from "react-icons/fa";
import styles from "../../css/modules/candidate.module.css";

const Candidate = ({
  isElection = false,
  isWinner = false,
  showPosition = false,
  candidate,
  handleVote = null,
  canVote = true,
  disabled = false,
}) => {
  const positionSuper = (position) => {
    position = String(position);
    const lastEl = position[position.length - 1];
    let ps = 'th';
    if (lastEl == 1)
      ps = 'st';
    else if (lastEl == 2)
      ps = 'nd';
    else if (lastEl == 3)
      ps = 'rd';
    return ps;
  }
  return (
    <div className={`card shadow-lg h-100 ${styles.card}`}>
      {isElection ? (
        <>
          <div className={styles.votes}>{candidate.votes} votes</div>
          {showPosition && candidate.position && (
            <div className={styles.position}>
              {candidate.position}<sup>{positionSuper(
                candidate.position
              )}</sup>
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
            disabled={!candidate.hasVoted ? disabled : false}
          >
            {candidate.hasVoted && <FaTrash />}
            <span className={candidate.hasVoted ? "ms-1" : ""}>
              {candidate.hasVoted ? "unvote" : "vote"}
            </span>
          </button>
        ) : null}
        {isWinner ? <div className={styles.post}>{candidate.post}</div> : null}
      </div>
    </div>
  );
};

export default Candidate;
