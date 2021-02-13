import React, { useContext } from "react";
import PostForm from "../PostForm/PostForm";
import { UserContext } from "../../Context_files/UserContext.js";

const PostText = ({ _id }) => {
  const { REACT_APP_ENDPOINT } = process.env;
  const [{ myPosts }] = useContext(UserContext);

  let data = myPosts && myPosts.filter((value) => value._id === _id);

  return (
    <div>
      <PostForm
        url={`${REACT_APP_ENDPOINT}/post`}
        updateUrl={`${REACT_APP_ENDPOINT}/post/${_id}`}
        post={data && data}
      />
    </div>
  );
};

export default PostText;
