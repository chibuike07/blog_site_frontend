import React from "react";

const TextArea = ({
  name,
  onChange,
  placeholder,
  value,
  isRequired,
  className,
  outLine,
  id,
  paddingLeft,
  border,
  borderRadius,
  width,
  height,
  borderTop,
  borderBottom,
  backgroundColor,
  color,
  opacity,
  isRefs,
  autoComplete,
  autoCorrect,
  spellCheck,
  readOnly,
  onInput,
  focus,
  click,
  onClickCapture,
  onKeyup,
  cols,
  rows,
  minWidth,
}) => {
  return (
    <div className={className ? className : null}>
      <textarea
        style={{
          outline: outLine ? outLine : "none",
          minWidth: minWidth ? minWidth : null,
          paddingLeft: paddingLeft ? paddingLeft : null,
          width: width ? width : null,
          border: border ? border : null,
          borderRadius: borderRadius ? borderRadius : null,
          borderTop: borderTop ? borderTop : null,
          borderBottom: borderBottom ? borderBottom : null,
          height: height ? height : null,
          color: color ? color : null,
          backgroundColor: backgroundColor ? backgroundColor : null,
          opacity: opacity ? opacity : null,
        }}
        placeholder={placeholder}
        onChange={onChange}
        value={value ? value : ""}
        name={name}
        required={isRequired}
        id={id ? id : null}
        ref={isRefs ? isRefs : null}
        autoComplete={autoComplete ? autoComplete : null}
        autoCorrect={autoCorrect ? autoCorrect : null}
        spellCheck={spellCheck ? spellCheck : null}
        readOnly={readOnly ? readOnly : null}
        onInput={onInput ? onInput : null}
        onClick={click ? click : null}
        onClickCapture={onClickCapture ? onClickCapture : null}
        onFocus={focus ? focus : null}
        onKeyUp={onKeyup ? onKeyup : null}
        cols={cols ? cols : null}
        rows={rows ? rows : "10"}
      ></textarea>
    </div>
  );
};

export default TextArea;
