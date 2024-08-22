import React from "react";
import { useDrag } from "react-dnd";

const DraggableButton = ({
  id,
  left,
  top,
  width = 150,
  height = 60,
  onClick,
  isSelected,
  isOnCanvas,
  text,
  fontSize,
  fontWeight,
  textColor,
  backgroundColor,
  borderRadius,
  fontFamily,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "button",
    item: {
      id,
      left,
      top,
      type: "button",
      width,
      height,
      isOnCanvas,
      text,
      fontSize,
      fontWeight,
      textColor,
      backgroundColor,
      borderRadius,
      fontFamily,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <button
      ref={drag}
      onClick={onClick}
      className="canvas-item"
      style={{
        color: textColor,
        background: backgroundColor,
        position: "absolute",
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`,
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        outline: isSelected ? "2px solid darkgrey" : "none",
        border: "none",
        borderRadius: `${borderRadius}px`,
        fontSize: `${fontSize}px`,
        fontWeight: fontWeight,
        fontFamily: fontFamily,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        transition: "transform 0.2s",
      }}
    >
      {text}
    </button>
  );
};

export default DraggableButton;
