import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export const successToastify = (message) => {
  return toast.success(message.toUpperCase(), {
    position: "top-center",
    hideProgressBar: true,
  });
};

export const errorToastify = (message) => {
  return toast.error(message.toUpperCase(), {
    position: "top-center",
    hideProgressBar: true,
  });
};

export const infoToastify = (message) => {
  return toast.info(message.toUpperCase(), {
    position: "top-center",
    hideProgressBar: true,
  });
};
