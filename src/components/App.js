import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import DnDContext from "../contexts/DnDContext";
import Canvas from "./Canvas/Canvas";
import {
  DraggableButton,
  DraggableImage,
  DraggableLabel,
} from "./DraggableElements";
import "../styles/index.css";

const App = () => {
  const [appBarTitle, setAppBarTitle] = useState("App Bar Title");
  const initialButtonId = uuidv4();
  const initialImageId = uuidv4();
  const initialLabelId = uuidv4();
  const handleCaptureCanvas = () => {
    const canvasElement = document.getElementById("canvas");

    const canvasHtml = canvasElement.outerHTML;

    console.log(canvasHtml);

    // Create a blob from the HTML content

    const blob = new Blob([canvasHtml], { type: "text/html" });

    // Create a temporary link element to trigger the download

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    const fileName = `${appBarTitle.replace(/\s+/g, "_")}.html`;

    link.download = fileName;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  return (
    <DnDContext>
      <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
        <div
          style={{
            width: "20%",
            height: "90vh",
            margin: "10px",
            padding: "20px",
            border: "3px solid black",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
        >
          <h3>Draggable Elements</h3>
          <div
            style={{
              border: "2px solid black",
              padding: "10px",
              width: "100%",
              height: "80vh",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <div style={{ margin: "10px 0" }}>
              <DraggableButton
                id={initialButtonId}
                left={70}
                top={50}
                width={150}
                height={60}
                isOnCanvas={false}
                text="Button"
                backgroundColor="#5c7cfa"
                textColor="#ffffff"
                fontSize={16}
                fontWeight="normal"
                borderRadius={8}
                fontFamily="Arial"
              />
            </div>
            <div style={{ margin: "10px 0" }}>
              <DraggableImage
                id={initialImageId}
                left={70}
                top={130}
                width={150}
                height={150}
                isOnCanvas={false}
              />
            </div>
            <div style={{ margin: "10px 0" }}>
              <DraggableLabel
                id={initialLabelId}
                left={70}
                top={300}
                width={150}
                height={60}
                isOnCanvas={false}
              />
            </div>
          </div>
          {/* Submit Button */}

          <button
            onClick={handleCaptureCanvas}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Download Code
          </button>
        </div>
        <div
          style={{
            width: "35%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Canvas appBarTitle={appBarTitle} setAppBarTitle={setAppBarTitle} />
        </div>
        <div
          id="element-properties-container"
          style={{
            width: "45%",
            padding: "20px",
            margin: "10px",
            border: "3px solid black",
            overflowY: "auto",
          }}
        >
          <h3>Element Properties</h3>
          <div id="element-properties"></div>
        </div>
      </div>
    </DnDContext>
  );
};

export default App;
