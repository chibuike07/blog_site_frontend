import React, { useContext } from "react";
import { AdminContext } from "../../Context_files/AdminContext";
import AdminDashboardStaticDataStyle from "../../Styles/AdminComponents/AdminDashBoardDataStistics.module.css";

const AdminDashboardStaticData = () => {
  const [{ dashBoardStaticData }] = useContext(AdminContext);
  const { heading } = AdminDashboardStaticDataStyle;
  const RecentLoginclientsDetails = dashBoardStaticData ? (
    [dashBoardStaticData].map(
      ({ loginTime, ClientLoggedInIpAddress, _id }, index) => (
        <div className="container-fluid" key={index}>
          <div className="card" key={_id}>
            <div className="card-body">
              <div className="container">
                <h2
                  className="card-title"
                  style={{ textTransform: "capitalize" }}
                >
                  last login date
                </h2>
                <p>{loginTime}</p>
              </div>
              <hr />
              <div className="container">
                <h2 className={`card-title ${heading}`}>
                  last login ip address
                </h2>

                <p className="card-text">{ClientLoggedInIpAddress}</p>
              </div>
            </div>
          </div>
        </div>
      )
    )
  ) : (
    <div className="container">
      <h4 className="card-text">oop! seems we have no client at the moment</h4>
    </div>
  );
  return (
    <div className="container-fluid" style={{ marginTop: "1rem" }}>
      {RecentLoginclientsDetails}
    </div>
  );
};

export default AdminDashboardStaticData;
