import React, { useRef, useState, useEffect } from "react";
import ToggleButtonStyles from "./ToggleButton.module.css";
import { errorToastify, successToastify } from "../react_toastify/toastify";
import { AuthAxios } from "../../helper/CookieRequest";

const ToggleButton = ({ status, id }) => {
  const { overAllWrapper, container, wrapper, btn, text } = ToggleButtonStyles;
  const toggle = useRef();
  const [isToggling, setisToggling] = useState(false);
  const { REACT_APP_ENDPOINT } = process.env;

  const handleToggeleTrue = async () => {
    if (status === false) {
      toggle.current.style.transform = "translateX(100%)";
      status = true;
      setisToggling(true);
    } else {
      toggle.current.style.transform = "translateX(0%)";
      status = false;
      setisToggling(false);
    }

    await AuthAxios.put(
      `${REACT_APP_ENDPOINT}/admin/update_client_status/${id}`,
      { active: status },
      {
        "Content-Type": "application/json",
        withCredentials: true,
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

  useEffect(() => {
    const setClientStatus2State = () => {
      if (status) {
        setisToggling(true);
      } else {
        setisToggling(false);
      }
    };
    setClientStatus2State();

    return [setClientStatus2State];
  }, [REACT_APP_ENDPOINT, status]);
  return (
    <div className={overAllWrapper}>
      <div
        className={container}
        style={{ backgroundColor: isToggling ? "rgb(48, 187, 181)" : "#eee" }}
      >
        <div
          className={wrapper}
          ref={toggle}
          onClick={handleToggeleTrue}
          title="Change client status"
        >
          <div className={btn}></div>
        </div>
      </div>
      <div className={text}>
        <span>{status ? "active" : "deactivated"}</span>
      </div>
    </div>
  );
};

export default ToggleButton;
