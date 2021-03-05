import {
  infoToastify,
  errorToastify,
  successToastify,
} from "../../../../Common/react_toastify/toastify";
import { AuthAxios } from "../../../../helper/CookieRequest";
const { REACT_APP_ENDPOINT } = process.env;

//handling the editing of the personal data
export const handleEditPersonalData = ({ sethandleDisplay }) => {
  //setting the inputs to the read only
  sethandleDisplay(false);

  //prompting a message to the user
  infoToastify("please proceed to updating of your personal details");
};

//setting the userData to the default data when cancelled
export const handleCancelUpdatePersonalData = ({
  personalData,
  setfirstName,
  setlastName,
  setemail,
  sethandleDisplay,
}) => {
  setfirstName(personalData[0].firstName);
  setlastName(personalData[0].lastName);
  setemail(personalData[0].email);
  sethandleDisplay(true);
};

export const handleToggleLabel = ({ setDisplayLabel, setShowAppreviation }) => {
  setDisplayLabel((curVal) => true);
  setShowAppreviation(false);
};

export const handleMouseLeaveOnProfileContainer = ({
  setDisplayLabel,
  setShowAppreviation,
}) => {
  setDisplayLabel((curVal) => false);
  setShowAppreviation(true);
};

//sending the updated data to the server
export const handleUpdatePersonalData = async ({
  address,
  city,
  state,
  firstName,
  lastName,
  email,
  phone,
  sethandleDisplay,
}) => {
  let contact = {
    address,
    city,
    state,
  };
  let currentState = {
    firstName,
    lastName,
    email,
    contact,
    phone,
  };

  await AuthAxios.put(
    `${REACT_APP_ENDPOINT}/user/update_profile`,
    currentState,
    {
      "Content-Type": "application/json",
      withCredentials: true,
    }
  )
    .then((res) => {
      //alert the user of the success updating of the data
      successToastify(res.data.message);

      //set fields to read only
      sethandleDisplay(true);
    })

    //watching for error
    .catch((err) =>
      err.toString().toLowerCase().includes("network")
        ? errorToastify("network error. please try later")
        : err.response === undefined
        ? false
        : errorToastify(err.response.data.message)
    );
};

export const handleUploadImage = async ({ e, setstate, setFile }) => {
  setFile(e.target.value);
  const Forms = new FormData();

  Forms.append("file", e.target.files[0]);
  await AuthAxios.put(`${REACT_APP_ENDPOINT}/profile/image`, Forms, {
    "Content-Type": "application/json",
    withCredentials: true,
  })
    .then((res) => {
      console.log("res.data", res.data);
      setstate((data) => ({
        ...data,
        personalData: res.data.data,
      }));
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

export const setDataToState = ({
  personalData,
  setfirstName,
  setlastName,
  setemail,
  setphone,
  setclientLoggedInIpAddress,
  setaddress,
  setposts,
  setcity,
  setstate,
  setprofileImage,
}) => {
  if (personalData.length) {
    setfirstName(personalData[0].firstName);
    setlastName(personalData[0].lastName);
    setemail(personalData[0].email);
    setphone(personalData[0].phone);
    setposts(personalData[0].posts);
    setclientLoggedInIpAddress(personalData[0].ClientLoggedInIpAddress);
    setaddress(personalData[0].contact.address);
    setcity(personalData[0].contact.city);
    setstate(personalData[0].contact.state);
    setprofileImage(personalData[0].profileImage);
  }
};
