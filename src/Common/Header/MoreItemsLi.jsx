import React from "react";
import { withRouter } from "react-router-dom";
import List from "../List.component/List";
import { Link } from "react-router-dom";

const MoreItemsLi = ({ item, history }) => {
  const handleSignOut = () => {
    //getting the cookie(s) that are registered
    const sessionStorage = document.cookie
      .split(" ")
      .filter(
        (v) =>
          v.includes(`${process.env.REACT_APP_COOKIE_NAME}`) ||
          v.includes(`${process.env.REACT_APP_COOKIE_NAME_USER}`)
      );

    //extract the key from the the cookie
    let tokenKey = sessionStorage.toString().split("=");

    //confirm signing out
    const confirmExit = window.confirm("Are you sure you want to signout");

    //replace the cookie with an empty string
    let replacedCookie = (document.cookie = `${tokenKey[0]}="";`);
    window.sessionStorage.removeItem("token");

    return confirmExit === true ? replacedCookie : false;
  };

  const handleLogOut = (innerText) => {
    console.log("innerText", innerText);
  };

  return (
    <List
      text={
        <Link
          to={() => {
            if (item === "log out") {
              return "/home";
            } else {
              return `/${item}`;
            }
          }}
          className="nav-link"
          onClick={(e) => handleLogOut(e.target.innerText)}
        >
          {`${item[0].toUpperCase()}${item.slice(1)}`}
        </Link>
      }
    />
  );
};

export default withRouter(MoreItemsLi);
