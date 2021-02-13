import React, { useContext } from "react";
import UserListsPage from "../../Components/UserLists/UserLists";
import UserListPageStyles from "../../Styles/UserLists/UserListPage.module.css";
import DisplayUsersCard from "../../Components/DisplayUserListComponent/DisplayUsersCard";
import PreviewUser from "../../Components/DisplaySpecifiedUser/PreviewUser";
import { DashBoardContext } from "../../Context_file/DashBoardContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faCloudDownloadAlt,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../Common/Button.component/Button";
import { CSVLink } from "react-csv";

const UserListPage = () => {
  const {
    container,
    wrapper,
    belowButton,
    belowWrapper,
    download,
    button,
    btn,
  } = UserListPageStyles;
  const [
    {
      showAllList,
      page,
      usersList,
      tags,
      specifiedUserData,
      handleDownColor,
      showPreview,
    },
    setState,
  ] = useContext(DashBoardContext);

  const handlepagination = (id) => {
    switch (id) {
      case "next":
        setState((data) => ({
          ...data,
          page: data.page + 1,
        }));

        break;

      case "prev":
        page >= 2
          ? setState((data) => ({
              ...data,
              page: data.page - 1,
            }))
          : setState((data) => ({
              ...data,
              page: 1,
            }));

        break;
      default:
        break;
    }
  };

  return (
    <div className={container}>
      <div className={wrapper}>
        <UserListsPage />
        {showAllList && <DisplayUsersCard />}
        {showPreview && <PreviewUser />}
        <div className="">
          <div className="">
            <div
              className=""
              style={{
                backgroundColor: handleDownColor
                  ? "rgb(123, 106, 194)"
                  : "rgb(196, 175, 230)",
                // :
              }}
            >
              <FontAwesomeIcon icon={faCloudDownloadAlt} color="#fff" />
              <span>
                <CSVLink
                  data={specifiedUserData ? [specifiedUserData] : usersList}
                  filename={`${tags}.csv`}
                  className="btn btn-primary"
                  target="_blank"
                >
                  download result
                </CSVLink>
              </span>
            </div>
            <div className="">
              <Button
                text={
                  <FontAwesomeIcon
                    icon={faAngleLeft}
                    color="#000"
                    opacity="0.4"
                  />
                }
                click={() => handlepagination("prev")}
                className=""
                backgroundColor="rgb(238 238 246)"
              />
              <Button
                text={<FontAwesomeIcon icon={faAngleRight} />}
                className=""
                backgroundColor="rgb(162 163 178)"
                click={() => handlepagination("next")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserListPage;
