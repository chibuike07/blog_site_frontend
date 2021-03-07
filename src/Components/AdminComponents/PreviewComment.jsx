import React, { useEffect, useContext } from "react";
import AdminPreviewCommentstyles from "../../Styles/AdminComponents/AdminPreviewComment.module.css";
import { AdminContext } from "../../Context_files/AdminContext";
import AdminPostCard from "./AdminPostCard";
import Lists from "../../Common/List.component/List";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import Image from "../../Common/Image.component/Image";
import { fetchCommentById } from "./utils/PreViewComment";
import Scrollbar from "react-scrollbars-custom";

const PreviewComment = ({ match, history }) => {
  const { REACT_APP_ENDPOINT } = process.env;
  const { container } = AdminPreviewCommentstyles;
  const [{ specifiedPost, specifiedPostCommentPoster }, setState] = useContext(
    AdminContext
  );

  const { postId } = match.params;
  useEffect(() => {
    fetchCommentById({ postId, setState });

    return [fetchCommentById];
  }, [REACT_APP_ENDPOINT, postId, setState]);

  const { title, body, _id, comment } = specifiedPost && specifiedPost;

  const dummyUser = {
    firstName: "u",
    lastName: "n",
    profileImage: "",
  };

  const comments =
    comment &&
    comment.map(({ message, clientId }, index) => (
      <div className="card" style={{ marginBottom: "1rem" }} key={index}>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <span style={{ textTransform: "capitalize", opacity: "0.3" }}>
              {specifiedPostCommentPoster.length
                ? specifiedPostCommentPoster[index] !== undefined
                  ? specifiedPostCommentPoster[index].firstName
                  : dummyUser.firstName
                : ""}{" "}
              {specifiedPostCommentPoster.length
                ? specifiedPostCommentPoster[index] !== undefined
                  ? specifiedPostCommentPoster[index].lastName
                  : dummyUser.lastName
                : ""}
            </span>
            <div className="card" style={{ width: "5%" }}>
              {specifiedPostCommentPoster.length ? (
                specifiedPostCommentPoster[index] !== undefined ? (
                  <Image
                    src={
                      specifiedPostCommentPoster.length
                        ? specifiedPostCommentPoster[index] !== undefined
                          ? specifiedPostCommentPoster[index].profileImage
                          : dummyUser.profileImage
                        : ""
                    }
                    className="card-img"
                    borderRadius="50%"
                  />
                ) : (
                  <div
                    className="card d-flex justify-content-center align-items-center"
                    style={{ height: "7vh" }}
                  >
                    <span
                      style={{ textTransform: "capitalize", opacity: "0.3" }}
                    >
                      {specifiedPostCommentPoster.length
                        ? specifiedPostCommentPoster[index] !== undefined
                          ? specifiedPostCommentPoster[index].firstName
                          : dummyUser.firstName
                        : ""}{" "}
                      {specifiedPostCommentPoster.length
                        ? specifiedPostCommentPoster[index] !== undefined
                          ? specifiedPostCommentPoster[index].lastName
                          : dummyUser.lastName
                        : ""}
                    </span>
                  </div>
                )
              ) : (
                ""
              )}
            </div>
          </div>
          <Lists
            text={`${message[0].toUpperCase()}${message.slice(1)}`}
            key={clientId}
            listStyle="none"
          />
        </div>
      </div>
    ));
  return (
    <div className={`container-fluid ${container}`}>
      <div className={`container`}>
        <AdminPostCard title={title} body={body} id={_id} />
        <div className="card-body">
          <FontAwesomeIcon
            icon={faArrowCircleLeft}
            size="2x"
            color="#30bbb5"
            cursor="pointer"
            onClickCapture={() => history.goBack()}
          />
        </div>

        <div
          className="card-body d-flex align-items-center justify-content-between"
          style={{ width: "18%" }}
        >
          <h4>Comments</h4>
          <FontAwesomeIcon icon={faArrowDown} opacity="0.4" />
        </div>
        <div
          style={{ width: "100%", height: "40vh" }}
          className="container-fluid"
        >
          <Scrollbar>{comments}</Scrollbar>
        </div>
      </div>
    </div>
  );
};

export default PreviewComment;
