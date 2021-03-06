import { AuthAxios } from "../../../helper/CookieRequest";
import {
  successToastify,
  errorToastify,
  infoToastify,
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
  // toggle the dropdown
  setShowDropDown((currentVal) => !currentVal);
  // disable comment box
  setShowCommentBox(false);
  // disable form
  setShowForm(false);

  // check if the post is on feeds
  if (posts.length) {
    // update the commentMutationLists to only comment
    setState((data) => ({
      ...data,
      commentMutationLists: ["comment"],
    }));
  } else if (myPosts.length) {
    // check if the post is the user post and update the commentMutationLists with more action
    setState((data) => ({
      ...data,
      commentMutationLists: ["comment", "edit", "delete"],
    }));
  }
};

export const handleDeletePostByUser = async ({ id, setState, myPosts }) => {
  let confirmDelete = window.confirm("Continue?");

  if (confirmDelete !== true) {
    return false;
  }
  // make a delete call
  await AuthAxios.delete(`${REACT_APP_ENDPOINT}/post/${id}`, {
    "Content-Type": "application/json",
    withCredentials: true,
  })
    .then((res) => {
      // get post not deleted
      const remainingPost = myPosts.filter(({ _id }) => _id !== id);

      // update the state with the remaining data
      setState((data) => ({
        ...data,
        myPosts: remainingPost,
      }));

      // send a success message to the user
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
  // disable comment box
  setShowCommentBox(false);

  // update the comment
  await AuthAxios.put(
    `${REACT_APP_ENDPOINT}/comment/${id}`,
    { message },
    {
      "Content-Type": "application/json",
      withCredentials: true,
    }
  )
    .then((res) => {
      // send a success message to the user
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
