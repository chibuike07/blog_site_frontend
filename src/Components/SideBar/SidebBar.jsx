import React, { useEffect, useState, useContext, useRef } from "react";
import SideBarStyles from "../../Styles/SideBar/SideBar.module.css";
import Avatar from "../Avatar/Avatar";

import Profile from "./Profile";
import SideBarActivies from "./SideBarActivies";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHamburger } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../Context_files/UserContext";
import { AdminContext } from "../../Context_files/AdminContext";

const SidebBar = ({
  clickSideBarActivities,
  tag,
  sideBaractivities,
  displayProfile,
}) => {
  //destructuring styles
  const { container, menuIcon, iconWrapper, aside, icon } = SideBarStyles;

  //destructuring setState method
  const [, setState] = useContext(UserContext);
  const [, AdminSetState] = useContext(AdminContext);
  const showAside = useRef();

  const [toggleHambuger, settoggleHambuger] = useState(false);

  //toggle the side bar on clicke of the menu bar

  const handleDisplaySideBar = () => {
    settoggleHambuger((curVal) => !curVal);
    setState((data) => ({
      ...data,
      toggleSideBar: settoggleHambuger,
    }));

    AdminSetState((data) => ({
      ...data,
      toggleSideBar: settoggleHambuger,
    }));
  };

  //removing the avatar lines on load
  useEffect(() => {
    const removeAvatarLines = () => {
      setState((data) => ({ ...data, avatarLines: false }));
    };
    removeAvatarLines();

    const showMenuBarItemOnLargerScreens = () => {
      let screenSize = window.innerWidth > 900;

      if (screenSize) {
        settoggleHambuger(true);
      }
    };
    showMenuBarItemOnLargerScreens();

    return [removeAvatarLines, showMenuBarItemOnLargerScreens];
  }, [setState]);

  let removeSideBarOnClickNavLists = {
    showAside,
  };
  return (
    <div className={container}>
      <div className={menuIcon}>
        <div className={iconWrapper} onClick={handleDisplaySideBar}>
          <FontAwesomeIcon
            icon={faHamburger}
            color="#fff"
            size="2x"
            className={icon}
          />
        </div>
      </div>
      {toggleHambuger && (
        <aside className={aside} ref={showAside}>
          <Avatar tag={tag} color={"#fff"} tagColor={"#fff"} />
          {displayProfile && <Profile />}

          <SideBarActivies
            clickSideBarActivities={clickSideBarActivities}
            sideBaractivities={sideBaractivities}
            removeSideBarOnClickNavLists={removeSideBarOnClickNavLists}
          />
        </aside>
      )}
    </div>
  );
};

export default SidebBar;
