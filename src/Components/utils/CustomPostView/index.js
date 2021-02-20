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
}) => {
  setShowDropDown((currentVal) => !currentVal);
  setShowCommentBox(false);

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

export const handleDeletePostByUser = async ({ id }) => {
  await AuthAxios.delete(`${REACT_APP_ENDPOINT}/post/${id}`, {
    "Content-Type": "application/json",
    withCredentials: true,
  })
    .then((res) => successToastify(res.data.message))
    .catch((err) =>
      err.response === undefined
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
      successToastify(res.data.message);
    })
    .catch((err) =>
      err.response === undefined
        ? false
        : errorToastify(err.response.data.message)
    );
};

export const handleDropDownClick = async ({
  value,
  id,
  setShowCommentBox,
  setShowForm,
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
      handleDeletePostByUser({ id });
      break;
    default:
      break;
  }
};
