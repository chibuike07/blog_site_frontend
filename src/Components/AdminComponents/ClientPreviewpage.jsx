import React, { useEffect, useState } from "react";

import PreviewUser from "../AdminComponents/PreviewUsers";
import { AuthAxios } from "../../helper/CookieRequest";

const ClientPreviewpage = ({ match }) => {
  const { REACT_APP_ENDPOINT } = process.env;

  const [UserData, setUserData] = useState([]);
  const { userId } = match.params;

  useEffect(() => {
    const fetchSingleUser = async () => {
      await AuthAxios.get(
        `${REACT_APP_ENDPOINT}/admin/get_one_client/${userId}`,
        {
          "Content-Type": "application/json",
          withCredentials: true,
        }
      )
        .then((res) => {
          console.log("res.data.data", res.data.data);
          setUserData(res.data.data);
        })
        .catch(
          (err) =>
            err.response === undefined
              ? false
              : console.log("err.response", err.response)
          // errorToastify(err.response.data.message)
        );
    };
    fetchSingleUser();
    return [fetchSingleUser];
  }, [REACT_APP_ENDPOINT, match, userId]);
  return (
    <div>
      <PreviewUser userData={UserData} />
    </div>
  );
};

export default ClientPreviewpage;
