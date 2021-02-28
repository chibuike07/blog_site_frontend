import React, { useContext } from "react";
import Lists from "../../Common/List.component/List";
import { handleDropDownClick } from "./utils/AdminPostCard";
import { AdminContext } from "../../Context_files/AdminContext";

const DisplayPostOptionDropDown = ({ setShowCommentBox, setShowForm, id }) => {
  const [{ AdminCommentMutation }] = useContext(AdminContext);
  return (
    <div className={"container"}>
      <nav className="card">
        {AdminCommentMutation &&
          AdminCommentMutation.map((value, i) => (
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
                  setShowCommentBox,
                  setShowForm,
                  id,
                })
              }
              color="gray"
            />
          ))}
      </nav>
    </div>
  );
};

export default DisplayPostOptionDropDown;
