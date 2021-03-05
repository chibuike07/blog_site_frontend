import React, { useState, useEffect } from "react";
import FeedStyles from "../../../Styles/Clients/Feeds.module.css";
import CustomPostView from "../../CustomPostView/CustomPostView";
import { BeatLoader } from "react-spinners";

const Feeds = ({ post }) => {
  const [stopLoader, setStopLoader] = useState(true);
  const [showText, setShowText] = useState(false);
  const { container, textWrapper } = FeedStyles;
  useEffect(() => {
    const setTimeOutOnLoader = setTimeout(() => {
      setStopLoader(false);
      setShowText(true);
    }, 10000);

    return () => {
      clearTimeout(setTimeOutOnLoader);
    };
  }, []);

  const posts = post.length ? (
    post.map(({ title, body, _id, createdAt, updatedAt, status }) => (
      <CustomPostView
        title={title}
        body={body}
        id={_id}
        key={_id}
        createdAt={createdAt}
        updatedAt={updatedAt}
        status={status}
      />
    ))
  ) : (
    <div>
      <BeatLoader loading={stopLoader} />
      <div
        className={`container-fluid d-flex justify-content-center align-items-center ${container}`}
      >
        <div className="card">
          {showText && (
            <div className={`card-body ${textWrapper}`}>
              {showText && <p>No post feed yet! .</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
  return <div>{posts}</div>;
};

export default Feeds;
