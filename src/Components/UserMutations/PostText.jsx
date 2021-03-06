import React, { useContext, useState, useEffect } from "react";
import PostForm from "../PostForm/PostForm";
import { UserContext } from "../../Context_files/UserContext.js";

const PostText = ({ data, id, index }) => {
  const { REACT_APP_ENDPOINT } = process.env;
  const [{ myPosts }, setState] = useContext(UserContext);
  const [specifiedPost, setSpecifiedPost] = useState([]);

  useEffect(() => {
    //filter the user post to get the specified post to update
    const filterCollection = myPosts && myPosts.filter(({ _id }) => _id === id);

    //set the found post to the state
    setSpecifiedPost(filterCollection);
  }, [id, myPosts]);
  return (
    <div>
      <PostForm
        url={`${REACT_APP_ENDPOINT}/post`}
        updateUrl={`${REACT_APP_ENDPOINT}/post/${id}`}
        post={data}
        setState={setState}
        myPosts={myPosts}
        index={index}
        specifiedPost={specifiedPost}
      />
    </div>
  );
};

export default PostText;
