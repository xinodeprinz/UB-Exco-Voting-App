import { Link } from "@inertiajs/react";
import styles from "../../css/modules/post.module.css";

const Post = ({ triggerModal, post }) => {
  return (
    <div className={`card h-100 ${styles.card}`}>
      <div className={`card-header ${styles.header}`}>{post.name}</div>
      <div className="card-body">
        <p className={`card-text ${styles.text}`}>
          {post.description.substr(0, 200)}
        </p>
        <Link
          className={`card-link text-capitalize ${styles.link}`}
          href={`/${post.name.replaceAll(" ", "-")}/about`}
        >
          Read More
        </Link> <hr />
        <div className="mt-2">
          <div className="text-center">
            <h6 className={styles.candTitle}>number of candidates</h6>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className={styles.candidates}>Faculty: {post.facultyCandidates}</div>
            <div className={styles.candidates}>Department: {post.departmentCandidates}</div>
          </div>
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
