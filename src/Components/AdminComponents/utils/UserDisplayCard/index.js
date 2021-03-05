import { AuthAxios } from "../../../../helper/CookieRequest";
import {
  successToastify,
  errorToastify,
} from "../../../../Common/react_toastify/toastify";
const { REACT_APP_ENDPOINT } = process.env;

export const handleDeleteUser = async ({ _id }) => {
  await AuthAxios.delete(`${REACT_APP_ENDPOINT}/admin/clear_client/${_id}`, {
    "Content-Type": "application/json",
    withCredentials: true,
  })
    .then((res) => {
      console.log("res.data", res.data);
      successToastify(res.data.message);
    })
    .catch((err) =>
      err.toString().toLowerCase().includes("network")
        ? errorToastify("network error. please try later")
        : err.response === undefined
        ? false
        : errorToastify(err.response.data.message)
    );
};

export const fetchSingleUser = async ({ _id, setModal, setState }) => {
  await AuthAxios.get(`${REACT_APP_ENDPOINT}/admin/get_one_client/${_id}`, {
    "Content-Type": "application/json",
    withCredentials: true,
  })
    .then((res) => {
      console.log("res.data.data", res.data.data);
      setState((data) => ({
        ...data,
        specifiedUserData: res.data.data,
      }));

      setModal(true);
    })
    .catch((err) =>
      err.toString().toLowerCase().includes("network")
        ? errorToastify("network error. please try later")
        : err.response === undefined
        ? false
        : errorToastify(err.response.data.message)
    );
};

export const handlePreviewSingleUser = ({ _id, history }) => {
  history.push(`/admin/preview_user/${_id}`);
};
