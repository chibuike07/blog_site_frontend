import React from "react";
import { Link } from "react-router-dom";
const Links = ({
  url,
  width,
  height,
  text,
  className,
  textDecoration,
  color,
  textTransform,
  border,
  borderRadius,
  padding,
  backgroundColor,
  margin,
  click,
  onMouseOver,
  onMouseLeave,
  id
}) => (
  <Link
    to={url}
    className={className}
    onClick={click ? click : null}
    onMouseOver={onMouseOver ? onMouseOver : null}
    onMouseLeave={onMouseLeave ? onMouseLeave : null}
    id={id ? id : null}
    style={{
      textDecoration: textDecoration ? textDecoration : "none",
      color: color ? color : "#fff",
      textTransform: textTransform ? textTransform : null,
      borderRadius: borderRadius ? borderRadius : null,
      padding: padding ? padding : null,
      backgroundColor: backgroundColor ? backgroundColor : null,
      border: border ? border : null,
      width: width ? width : null,
      height: height ? height : null,
      margin: margin ? margin : null
    }}
  >
    {text ? text : "am here to navigate"}
  </Link>
);

export default Links;
