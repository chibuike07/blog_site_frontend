import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import useStyles from "./UseStyle";

import CustomLink from "../../../Common/Link.component/Link";
import {
  successToastify,
  errorToastify,
} from "../../../Common/react_toastify/toastify";
import { AuthAxios } from "../../../helper/CookieRequest";

const AdminSignInForm = ({ url, history }) => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = { email, password };

    await AuthAxios.post(`${url}`, data, {
      "Content-Type": "application/json",
      withCredentials: true,
    })
      .then((res) => {
        successToastify(res.data.message);
        sessionStorage.setItem("admin", "admin");

        // navigating to the dashboard
        return history.push({
          pathname: "/admin/dashboard",
        });
      })
      .catch((err) =>
        err.response === undefined
          ? false
          : errorToastify(err.response.data.message)
      );
  };

  return (
    <form className={classes.form} noValidate onSubmit={handleSubmit}>
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
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="Remember Me"
          />
        </Grid>
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
