import React from "react";
import { withRouter } from "react-router-dom";
import Image from "../../Common/Image.component/Image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelopeSquare,
  faArrowCircleLeft,
} from "@fortawesome/free-solid-svg-icons";

const PreviewUser = ({ userData, history }) => {
  const displayUserDetail = userData ? (
    userData.map(
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
          <div className="container-fluid" key={index}>
            <div className="card-body" style={{ height: "" }}>
              <Image
                src={profileImage}
                alt={"user image"}
                className={"card-img"}
                width="auto"
                height="30vh"
              />
            </div>
            <div className="card-body">
              <FontAwesomeIcon
                icon={faArrowCircleLeft}
                size="2x"
                onClick={() => history.goBack()}
              />
            </div>
            <div className={"card-body"}>
              <div className={"card-text"}>
                <h3
                  className="card-text"
                  style={{ textTransform: "capitalize" }}
                >
                  {firstName} {""}
                  {lastName}
                </h3>
              </div>
              <div className={"card-text"}>
                <address>
                  {address && address}, {city && city}, {state && state}
                </address>
              </div>

              <div className={"card-text d-flex"}>
                <span style={{ marginRight: "1rem" }}>
                  <FontAwesomeIcon icon={faEnvelopeSquare} />
                </span>
                <address>{email}</address>
              </div>
              <div className={"card-text"} style={{ marginBottom: "1rem" }}>
                <span>joined: {new Date(createdAt).toLocaleDateString()}</span>
              </div>

              <div className={"card-text "}>
                <span style={{ marginRight: "1rem" }}>
                  <FontAwesomeIcon icon={faPhone} rotation={90} />
                </span>
                <span>{phone}</span>
              </div>
            </div>
          </div>
        );
      }
    )
  ) : (
    <div>
      <p>no data to display</p>
    </div>
  );

  return <div className={"container-fluid"}>{displayUserDetail}</div>;
};

export default withRouter(PreviewUser);
