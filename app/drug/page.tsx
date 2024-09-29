"use client";

import { useState, useEffect, useRef } from "react";
import Script from "next/script";

declare global {
  interface Window {
    $3Dmol: any;
  }
}

export default function DrugPage() {
  const [molData, setMolData] = useState("");
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/ethanol.mol")
      .then((response) => response.text())
      .then((data) => {
        setMolData(data);
        if (window.$3Dmol) {
          initViewer(data);
        }
      })
      .catch((error) => console.error("Error fetching mol file:", error));
  }, []);

  const initViewer = (data: string) => {
    if (viewerRef.current && window.$3Dmol) {
      let viewer = window.$3Dmol.createViewer(viewerRef.current, {
        backgroundColor: "white",
      });
      viewer.addModel(data, "mol");
      viewer.setStyle({}, { stick: {} });
      viewer.zoomTo();
      viewer.render();
    }
  };

  return (
    <div>
      <Script
        src="https://3dmol.org/build/3Dmol-min.js"
        onLoad={() => {
          if (molData) {
            initViewer(molData);
          }
        }}
      />
      <div
        ref={viewerRef}
        style={{ height: "400px", width: "400px", position: "relative" }}
      ></div>
    </div>
  );
}
