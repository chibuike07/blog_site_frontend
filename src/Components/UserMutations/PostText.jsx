import React, { useContext } from "react";
import PostForm from "../PostForm/PostForm";
import { UserContext } from "../../Context_files/UserContext.js";

const PostText = ({ _id }) => {
  const { REACT_APP_ENDPOINT } = process.env;

  const [{ myPosts }, setState] = useContext(UserContext);
  let editedDataIndex = [];

  let data =
    myPosts &&
    myPosts.filter(
      (value, index) => value._id === _id && editedDataIndex.push(index)
    );

  return (
    <div>
      <PostForm
        url={`${REACT_APP_ENDPOINT}/post`}
        updateUrl={`${REACT_APP_ENDPOINT}/post/${_id}`}
        post={data && data}
        setState={setState}
        myPosts={myPosts}
        editedDataIndex={editedDataIndex[0]}
      />
    </div>
  );
};

export default PostText;
