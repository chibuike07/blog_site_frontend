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
import Scrollbar from "react-scrollbars-custom";
import CustomPostView from "../../CustomPostView/CustomPostView";

const ClientPreviewComment = ({ match, history }) => {
  const { REACT_APP_ENDPOINT } = process.env;
  const {
    container,
    card,
    names,
    imgWrapper,
    replaceImg,
    appreviation,
  } = ClientPreviewCommentStyles;
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
              <span>
                {specifiedPostCommentPoster.length
                  ? specifiedPostCommentPoster[index] !== undefined
                    ? specifiedPostCommentPoster[index].firstName
                    : dummyUser.firstName
                  : ""}
              </span>
              <span>
                {specifiedPostCommentPoster.length
                  ? specifiedPostCommentPoster[index] !== undefined
                    ? specifiedPostCommentPoster[index].lastName
                    : dummyUser.lastName
                  : ""}
              </span>
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
                    <span className={appreviation}>
                      {specifiedPostCommentPoster.length
                        ? specifiedPostCommentPoster[index] !== undefined
                          ? specifiedPostCommentPoster[index].firstName[0]
                          : dummyUser.firstName
                        : ""}
                      {specifiedPostCommentPoster.length
                        ? specifiedPostCommentPoster[index] !== undefined
                          ? specifiedPostCommentPoster[index].lastName[0]
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
      <div className="container">
        <CustomPostView title={title} body={body} id={_id} displayFullText />
        <div className="card-body">
          <FontAwesomeIcon
            icon={faArrowCircleLeft}
            size="2x"
            color="rgb(48, 187, 181)"
            onClickCapture={() => history.goBack()}
            cursor="pointer"
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

export default ClientPreviewComment;
