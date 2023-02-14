import { Link } from "react-router-dom";
import styles from "../modules/post.module.css";

const Post = ({ triggerModal }) => {
  return (
    <div className={`card h-100 ${styles.card}`}>
      <div className={`card-header ${styles.header}`}>president</div>
      <div className="card-body">
        <p className={`card-text ${styles.text}`}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex inventore
          fuga unde reprehenderit mollitia magnam deserunt aperiam consequatur
          magni repudiandae!
        </p>
        <div className="d-flex justify-content-between align-items-center">
          <Link
            className={`card-link text-capitalize ${styles.link}`}
            to="/president/about"
          >
            Read More
          </Link>
          <div className={styles.candidates}>0 candidates</div>
        </div>

        <button
          className={`btn mt-3 py-2 ${styles.btn}`}
          onClick={triggerModal}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Post;
