import React, { useState, useEffect } from "react";
import Input from "../../Common/Input.component/Input";

import {
  successToastify,
  errorToastify,
} from "../../Common/react_toastify/toastify";
import Button from "../../Common/Button.component/Button";
import TextArea from "../../Common/Textarea/TextArea";
import { AuthAxios } from "../../helper/CookieRequest";

const PostForm = ({ url, updateUrl, post }) => {
  const [title, setTitle] = useState("");
  const [body, setPost] = useState("");

  const handleEditForm = async () => {
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
            successToastify(res.data.message);
            setTitle("");
            setPost("");
          })
          .catch((err) =>
            err.response === undefined
              ? false
              : errorToastify(err.response.data.message)
          );
      });
  };

  const handleSubmit = async (e) => {
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

  useEffect(() => {
    const addtoState = () => {
      if (post.length) {
        setPost(post[0].body);
        setTitle(post[0].title);
      }
    };
    addtoState();

    return [addtoState];
  }, [post]);
  return (
    <div
      className="container-fluid"
      style={{
        marginTop: "1rem",
      }}
    >
      <div className="card">
        <div className="card-body">
          <h2>Post Blog</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="form-group">
            <Input
              type="text"
              placeholder="Add Title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              width="50%"
            />
            <br />
            <TextArea
              cols={30}
              rows={5}
              placeholder="Add Post"
              name="post"
              value={body}
              onChange={(e) => setPost(e.target.value)}
              paddingLeft="1%"
              border="2px solid #ccc"
              width="80%"
            />
            <br />

            <div
              className="button-group d-flex  align-items-center"
              style={{ width: "70%", marginRight: "1%" }}
            >
              <Button
                text="Add Post"
                backgroundColor={"blue"}
                width="100px"
                marginRight="1rem"
              />{" "}
            </div>
          </form>
          <div className="button-group">
            <Button
              text="update post"
              backgroundColor={"blue"}
              width="100px"
              marginRight="1rem"
              click={() => handleEditForm()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
