import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import Image from "../../Common/Image.component/Image";
import Button from "../../Common/Button.component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faLongArrowAltRight,
  faEnvelopeSquare,
} from "@fortawesome/free-solid-svg-icons";
import { AdminContext } from "../../Context_files/AdminContext";

const DisplayUsersCard = () => {
  const [{ usersList }, setState] = useContext(AdminContext);

  const handlePreviewSingleUser = (specifiedUserData) => {
    setState((data) => ({
      ...data,
      specifiedUserData: specifiedUserData,
      showUsersList: false,
      tags: "user list",
      handleDownColor: false,
      showPreview: true,
      showAllList: false,
    }));
  };

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
          ...remainingDetails
        },
        index
      ) => {
        return (
          <div className="card" key={index} style={{ marginBottom: "1rem" }}>
            <div className="card">
              {profileImage ? (
                <div
                  style={{
                    width: "20%",
                    height: "30vh",
                    margin: "1rem",
                  }}
                >
                  <Image
                    src={profileImage}
                    alt={firstName}
                    className={"card-img"}
                    height="30vh"
                    width="100%"
                    borderRadius="50%"
                  />
                </div>
              ) : (
                <div
                  className="card-img d-flex justify-content-center align-items-center"
                  style={{
                    backgroundColor: "blue",
                    width: "20%",
                    height: "30vh",
                    color: "#fff",
                    borderRadius: "50%",
                    margin: "1rem",
                  }}
                >
                  <span className="card-text" style={{ fontSize: "3rem" }}>
                    {firstName[0].toUpperCase()}
                    {lastName[0].toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div className="card-body">
              <div className="card-title">
                <h3>
                  {firstName && firstName} {lastName && lastName}
                </h3>
              </div>
              <div className="card-text">
                <span className="card-text">
                  {address}, {city}, {state}
                </span>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <div
                  className="d-flex"
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
                </div>

                <div className="btn" style={{ backgroundColor: "blue" }}>
                  <Button
                    text={<FontAwesomeIcon icon={faLongArrowAltRight} />}
                    click={() =>
                      handlePreviewSingleUser({
                        firstName,
                        lastName,
                        profileImage,
                        contact,
                        email,
                        phone,

                        ...remainingDetails,
                      })
                    }
                    className=""
                    backgroundColor=" rgb(48, 187, 181)"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      }
    )
  ) : (
    <div>
      <p>no data exist</p>
    </div>
  );
  return <div className="container">{UsersListData}</div>;
};

export default withRouter(DisplayUsersCard);
