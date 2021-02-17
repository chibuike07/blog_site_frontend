import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import Input from "../Input.component/Input.jsx";
import Button from "../Button.component/Button";

import { AuthAxios } from "../../helper/CookieRequest.js";

const CustomSignupForm = ({ showFirstLast, clientSignUp, ClientLogin }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [minimizePlaceHolder, setMinimizePlaceHolder] = useState(false);

  const handleSubmit = async () => {
    let url, data;

    if (clientSignUp) {
      data = { firstName, lastName, email, password };
      url = clientSignUp;
    } else if (ClientLogin) {
      data = { email, password };
      url = ClientLogin;
    }

    await AuthAxios.post(`${url}`, data, {
      "Content-Type": "application/json",
    })
      .then((res) => console.log("res.data", res.data))
      .catch((err) =>
        err.respomse === undefined
          ? false
          : console.log("err.response", err.response)
      );
  };

  const handleMiniMisedPlaceHolder = () => {
    setMinimizePlaceHolder(true);
  };
  return (
    <div className="container">
      <div className="card">
        <div className="card-fluid">
          <FontAwesomeIcon icon={faLock} />
          <div className="card-title">
            <h2>signup</h2>
          </div>
        </div>
        <div className="card-body">
          <form className="form-group" onSubmit={handleSubmit}>
            {showFirstLast && (
              <figcaption>
                {minimizePlaceHolder && <legend>first name</legend>}
                <Input
                  type="text"
                  placeholder="first name *"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  onFocus={() => handleMiniMisedPlaceHolder()}
                />
              </figcaption>
            )}
            {showFirstLast && (
              <figcaption>
                {minimizePlaceHolder && <legend>last name</legend>}
                <Input
                  type="text"
                  placeholder="last name *"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  onFocus={() => handleMiniMisedPlaceHolder()}
                  className="form-control"
                />
              </figcaption>
            )}
            <figcaption>
              {minimizePlaceHolder && <legend>email</legend>}
              <Input
                type="email"
                placeholder="email address *"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => handleMiniMisedPlaceHolder()}
              />
            </figcaption>
            <figcaption>
              {minimizePlaceHolder && <legend>password</legend>}
              <Input
                type="password"
                placeholder="password *"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => handleMiniMisedPlaceHolder()}
              />
            </figcaption>
            <Button
              text="signUp"
              backgroundColor="rgb(26, 118, 210)"
              className=""
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomSignupForm;
