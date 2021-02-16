import React, { useRef, useState, useContext, useEffect } from "react";
import ToggleButtonStyles from "./ToggleButton.module.css";
import axios from "axios";
import { errorToastify, successToastify } from "../react_toastify/toastify";

const ToggleButton = ({ status, id }) => {
  const { overAllWrapper, container, wrapper, btn, text } = ToggleButtonStyles;
  const toggle = useRef();
  const [isToggling, setisToggling] = useState(false);
  const { REACT_APP_ENDPOINT } = process.env;
  const handleToggeleTrue = async () => {
    console.log("status", status);
    if (status === false) {
      toggle.current.style.transform = "translateX(100%)";
      status = true;
      setisToggling(true);
    } else {
      toggle.current.style.transform = "translateX(0%)";
      status = false;
      setisToggling(false);
    }

    await axios
      .put(
        `${REACT_APP_ENDPOINT}/admin/update_client_status/${id}?active=${status}`,
        {
          "Content-Type": "application/json",
        }
      )
      .then((res) => {
        successToastify(res.data.message);
        console.log("isTo", isToggling);
      })
      .catch((err) =>
        err.response === undefined
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
        <div className={wrapper} ref={toggle} onClick={handleToggeleTrue}>
          <div className={btn}></div>
        </div>
      </div>
      <div className={text}>
        <span>status</span>
      </div>
    </div>
  );
};

export default ToggleButton;