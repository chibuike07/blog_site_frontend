import React, { useEffect, useState, useContext } from "react";
import UserDisplayCard from "../../Components/AdminComponents/UserDisplayCard";
import { AdminContext } from "../../Context_files/AdminContext";
import SideBar from "../../Components/SideBar/SidebBar";
import PostFeeds from "../../Components/AdminComponents/PostFeeds";
import RegisteredIpAddress from "../../Components/AdminComponents/RegisteredIpAddress";
import AdminDashboardStaticData from "../../Components/AdminComponents/AdminDashboardStaticData";
import ScrollBar from "react-scrollbars-custom";
import AdminDashboardStyle from "../../Styles/AdminDashboard/AdminDashboard.module.css";
import {
  fetchClients,
  handleFetchPosts,
  fetchRegisteredIp,
  fetchLatestLoginClients,
} from "../../utils/Admin/Requests";

const AdminDashboard = () => {
  const { REACT_APP_ENDPOINT } = process.env;
  const [
    { sideBarActivities, clientPosts, toggleSideBar },
    setState,
  ] = useContext(AdminContext);

  const { container } = AdminDashboardStyle;
  const [displayDashboard, setdisplayDashboard] = useState(true);
  const [displayUser, setdisplayUser] = useState(false);
  const [displayPosts, setdisplayPosts] = useState(false);
  const [displayRegisteredIp, setdisplayRegisteredIp] = useState(false);

  const handleSideBarClick = (value) => {
    switch (value.toLowerCase()) {
      case "dashboard":
        setdisplayDashboard(true);
        setdisplayRegisteredIp(false);
        setdisplayUser(false);
        setdisplayPosts(false);
        toggleSideBar((curVal) => !curVal);
        break;

      case "users":
        fetchClients({
          setdisplayUser,
          setdisplayDashboard,
          setdisplayPosts,
          setdisplayRegisteredIp,
          setState,
        });
        toggleSideBar((curVal) => !curVal);
        break;

      case "posts":
        handleFetchPosts({
          setdisplayUser,
          setdisplayDashboard,
          setdisplayPosts,
          setdisplayRegisteredIp,
          setState,
        });
        toggleSideBar((curVal) => !curVal);
        break;

      case "registered ip":
        fetchRegisteredIp({
          setdisplayUser,
          setdisplayDashboard,
          setdisplayPosts,
          setdisplayRegisteredIp,
          setState,
        });
        toggleSideBar((curVal) => !curVal);
        break;

      default:
        return value;
      // break;
    }
  };

  useEffect(() => {
    fetchLatestLoginClients({ setState });
    return [fetchLatestLoginClients];
  }, [REACT_APP_ENDPOINT, setState]);

  return (
    <div className={container}>
      <SideBar
        sideBaractivities={sideBarActivities && sideBarActivities}
        clickSideBarActivities={handleSideBarClick}
      />
      <div className="container-fluid">
        <ScrollBar>
          {displayDashboard && <AdminDashboardStaticData />}
          {displayUser && <UserDisplayCard />}
          {displayPosts && <PostFeeds post={clientPosts && clientPosts} />}
          {displayRegisteredIp && <RegisteredIpAddress />}
        </ScrollBar>
      </div>
    </div>
  );
};

export default AdminDashboard;
