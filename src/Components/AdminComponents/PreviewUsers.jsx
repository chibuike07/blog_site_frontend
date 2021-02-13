import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import Image from "../../Common/Image.component/Image";
import PreviewStyles from "../../Styles/SpecifiedUser/Preview.module.css";
import { DashBoardContext } from "../../Context_file/DashBoardContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faMobile,
  faArrowLeft,
  faEnvelopeSquare,
} from "@fortawesome/free-solid-svg-icons";

const PreviewUser = ({ history }) => {
  const [{ specifiedUserData }, setState] = useContext(DashBoardContext);
  const {
    allCont,
    container,
    arrow,
    text,
    icons,
    wrapper,
    image,
    img,
    contentWrapper,
    usernames,
    userAddress,
    userEmail,
    regisDate,
    cellPhone,
    mobPhone,
  } = PreviewStyles;

  const handlePreviousPage = () => {
    setState((data) => ({
      ...data,
      tags: "all users",
      handleDownColor: true,
      showPreview: false,
      showAllList: true,
    }));
  };
  const displayUserDetail = specifiedUserData ? (
    [specifiedUserData].map(
      (
        {
          names: { title, first, last },
          picture: { medium },
          dob: { age },
          location: {
            street: { number, name },
            city,
            state,
          },
          registered: { date },
          email,
          cell,
          phone,
          ...remainingDetails
        },
        index
      ) => {
        return (
          <div className={wrapper} key={index}>
            <div className={image}>
              <Image src={medium} alt={"user image"} className={img} />
            </div>
            <div className={contentWrapper}>
              <div className={usernames}>
                <h3>
                  <span>
                    {title} {first}
                    {last}
                  </span>
                </h3>
                <p>
                  <span>{age}</span>
                </p>
              </div>
              <div className={userAddress}>
                <address>
                  {number} {name}, {city}, {state}
                </address>
              </div>

              <div className={userEmail}>
                <span>
                  <FontAwesomeIcon icon={faEnvelopeSquare} />
                </span>
                <address>{email}</address>
              </div>
              <div className={regisDate}>
                <span>joined: {new Date(date).toLocaleDateString()}</span>
              </div>

              <div className={cellPhone}>
                <span>
                  <FontAwesomeIcon icon={faPhone} rotation={90} />
                </span>
                <span>{cell}</span>
              </div>
              <div className={mobPhone}>
                <span>
                  <FontAwesomeIcon icon={faMobile} />
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

  return (
    <div className={allCont}>
      <div className={arrow}>
        <span onClickCapture={handlePreviousPage}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            className={icons}
            color="rgb(48, 187, 181)"
          />
        </span>
        <span className={text}>results</span>
      </div>
      <div className={container}>{displayUserDetail}</div>
    </div>
  );
};

export default withRouter(PreviewUser);
