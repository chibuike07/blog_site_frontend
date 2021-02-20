import React, { useEffect, useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import List from "../../Common/List.component/List";
import TextArea from "../../Common/Textarea/TextArea";
import Button from "../../Common/Button.component/Button";
import PostText from "../UserMutations/PostText";
import { AdminContext } from "../../Context_files/AdminContext";
import {
  handleComment,
  handleSubmitComment,
  handleDropDownClick,
  handleCommentTitleClick,
} from "./utils/AdminPostCard";
const AdminPostCard = ({ title, body, id, history }) => {
  const { REACT_APP_ENDPOINT } = process.env;
  const [disableLoader, setDisableLoader] = useState(true);
  const [showDropDown, setShowDropDown] = useState(false);
  const [message, setHandlePostComment] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [{ AdminCommentMutation }, setState] = useContext(AdminContext);

  useEffect(() => {
    const setTimeOutOnLoader = window.setTimeout(() => {
      setDisableLoader(false);
    }, 3000);

    return () => {
      clearTimeout(setTimeOutOnLoader);
    };
  }, [REACT_APP_ENDPOINT, id, setState]);

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
        <div className="d-flex justify-content-between">
          <div className="card-title ">
            <h2
              style={{
                textTransform: "capitalize",
                textDecoration: "underline",
                cursor: "pointer",
              }}
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
              cursor="pointer"
            />
            <div className={"container"}>
              {showDropDown && (
                <nav className="card">
                  {AdminCommentMutation &&
                    AdminCommentMutation.map((value, i) => (
                      <List
                        text={value}
                        key={i}
                        textTransform="capitalize"
                        listStyle="none"
                        className="container-fluid"
                        cursor="pointer"
                        click={() =>
                          handleDropDownClick({
                            value,
                            setShowCommentBox,
                            setShowForm,
                            id,
                          })
                        }
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
                click={() =>
                  handleSubmitComment({ id, message, setShowCommentBox })
                }
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

export default withRouter(AdminPostCard);
