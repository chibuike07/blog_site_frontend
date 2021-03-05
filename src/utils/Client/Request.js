import { AuthAxios } from "../../helper/CookieRequest";
import {
  infoToastify,
  errorToastify,
  successToastify,
} from "../../Common/react_toastify/toastify";
const { REACT_APP_ENDPOINT } = process.env;
export const fetchPost = async ({
  setState,
  setDisplayMyPost,
  setDisplayFeed,
  setDisplayProfile,
  setdisplayPostForm,
}) => {
  await AuthAxios.get(`${REACT_APP_ENDPOINT}/post`, {
    "Content-Type": "application/json",
    withCredentials: true,
  })
    .then((res) => {
      if (res.status === 204) {
        infoToastify(res.data.message);
      }

      setState((data) => ({
        ...data,
        posts: res.data.data,
        myPosts: [],
      }));
      setDisplayFeed(true);
      setDisplayMyPost(false);
      setdisplayPostForm(false);
      setDisplayProfile(false);
    })
    .catch((err) =>
      err.toString().toLowerCase().includes("network")
        ? errorToastify("network error. please try later")
        : err.response === undefined
        ? false
        : errorToastify(err.response.data.message)
    );
};

export const fetchMyPosts = async ({
  setState,
  setDisplayMyPost,
  setDisplayFeed,
  setDisplayProfile,
  setdisplayPostForm,
}) => {
  await AuthAxios.get(`${REACT_APP_ENDPOINT}/mypost`, {
    "Content-Type": "application/json",
    withCredentials: true,
  })
    .then((res) => {
      setState((data) => ({
        ...data,
        myPosts: res.data.data,
        posts: [],
      }));
      setDisplayMyPost(true);
      setDisplayFeed(false);
      setdisplayPostForm(false);
      setDisplayProfile(false);
    })
    .catch((err) =>
      err.toString().toLowerCase().includes("network")
        ? errorToastify("network error. please try later")
        : err.response === undefined
        ? false
        : errorToastify(err.response.data.message)
    );
};

export const fetchUserProfileData = async ({
  setState,
  setDisplayMyPost,
  setDisplayFeed,
  setDisplayProfile,
  setdisplayPostForm,
}) => {
  await AuthAxios.get(`${REACT_APP_ENDPOINT}/user/get_profile`, {
    "Content-Type": "application/json",
    withCredentials: true,
  })
    .then((res) => {
      setState((data) => ({
        ...data,
        personalData: res.data.data,
      }));
      setDisplayProfile(true);
      setdisplayPostForm(false);
      setDisplayFeed(false);
      setDisplayMyPost(false);
    })
    .catch((err) =>
      err.toString().toLowerCase().includes("network")
        ? errorToastify("network error. please try later")
        : err.response === undefined
        ? false
        : errorToastify(err.response.data.message)
    );
};

export const handleClientSignOut = async ({ history }) => {
  await AuthAxios.put(
    `${REACT_APP_ENDPOINT}/logger_status`,
    { loggedIn: false },
    {
      "Content-Type": "application/json",
      withCredentials: true,
    }
  )
    .then((res) => {
      successToastify(res.data.message);
      sessionStorage.removeItem("client");

      history.push("/login");
    })
    .catch((err) =>
      err.toString().toLowerCase().includes("network")
        ? errorToastify("network error. please try later")
        : err.response === undefined
        ? false
        : errorToastify(err.response.data.message)
    );
};
