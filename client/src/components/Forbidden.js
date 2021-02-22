import { Link } from "react-router-dom";

export default () => {
  return (
    <div className="error-container">
      <h1>Forbidden</h1>
      <p> You can't access this page...</p>
      <Link className="home-btn" to="/">
        Back to Home
      </Link>
    </div>
  );
};
