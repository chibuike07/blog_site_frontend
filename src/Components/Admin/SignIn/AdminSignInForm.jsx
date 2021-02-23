import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import useStyles from "./UseStyle";
import CustomLink from "../../../Common/Link.component/Link";
import { handleAdminSignIn } from "../AdminSignUp/utils";

const AdminSignInForm = ({ url, history }) => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      className={classes.form}
      noValidate
      onSubmit={(e) => handleAdminSignIn({ e, email, password, url, history })}
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
        login
      </Button>
      <Grid container>
        <Grid item xs>
          <CustomLink url="/" color="blue" text="Forgot password?" />
        </Grid>
        <Grid item>
          <CustomLink
            url="/admin/signup"
            text="Don't have account? Sign up"
            color="blue"
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default withRouter(AdminSignInForm);
