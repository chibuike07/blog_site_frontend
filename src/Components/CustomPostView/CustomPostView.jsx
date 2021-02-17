import React, { useEffect, useContext, useState } from "react";
import { BounceLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import List from "../../Common/List.component/List";
import TextArea from "../../Common/Textarea/TextArea";
import Button from "../../Common/Button.component/Button";

import {
  successToastify,
  errorToastify,
} from "../../Common/react_toastify/toastify";
import { UserContext } from "../../Context_files/UserContext";
import PostText from "../UserMutations/PostText";
import { AuthAxios } from "../../helper/CookieRequest";

const PostViews = ({ title, body, id, createdAt, updatedAt, status }) => {
  const { REACT_APP_ENDPOINT } = process.env;

  const [disableLoader, setDisableLoader] = useState(true);
  const [showDropDown, setShowDropDown] = useState(false);
  const [message, setHandlePostComment] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [{ myPosts, posts, commentMutationLists }, setState] = useContext(
    UserContext
  );

  const handleComment = () => {
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

  const handleDeletePostByUser = async () => {
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

  const handleDropDownClick = async (value) => {
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
        handleDeletePostByUser();
        break;
      default:
        break;
    }
  };

  const handleSubmitComment = async (postId) => {
    setShowCommentBox(false);
    await AuthAxios.put(
      `${REACT_APP_ENDPOINT}/comment/${postId}`,
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

  useEffect(() => {
    const setTimeOutOnLoader = window.setTimeout(() => {
      setDisableLoader(false);
    }, 3000);

    return () => {
      clearTimeout(setTimeOutOnLoader);
    };
  }, [REACT_APP_ENDPOINT]);

  const feed = title ? (
    <div
      className="card"
      key={id}
      style={{
        marginBottom:
          "1rem                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              ",
      }}
    >
      <div className="card-body">
        <div className="card-text">
          {!status && (
            <>
              <span style={{ opacity: "0.34" }}>~ createdOn</span>{" "}
              <span className="card-text" style={{ opacity: "0.34" }}>
                {createdAt}
              </span>
            </>
          )}
          {status && (
            <span className="card-text" style={{ opacity: "0.34" }}>
              {"~ Edited"}
            </span>
          )}
        </div>
        <div className="d-flex justify-content-between">
          <div className="card-title ">
            <h2 style={{ textTransform: "capitalize" }}>{title}</h2>
          </div>

          <div>
            <FontAwesomeIcon
              icon={faEllipsisV}
              onClick={() => handleComment()}
              cursor="pointer"
            />
            <div className={"container"}>
              {showDropDown && (
                <nav className="card">
                  {commentMutationLists &&
                    commentMutationLists.map((value, i) => (
                      <List
                        text={value}
                        key={i}
                        textTransform="capitalize"
                        listStyle="none"
                        className="container-fluid"
                        cursor="pointer"
                        click={() => handleDropDownClick(value)}
                        color="gray"
                      />
                    ))}
                </nav>
              )}
            </div>
          </div>
        </div>
        <hr />
        <div className="content">
          <p className="card-text">{`${body[0].toUpperCase()}${body.slice(
            1
          )}`}</p>
        </div>
        <hr />
        {showCommentBox && (
          <div className="container-fluid">
            <div className="card-title">
              <h2
                className="card-title"
                style={{ textTransform: "capitalize" }}
              >
                post comment
              </h2>
            </div>
            <hr />
            <TextArea
              cols={30}
              rows={5}
              placeholder="add your post"
              onChange={(e) => setHandlePostComment(e.target.value)}
              name="comment"
              value={message}
              paddingLeft="1%"
            />
            <div className="card-btn">
              <Button
                text="post comment"
                className="card-btn"
                border="none"
                padding="1%"
                backgroundColor="blue"
                click={() => handleSubmitComment(id)}
                borderRadius="5px"
              />
            </div>
          </div>
        )}
      </div>
      {showForm && <PostText _id={id} />}
    </div>
  ) : (
    <div>{disableLoader && <BounceLoader size="1" />}</div>
  );
  return (
    <div
      className="container-fluid "
      style={{ width: "100%", marginTop: "1rem" }}
    >
      {feed}
    </div>
  );
};

export default PostViews;
