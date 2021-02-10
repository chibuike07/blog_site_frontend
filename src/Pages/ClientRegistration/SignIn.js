import React from "react";
import SignInForm from "../../Components/Clients/SignIn/ClientSignIn";

const SignIn = () => {
  const { REACT_APP_ENDPOINT } = process.env;
  return (
    <div>
      <SignInForm url={`${REACT_APP_ENDPOINT}/client/login`} />
    </div>
  );
};

export default SignIn;
