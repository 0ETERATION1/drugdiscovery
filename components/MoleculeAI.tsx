"use client";

import React, { useState, useEffect } from "react";

interface MoleculeAIProps {
  molData: string;
  diseaseName: string;
}

const MoleculeAI: React.FC<MoleculeAIProps> = ({ molData, diseaseName }) => {
  const [description, setDescription] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (molData) {
      describeMolecule(molData);
    }
  }, [molData]);

  const describeMolecule = async (data: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/py/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Analyze the following hypothetical molecule structure for ${diseaseName} treatment. Provide a description in 4 parts:

          1. Key structural features (e.g., functional groups, rings, chains)
          2. Hypothetical mechanism of action against ${diseaseName}
          3. Potential benefits and risks if this compound were to be developed
          4. A simplified SMILES notation for this structure (for illustration purposes only)

          Present this information as a theoretical concept, emphasizing that this is not a real drug and has not been tested or approved. Here's the molecule data:
          ${data}`,
        }),
      });
      const result = await response.json();
      setDescription(result.result);
    } catch (error) {
      console.error("Error describing molecule:", error);
      setDescription("Failed to generate description.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/py/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Regarding the hypothetical molecule for ${diseaseName}:

          ${molData}
          
          Please answer the following question, emphasizing that this is a theoretical concept and not a real treatment: "${question}"
          
          Provide a clear, scientific answer in 2-3 short sentences. Use technical terms where necessary, but briefly explain any complex concepts.`,
        }),
      });
      const result = await response.json();
      setAnswer(result.result);
    } catch (error) {
      console.error("Error answering question:", error);
      setAnswer("Failed to generate an answer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mt-8 text-black dark:text-white">
      <h2 className="text-2xl font-bold mb-4">
        Theoretical AI Analysis for {diseaseName}
      </h2>
      <p className="text-red-500 mb-4">
        Disclaimer: This is a hypothetical compound for educational purposes
        only. It is not a real drug and has not been tested or approved for use.
      </p>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">
          Hypothetical Molecule Description
        </h3>
        {isLoading ? (
          <p>Generating description...</p>
        ) : (
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
            <pre className="whitespace-pre-wrap">{description}</pre>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">
          Ask a Question About This Concept
        </h3>
        <form onSubmit={handleQuestionSubmit} className="mb-4">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-2 border rounded mb-2 text-black dark:text-white bg-white dark:bg-gray-700"
            placeholder="Ask about this theoretical molecule..."
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Submit"}
          </button>
        </form>
        {answer && (
          <div>
            <h4 className="text-lg font-semibold mb-2">Answer</h4>
            <p className="bg-gray-100 dark:bg-gray-800 p-4 rounded">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoleculeAI;
