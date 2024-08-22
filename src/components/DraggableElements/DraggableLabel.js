import React, { useState } from "react";
import { useDrag } from "react-dnd";

const DraggableLabel = ({
  id,
  left,
  top,
  width = 150,
  height = 60,
  onClick,
  isSelected,
  isOnCanvas,
  fontFamily,
  fontSize,
  fontWeight,
  textColor,
  borderRadius,
  borderColor,
}) => {
  const [text, setText] = useState("");
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "label",
    item: {
      id,
      left,
      top,
      type: "label",
      width,
      height,
      isOnCanvas,
      fontFamily,
      fontSize,
      fontWeight,
      textColor,
      borderRadius,
      borderColor,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <textarea
      ref={drag}
      placeholder="Enter the text"
      value={text}
      onClick={onClick}
      onChange={(e) => setText(e.target.value)}
      className="canvas-item"
      style={{
        position: "absolute",
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`,
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        outline: isSelected ? "2px solid darkgrey" : "none",
        resize: "none",
        overflow: "hidden",
        wordWrap: "break-word",
        fontFamily: fontFamily,
        fontSize: `${fontSize}px`,
        fontWeight: fontWeight,
        color: textColor,
        borderRadius: `${borderRadius}px`,
        border: `1px solid ${borderColor}`,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",

        transition: "transform 0.2s",
      }}
    />
  );
};

export default DraggableLabel;
