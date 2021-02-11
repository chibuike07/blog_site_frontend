import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import AvatarStyle from "../../Styles/Avatar/Avatar.module.css";

const Avatar = ({ tag, color, tagColor, avatarLines }) => {
  const {
    container,
    tagWrapper,
    avatarWrapper,
    leftLine,
    avatar,
    rightLine,
    icon,
  } = AvatarStyle;

  return (
    <div className={container}>
      <div className={tagWrapper}>
        <h2 style={{ color: tagColor ? tagColor : null }}>{tag}</h2>
      </div>
      <div className={avatarWrapper}>
        {avatarLines && <div className={leftLine}></div>}
        <div className={avatar}>
          <FontAwesomeIcon
            icon={faUser}
            size="3x"
            className={icon}
            color={color ? color : null}
          />
        </div>
        {avatarLines === true && <div className={rightLine}></div>}
      </div>
    </div>
  );
};

export default Avatar;
