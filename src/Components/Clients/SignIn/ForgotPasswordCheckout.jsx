import { useState } from "react";
import Input from "../../../Common/Input.component/Input";
import Button from "../../../Common/Button.component/Button";
import ReactModal from "react-modal";
import { handleForgetPassword } from "../util/ForgotPasswordCheckOut";

ReactModal.setAppElement("#root");
const ForgotPasswordCheckout = ({ url, openModal, setModal }) => {
  const [email, setemail] = useState("");

  return (
    <ReactModal isOpen={openModal}>
      <form
        className="form-group"
        onSubmit={(e) => handleForgetPassword({ e, url, setModal, email })}
      >
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
