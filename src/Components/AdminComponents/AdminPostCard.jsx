import React, { useEffect, useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import AdminPostCardStyles from "../../Styles/AdminComponents/AdminPostCard.module.css";
import PostText from "../UserMutations/PostText";
import { AdminContext } from "../../Context_files/AdminContext";
import { handleComment, handleCommentTitleClick } from "./utils/AdminPostCard";
import DisplayPostOptionDropDown from "./DisplayPostOptionDropDown";
import DisplayCommentBox from "./DisplayCommentBox";

const AdminPostCard = ({ title, body, id, history }) => {
  const { REACT_APP_ENDPOINT } = process.env;
  const [disableLoader, setDisableLoader] = useState(true);
  const [showDropDown, setShowDropDown] = useState(false);
  const [message, setHandlePostComment] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [, setState] = useContext(AdminContext);

  const { container, card, heading } = AdminPostCardStyles;

  useEffect(() => {
    const setTimeOutOnLoader = window.setTimeout(() => {
      setDisableLoader(false);
    }, 3000);

    return () => {
      clearTimeout(setTimeOutOnLoader);
    };
  }, [REACT_APP_ENDPOINT, id, setState]);

  const feed = title ? (
    <div className={`card ${card}`} key={id}>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div className="card-title ">
            <h2
              className={heading}
              onClick={() => handleCommentTitleClick({ id, history })}
            >
              {title}
            </h2>
          </div>

          <div>
            <FontAwesomeIcon
              icon={faEllipsisV}
              onClick={() =>
                handleComment({ setShowDropDown, setShowCommentBox })
              }
              opacity="0"
              cursor="pointer"
            />

            {showDropDown && (
              <DisplayPostOptionDropDown
                id={id}
                setShowCommentBox={setShowCommentBox}
                setShowForm={setShowForm}
              />
            )}
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
          <DisplayCommentBox
            id={id}
            message={message}
            setHandlePostComment={setHandlePostComment}
            setShowCommentBox={setShowCommentBox}
          />
        )}
      </div>
      {showForm && <PostText _id={id} />}
    </div>
  ) : (
    <div>{disableLoader && <BounceLoader size="1" />}</div>
  );
  return <div className={`container-fluid  ${container}`}>{feed}</div>;
};

export default withRouter(AdminPostCard);
