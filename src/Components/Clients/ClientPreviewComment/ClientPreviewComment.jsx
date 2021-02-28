import React, { useEffect, useContext } from "react";
import ClientPreviewCommentStyles from "../../../Styles/Clients/ClientPreviewComment/ClientPreviewComment.module.css";
import Lists from "../../../Common/List.component/List";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { fetchCommentById } from "../util/ClientPreviewComment";
import { UserContext } from "../../../Context_files/UserContext";
import Image from "../../../Common/Image.component/Image";
import AdminPostCard from "../../AdminComponents/AdminPostCard";

const ClientPreviewComment = ({ match, history }) => {
  const { REACT_APP_ENDPOINT } = process.env;
  const { card, names, imgWrapper, replaceImg } = ClientPreviewCommentStyles;
  const [{ specifiedPost, specifiedPostCommentPoster }, setState] = useContext(
    UserContext
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
      <div className={`card ${card}`} key={index}>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <span className={names}>
              {specifiedPostCommentPoster.length
                ? specifiedPostCommentPoster[index] !== undefined
                  ? specifiedPostCommentPoster[index].firstName
                  : dummyUser.firstName
                : ""}
              {specifiedPostCommentPoster.length
                ? specifiedPostCommentPoster[index] !== undefined
                  ? specifiedPostCommentPoster[index].lastName
                  : dummyUser.lastName
                : ""}
            </span>
            <div className={`card  ${imgWrapper}`}>
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
                    className={`card d-flex justify-content-center align-items-center ${replaceImg}`}
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
    <div className="container">
      <AdminPostCard title={title} body={body} id={_id} />
      <div className="card-body">
        <FontAwesomeIcon
          icon={faArrowCircleLeft}
          size="2x"
          color="rgb(48, 187, 181)"
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
      <div className="container-fluid">{comments}</div>
    </div>
  );
};

export default ClientPreviewComment;
