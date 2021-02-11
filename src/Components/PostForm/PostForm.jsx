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
      })
      .catch((err) =>
        err.response === undefined
          ? false
          : errorToastify(err.response.data.message)
      );
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="add title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextArea
              cols={30}
              rows={5}
              placeholder="add post"
              name="post"
              value={body}
              onChange={(e) => setPost(e.target.value)}
            />

            <div className="card-btn">
              <Button text="add post" backgroundColor={"blue"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
