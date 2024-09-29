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

// Define a type for the SMILES_DATA object
type SmilesData = {
  [key: string]: string;
};

// SMILES data stored as a JavaScript object
const SMILES_DATA: SmilesData = {
  acetylcholinesterase: "CCN(CC)CCNS(=O)(=O)c1cccc2ccccc12",
  covid: "Cc1noc(NC(=O)c2ccc(-c3cc(C(F)(F)F)nn3C)s2)c1[N+](=O)[O-]",
  influenza: "c1csc(-c2cc(CNC34CC5CC(CC(C5)C3)C4)no2)c1",
  malariae: "CCc1nc(N)nc(N)c1-c1ccc(Cl)cc1",
  breastcancer:
    "CC(=O)N[C@@H](COP(=O)(O)O)C(=O)N1CCC[C@H]1C(=O)N[C@H](C(=O)N[C@@H](Cc1ccccc1)C(N)=O)[C@@H](C)O",
  crohns: "O=C1C(Cl)c2cc(F)ccc2N1CCc1ccccc1",
  hepatitis: "Cc1nc2c3cc(-c4ccc(NS(C)(=O)=O)cc4Cl)c(Cl)cc3[nH]c(=O)n2n1",
  cholera: "O=C1C(Cl)c2cc(F)ccc2N1CCc1ccccc1",
  measles: "O=C(Cc1ccc(I)cc1)Nc1cccc([N+](=O)[O-])c1",
  mumps: "Nc1nc(Cl)nc2c1ncn2[C@@H]1C=C[C@@H](O)[C@H]1O",
};

export default function ClientDrugPage() {
  const [molData, setMolData] = useState("");
  const [smilesNotation, setSmilesNotation] = useState("");
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

    // Get SMILES notation from the stored data
    const smiles = SMILES_DATA[diseaseName.toLowerCase()] || "SMILES not found";
    setSmilesNotation(smiles);
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
      <div className="mb-4 text-center">
        <strong>SMILES Notation:</strong> {smilesNotation}
      </div>
      {molData && <MoleculeAI molData={molData} diseaseName={diseaseName} />}
    </div>
  );
}
