import { AuthAxios } from "../../../helper/CookieRequest";
import {
  successToastify,
  errorToastify,
} from "../../../Common/react_toastify/toastify";

export const handleEditForm = async ({
  title,
  body,
  post,
  setPost,
  setTitle,
  updateUrl,
  myPosts,
  setState,
  editedDataIndex,
}) => {
  post &&
    post.map(async (value) => {
      value.title = title ? title : value.title;
      value.body = body ? body : value.body;
      value.status = true;

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
          err.response === undefined
            ? false
            : errorToastify(err.response.data.message)
        );
    });
};

export const addtoState = ({ post, setPost, setTitle }) => {
  if (post && post.length) {
    setPost(post[0].body);
    setTitle(post[0].title);
  }
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

  await AuthAxios.post(`${url}`, data, {
    "Content-Type": "application/json",
    withCredentials: true,
  })
    .then((res) => {
      successToastify(res.data.message);
      setTitle("");
      setPost("");
    })
    .catch((err) =>
      err.response === undefined
        ? false
        : errorToastify(err.response.data.message)
    );
};
