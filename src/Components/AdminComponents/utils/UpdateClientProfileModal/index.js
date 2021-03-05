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
  infoToastify("please proceed to editing of your personal details");
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
  ID,
  sethandleDisplay,
  setModal,
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
    `${REACT_APP_ENDPOINT}/admin/put_client_profile/${ID}`,
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

      // close modal
      setModal(false);
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

//setting the userData to the default data when cancelled
export const handleCancelUpdatePersonalData = ({
  setfirstName,
  setlastName,
  setemail,
  sethandleDisplay,
  setModal,
  specifiedUserData,
}) => {
  setfirstName(specifiedUserData[0].firstName);
  setlastName(specifiedUserData[0].lastName);
  setemail(specifiedUserData[0].email);
  sethandleDisplay(true);
  setModal(false);
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

export const handleUploadImage = async ({ e, setFile }) => {
  setFile(e.target.value);
  const Forms = new FormData();

  Forms.append("file", e.target.files[0]);
  // await AuthAxios.put(`${REACT_APP_ENDPOINT}/profile/image`, Forms, {
  //   "Content-Type": "application/json",
  //   withCredentials: true,
  // })
  //   .then((res) => {
  //     // console.log("res.data", res.data);
  //     setstate((data) => ({
  //       ...data,
  //       specifiedUserData: res.data.data,
  //     }));
  //     successToastify(res.data.message);
  //   })
  //   .catch((error) =>
  //     error.response === undefined
  //       ? false
  //       : errorToastify(error.response.data.message)
  //   );
};

export const setDataToState = ({
  specifiedUserData,
  setfirstName,
  setlastName,
  setemail,
  setphone,
  setId,
  setclientLoggedInIpAddress,
  setaddress,
  setposts,
  setcity,
  setstate,
  setprofileImage,
}) => {
  if (specifiedUserData.length) {
    setfirstName(specifiedUserData[0].firstName);
    setlastName(specifiedUserData[0].lastName);
    setemail(specifiedUserData[0].email);
    setphone(specifiedUserData[0].phone);
    setposts(specifiedUserData[0].posts);
    setId(specifiedUserData[0]._id);
    setclientLoggedInIpAddress(specifiedUserData[0].ClientLoggedInIpAddress);
    setaddress(specifiedUserData[0].contact.address);
    setcity(specifiedUserData[0].contact.city);
    setstate(specifiedUserData[0].contact.state);
    setprofileImage(specifiedUserData[0].profileImage);
  }
};
