import React, { useEffect, useState, useContext } from "react";
import UserDisplayCard from "../../Components/AdminComponents/UserDisplayCard";
import axios from "axios";
import { AdminContext } from "../../Context_files/AdminContext";
import { errorToastify } from "../../Common/react_toastify/toastify";
import SideBar from "../../Components/SideBar/SidebBar";
import PostFeeds from "../../Components/AdminComponents/PostFeeds";
import RegisteredIpAddress from "../../Components/AdminComponents/RegisteredIpAddress";
import AdminDashboardStaticData from "../../Components/AdminComponents/AdminDashboardStaticData";
import ScrollBar from "react-scrollbars-custom";

const AdminDashboard = () => {
  const { REACT_APP_ENDPOINT } = process.env;
  const [{ sideBarActivities, clientPosts }, setState] = useContext(
    AdminContext
  );
  const [displayDashboard, setdisplayDashboard] = useState(true);
  const [displayUser, setdisplayUser] = useState(false);
  const [displayPosts, setdisplayPosts] = useState(false);
  const [displayRegisteredIp, setdisplayRegisteredIp] = useState(false);

  const fetchClients = async () => {
    await axios
      .get(`${REACT_APP_ENDPOINT}/admin/get_client?page=${1}&limit=${10}`, {
        "Content-Type": "application/json",
        // withCredentials: true,
      })
      .then((res) => {
        setState((data) => ({
          ...data,
          usersList: res.data.data,
        }));
        setdisplayUser(true);
        setdisplayDashboard(false);
        setdisplayPosts(false);
        setdisplayRegisteredIp(false);
      })
      .catch((err) =>
        err.response === undefined
          ? false
          : errorToastify(err.response.data.message)
      );
  };

  const handleFetchPosts = async () => {
    await axios
      .get(`${REACT_APP_ENDPOINT}/post`, {
        "Content-Type": "application/json",
        withCredentials: true,
      })
      .then((res) => {
        setState((data) => ({
          ...data,
          clientPosts: res.data.data,
        }));
        setdisplayPosts(true);
        setdisplayUser(false);
        setdisplayDashboard(false);
        setdisplayRegisteredIp(false);
      })
      .catch((err) =>
        err.response === undefined
          ? false
          : errorToastify(err.response.data.message)
      );
  };

  const fetchRegisteredIp = async () => {
    await axios
      .get(`${REACT_APP_ENDPOINT}/admin/registeredIp`, {
        "Content-Type": "application/json",
        withCredentials: true,
      })
      .then((res) => {
        setState((data) => ({
          ...data,
          registeredIp: res.data.data,
        }));

        setdisplayRegisteredIp(true);
        setdisplayUser(false);
        setdisplayDashboard(false);
        setdisplayPosts(false);
      })
      .catch((err) =>
        err.response === undefined
          ? false
          : errorToastify(err.response.data.message)
      );
  };

  const handleSideBarClick = (value) => {
    switch (value.toLowerCase()) {
      case "dashboard":
        setdisplayDashboard(true);
        setdisplayRegisteredIp(false);
        setdisplayUser(false);
        setdisplayPosts(false);
        break;

      case "users":
        fetchClients();
        break;

      case "posts":
        handleFetchPosts();
        break;

      case "registered ip":
        fetchRegisteredIp();
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    const fetchLatestLoginClients = async () => {
      await axios
        .get(`${REACT_APP_ENDPOINT}/admin/dashboard_data`, {
          "Content-Type": "application/json",
          // withCredentials: true,
        })
        .then((res) => {
          setState((data) => ({
            ...data,
            dashBoardStaticData: res.data.data,
          }));
        })
        .catch((err) =>
          err.response === undefined
            ? false
            : errorToastify(err.response.data.message)
        );
    };
    fetchLatestLoginClients();
    return [fetchLatestLoginClients];
  }, [REACT_APP_ENDPOINT, setState]);

  return (
    <div className="container-fluid d-flex">
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
