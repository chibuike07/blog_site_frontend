import React, { useState, useEffect } from "react";
import PostFeedStyles from "../../Styles/AdminComponents/PostFeed.module.css";
import { BeatLoader } from "react-spinners";
import AdminPostCard from "./AdminPostCard";

const PostFeeds = ({ post }) => {
  const [stopLoader, setStopLoader] = useState(true);
  const [showText, setShowText] = useState(false);

  const { wrapper } = PostFeedStyles;

  useEffect(() => {
    const setTimeOutOnLoader = setTimeout(() => {
      setStopLoader(false);
      setShowText(true);
    }, 4000);

    return () => {
      clearTimeout(setTimeOutOnLoader);
    };
  }, []);

  const posts = post ? (
    post.map(({ title, body, _id }) => (
      <AdminPostCard title={title} body={body} id={_id} key={_id} />
    ))
  ) : (
    <div>
      <BeatLoader loading={stopLoader} />
      <div
        className={`container-fluid d-flex justify-content-center align-items-center  ${wrapper}`}
      >
        <div className="card">
          {showText && (
            <div className="card-body" style={{ backgroundColor: "blue" }}>
              {showText && (
                <p style={{ fontSize: "3rem", color: "#fff" }}>
                  No blogs for now!
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
  return <div className="container-fluid">{posts}</div>;
};

export default PostFeeds;
