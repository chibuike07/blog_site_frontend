import React, { useState } from "react";

const AdminContext = React.createContext([{}, () => {}]);

const AdminContextProvider = (props) => {
  const [Admin, setCrisptvAdmin] = useState({});

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
