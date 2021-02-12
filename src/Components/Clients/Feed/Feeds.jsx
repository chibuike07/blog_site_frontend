import React, { useState, useEffect } from "react";
import CustomPostView from "../../CustomPostView/CustomPostView";
import { BeatLoader } from "react-spinners";

const Feeds = ({ post }) => {
  const [stopLoader, setStopLoader] = useState(true);
  const [showText, setShowText] = useState(false);

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
      <CustomPostView title={title} body={body} id={_id} key={_id} />
    ))
  ) : (
    <div>
      <BeatLoader loading={stopLoader} />
    </div>
  );
  return (
    <div>
      {posts}
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{ width: "100%", height: "100vh" }}
      >
        <div className="card">
          {showText && (
            <div className="card-body" style={{ backgroundColor: "blue" }}>
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
};

export default Feeds;
