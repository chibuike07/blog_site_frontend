import React, { useContext } from "react";
import { handleDropDownClick } from "../utils/CustomPostView";
import Lists from "../../Common/List.component/List";
import { UserContext } from "../../Context_files/UserContext";

const MutationDropDown = ({ id, setShowCommentBox, setShowForm }) => {
  const [{ commentMutationLists, myPosts }, setState] = useContext(UserContext);
  return (
    <nav className="card">
      {commentMutationLists &&
        commentMutationLists.map((value, i) => (
          <Lists
            text={value}
            key={i}
            textTransform="capitalize"
            listStyle="none"
            className="container-fluid"
            cursor="pointer"
            click={() =>
              handleDropDownClick({
                value,
                id,
                setShowCommentBox,
                setShowForm,
                setState,
                myPosts,
              })
            }
            color="gray"
          />
        ))}
    </nav>
  );
};

export default MutationDropDown;
