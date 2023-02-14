import styles from "../modules/candidate.module.css";
import person from "../images/person.jpg";

const Candidate = ({
  isElection = false,
  isWinner = false,
  showPosition = false,
}) => {
  return (
    <div className={`card shadow-lg h-100 ${styles.card}`}>
      {isElection ? (
        <>
          <div className={styles.votes}>0 votes</div>
          {showPosition && (
            <div className={styles.position}>
              1<sup>st</sup>
              <span className={styles.winner}></span>
            </div>
          )}
        </>
      ) : null}

      <img
        src={person}
        alt="Person"
        className={`card-img-top ${styles.image}`}
      />
      <div className={`card-body ${styles.cardBody}`}>
        <div className={styles.info}>
          <div>nfor nde nyambi</div>
          <div className={styles.matricule}>ct20a123 (software)</div>
          <div>level 400</div>
        </div>
        {isElection ? (
          <button className={`btn ${styles.btn}`}>vote</button>
        ) : null}
        {isWinner ? <div className={styles.post}>COT president</div> : null}
      </div>
    </div>
  );
};

export default Candidate;
