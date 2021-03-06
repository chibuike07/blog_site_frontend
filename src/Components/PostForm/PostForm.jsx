import React, { useState, useEffect, useContext } from "react";
import PostFormStyle from "../../Styles/PostForm/PostForm.module.css";
import Input from "../../Common/Input.component/Input";
import Button from "../../Common/Button.component/Button";
import TextArea from "../../Common/Textarea/TextArea";
import { handleEditForm, handleSubmit } from "../utils/PostForm";
import { UserContext } from "../../Context_files/UserContext";

const PostForm = ({ url, updateUrl, post, myPosts, index, specifiedPost }) => {
  const [title, setTitle] = useState(post && post.title);
  const [body, setPost] = useState(post && post.body);

  const [{ mutationFormTag }, setState] = useContext(UserContext);
  const { container, tag, buttonWrapper, btn } = PostFormStyle;

  const timeInterval = setTimeout(() => {
    if (!isNaN(index) || index === "") {
      return setState((data) => ({
        ...data,
        mutationFormTag: "upload blog",
      }));
    }
  }, 3000);

  useEffect(() => {
    return () => {
      clearInterval(timeInterval);
    };
  }, [post, setState, timeInterval]);

  return (
    <div className={`container-fluid ${container}`}>
      <div className="card">
        <div className="card-body">
          <h2 className={`card-text ${tag}`}>{mutationFormTag}</h2>
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
              width="100%"
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
              width="100%"
            />
            <br />

            <div className={`button-group ${buttonWrapper}`}>
              {isNaN(index) && (
                <Button
                  text="Add Post"
                  backgroundColor={"rgb(48, 187, 181)"}
                  className={`btn ${btn}`}
                />
              )}
            </div>
          </form>

          {!isNaN(index) && (
            <div className={`button-group`}>
              <Button
                text="Update post"
                backgroundColor={"rgb(48, 187, 181)"}
                marginRight="1rem"
                className={`btn ${btn}`}
                click={() =>
                  handleEditForm({
                    title,
                    body,
                    specifiedPost,
                    setPost,
                    setTitle,
                    updateUrl,
                    myPosts,
                    setState,
                  })
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostForm;
