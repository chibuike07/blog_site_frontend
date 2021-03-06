import React, { useEffect, useState } from "react";
import CustomPostView from "../../CustomPostView/CustomPostView";
import { BounceLoader } from "react-spinners";

const PostByUser = ({ post }) => {
  const [stopLoader, setStopLoader] = useState(true);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // disable loader after 10secs
    const setTimeOutOnLoader = setTimeout(() => {
      setStopLoader(false);
      setShowText(true);
    }, 10000);

    return () => {
      // clear loader
      clearTimeout(setTimeOutOnLoader);
    };
  }, [stopLoader]);

  // render the user post
  const posts = post ? (
    post.map(({ title, body, _id, createdAt, updatedAt, status }, index) => (
      <CustomPostView
        title={title}
        body={body}
        id={_id}
        key={_id}
        createdAt={createdAt}
        updatedAt={updatedAt}
        status={status}
        index={index}
      />
    ))
  ) : (
    <div>
      <BounceLoader loading={stopLoader} />
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{ width: "100%", height: "100vh" }}
      >
        <div className="card">
          {showText && (
            <div
              className="card-body"
              style={{ backgroundColor: "rgb(48, 187, 181)" }}
            >
              {showText && (
                <p style={{ fontSize: "3rem", color: "#fff" }}>
                  You are yet to post any blog!!!
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
  return <div>{posts}</div>;
};

export default PostByUser;
