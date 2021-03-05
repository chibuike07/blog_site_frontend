import { AuthAxios } from "../../../helper/CookieRequest";
import {
  successToastify,
  errorToastify,
} from "../../../Common/react_toastify/toastify";
const { REACT_APP_ENDPOINT } = process.env;

export const handleComment = ({
  setShowCommentBox,
  setShowDropDown,
  posts,
  myPosts,
  setState,
  setShowForm,
}) => {
  setShowDropDown((currentVal) => !currentVal);
  setShowCommentBox(false);
  setShowForm(false);

  if (posts.length) {
    setState((data) => ({
      ...data,
      commentMutationLists: ["comment"],
    }));
  } else if (myPosts.length) {
    setState((data) => ({
      ...data,
      commentMutationLists: ["comment", "edit", "delete"],
    }));
  }
};

export const handleDeletePostByUser = async ({ id, setState, myPosts }) => {
  await AuthAxios.delete(`${REACT_APP_ENDPOINT}/post/${id}`, {
    "Content-Type": "application/json",
    withCredentials: true,
  })
    .then((res) => {
      const remainingPost = myPosts.filter(({ _id }) => _id !== id);
      setState((data) => ({
        ...data,
        myPosts: remainingPost,
      }));
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

export const handleSubmitComment = async ({
  id,
  message,
  setShowCommentBox,
}) => {
  setShowCommentBox(false);
  await AuthAxios.put(
    `${REACT_APP_ENDPOINT}/comment/${id}`,
    { message },
    {
      "Content-Type": "application/json",
      withCredentials: true,
    }
  )
    .then((res) => {
      console.log("res.data.mwaaFW", res.dat);
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

export const handleDropDownClick = async ({
  value,
  id,
  setShowCommentBox,
  setShowForm,
  setState,
  myPosts,
}) => {
  switch (value.toLowerCase()) {
    case "comment":
      setShowCommentBox(true);
      setShowForm(false);
      break;
    case "edit":
      setShowCommentBox(false);
      setShowForm(true);
      break;

    case "delete":
      handleDeletePostByUser({ id, setState, myPosts });
      break;
    default:
      break;
  }
};

export const handleCommentTitleClick = ({ id, history }) => {
  history.push({
    pathname: `/preview_comment/${id}`,
  });
};
