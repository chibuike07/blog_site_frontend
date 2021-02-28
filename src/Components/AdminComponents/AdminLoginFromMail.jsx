import React, { useEffect } from "react";

import {
  successToastify,
  errorToastify,
} from "../../Common/react_toastify/toastify";
import { AuthAxios } from "../../helper/CookieRequest";

const AdminLoginFromMail = ({ match, history }) => {
  const { email, password } = match.params;
  const { REACT_APP_ENDPOINT } = process.env;

  useEffect(() => {
    const loginFromEmail = async () => {
      let data = { email, password };

      await AuthAxios.post(`${REACT_APP_ENDPOINT}/admin/login`, data, {
        "Content-Type": "application/json",
        withCredentials: true,
      })
        .then((res) => {
          successToastify(res.data.message);
          sessionStorage.setItem("client", "client");

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
    loginFromEmail();

    return [loginFromEmail];
  }, [REACT_APP_ENDPOINT, email, password, history]);
  return <div></div>;
};

export default AdminLoginFromMail;
