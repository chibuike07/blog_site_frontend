import { AuthAxios } from "../../../../helper/CookieRequest";
import {
  successToastify,
  errorToastify,
} from "../../../../Common/react_toastify/toastify";

export const handleSubmit = async ({
  e,
  firstName,
  lastName,
  email,
  password,
  url,
  history,
}) => {
  e.preventDefault();
  let data = { firstName, lastName, email, password };

  await AuthAxios.post(`${url}`, data, {
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
