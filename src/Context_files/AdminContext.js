import React, { useState } from "react";

const AdminContext = React.createContext([{}, () => {}]);

const AdminContextProvider = (props) => {
  const [Admin, setCrisptvAdmin] = useState({
    specifiedPostId: "",
    usersList: [],
    sideBarActivities: ["dashboard", "users", "posts", "registered ip"],
    clientPosts: [],
    AdminCommentMutation: [],
    registeredIp: [],
    dashBoardStaticData: [],
    specifiedUserData: [],
    specifiedPost: [],
    specifiedPostCommentPoster: [],
  });

  return (
    <AdminContext.Provider
      //assign the provider values
      value={[Admin, setCrisptvAdmin]}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export { AdminContext, AdminContextProvider };
