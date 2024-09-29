"use client";

import { useState, useEffect, useRef } from "react";
import Script from "next/script";
import { useSearchParams } from "next/navigation";

declare global {
  interface Window {
    $3Dmol: any;
  }
}

export default function DrugPage() {
  const [molData, setMolData] = useState("");
  const viewerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const diseaseName = searchParams.get("query") || "default";

  useEffect(() => {
    fetch(`/mol/${diseaseName}.mol`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Molecule file not found");
        }
        return response.text();
      })
      .then((data) => {
        setMolData(data);
        if (window.$3Dmol) {
          initViewer(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching mol file:", error);
        // You might want to set some state here to show an error message to the user
      });
  }, [diseaseName]);

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
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100">
      <Script
        src="https://3dmol.org/build/3Dmol-min.js"
        onLoad={() => {
          if (molData) {
            initViewer(molData);
          }
        }}
      />
      <h1 className="text-2xl font-bold mb-4">
        Molecule Viewer: {diseaseName}
      </h1>
      <div
        ref={viewerRef}
        className="w-full max-w-2xl h-[600px] bg-white shadow-lg rounded-lg"
      ></div>
    </div>
  );
}
