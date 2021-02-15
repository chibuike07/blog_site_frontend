import { useState, useContext } from "react";
import Input from "../../../Common/Input.component/Input";
import axios from "axios";
import Button from "../../../Common/Button.component/Button";
import ReactModal from "react-modal";
import { UserContext } from "../../../Context_files/UserContext";
import {
  errorToastify,
  successToastify,
} from "../../../Common/react_toastify/toastify";

ReactModal.setAppElement("#root");
const ForgotPasswordCheckout = ({ url, openModal, setModal }) => {
  // const [{ openModal }] = useContext(UserContext);

  const [email, setemail] = useState("");
  const handleForgetPassword = async (e) => {
    e.preventDefault();
    await axios
      .post(
        url,
        { email },
        {
          "Content-Type": "application/json",
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
