import React, { useState } from "react";
import Styles from "./Styles.module.css";
import Input from "../../Common/Input.component/Input";

import {
  errorToastify,
  successToastify,
} from "../../Components/react_toastify/toastify";
import { AuthAxios } from "../../helper/CookieRequest";

const SubscribeForm = () => {
  const { email, form, submit } = Styles;
  const [emails, setemails] = useState("");
  const { REACT_APP_ENDPOINT } = process.env;

  const handleNewSubscribers = async (e) => {
    e.preventDefault();
    let subscribers = emails;
    await AuthAxios.post(
      `${REACT_APP_ENDPOINT}/post_subscriber`,

      { subscribers },

      {
        "Content-Type": "application/json",
      }
    )
      .then((res) => {
        successToastify(res.data.message);
      })
      .catch((err) =>
        err.toString().toLowerCase().includes("network")
          ? errorToastify("network error. please try later")
          : err.response === undefined
          ? false
          : errorToastify(err.response.data.message)
      );
  };

  return (
    <div className={form}>
      <div>
        <h3>Subscribe Form</h3>
        <form onSubmit={handleNewSubscribers}>
          <Input
            className={email}
            type="email"
            value={emails}
            name="emails"
            placeholder="Email Address"
            onChange={(e) => setemails(e.target.value)}
          />
          <br />
          <Input className={submit} type="submit" value="Subscribe" />
        </form>
      </div>
    </div>
  );
};

export default SubscribeForm;
