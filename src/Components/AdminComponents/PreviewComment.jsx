import React, { useEffect, useContext } from "react";
import axios from "axios";
import { AdminContext } from "../../Context_files/AdminContext";
import { errorToastify } from "../../Common/react_toastify/toastify";
import AdminPostCard from "./AdminPostCard";
import Lists from "../../Common/List.component/List";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import Image from "../../Common/Image.component/Image";

const PreviewComment = ({ match, history }) => {
  const { REACT_APP_ENDPOINT } = process.env;
  const [{ specifiedPost, specifiedPostCommentPoster }, setState] = useContext(
    AdminContext
  );

  const { postId } = match.params;
  useEffect(() => {
    const fetchCommentById = async () => {
      await axios
        .get(`${REACT_APP_ENDPOINT}/admin/get_single_post/${postId}`, {
          "Content-Type": "application/json",
        })
        .then((res) => {
          setState((data) => ({
            ...data,
            specifiedPost: res.data.data,
            specifiedPostCommentPoster: res.data.posterName,
          }));
        })
        .catch((err) =>
          err.response === undefined
            ? false
            : errorToastify(err.response.data.message)
        );
    };
    fetchCommentById();

    return [fetchCommentById];
  }, [REACT_APP_ENDPOINT, postId, setState]);

  const { title, body, _id, comment } = specifiedPost && specifiedPost;

  const comments =
    comment &&
    comment.map(({ message, clientId }, index) => (
      <div className="card" style={{ marginBottom: "1rem" }}>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <span style={{ textTransform: "capitalize", opacity: "0.3" }}>
              {specifiedPostCommentPoster[index].firstName}{" "}
              {specifiedPostCommentPoster[index].lastName}
            </span>
            <div className="card" style={{ width: "5%" }}>
              {specifiedPostCommentPoster[index].profileImage ? (
                <Image
                  src={specifiedPostCommentPoster[index].profileImage}
                  className="card-img"
                  borderRadius="50%"
                />
              ) : (
                <div
                  className="card d-flex justify-content-center align-items-center"
                  style={{ height: "7vh" }}
                >
                  <span style={{ textTransform: "capitalize", opacity: "0.3" }}>
                    {specifiedPostCommentPoster[index].firstName[0]}{" "}
                    {specifiedPostCommentPoster[index].lastName[0]}
                  </span>
                </div>
              )}
            </div>
          </div>
          <Lists text={message} key={clientId} listStyle="none" />
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

export default PreviewComment;
