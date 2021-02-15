import React from "react";
import { withRouter } from "react-router-dom";
import Image from "../../Common/Image.component/Image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelopeSquare,
  faArrowLeft,
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
            <div className="card-body">
              <Image
                src={profileImage}
                alt={"user image"}
                className={"card-img"}
                width="40%"
                height="50vh"
              />
            </div>
            <div>
              <FontAwesomeIcon
                icon={faArrowLeft}
                onClick={() => history.goBack()}
              />
            </div>
            <div className={"card-body"}>
              <div className={"card-text"}>
                <h3 className="card-text">
                  <span>
                    {firstName}
                    {lastName}
                  </span>
                </h3>
              </div>
              <div className={"card-text"}>
                <address>
                  {address && address}, {city && city}, {state && state}
                </address>
              </div>

              <div className={"card-text"}>
                <span>
                  <FontAwesomeIcon icon={faEnvelopeSquare} />
                </span>
                <address>{email}</address>
              </div>
              <div className={"card-text"}>
                <span>joined: {new Date(createdAt).toLocaleDateString()}</span>
              </div>

              <div className={"card-test"}>
                <span>
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
