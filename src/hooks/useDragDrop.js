import { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

const useDragDrop = () => {
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleItemDrop = useCallback((item, monitor) => {
    const offset = monitor.getClientOffset();
    const canvasBoundingRect = document
      .getElementById("canvas")
      .getBoundingClientRect();
    const left = offset.x - canvasBoundingRect.left;
    const top = offset.y - canvasBoundingRect.top;

    const newItem = {
      id: uuidv4(),
      type: item.type,
      left,
      top,
      width: item.width,
      height: item.height,
      fontSize: item.fontSize,
      fontWeight: item.fontWeight,
      textColor: item.textColor,
      borderRadius: item.borderRadius,
      fontFamily: item.fontFamily,
      buttonText: item.text, // Add default button text
      borderColor: item.borderColor,
      borderThickness: item.borderThickness,
      backgroundColor: item.backgroundColor,
    };
    setItems((prevItems) => [...prevItems, newItem]);
  }, []);

  const handleItemMove = useCallback((id, left, top) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, left, top } : item))
    );
  }, []);

  const handleItemResize = useCallback((id, width, height, left, top) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              width: parseInt(width, 10),
              height: parseInt(height, 10),
              left,
              top,
            }
          : item
      )
    );
  }, []);

  const handleDeleteItem = useCallback((id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  return {
    items,
    setItems,
    selectedItemId,
    setSelectedItemId,
    handleItemDrop,
    handleItemMove,
    handleItemResize,
    handleDeleteItem,
  };
};

export default useDragDrop;
