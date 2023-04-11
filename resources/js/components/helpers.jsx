export const ButtonSpinner = ({ color, text }) => {
  return (
    <div
      className={`d-flex justify-content-center align-items-center text-${color}`}
    >
      <div className="spinner-grow" role="status" />
      <span className="ms-1">{text}</span>
    </div>
  );
};

export const LoadingSpinner = ({ text, top = "10rem" }) => {
  return (
    <div className="loading-spinner" style={{ top }}>
      <div className="d-flex justify-content-center align-items-center">
        <div className="spinner-grow" role="status" />
        <span className="ms-1">{text}</span>
      </div>
    </div>
  );
};
