import React, { useContext } from "react";
import { AdminContext } from "../../Context_files/AdminContext";
import Lists from "../../Common/List.component/List";

const RegisteredIpAddress = () => {
  const [{ registeredIp }] = useContext(AdminContext);

  const ips = registeredIp ? (
    registeredIp.map(
      (
        {
          firstName,
          lastName,
          registeredIpAddress,
          contact: { address, city, state },
        },
        index
      ) => (
        <div key={index} className="card" style={{ marginBottom: "1rem" }}>
          <div className="card-body">
            <div className="card-title">
              <span
                style={{ textTransform: "capitalize" }}
                className="card-title"
              >
                {address} <br /> {city} {state}
              </span>
            </div>
            <div className="card-text">
              <h2
                className="card-title"
                style={{ textTransform: "capitalize" }}
              >
                {firstName} {lastName}
              </h2>

              <Lists text={registeredIpAddress} />
            </div>
          </div>
        </div>
      )
    )
  ) : (
    <div>NO Registered Ip address</div>
  );
  return (
    <div className="container-fluid" style={{ marginTop: "1rem" }}>
      {ips}
    </div>
  );
};

export default RegisteredIpAddress;
