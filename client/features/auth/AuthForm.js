import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../../app/store";

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;

    dispatch(authenticate({ username, password, method: formName }));
  };

  const handleSignUp = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    const first = evt.target.first.value;
    const last = evt.target.last.value;
    dispatch(
      authenticate({ username, password, first, last, method: formName })
    );
  };
  return (
    <div>
      {displayName === "Sign Up" ? (
        <form onSubmit={handleSignUp} name={name}>
          <div>
            <label htmlFor="username">
              <small>Username</small>
            </label>
            <input name="username" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <div>
            <label htmlFor="first">
              <small>First name</small>
            </label>
            <input name="first" type="text" />
          </div>
          <div>
            <label htmlFor="last">
              <small>Last name</small>
            </label>
            <input name="last" type="text" />
          </div>
          <div>
            <button type="submit">{displayName}</button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="username">
              <small>Username</small>
            </label>
            <input name="username" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <div>
            <button type="submit">{displayName}</button>
          </div>
        </form>
      )}

      {error && <div> {error} </div>}

      {console.log(displayName)}
    </div>
  );
};

export default AuthForm;
