import { Link } from "react-router-dom";

export default function UserSignIn() {
  return (
    <div className="bounds">
      <h1>Sign In</h1>
      <div>
        <form>
          <div>
            <input
              id="emailAddress"
              name="emailAddress"
              type="text"
              placeholder="Email Address"
              value=""
            />
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="text"
              placeholder="Password"
              value=""
            />
          </div>
          <div className="grid-100 pad-bottom">
            <button className="button" type="submit">
              Sign In
            </button>
            <button className="button button-secondary">Cancel</button>
          </div>
        </form>
      </div>
      <p>&nbsp;</p>
      <p>
        Don't have a user account? <Link>Click here</Link>{" "}
      </p>
    </div>
  );
}
