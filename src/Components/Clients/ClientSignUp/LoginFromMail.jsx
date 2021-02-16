import React, { useEffect } from "react";
import axios from "axios";
import {
  successToastify,
  errorToastify,
} from "../../../Common/react_toastify/toastify";

const LoginFromMail = ({ match, history }) => {
  console.log(match);
  const { email, password } = match.params;
  const { REACT_APP_ENDPOINT } = process.env;

  useEffect(() => {
    const loginFromEmail = async () => {
      let data = { email, password };

      await axios
        .post(`${REACT_APP_ENDPOINT}/client/login`, data, {
          "Content-Type": "application/json",
        })
        .then((res) => {
          successToastify(res.data.message);
          sessionStorage.setItem("client", "client");
          console.log("token", res.data.token);
          document.cookie = `${process.env.REACT_APP_COOKIE_NAME_USER}=${res.data.token}`;

          console.log("document", document.cookie);

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
    loginFromEmail();

    return [loginFromEmail];
  }, [REACT_APP_ENDPOINT, email, password, history]);
  return <div></div>;
};

export default LoginFromMail;
