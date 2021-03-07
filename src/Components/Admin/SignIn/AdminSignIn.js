import React from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import useStyles from "./UseStyle";
import AdminSignInForm from "./AdminSignInForm";
import Copyright from "../../../Common/CopyRight/CopyRight";

const AdminSignInFormReg = ({ url }) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
      </div>
      <AdminSignInForm url={url} />
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default AdminSignInFormReg;
