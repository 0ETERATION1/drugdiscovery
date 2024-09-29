import React, { useState } from "react";
import MoleculeViewer from "@/components/MoleculeViewer";
import ChatInterface from "@/components/ChatInterface";

export default function LandingPage() {
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [molData, setMolData] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    const drugName = event.target.search.value;
    // TODO: Implement API call to fetch .mol data for the drug
    // const response = await fetch(`/api/drug-mol?name=${drugName}`);
    // const data = await response.json();
    // setMolData(data.molData);
    setSelectedDrug(drugName);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Drug Molecule Viewer and Chat</h1>

      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          name="search"
          placeholder="Enter drug name"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Search
        </button>
      </form>

      {selectedDrug && (
        <div>
          <h2 className="text-2xl mb-2">Molecule Viewer: {selectedDrug}</h2>
          <MoleculeViewer molData={molData} />
        </div>
      )}

      {selectedDrug && (
        <div className="mt-4">
          <h2 className="text-2xl mb-2">Chat about {selectedDrug}</h2>
          <ChatInterface drugName={selectedDrug} />
        </div>
      )}
    </div>
  );
}
