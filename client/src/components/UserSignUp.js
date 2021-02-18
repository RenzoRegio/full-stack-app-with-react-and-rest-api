export default function UserSignUp() {
  return (
    <div className="bounds">
      <div className="grid-33 centered signin">
        <div>
          <form>
            <div>
              <input
                id="firstName"
                name="firstName"
                type="text"
                className=""
                placeholder="First Name"
                value=""
              />
            </div>
            <div>
              <input
                id="lastName"
                name="lastName"
                type="text"
                className=""
                placeholder="Last Name"
                value=""
              />
            </div>
            <div>
              <input
                id="emailAddress"
                name="emailAddress"
                type="text"
                className=""
                placeholder="Email Address"
                value=""
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                className=""
                placeholder="Password"
                value=""
              />
            </div>
            <div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className=""
                placeholder="Confirm Password"
                value=""
              />
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">
                Sign Up
              </button>
              <button className="button button-secondary">Cancel</button>
            </div>
          </form>
        </div>
        <p>&nbsp;</p>
        <p>
          Already have a user account? <a href="#">Click here</a> to sign in!
        </p>
      </div>
    </div>
  );
}
