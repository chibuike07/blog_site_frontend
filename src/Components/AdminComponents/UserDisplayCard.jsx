import React, { useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import Image from "../../Common/Image.component/Image";
import Button from "../../Common/Button.component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faLongArrowAltRight,
  faEnvelopeSquare,
  faTimes,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";
import { AdminContext } from "../../Context_files/AdminContext";

import ToggleButton from "../../Common/ToggleButton/ToggleButton";
import UpdateClientProfileMadal from "../AdminComponents/UpdateClientProfileModal";
import {
  handleDeleteUser,
  fetchSingleUser,
  handlePreviewSingleUser,
} from "./utils/UserDisplayCard";

import UserDisplayCardStyles from "../../Styles/AdminComponents/UserDisplayCard.module.css";
const DisplayUsersCard = ({ history }) => {
  const [{ usersList }, setState] = useContext(AdminContext);

  const [openModal, setModal] = useState(false);
  const {
    imgAddrWrapper,
    imgWrapper,
    img,
    namesWrapper,
    details,
    mutationBtnWrapper,
  } = UserDisplayCardStyles;

  const UsersListData = usersList ? (
    usersList.map(
      (
        {
          firstName,
          lastName,
          profileImage,
          contact,
          contact: { address, city, state },
          email,
          phone,
          _id,
          createdAt,
          active,
          ...remainingDetails
        },
        index
      ) => {
        return (
          <div className="card" key={index} style={{ marginBottom: "1rem" }}>
            <div className={` d-flex ${imgAddrWrapper}`}>
              <div className="card-body">
                {profileImage ? (
                  <div className={imgWrapper}>
                    <Image
                      src={profileImage}
                      alt={firstName}
                      className={`card-img ${img}`}
                      height="25vh"
                    />
                  </div>
                ) : (
                  <div
                    className={`card-img d-flex justify-content-center align-items-center ${namesWrapper}`}
                  >
                    <span
                      className="card-text"
                      style={{ fontSize: "3rem", textTransform: "capitalize" }}
                    >
                      {firstName[0].toUpperCase()}
                      {lastName[0].toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div className="card-body">
                <div className="card-title">
                  <h3 style={{ textTransform: "capitalize" }}>
                    {firstName && firstName} {lastName && lastName}
                  </h3>
                </div>
                <div className="card-text">
                  <span className="card-text">
                    {address}, {city}, {state}
                  </span>
                </div>
              </div>
            </div>
            <hr />
            <div className={`d-flex justify-content-between ${details}`}>
              <div
                className="card-body d-flex"
                style={{ flexDirection: "column", lineHeight: "3" }}
              >
                <div className="card-icon">
                  <span>
                    <FontAwesomeIcon icon={faEnvelopeSquare} />
                  </span>{" "}
                  <span className="card-text">{email}</span>
                </div>
                <div className="card-text">
                  <span className="card=text">
                    <FontAwesomeIcon icon={faPhone} rotation={90} />
                  </span>{" "}
                  <span className="card-text">+234{phone}</span>
                </div>
                <div>
                  <ToggleButton status={active} id={_id} />
                </div>
              </div>

              <div className={` ${mutationBtnWrapper}`}>
                <Button
                  text={<FontAwesomeIcon icon={faLongArrowAltRight} />}
                  click={() =>
                    handlePreviewSingleUser({
                      _id,
                      history,
                    })
                  }
                  className="btn"
                  backgroundColor=" rgb(48, 187, 181)"
                />{" "}
                <br />
                <Button
                  text={<FontAwesomeIcon icon={faTimes} />}
                  click={() =>
                    handleDeleteUser({
                      _id,
                    })
                  }
                  className="btn"
                  backgroundColor=" rgb(48, 187, 181)"
                />
                <br />
                <Button
                  text={<FontAwesomeIcon icon={faUserEdit} />}
                  click={() =>
                    fetchSingleUser({
                      _id,
                      setModal,
                      setState,
                    })
                  }
                  className="btn"
                  backgroundColor=" rgb(48, 187, 181)"
                />
              </div>
            </div>

            <UpdateClientProfileMadal
              openModal={openModal}
              setModal={setModal}
            />
          </div>
        );
      }
    )
  ) : (
    <div>
      <p>no data exist</p>
    </div>
  );
  return <div className="container-fluid">{UsersListData}</div>;
};

export default withRouter(DisplayUsersCard);
