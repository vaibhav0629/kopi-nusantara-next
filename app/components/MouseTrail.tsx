"use client";

import { useEffect, useRef } from "react";
import { MouseCanvas } from "../lib/mouseCanvas";

const deltaUpdateCanvasToWindow = 20;
const deltaUpdateMouseMoved = 10;

export default function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const trail = new MouseCanvas(canvas, 20);
    let frameId = 0;

    const redraw = () => {
      trail.clear();
      trail.createAllBox();
      frameId = requestAnimationFrame(redraw);
    };

    let prevW = window.innerWidth;
    let prevH = window.innerHeight;

    const onResize = () => {
      if (
        Math.abs(prevH - window.innerHeight) >= deltaUpdateCanvasToWindow ||
        Math.abs(prevW - window.innerWidth) >= deltaUpdateCanvasToWindow
      ) {
        prevW = window.innerWidth;
        prevH = window.innerHeight;
        trail.resizeCanvas();
      }
    };

    let prevMouseX = -1;
    let prevMouseY = -1;

    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      if (
        Math.abs(prevMouseX - x) >= deltaUpdateMouseMoved ||
        Math.abs(prevMouseY - y) >= deltaUpdateMouseMoved
      ) {
        trail.recordMouse(x, y, prevMouseX, prevMouseY);
        prevMouseX = x;
        prevMouseY = y;
      }
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    const intervalId = setInterval(() => trail.updateArray(), 100);
    redraw();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      clearInterval(intervalId);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas id="canvasId" ref={canvasRef}></canvas>;
}