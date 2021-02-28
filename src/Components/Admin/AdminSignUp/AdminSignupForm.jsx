import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import useStyles from "./UseStyle";
import CustomLink from "../../../Common/Link.component/Link";
import { handleAdminSignUp } from "./utils";

const AdminForm = ({ url, history }) => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [robotCheck, setRobotCheck] = useState(false);

  return (
    <form
      className={classes.form}
      noValidate
      onSubmit={(e) =>
        handleAdminSignUp({ e, url, email, password, history, robotCheck })
      }
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
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                value={robotCheck}
                color="primary"
                onClickCapture={() => setRobotCheck((curState) => !curState)}
              />
            }
            label="I am not a robot"
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
            url="/admin/login"
            text="Already have an account? Sign in"
            color="blue"
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default withRouter(AdminForm);
