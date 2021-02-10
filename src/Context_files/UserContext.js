import React, { useState } from "react";

const UserContext = React.createContext([{}, () => {}]);

const UserContextProvider = (props) => {
  const [UsersData, setUserData] = useState({});

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
