import React, { useEffect, useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import CustomPostViewStyles from "../../Styles/CustomPostView/CustomPostView.module.css";
import { BounceLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../Context_files/UserContext";
import PostText from "../UserMutations/PostText";
import {
  handleComment,
  handleCommentTitleClick,
} from "../utils/CustomPostView";
import CommentBox from "./CommentBox";
import MutationDropDown from "./MutationDropDown";

const PostViews = ({
  title,
  body,
  id,
  createdAt,
  updatedAt,
  status,
  history,
  index,
}) => {
  const { REACT_APP_ENDPOINT } = process.env;
  const [disableLoader, setDisableLoader] = useState(true);
  const [showDropDown, setShowDropDown] = useState(false);
  const [message, setHandlePostComment] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [{ myPosts, posts }, setState] = useContext(UserContext);
  const {
    overallContainer,
    container,
    text,
    cardTitle,
    options,
  } = CustomPostViewStyles;

  useEffect(() => {
    //disabling loading after 10 seconds
    const setTimeOutOnLoader = window.setTimeout(() => {
      setDisableLoader(false);
    }, 10000);

    return () => {
      // clearing interval
      clearTimeout(setTimeOutOnLoader);
    };
  }, [REACT_APP_ENDPOINT]);

  const feed = title ? (
    <div className={`card ${container}`} key={id}>
      <div className="card-body">
        <div className="card-text">
          {!status && (
            <>
              <span className={text}>~ createdOn</span>{" "}
              <span className={`card-text ${text}`}>{createdAt}</span>
            </>
          )}
          {status && <span className={`card-text ${text}`}>~ edited</span>}
        </div>
        <div className="d-flex justify-content-between">
          <div className="card-title ">
            <h2
              className={cardTitle}
              onClick={() => handleCommentTitleClick({ id, history })}
            >
              {title}
            </h2>
          </div>

          <div>
            <FontAwesomeIcon
              icon={faEllipsisV}
              onClick={() =>
                handleComment({
                  setShowCommentBox,
                  setShowDropDown,
                  setShowForm,
                  posts,
                  myPosts,
                  setState,
                })
              }
              className={options}
              title="Comment on this post"
            />
            <div className={"container"}>
              {showDropDown && (
                <MutationDropDown
                  id={id}
                  setShowCommentBox={setShowCommentBox}
                  setShowForm={setShowForm}
                />
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
          <CommentBox
            id={id}
            message={message}
            setHandlePostComment={setHandlePostComment}
            setShowCommentBox={setShowCommentBox}
          />
        )}
      </div>
      {showForm && <PostText data={{ body, title }} id={id} index={index} />}
    </div>
  ) : (
    <div>{disableLoader && <BounceLoader />}</div>
  );
  return <div className={`container-fluid ${overallContainer}`}>{feed}</div>;
};

export default withRouter(PostViews);
