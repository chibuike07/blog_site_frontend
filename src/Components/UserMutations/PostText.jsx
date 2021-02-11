import React from "react";
import PostForm from "../PostForm/PostForm";

const PostText = () => {
  const { REACT_APP_ENDPOINT } = process.env;
  return (
    <div>
      <PostForm url={`${REACT_APP_ENDPOINT}/post`} />
    </div>
  );
};

export default PostText;
