import React, { useEffect, useRef } from "react";
import * as fabric from "fabric";
import { useLocation } from "react-router-dom";
import "../styles/AddCaptionPage.css";

const FabricCanvas = () => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 500,
      height: 500,
      backgroundColor: "#fff",
    });
    fabricCanvasRef.current = fabricCanvas;

    if (location.state?.imageUrl) {
      const imgElement = new Image();
      imgElement.crossOrigin = "anonymous";
      imgElement.src = location.state.imageUrl;

      imgElement.onload = () => {
        const fabricImage = new fabric.FabricImage(imgElement, {
          scaleX: 400 / imgElement.width,
          scaleY: 400 / imgElement.height,
        });
        fabricCanvas.centerObject(fabricImage);
        fabricCanvas.add(fabricImage);
        fabricCanvas.setActiveObject(fabricImage);
        fabricCanvas.renderAll();
      };
    }

    return () => fabricCanvas.dispose();
  }, [location.state?.imageUrl]);

  const addText = () => {
    const text = new fabric.Textbox("Editable Text", {
      left: 100,
      top: 100,
      fontSize: 24,
      fill: "black",
      editable: true,
    });
    fabricCanvasRef.current.add(text);
    fabricCanvasRef.current.setActiveObject(text);
  };

  const addShape = (shapeType) => {
    let shape;
    switch (shapeType) {
      case "rectangle":
        shape = new fabric.Rect({
          width: 100,
          height: 60,
          fill: "blue",
          left: 150,
          top: 150,
        });
        break;
      case "circle":
        shape = new fabric.Circle({
          radius: 50,
          fill: "green",
          left: 200,
          top: 200,
        });
        break;
      case "triangle":
        shape = new fabric.Triangle({
          width: 100,
          height: 100,
          fill: "red",
          left: 250,
          top: 250,
        });
        break;
      case "polygon":
        shape = new fabric.Polygon(
          [
            { x: 50, y: 0 },
            { x: 100, y: 50 },
            { x: 75, y: 100 },
            { x: 25, y: 100 },
            { x: 0, y: 50 },
          ],
          {
            fill: "purple",
            left: 300,
            top: 300,
          }
        );
        break;
      default:
        return;
    }
    fabricCanvasRef.current.add(shape);
    fabricCanvasRef.current.setActiveObject(shape);
  };

  const downloadCanvasAsImage = () => {
    const dataURL = fabricCanvasRef.current.toDataURL({
      format: "png",
      quality: 1.0,
    });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "canvas-image.png";
    link.click();
  };

  return (
    <div className="add-caption-container">
      <div className="btn-list">
        <button onClick={addText}>Add Text</button>
        <button onClick={() => addShape("rectangle")}>Add Rectangle</button>
        <button onClick={() => addShape("circle")}>Add Circle</button>
        <button onClick={() => addShape("triangle")}>Add Triangle</button>
        <button onClick={() => addShape("polygon")}>Add Polygon</button>
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: "1px solid #ccc" }}
      />
      <button className="download-btn" onClick={downloadCanvasAsImage}>
        Download
      </button>
    </div>
  );
};

export default FabricCanvas;
