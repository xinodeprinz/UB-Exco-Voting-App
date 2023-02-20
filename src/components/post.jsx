import { Link } from "react-router-dom";
import styles from "../modules/post.module.css";

const Post = ({ triggerModal, post }) => {
  return (
    <div className={`card h-100 ${styles.card}`}>
      <div className={`card-header ${styles.header}`}>{post.name}</div>
      <div className="card-body">
        <p className={`card-text ${styles.text}`}>
          {post.description.substr(0, 200)}
        </p>
        <div className="d-flex justify-content-between align-items-center">
          <Link
            className={`card-link text-capitalize ${styles.link}`}
            to={`/${post.name.replaceAll(" ", "-")}/about`}
          >
            Read More
          </Link>
          <div className={styles.candidates}>0 candidates</div>
        </div>

        <button
          className={`btn mt-3 py-2 ${styles.btn}`}
          onClick={() => triggerModal(post.id)}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Post;
