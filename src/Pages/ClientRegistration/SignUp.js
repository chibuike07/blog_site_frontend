import React from "react";
import SignUpForm from "../../Components/Clients/ClientSignUp/ClientSignup";

const Registration = () => {
  const { REACT_APP_ENDPOINT } = process.env;

  return (
    <div>
      <SignUpForm url={`${REACT_APP_ENDPOINT}/user_signup`} />
    </div>
  );
};

export default Registration;
