import React from "react";
import listStyles from "./List.module.css";
const Lists = ({
  className,
  color,
  text,
  paddingTop,
  marginTop,
  click,
  cursor,
  listStyle,
  textTransform,
  mouseEnter,
}) => {
  const { list } = { listStyles };
  return (
    <li
      className={className ? className : list}
      style={{
        color: color ? color : "#000",
        paddingTop: paddingTop ? paddingTop : "",
        marginTop: marginTop ? marginTop : "10px",
        cursor: cursor ? cursor : null,
        listStyle: listStyle ? listStyle : null,
        textTransform: textTransform ? textTransform : null,
      }}
      onClick={click ? click : null}
      onMouseEnter={mouseEnter ? mouseEnter : null}
    >
      {text}
    </li>
  );
};
export default Lists;
