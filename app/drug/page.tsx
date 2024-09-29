"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function DrugPage() {
  const [molData, setMolData] = useState("");

  useEffect(() => {
    fetchMolFile();
  }, []);

  const fetchMolFile = async () => {
    try {
      const response = await fetch("/ethanol.mol");
      const data = await response.text();
      setMolData(data);
    } catch (error) {
      console.error("Error fetching mol file:", error);
    }
  };

  return (
    <div>
      <h1>Drug Page</h1>
      <Link href="/create-sample">
        <button>Create Sample</button>
      </Link>
      {molData && (
        <div>
          <h2>Mol Viewer</h2>
          <pre>{molData}</pre>
        </div>
      )}
    </div>
  );
}
