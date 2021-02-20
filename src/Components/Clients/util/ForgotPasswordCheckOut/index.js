import { AuthAxios } from "../../../../helper/CookieRequest";
import {
  successToastify,
  errorToastify,
} from "../../../../Common/react_toastify/toastify";

export const handleForgetPassword = async ({ e, url, setModal, email }) => {
  e.preventDefault();
  await AuthAxios.post(
    url,
    { email },
    {
      "Content-Type": "application/json",
      withCredentials: true,
    }
  )
    .then((res) => {
      successToastify(res.data.message);
      setModal(false);
    })
    .catch((err) =>
      err.response === undefined
        ? false
        : errorToastify(err.response.data.message)
    );
};
