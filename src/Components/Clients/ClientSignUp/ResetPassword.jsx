import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import useStyles from "./UseStyle";
import { handleSubmit } from "../util/ResetPassword";

const ResetPassword = ({ match, history }) => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const checkForToken = () => {
      const { token } = match.params;
      setToken(token);
    };
    checkForToken();

    return [checkForToken];
  }, [match]);

  return (
    <div className="container" style={{ width: "50%", marginTop: "20%" }}>
      <div className="card-title">
        <h4>Reset Password</h4>
      </div>
      <form
        className={classes.form}
        noValidate
        onSubmit={(e) => handleSubmit({ e, token, email, password, history })}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              value={email}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(ref) => setEmail(ref.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              value={password}
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(ref) => setPassword(ref.target.value)}
              autoComplete="current-password"
            />
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
