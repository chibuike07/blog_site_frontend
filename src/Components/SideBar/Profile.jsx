import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenFancy } from "@fortawesome/free-solid-svg-icons";
import ProfileStyles from "../../Styles/SideBar/Profile.module.css";

const Profile = ({ name = "chime chibuike" }) => {
  //destructuring styles
  const { wrapper, username, updateProfile, penIcon } = ProfileStyles;

  return (
    <div className={wrapper}>
      <h2 className={username}>{name}</h2>

      <div className={updateProfile}>
        <p>edit profile</p>
        <FontAwesomeIcon icon={faPenFancy} className={penIcon} />
      </div>
    </div>
  );
};

export default Profile;
