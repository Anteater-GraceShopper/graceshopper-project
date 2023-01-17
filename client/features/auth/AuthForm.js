import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../../app/store";
import { TextField, Button, Grid } from "@mui/material";
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
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          direction="column"
          sx={{
            mt: 2,
          }}>
          <form onSubmit={handleSignUp} name={name}>
            <div>
              <TextField
                required
                name="username"
                sx={{
                  input: {
                    bgcolor: "white",
                  },
                  mt: 3,
                }}
                label="Username"
                variant="outlined"
              />
            </div>
            <div>
              <TextField
                required
                name="password"
                sx={{
                  input: {
                    bgcolor: "white",
                  },
                  mt: 3,
                }}
                label="Password"
                type="password"
                variant="outlined"
              />
            </div>
            <div>
              <TextField
                required
                name="first"
                sx={{
                  input: {
                    bgcolor: "white",
                  },
                  mt: 3,
                }}
                label="First name"
                variant="outlined"
              />
            </div>
            <div>
              <TextField
                required
                name="last"
                sx={{
                  input: {
                    bgcolor: "white",
                  },
                  mt: 3,
                  mb: 3,
                }}
                label="Last name"
                variant="outlined"
              />
            </div>
            <div>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: "#28536B",
                  "&:hover": {
                    bgcolor: "#598588",
                  },
                }}>
                {displayName}
              </Button>
            </div>
          </form>
        </Grid>
      ) : (
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          direction="column"
          sx={{
            mt: 2,
          }}>
          <form onSubmit={handleSubmit} name={name}>
            <div>
              <TextField
                required
                name="username"
                sx={{
                  input: {
                    bgcolor: "white",
                  },
                  mt: 3,
                }}
                label="Username"
                variant="outlined"
              />
            </div>
            <div>
              <TextField
                required
                name="password"
                sx={{
                  input: {
                    bgcolor: "white",
                  },
                  mt: 3,
                  mb: 3,
                }}
                label="Password"
                type="password"
                variant="outlined"
              />
            </div>
            <div>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: "#28536B",
                  "&:hover": {
                    bgcolor: "#598588",
                  },
                }}>
                {displayName}
              </Button>
            </div>
          </form>
        </Grid>
      )}

      {error && <div> {error} </div>}

      {console.log(displayName)}
    </div>
  );
};

export default AuthForm;
