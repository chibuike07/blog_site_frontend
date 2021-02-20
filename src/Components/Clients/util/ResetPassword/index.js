import { AuthAxios } from "../../../../helper/CookieRequest";
import {
  successToastify,
  errorToastify,
} from "../../../../Common/react_toastify/toastify";
const { REACT_APP_ENDPOINT } = process.env;

export const handleSubmit = async ({ e, token, email, password, history }) => {
  e.preventDefault();
  let data = { email, password };

  await AuthAxios.post(`${REACT_APP_ENDPOINT}/reset_password/${token}`, data, {
    "Content-Type": "application/json",
    withCredentials: true,
  })
    .then((res) => {
      successToastify(res.data.message);
      return history.push({
        pathname: "/login",
        state: { email, password },
      });
    })
    .catch((err) =>
      err.response === undefined
        ? false
        : errorToastify(err.response.data.message)
    );
};
