import React from "react";
import { Link } from "react-router-dom";
import List from "../List.component/List";

const HeaderItemLi = ({ item }) => {
  return (
    <List
      className="nav-item"
      text={
        <Link to={`/${item}`} className="nav-link">
          {item}
        </Link>
      }
    />
  );
};

export default HeaderItemLi;
