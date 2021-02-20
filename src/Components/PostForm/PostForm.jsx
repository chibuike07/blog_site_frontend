import React, { useState, useEffect } from "react";
import Input from "../../Common/Input.component/Input";
import Button from "../../Common/Button.component/Button";
import TextArea from "../../Common/Textarea/TextArea";
import { handleEditForm, handleSubmit, addtoState } from "../utils/PostForm";

const PostForm = ({ url, updateUrl, post }) => {
  const [title, setTitle] = useState("");
  const [body, setPost] = useState("");

  useEffect(() => {
    addtoState({ post, setPost, setTitle });

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
          <form
            onSubmit={(e) =>
              handleSubmit({ e, setTitle, setPost, url, title, body })
            }
            className="form-group"
          >
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
              click={() =>
                handleEditForm({
                  title,
                  body,
                  post,
                  setPost,
                  setTitle,
                  updateUrl,
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
