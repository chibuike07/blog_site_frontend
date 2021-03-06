import { AuthAxios } from "../../../helper/CookieRequest";
import {
  successToastify,
  errorToastify,
} from "../../../Common/react_toastify/toastify";

export const handleEditForm = async ({
  title,
  body,
  specifiedPost,
  setPost,
  setTitle,
  updateUrl,
  myPosts,
  setState,
  editedDataIndex,
}) => {
  //loop through the edited post and adjust to the updates
  specifiedPost &&
    specifiedPost.map(async (value) => {
      value.title = title ? title : value.title;
      value.body = body ? body : value.body;
      value.status = true;

      // update the user post
      await AuthAxios.put(`${updateUrl}`, value, {
        "Content-Type": "application/json",
        withCredentials: true,
      })
        .then((res) => {
          //replace the edited data with the current data
          myPosts.splice(editedDataIndex, 1, res.data.updatedPost);

          //setting data to the state
          setState((data) => ({
            ...data,
            myPosts: myPosts,
          }));
          setTitle("");
          setPost("");
          successToastify(res.data.message);
        })
        .catch((err) =>
          err.toString().toLowerCase().includes("network")
            ? errorToastify("network error. please try later")
            : err.response === undefined
            ? false
            : errorToastify(err.response.data.message)
        );
    });
};

export const handleSubmit = async ({
  e,
  setTitle,
  setPost,
  url,
  title,
  body,
}) => {
  e.preventDefault();
  let data = { title, body };

  // submit post
  await AuthAxios.post(`${url}`, data, {
    "Content-Type": "application/json",
    withCredentials: true,
  })
    .then((res) => {
      // show success message to the user
      successToastify(res.data.message);
      // set fields to empty
      setTitle("");
      setPost("");
    })
    .catch((err) =>
      err.toString().toLowerCase().includes("network")
        ? errorToastify("network error. please try later")
        : err.response === undefined
        ? false
        : errorToastify(err.response.data.message)
    );
};
