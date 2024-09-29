"use client";

import React, { useState, useEffect } from "react";
import MoleculeAI from "../../components/MoleculeAI";

export default function TestMoleculeAI() {
  const [molData, setMolData] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetch("/mol/covid.mol") // Updated path to the correct location
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        console.log("Loaded mol data:", data);
        setMolData(data);
      })
      .catch((error) => {
        console.error("Error loading mol data:", error);
        setError(
          "Failed to load molecule data. Please check if the file exists and try again."
        );
      });
  }, []);

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Test MoleculeAI Component</h1>
      {molData ? (
        <MoleculeAI molData={molData} diseaseName="COVID-19" />
      ) : (
        <p>Loading mol data...</p>
      )}
    </div>
  );
}
