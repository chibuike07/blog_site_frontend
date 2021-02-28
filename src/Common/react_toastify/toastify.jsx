import { toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export const successToastify = (message) => {
  return toast.success(message.toUpperCase(), {
    position: "bottom-center",
    hideProgressBar: true,
    transition: Flip,
    autoClose: 2000,
  });
};

export const errorToastify = (message) => {
  return toast.error(message.toUpperCase(), {
    position: "bottom-center",
    hideProgressBar: true,
    transition: Flip,
    autoClose: 4000,
  });
};

export const infoToastify = (message) => {
  return toast.info(message.toUpperCase(), {
    position: "bottom-center",
    hideProgressBar: true,
    transition: Flip,
    autoClose: 4000,
  });
};
