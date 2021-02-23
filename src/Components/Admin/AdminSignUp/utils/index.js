import { AuthAxios } from "../../../../helper/CookieRequest";
import {
  successToastify,
  errorToastify,
  infoToastify,
} from "../../../../Common/react_toastify/toastify";

export const handleAdminSignUp = async ({
  e,
  email,
  password,
  url,
  history,
  robotCheck,
}) => {
  e.preventDefault();
  if (!robotCheck) {
    infoToastify("please kindly verify that you are not a robot");
    return;
  }

  let data = { email, password };

  await AuthAxios.post(`${url}`, data, {
    "Content-Type": "application/json",
  })
    .then((res) => {
      successToastify(res.data.message);
      history.push("/admin/login");
    })
    .catch((err) =>
      err.toString().toLowerCase().includes("network")
        ? errorToastify("please check your network and try again")
        : err.response === undefined
        ? false
        : errorToastify(err.response.data.message)
    );
};

export const handleAdminSignIn = async ({
  e,
  email,
  password,
  history,
  url,
}) => {
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
      err.toString().toLowerCase().includes("network")
        ? errorToastify("network break down. please try again later")
        : err.response === undefined
        ? false
        : errorToastify(err.response.data.message)
    );
};
