import { AuthAxios } from "../../helper/CookieRequest";
import { errorToastify } from "../../Common/react_toastify/toastify";
const { REACT_APP_ENDPOINT } = process.env;
export const fetchClients = async ({
  setdisplayUser,
  setdisplayDashboard,
  setdisplayPosts,
  setdisplayRegisteredIp,
  setState,
}) => {
  await AuthAxios.get(
    `${REACT_APP_ENDPOINT}/admin/get_client?page=${1}&limit=${10}`,
    {
      "Content-Type": "application/json",
      withCredentials: true,
    }
  )
    .then((res) => {
      setState((data) => ({
        ...data,
        usersList: res.data.data,
      }));
      setdisplayUser(true);
      setdisplayDashboard(false);
      setdisplayPosts(false);
      setdisplayRegisteredIp(false);
    })
    .catch((err) =>
      err.toString().toLowerCase().includes("network")
        ? errorToastify("network error. please try later")
        : err.response === undefined
        ? false
        : errorToastify(err.response.data.message)
    );
};

export const handleFetchPosts = async ({
  setdisplayUser,
  setdisplayDashboard,
  setdisplayPosts,
  setdisplayRegisteredIp,
  setState,
}) => {
  await AuthAxios.get(`${REACT_APP_ENDPOINT}/admin/getPost`, {
    "Content-Type": "application/json",
    withCredentials: true,
  })
    .then((res) => {
      setState((data) => ({
        ...data,
        clientPosts: res.data.data,
      }));
      setdisplayPosts(true);
      setdisplayUser(false);
      setdisplayDashboard(false);
      setdisplayRegisteredIp(false);
    })
    .catch((err) =>
      err.toString().toLowerCase().includes("network")
        ? errorToastify("network error. please try later")
        : err.response === undefined
        ? false
        : errorToastify(err.response.data.message)
    );
};

export const fetchRegisteredIp = async ({
  setdisplayUser,
  setdisplayDashboard,
  setdisplayPosts,
  setdisplayRegisteredIp,
  setState,
}) => {
  await AuthAxios.get(`${REACT_APP_ENDPOINT}/admin/registeredIp`, {
    "Content-Type": "application/json",
    withCredentials: true,
  })
    .then((res) => {
      setState((data) => ({
        ...data,
        registeredIp: res.data.data,
      }));

      setdisplayRegisteredIp(true);
      setdisplayUser(false);
      setdisplayDashboard(false);
      setdisplayPosts(false);
    })
    .catch((err) =>
      err.toString().toLowerCase().includes("network")
        ? errorToastify("network error. please try later")
        : err.response === undefined
        ? false
        : errorToastify(err.response.data.message)
    );
};

export const fetchLatestLoginClients = async ({ setState }) => {
  await AuthAxios.get(`${REACT_APP_ENDPOINT}/admin/dashboard_data`, {
    "Content-Type": "application/json",
    withCredentials: true,
  })
    .then((res) => {
      setState((data) => ({
        ...data,
        dashBoardStaticData: res.data.data,
      }));
    })
    .catch((err) =>
      err.toString().toLowerCase().includes("network")
        ? errorToastify("network error. please try later")
        : err.response === undefined
        ? false
        : errorToastify(err.response.data.message)
    );
};
