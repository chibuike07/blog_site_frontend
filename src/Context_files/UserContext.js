import React, { useState } from "react";

const UserContext = React.createContext([{}, () => {}]);

const UserContextProvider = (props) => {
  const [UsersData, setUserData] = useState({
    sideBarActivities: ["feeds", "my post", "add post", "profile"],
    posts: [],
    myPosts: [],
    personalData: [],
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
