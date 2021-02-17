import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import useStyles from "./UseStyle";

import CustomLink from "../../../Common/Link.component/Link";
import {
  successToastify,
  errorToastify,
} from "../../../Common/react_toastify/toastify";
import ForgotPasswordCheckout from "./ForgotPasswordCheckout";
import { AuthAxios } from "../../../helper/CookieRequest";

const Form = ({ url, history }) => {
  const classes = useStyles();
  const { REACT_APP_ENDPOINT } = process.env;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [displayForgotPasswordForm, setDisplayForgotPasswordForm] = useState(
    false
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = { email, password };

    await AuthAxios.post(`${url}`, data, {
      "Content-Type": "application/json",
      withCredentials: true,
    })
      .then((res) => {
        successToastify(res.data.message);
        sessionStorage.setItem("client", "client");

        // navigating to the dashboard
        return history.push({
          pathname: "/dashboard",
        });
      })
      .catch((err) =>
        err.response === undefined
          ? false
          : errorToastify(err.response.data.message)
      );
  };

  const handleDisplayForgetPasswordForm = (e) => {
    e.preventDefault();
    setDisplayForgotPasswordForm(true);
    setOpenModal(true);
  };

  return (
    <>
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
            <CustomLink
              url={""}
              color="blue"
              text="Forgot password?"
              click={(e) => handleDisplayForgetPasswordForm(e)}
            />
          </Grid>
          <Grid item>
            <CustomLink
              url="/signup"
              text="Don't have account? Sign up"
              color="blue"
            />
          </Grid>
        </Grid>
      </form>
      {displayForgotPasswordForm && (
        <ForgotPasswordCheckout
          url={`${REACT_APP_ENDPOINT}/replace_password`}
          openModal={openModal}
          setModal={setOpenModal}
        />
      )}
    </>
  );
};

export default withRouter(Form);
