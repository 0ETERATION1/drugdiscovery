"use client";

import { useState, useEffect, useRef } from "react";
import Script from "next/script";
import { useSearchParams } from "next/navigation";
import MoleculeAI from "../../components/MoleculeAI";

declare global {
  interface Window {
    $3Dmol: any;
  }
}

export default function ClientDrugPage() {
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
    <div className="container mx-auto px-4 py-8">
      <Script
        src="https://3dmol.org/build/3Dmol-min.js"
        onLoad={() => {
          if (molData) {
            initViewer(molData);
          }
        }}
      />
      <header className="bg-black text-white py-10 mb-8">
        <h1 className="text-3xl font-bold text-center">
          Generated Medication For: {diseaseName}
        </h1>
      </header>
      <div className="relative mb-8">
        <div
          ref={viewerRef}
          className="w-full max-w-1xl h-[200px] bg-gray-100 shadow-lg rounded-lg mx-auto"
        ></div>
      </div>
      {molData && <MoleculeAI molData={molData} diseaseName={diseaseName} />}
    </div>
  );
}
