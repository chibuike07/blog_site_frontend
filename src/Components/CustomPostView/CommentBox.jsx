import React from "react";
import TextArea from "../../Common/Textarea/TextArea";
import Button from "../../Common/Button.component/Button";
import { handleSubmitComment } from "../utils/CustomPostView";

const CommentBox = ({
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
        rows={5}
        placeholder="Add Your Post"
        onChange={(e) => setHandlePostComment(e.target.value)}
        name="comment"
        value={message}
        paddingLeft="1%"
        width={"100%"}
      />
      <div className="card-btn">
        <Button
          text="Post Comment"
          className="card-btn"
          border="none"
          padding="2%"
          backgroundColor="rgb(48, 187, 181)"
          click={() => handleSubmitComment({ id, message, setShowCommentBox })}
          borderRadius="5px"
        />
      </div>
    </div>
  );
};

export default CommentBox;
