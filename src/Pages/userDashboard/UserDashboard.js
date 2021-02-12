import React, { useContext, useState, useEffect } from "react";
import SidebBar from "../../Components/SideBar/SidebBar";
import { UserContext } from "../../Context_files/UserContext";
import CustomPostView from "../../Components/CustomPostView/CustomPostView";
import PostText from "../../Components/UserMutations/PostText";
import axios from "axios";
import {
  errorToastify,
  infoToastify,
} from "../../Common/react_toastify/toastify";
import Feeds from "../../Components/Clients/Feed/Feeds";
import PostByUser from "../../Components/Clients/PostByClient/PostByClient";
import ProfilePersonalData from "../../Components/Clients/Profile/ClientProfileData";
import Scrollbar from "react-scrollbars-custom";

const UserDashboard = () => {
  const [displayFeed, setDisplayFeed] = useState(true);
  const [displayPostForm, setdisplayPostForm] = useState(false);
  const [displayMyPost, setDisplayMyPost] = useState(false);
  const [displayProfile, setDisplayProfile] = useState(false);
  const { REACT_APP_ENDPOINT } = process.env;
  const [{ sideBarActivities, posts, myPosts }, setState] = useContext(
    UserContext
  );

  const fetchPost = async () => {
    await axios
      .get(`${REACT_APP_ENDPOINT}/post`, {
        "Content-Type": "application/json",
      })
      .then((res) => {
        if (res.status === 204) {
          infoToastify(res.data.message);
        }
        console.log("res.data", res.data);
        setState((data) => ({
          ...data,
          posts: res.data.data,
          myPosts: [],
        }));
        setDisplayFeed(true);
        setDisplayMyPost(false);
        setdisplayPostForm(false);
        setDisplayProfile(false);
      })
      .catch((err) =>
        err.response === undefined
          ? false
          : errorToastify(err.response.data.message)
      );
  };

  const fetchMyPosts = async () => {
    await axios
      .get(`${REACT_APP_ENDPOINT}/mypost`, {
        "Content-Type": "application/json",
        withCredentials: true,
      })
      .then((res) => {
        console.log("res.data", res.data);

        setState((data) => ({
          ...data,
          myPosts: res.data.data,
          posts: [],
        }));
        setDisplayMyPost(true);
        setDisplayFeed(false);
        setdisplayPostForm(false);
        setDisplayProfile(false);
      })
      .catch((err) =>
        err.response === undefined
          ? false
          : errorToastify(err.response.data.message)
      );
  };

  const fetchUserProfileData = async () => {
    await axios
      .get(`${REACT_APP_ENDPOINT}/user/get_profile`, {
        "Content-Type": "application/json",
        withCredentials: true,
      })
      .then((res) => {
        setState((data) => ({
          ...data,
          personalData: res.data.data,
        }));
        setDisplayProfile(true);
        setdisplayPostForm(false);
        setDisplayFeed(false);
        setDisplayMyPost(false);
      })
      .catch((err) =>
        err.response === undefined
          ? false
          : errorToastify(err.response.data.message)
      );
  };

  const handleClickSideBarActivities = (innerText, hideSideBar) => {
    // window.innerWidth <= 900
    //   ? hideSideBarAndSetDisplayToNone(hideSideBar)
    //   : showSideBarAndSetWidthToHundred();

    switch (innerText.toLowerCase()) {
      case "feeds":
        fetchPost();

        break;
      case "my post":
        fetchMyPosts();
        break;

      case "profile":
        fetchUserProfileData();
        break;

      case "add post":
        setdisplayPostForm(true);
        setDisplayFeed(false);
        setDisplayMyPost(false);
        setDisplayProfile(false);
        break;
      default:
        setDisplayFeed(true);
        break;
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      await axios
        .get(`${REACT_APP_ENDPOINT}/post`, {
          "Content-Type": "application/json",
        })
        .then((res) => {
          if (res.status === 204) {
            infoToastify(res.data.message);
          }
          console.log("res.data", res.data);
          setState((data) => ({
            ...data,
            posts: res.data.data,
            myPosts: [],
          }));
          setDisplayFeed(true);
          setDisplayMyPost(false);
          setdisplayPostForm(false);
        })
        .catch((err) =>
          err.response === undefined
            ? false
            : errorToastify(err.response.data.message)
        );
    };
    fetchPost();
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
