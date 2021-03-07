import React, { useContext, useState, useEffect } from "react";
import userDashboardStyle from "../../Styles/Clients/UserDashboard.module.css";
import SidebBar from "../../Components/SideBar/SidebBar";
import { UserContext } from "../../Context_files/UserContext";
import PostText from "../../Components/UserMutations/PostText";
import Feeds from "../../Components/Clients/Feed/Feeds";
import PostByUser from "../../Components/Clients/PostByClient/PostByClient";
import ProfilePersonalData from "../../Components/Clients/Profile/ClientProfileData";
import Scrollbar from "react-scrollbars-custom";

import {
  fetchPost,
  fetchMyPosts,
  fetchUserProfileData,
  handleClientSignOut,
} from "../../utils/Client/Request";

const UserDashboard = ({ history }) => {
  const [displayFeed, setDisplayFeed] = useState(true);
  const [displayPostForm, setdisplayPostForm] = useState(false);
  const [displayMyPost, setDisplayMyPost] = useState(false);
  const [displayProfile, setDisplayProfile] = useState(false);
  const [resetAsideWidth, setresetAsideWidth] = useState("80%");
  const { REACT_APP_ENDPOINT } = process.env;
  const [
    { sideBarActivities, posts, myPosts, toggleSideBar },
    setState,
  ] = useContext(UserContext);
  const { container, aside } = userDashboardStyle;

  const handleClickSideBarActivities = (innerText) => {
    switch (innerText.toLowerCase()) {
      case "feeds":
        fetchPost({
          setState,
          setDisplayMyPost,
          setDisplayFeed,
          setDisplayProfile,
          setdisplayPostForm,
        });

        toggleSideBar((curVal) => !curVal);
        break;
      case "my post":
        fetchMyPosts({
          setState,
          setDisplayMyPost,
          setDisplayFeed,
          setDisplayProfile,
          setdisplayPostForm,
        });
        toggleSideBar((curVal) => !curVal);
        break;

      case "profile":
        fetchUserProfileData({
          setState,
          setDisplayMyPost,
          setDisplayFeed,
          setDisplayProfile,
          setdisplayPostForm,
        });
        toggleSideBar((curVal) => !curVal);
        break;

      case "add post":
        setdisplayPostForm(true);
        setDisplayFeed(false);
        setDisplayMyPost(false);
        setDisplayProfile(false);
        toggleSideBar((curVal) => !curVal);
        break;

      case "sign out":
        handleClientSignOut({ history });
        break;
      default:
        setDisplayFeed(true);
        break;
    }
  };

  useEffect(() => {
    fetchPost({
      setState,
      setDisplayMyPost,
      setDisplayFeed,
      setDisplayProfile,
      setdisplayPostForm,
    });

    const onResizeWindow = () => {
      window.innerWidth <= 900
        ? setresetAsideWidth("100%")
        : setresetAsideWidth("80%");
    };
    onResizeWindow();
    return [fetchPost, onResizeWindow];
  }, [REACT_APP_ENDPOINT, setState]);

  return (
    <div className={`d-flex ${container}`}>
      <SidebBar
        sideBaractivities={sideBarActivities}
        clickSideBarActivities={handleClickSideBarActivities}
      />

      <div
        style={{ width: resetAsideWidth }}
        className={`container-fluid ${aside}`}
      >
        <Scrollbar>
          {displayFeed && <Feeds post={posts} />}
          {displayMyPost && <PostByUser post={myPosts} />}
          {displayPostForm && <PostText />}
          {displayProfile && <ProfilePersonalData />}
        </Scrollbar>
      </div>
    </div>
  );
};

export default UserDashboard;
