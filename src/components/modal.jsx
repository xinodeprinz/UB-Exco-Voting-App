import styles from "../modules/modal.module.css";

const Modal = ({ becomeACandidate }) => {
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
                <span>president</span>
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
                className={`btn ${styles.faculty}`}
                onClick={() => becomeACandidate("faculty")}
              >
                faculty level
              </button>
              <button
                className={`btn ${styles.department}`}
                onClick={() => becomeACandidate("department")}
              >
                departmental level
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
