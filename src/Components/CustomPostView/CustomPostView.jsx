import React, { useEffect, useState, useContext } from "react";
import { BounceLoader } from "react-spinners";

const PostViews = ({ posts }) => {
  const { REACT_APP_ENDPOINT } = process.env;

  const [disableLoader, setDisableLoader] = useState(true);
  useEffect(() => {
    const setTimeOutOnLoader = window.setTimeout(() => {
      setDisableLoader(false);
    }, 3000);

    return () => {
      clearTimeout(setTimeOutOnLoader);
    };
  }, [REACT_APP_ENDPOINT]);

  const feed = posts ? (
    posts.map(({ title, body, _id }) => (
      <div className="card" key={_id}>
        <div className="card-body">
          <div className="card-title">
            <h2>{title}</h2>
          </div>

          <div></div>
          <hr />
          <div className="content">
            <p className="card-text">{body}</p>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div>{disableLoader && <BounceLoader size="1" />}</div>
  );
  return <div className="container-fluid">{feed}</div>;
};

export default PostViews;
