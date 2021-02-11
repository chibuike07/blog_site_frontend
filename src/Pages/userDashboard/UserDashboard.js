import React, { useContext, useState } from "react";
import SidebBar from "../../Components/SideBar/SidebBar";
import { UserContext } from "../../Context_files/UserContext";
import CustomPostView from "../../Components/CustomPostView/CustomPostView";
import PostText from "../../Components/UserMutations/PostText";
import axios from "axios";
import {
  errorToastify,
  infoToastify,
} from "../../Common/react_toastify/toastify";

const UserDashboard = () => {
  const [displayFeed, setDisplayFeed] = useState(true);
  const [displayPostForm, setdisplayPostForm] = useState(false);
  const [displayMyPost, setDisplayMyPost] = useState(false);
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
        setDisplayFeed(true);
        setdisplayPostForm(false);
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
        break;

      case "add post":
        setdisplayPostForm(true);
        break;
      default:
        setDisplayFeed(true);
        break;
    }
  };

  return (
    <div>
      <SidebBar
        sideBaractivities={sideBarActivities}
        clickSideBarActivities={handleClickSideBarActivities}
      />

      <div>
        {displayFeed && <CustomPostView posts={posts} />}
        {displayMyPost && <CustomPostView posts={myPosts} />}
        {displayPostForm && <PostText />}
      </div>
    </div>
  );
};

export default UserDashboard;
