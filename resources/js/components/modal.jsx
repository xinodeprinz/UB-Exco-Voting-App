import styles from "../../css/modules/modal.module.css";
import { FaTrash } from "react-icons/fa";

const Modal = ({ becomeACandidate, post }) => {
  return (
    <>
      <button
        type="button"
        id="showModal"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#modal"
        hidden
      />

      <div
        className="modal fade"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        id="modal"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className={`modal-title ${styles.title}`}>
                selected post:
                <span>{post.name}</span>
              </h5>
              <button
                type="button"
                className="btn-close"
                id="closeModal"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <button
                className={`btn ${post.isFacultyCandidate ? styles.remove : styles.faculty}`}
                onClick={() => becomeACandidate("faculty")}
              >
                {post.isFacultyCandidate ?
                  <div className="d-flex justify-content-center align-items-center">
                    <FaTrash />
                    <span className="ms-1">Remove - Faculty</span>
                  </div> : 'faculty level'}
              </button>
              <button
                className={`btn ${post.isDepartmentCandidate ? styles.remove : styles.department}`}
                onClick={() => becomeACandidate("department")}
              >
                {post.isDepartmentCandidate ?
                  <div className="d-flex justify-content-center align-items-center">
                    <FaTrash />
                    <span className="ms-1">Remove - Department</span>
                  </div> : 'departmental level'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
