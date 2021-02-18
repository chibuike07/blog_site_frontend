import { useState } from "react";
import Input from "../../../Common/Input.component/Input";

import Button from "../../../Common/Button.component/Button";
import ReactModal from "react-modal";

import {
  errorToastify,
  successToastify,
} from "../../../Common/react_toastify/toastify";
import { AuthAxios } from "../../../helper/CookieRequest";

ReactModal.setAppElement("#root");
const ForgotPasswordCheckout = ({ url, openModal, setModal }) => {
  const [email, setemail] = useState("");
  const handleForgetPassword = async (e) => {
    e.preventDefault();
    await AuthAxios.post(
      url,
      { email },
      {
        "Content-Type": "application/json",
        withCredentials: true,
      }
    )
      .then((res) => {
        successToastify(res.data.message);
        setModal(false);
      })
      .catch((err) =>
        err.response === undefined
          ? false
          : errorToastify(err.response.data.message)
      );
  };

  return (
    <ReactModal isOpen={openModal}>
      <form className="form-group" onSubmit={handleForgetPassword}>
        <Input
          className="form-control"
          type="email"
          placeholder="add your email address here..."
          name="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <br />
        <Button
          text="Reset Password"
          className="btn btn-lg "
          backgroundColor="blue"
        />
      </form>
    </ReactModal>
  );
};

export default ForgotPasswordCheckout;
