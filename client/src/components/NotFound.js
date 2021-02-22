import { Link } from "react-router-dom";

export default () => {
  return (
    <div className="error-container">
      <h1 className="error-title"> Not Found </h1>
      <p> Sorry! We couldn't find the page you're looking for.</p>
      <Link className="home-btn" to="/">
        Back to Home
      </Link>
    </div>
  );
};
