import React, { useState } from "react";
import Input from "../../Common/Input.component/Input";
import axios from "axios";
import {
  successToastify,
  errorToastify,
} from "../../Common/react_toastify/toastify";
import Button from "../../Common/Button.component/Button";
import TextArea from "../../Common/Textarea/TextArea";

const PostForm = ({ url }) => {
  const [title, setTitle] = useState("");
  const [body, setPost] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = { title, body };

    await axios
      .post(`${url}`, data, {
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

            <div className="button-group">
              <Button text="Add Post" backgroundColor={"blue"} width="100px" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
