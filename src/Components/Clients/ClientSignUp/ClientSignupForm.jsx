import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import useStyles from "./UseStyle";
import axios from "axios";
import {
  successToastify,
  errorToastify,
} from "../../../Common/react_toastify/toastify";
import CustomLink from "../../../Common/Link.component/Link";

const Form = ({ history, url }) => {
  const classes = useStyles();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = { firstName, lastName, email, password };

    await axios
      .post(`${url}`, data, {
        "Content-Type": "application/json",
      })
      .then((res) => {
        successToastify(res.data.message);
        history.push("/login");
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
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="fname"
            name="firstName"
            variant="outlined"
            value={firstName}
            required
            fullWidth
            id="firstName"
            label="First Name"
            onChange={(ref) => setFirstName(ref.target.value)}
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            required
            fullWidth
            value={lastName}
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="lname"
            onChange={(ref) => setLastName(ref.target.value)}
          />
        </Grid>
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
            label="I want to receive inspiration, marketing promotions and updates via email."
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
        Sign Up
      </Button>
      <Grid container justify="flex-end">
        <Grid item>
          <CustomLink
            url="/login"
            text="Already have an account? Sign in"
            color="blue"
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default withRouter(Form);
