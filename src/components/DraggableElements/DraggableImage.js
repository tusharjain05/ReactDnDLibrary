import React from "react";
import { useDrag } from "react-dnd";

const DraggableImage = ({
  id,
  left,
  top,
  width = 150,
  height = 150,
  onClick,
  isSelected,
  isOnCanvas,
  borderRadius,
  borderColor,
  borderThickness,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id, left, top, type: "image", width, height, isOnCanvas },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <img
      ref={drag}
      onClick={onClick}
      className="canvas-item"
      src="/Yamaha-Logo.png" // Use the new image source
      alt="Draggable"
      style={{
        position: "absolute",
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`,
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        outline: isSelected ? "2px solid darkgrey" : "none",
        borderRadius: `${borderRadius}px`,
        borderColor: borderColor,

        borderWidth: `${borderThickness}px`,

        borderStyle: "solid",

        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",

        transition: "transform 0.2s",
      }}
    />
  );
};

export default DraggableImage;
