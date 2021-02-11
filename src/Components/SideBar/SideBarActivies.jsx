import React from "react";
import List from "../../Common/List.component/List";
import SideBarActiviesStyles from "../../Styles/SideBar/SideBarActivities.module.css";

const SideBarActivies = ({
  clickSideBarActivities,
  sideBaractivities,
  sideBarListColor = "#fff",
  removeSideBarOnClickNavLists,
}) => {
  //destructuring styles
  const { nav, list } = SideBarActiviesStyles;

  return (
    <nav className={nav}>
      {sideBaractivities &&
        sideBaractivities.map((values, index) => (
          <List
            text={<span>{values}</span>}
            key={index}
            className={list}
            color={sideBarListColor}
            click={(e) =>
              clickSideBarActivities(
                e.target.innerText,
                removeSideBarOnClickNavLists
              )
            }
          />
        ))}
    </nav>
  );
};

export default SideBarActivies;
