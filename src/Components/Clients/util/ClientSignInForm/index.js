import { AuthAxios } from "../../../../helper/CookieRequest";
import {
  successToastify,
  errorToastify,
} from "../../../../Common/react_toastify/toastify";

export const handleSubmit = async ({ e, email, password, history, url }) => {
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
      err.toString().toLowerCase().includes("network")
        ? errorToastify("network error. please try later")
        : err.response === undefined
        ? false
        : errorToastify(err.response.data.message)
    );
};

export const handleDisplayForgetPasswordForm = ({
  e,
  setDisplayForgotPasswordForm,
  setOpenModal,
}) => {
  e.preventDefault();
  setDisplayForgotPasswordForm(true);
  setOpenModal(true);
};
