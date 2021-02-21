import React, { useState } from "react";

const UserContext = React.createContext([{}, () => {}]);

const UserContextProvider = (props) => {
  const [UsersData, setUserData] = useState({
    sideBarActivities: ["feeds", "my post", "add post", "profile", "sign out"],
    mutationFormTag: "post blog",
    posts: [],
    myPosts: [],
    personalData: [],
    toggleSideBar: () => {},
    commentMutationLists: ["comments"],
    specifiedPostCommentPoster: [],
    specifiedPost: [],
  });

  return (
    <UserContext.Provider
      //assign the provider values
      value={[UsersData, setUserData]}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
