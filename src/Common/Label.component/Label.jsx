import React from "react";

const Label = ({ labelFor, text, className, color, id }) => (
  <div className="custom_label" style={{ color: color ? color : null }}>
    <label
      htmlFor={labelFor ? labelFor : null}
      className={className ? className : null}
      style={{ color: color ? color : null }}
      id={id ? id : null}
    >
      {text}
    </label>
  </div>
);
export default Label;
