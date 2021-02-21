import React from "react";
import { handleSubmitComment } from "./utils/AdminPostCard";
import TextArea from "../../Common/Textarea/TextArea";
import Button from "../../Common/Button.component/Button";

const DisplayCommentBox = ({
  setHandlePostComment,
  id,
  message,
  setShowCommentBox,
}) => {
  return (
    <div className="container-fluid">
      <div className="card-title">
        <h2 className="card-title" style={{ textTransform: "capitalize" }}>
          post comment
        </h2>
      </div>
      <hr />
      <TextArea
        cols={30}
        rows={5}
        placeholder="add your post"
        onChange={(e) => setHandlePostComment(e.target.value)}
        name="comment"
        value={message}
        paddingLeft="1%"
      />

      <div className="card-btn">
        <Button
          text="post comment"
          className="card-btn"
          border="none"
          padding="1%"
          backgroundColor="blue"
          click={() => handleSubmitComment({ id, message, setShowCommentBox })}
          borderRadius="5px"
        />
      </div>
    </div>
  );
};

export default DisplayCommentBox;
