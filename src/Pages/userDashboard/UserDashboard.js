import React, { useContext, useState, useEffect } from "react";
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
  const { REACT_APP_ENDPOINT } = process.env;
  const [{ sideBarActivities, posts, myPosts }, setState] = useContext(
    UserContext
  );

  const handleClickSideBarActivities = (innerText, hideSideBar) => {
    switch (innerText.toLowerCase()) {
      case "feeds":
        fetchPost({
          setState,
          setDisplayMyPost,
          setDisplayFeed,
          setDisplayProfile,
          setdisplayPostForm,
        });
        break;
      case "my post":
        fetchMyPosts({
          setState,
          setDisplayMyPost,
          setDisplayFeed,
          setDisplayProfile,
          setdisplayPostForm,
        });
        break;

      case "profile":
        fetchUserProfileData({
          setState,
          setDisplayMyPost,
          setDisplayFeed,
          setDisplayProfile,
          setdisplayPostForm,
        });
        break;

      case "add post":
        setdisplayPostForm(true);
        setDisplayFeed(false);
        setDisplayMyPost(false);
        setDisplayProfile(false);
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
    return [fetchPost];
  }, [REACT_APP_ENDPOINT, setState]);

  return (
    <div className="d-flex between container-fluid">
      <SidebBar
        sideBaractivities={sideBarActivities}
        clickSideBarActivities={handleClickSideBarActivities}
      />

      <div style={{ width: "80%" }} className="container-fluid">
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
