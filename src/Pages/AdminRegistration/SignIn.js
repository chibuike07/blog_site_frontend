import React from "react";

import AdminSignInFormReg from "../../Components/Admin/SignIn/AdminSignIn";

const AdminSignIn = () => {
  const { REACT_APP_ENDPOINT } = process.env;

  return (
    <div>
      <AdminSignInFormReg url={`${REACT_APP_ENDPOINT}/admin/login`} />
    </div>
  );
};

export default AdminSignIn;
