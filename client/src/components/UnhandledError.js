import { Link } from "react-router-dom";

export default () => {
  return (
    <div className="error-container">
      <h1>Error</h1>
      <p> Sorry! We encountered an unexpected error. </p>
      <Link className="home-btn" to="/">
        Back to Home
      </Link>
    </div>
  );
};
