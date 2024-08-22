import React, { useEffect, useCallback } from "react";
import { useDrop } from "react-dnd";
import {
  DraggableButton,
  DraggableImage,
  DraggableLabel,
} from "../DraggableElements";
import useDragDrop from "../../hooks/useDragDrop";

const Canvas = ({ appBarTitle, setAppBarTitle }) => {
  const {
    items,
    setItems,
    selectedItemId,
    setSelectedItemId,
    handleItemDrop,
    handleItemMove,
    handleItemResize,
    handleDeleteItem,
  } = useDragDrop();

  const [, drop] = useDrop(() => ({
    accept: ["button", "image", "label"],
    drop: (item, monitor) => {
      if (item.isOnCanvas) {
        handleItemMove(
          item.id,
          monitor.getSourceClientOffset().x -
            document.getElementById("canvas").getBoundingClientRect().left,
          monitor.getSourceClientOffset().y -
            document.getElementById("canvas").getBoundingClientRect().top
        );
      } else {
        handleItemDrop(item, monitor);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleItemClick = useCallback(
    (id) => {
      setSelectedItemId(id);
      const propertiesElement = document.getElementById(
        "element-properties-container"
      );
      const selectedElement = document.querySelector(`[key="${id}"]`);
      if (selectedElement) {
        propertiesElement.scrollTop = selectedElement.offsetTop;
      }
    },
    [setSelectedItemId]
  );

  const handleClickOutside = useCallback(
    (event) => {
      if (
        !event.target.closest(".properties") &&
        !event.target.closest(".canvas-item")
      ) {
        setSelectedItemId(null);
      }
    },
    [setSelectedItemId]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside,setSelectedItemId]);

  useEffect(() => {
    const rightSection = document.getElementById("element-properties");
    const canvasBoundingRect = document
      .getElementById("canvas")
      .getBoundingClientRect();
    rightSection.innerHTML = `
      ${items
        .map((item, index) => {
          const relativeLeft = (
            (item.left / canvasBoundingRect.width) *
            100
          ).toFixed(2);
          const relativeTop = (
            (item.top / canvasBoundingRect.height) *
            100
          ).toFixed(2);
          return `
          <div key=${
            item.id
          } class="properties" style="margin-bottom: 10px; border: ${
            item.id === selectedItemId ? "2px solid grey" : "none"
          };">
            <div>${index + 1}) Type: ${
            item.type.charAt(0).toUpperCase() + item.type.slice(1)
          }, X: ${item.left}, Y: ${item.top}, Width: ${item.width}, Height: ${
            item.height
          }, Relative X: ${relativeLeft}%, Relative Y: ${relativeTop}%</div>
            <ul>
              <li style="margin-bottom: 5px;"><label>Width:
                <input type="number" value="${
                  item.width
                }" onchange="updateItem('${item.id}', 'width', this.value)" />
              </label></li>
              <li style="margin-bottom: 5px;"><label>Height:
                <input type="number" value="${
                  item.height
                }" onchange="updateItem('${item.id}', 'height', this.value)" />
              </label></li>
              <li style="margin-bottom: 5px;"><label>Leading (X):
                <input type="number" value="${
                  item.left
                }" onchange="updateItem('${item.id}', 'left', this.value)" />
              </label></li>
              <li style="margin-bottom: 5px;"><label>Trailing (X + Width):
                <input type="number" value="${
                  item.left + item.width
                }" onchange="updateItem('${
            item.id
          }', 'trailing', this.value)" />
              </label></li>
              <li style="margin-bottom: 5px;"><label>Top (Y):
                <input type="number" value="${
                  item.top
                }" onchange="updateItem('${item.id}', 'top', this.value)" />
              </label></li>
              <li style="margin-bottom: 5px;"><label>Bottom (Y + Height):
                <input type="number" value="${
                  item.top + item.height
                }" onchange="updateItem('${item.id}', 'bottom', this.value)" />
              </label></li>
              <li style="margin-bottom: 5px;"><label>Relative Left:
                <input type="number" value="${relativeLeft}" onchange="updateItem('${
            item.id
          }', 'relativeLeft', this.value)" />
              </label></li>
              <li style="margin-bottom: 5px;"><label>Relative Top:
                <input type="number" value="${relativeTop}" onchange="updateItem('${
            item.id
          }', 'relativeTop', this.value)" />
              </label></li>
            </ul>
            ${
              item.type === "button"
                ? `
              <ul>
                <li><label>Button Text:
                  <input type="text" value="${
                    item.buttonText
                  }" onchange="updateItem('${
                    item.id
                  }', 'buttonText', this.value)" />
                </label></li>
                <li><label>Font Size:
                  <input type="number" value="${
                    item.fontSize
                  }" onchange="updateItem('${
                    item.id
                  }', 'fontSize', this.value)" />
                </label></li>
                <li><label>Text Color:
                  <input type="color" value="${
                    item.textColor
                  }" onchange="updateItem('${
                    item.id
                  }', 'textColor', this.value)" />
                </label></li>
                <li><label>Bold:
                  <input type="checkbox" ${
                    item.fontWeight === "bold" ? "checked" : ""
                  } onchange="updateItem('${
                    item.id
                  }', 'fontWeight', this.checked ? 'bold' : 'normal')" />
                </label></li>
                <li><label>Button Color:
                  <input type="color" value="${
                    item.backgroundColor
                  }" onchange="updateItem('${
                    item.id
                  }', 'backgroundColor', this.value)" />
                </label></li>
                <li><label>Corner Radius:
                  <input type="number" value="${
                    item.borderRadius
                  }" onchange="updateItem('${
                    item.id
                  }', 'borderRadius', this.value)" />
                </label></li>
                <li><label>Font Family:
                  <select onchange="updateItem('${
                    item.id
                  }', 'fontFamily', this.value)">
                    <option value="Arial" ${
                      item.fontFamily === "Arial" ? "selected" : ""
                    }>Arial</option>
                    <option value="Verdana" ${
                      item.fontFamily === "Verdana" ? "selected" : ""
                    }>Verdana</option>
                    <option value="Times New Roman" ${
                      item.fontFamily === "Times New Roman" ? "selected" : ""
                    }>Times New Roman</option>
                  </select>
                </label></li>
                <li><label>Font Weight:
                  <select onchange="updateItem('${
                    item.id
                  }', 'fontWeight', this.value)">
                    <option value="normal" ${
                      item.fontWeight === "normal" ? "selected" : ""
                    }>Normal</option>
                    <option value="bold" ${
                      item.fontWeight === "bold" ? "selected" : ""
                    }>Bold</option>
                    <option value="lighter" ${
                      item.fontWeight === "lighter" ? "selected" : ""
                    }>Lighter</option>
                  </select>
                </label></li>
              </ul>
            `
                : ""
            }
            ${
              item.type === "image"
                ? `
              <ul>
                <li><label>Corner Radius:
                  <input type="range" min="0" max="10" value="${item.borderRadius}" onchange="updateItem('${item.id}', 'borderRadius', this.value)" />
                </label></li>
                <li><label>Border Color:
                  <input type="color" value="${item.borderColor}" onchange="updateItem('${item.id}', 'borderColor', this.value)" />
                </label></li>
                <li><label>Border Thickness:
                  <input type="range" min="0" max="10" value="${item.borderThickness}" onchange="updateItem('${item.id}', 'borderThickness', this.value)" />
                </label></li>
              </ul>
            `
                : ""
            }
            ${
              item.type === "label"
                ? `
              <ul>
                <li><label>Font Family:
                  <select onchange="updateItem('${
                    item.id
                  }', 'fontFamily', this.value)">
                    <option value="Arial" ${
                      item.fontFamily === "Arial" ? "selected" : ""
                    }>Arial</option>
                    <option value="Verdana" ${
                      item.fontFamily === "Verdana" ? "selected" : ""
                    }>Verdana</option>
                    <option value="Times New Roman" ${
                      item.fontFamily === "Times New Roman" ? "selected" : ""
                    }>Times New Roman</option>
                  </select>
                </label></li>
                <li><label>Font Color:
                  <input type="color" value="${
                    item.textColor
                  }" onchange="updateItem('${
                    item.id
                  }', 'textColor', this.value)" />
                </label></li>
                <li><label>Font Weight:
                  <select onchange="updateItem('${
                    item.id
                  }', 'fontWeight', this.value)">
                    <option value="normal" ${
                      item.fontWeight === "normal" ? "selected" : ""
                    }>Normal</option>
                    <option value="bold" ${
                      item.fontWeight === "bold" ? "selected" : ""
                    }>Bold</option>
                    <option value="lighter" ${
                      item.fontWeight === "lighter" ? "selected" : ""
                    }>Lighter</option>
                  </select>
                </label></li>
                <li><label>Font Size:
                  <input type="number" value="${
                    item.fontSize
                  }" onchange="updateItem('${
                    item.id
                  }', 'fontSize', this.value)" />
                </label></li>
                <li><label>Bold:
                  <input type="checkbox" ${
                    item.fontWeight === "bold" ? "checked" : ""
                  } onchange="updateItem('${
                    item.id
                  }', 'fontWeight', this.checked ? 'bold' : 'normal')" />
                </label></li>
                <li><label>Corner Radius:
                  <input type="range" min="0" max="10" value="${
                    item.borderRadius
                  }" onchange="updateItem('${
                    item.id
                  }', 'borderRadius', this.value)" />
                </label></li>
                <li><label>Border Color:
                  <input type="color" value="${
                    item.borderColor
                  }" onchange="updateItem('${
                    item.id
                  }', 'borderColor', this.value)" />
                </label></li>
              </ul>
            `
                : ""
            }
            <button onclick="deleteItem('${
              item.id
            }')" style="background-color: red; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 3px; display: flex; align-items: center; justify-content: center;">
              <span style="margin-right: 5px;">Delete</span>
              <svg style="fill: white; width: 16px; height: 16px;" viewBox="0 0 24 24"><path d="M16.24,3H7.76L6.5,4H3V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H21V4H17.5L16.24,3M17,19H7V6H17V19Z" /></svg>
            </button>
          </div>`;
        })
        .join("")}
    `;

    window.updateItem = (id, dimension, value) => {
      setItems((prevItems) =>
        prevItems.map((item) => {
          if (item.id === id) {
            const canvasBoundingRect = document
              .getElementById("canvas")
              .getBoundingClientRect();
            if (dimension === "trailing") {
              const newWidth = parseInt(value, 10) - item.left;
              return { ...item, width: newWidth };
            }
            if (dimension === "bottom") {
              const newHeight = parseInt(value, 10) - item.top;
              return { ...item, height: newHeight };
            }
            if (dimension === "relativeLeft") {
              const newLeft =
                (parseFloat(value) / 100) * canvasBoundingRect.width;
              return { ...item, left: newLeft };
            }
            if (dimension === "relativeTop") {
              const newTop =
                (parseFloat(value) / 100) * canvasBoundingRect.height;
              return { ...item, top: newTop };
            }
            if (
              dimension === "backgroundColor" ||
              dimension === "textColor" ||
              dimension === "borderColor"
            ) {
              return { ...item, [dimension]: value };
            }
            return {
              ...item,
              [dimension]: isNaN(value) ? value : parseInt(value, 10),
            };
          }
          return item;
        })
      );
    };

    window.deleteItem = (id) => {
      handleDeleteItem(id);
    };

    // Add click event to properties
    const propertiesElements = document.getElementsByClassName("properties");
    Array.from(propertiesElements).forEach((element) => {
      element.addEventListener("click", (event) => {
        event.stopPropagation();
        const id = element.getAttribute("key");
        setSelectedItemId(id);
      });
    });
  }, [items, selectedItemId, handleDeleteItem]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: "10%",
          backgroundColor: "blue",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "10px",
          marginBottom: "0px",
        }}
      >
        <input
          type="text"
          value={appBarTitle}
          onChange={(e) => setAppBarTitle(e.target.value)}
          style={{
            color: "white",
            backgroundColor: "transparent",
            border: "none",
            fontSize: "20px",
          }}
        />
      </div>
      <div
        id="canvas"
        ref={drop}
        className="canvas"
        style={{
          marginTop: "0px",
          marginBottom: "10px",
          flex: 1,
          border: "3px solid #ccc",
          backgroundColor: "white",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {items.map((item) =>
          item.type === "button" ? (
            <DraggableButton
              key={item.id}
              id={item.id}
              left={item.left}
              top={item.top}
              width={item.width}
              height={item.height}
              onClick={() => handleItemClick(item.id)}
              isSelected={item.id === selectedItemId}
              isOnCanvas={true}
              onMove={handleItemMove}
              onResize={handleItemResize}
              text={item.buttonText}
              fontSize={item.fontSize}
              fontWeight={item.fontWeight}
              textColor={item.textColor}
              backgroundColor={item.backgroundColor}
              borderRadius={item.borderRadius}
              fontFamily={item.fontFamily}
            />
          ) : item.type === "image" ? (
            <DraggableImage
              key={item.id}
              id={item.id}
              left={item.left}
              top={item.top}
              width={item.width}
              height={item.height}
              onClick={() => handleItemClick(item.id)}
              isSelected={item.id === selectedItemId}
              isOnCanvas={true}
              onMove={handleItemMove}
              onResize={handleItemResize}
              borderRadius={item.borderRadius}
              borderColor={item.borderColor}
              borderThickness={item.borderThickness}
            />
          ) : (
            <DraggableLabel
              key={item.id}
              id={item.id}
              left={item.left}
              top={item.top}
              width={item.width}
              height={item.height}
              onClick={() => handleItemClick(item.id)}
              isSelected={item.id === selectedItemId}
              isOnCanvas={true}
              onMove={handleItemMove}
              onResize={handleItemResize}
              fontFamily={item.fontFamily}
              fontSize={item.fontSize}
              fontWeight={item.fontWeight}
              textColor={item.textColor}
              borderRadius={item.borderRadius}
              borderColor={item.borderColor}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Canvas;
