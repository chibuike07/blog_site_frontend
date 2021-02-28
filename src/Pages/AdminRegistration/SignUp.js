import React from "react";
import AdminSignUpForm from "../../Components/Admin/AdminSignUp/AdminSignup";

const AdminRegistration = () => {
  const { REACT_APP_ENDPOINT } = process.env;

  return (
    <div>
      <AdminSignUpForm url={`${REACT_APP_ENDPOINT}/admin_signup`} />
    </div>
  );
};

export default AdminRegistration;
