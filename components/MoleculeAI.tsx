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
          prompt: `Analyze the following molecule structure and provide a concise description in 3 bullet points. Each bullet point should be one short sentence. Focus on:

          • Key structural features (e.g., functional groups, rings, chains)
          • Notable elements present and their significance
          • A brief speculation on its potential pharmaceutical role based on structure

          Use scientific terms where necessary, but keep explanations brief and clear. Here's the molecule data:
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
          prompt: `Given this molecule structure:
          ${molData}
          
          Please answer the following question concisely and accurately: "${question}"
          
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
    <div className="w-full max-w-4xl mt-8 mx-auto flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4 text-center">
        AI Analysis for {diseaseName}
      </h2>

      <div className="mb-6 w-full">
        <h3 className="text-xl font-semibold mb-2 text-center">
          Molecule Description
        </h3>
        {isLoading ? (
          <p className="text-center">Generating description...</p>
        ) : (
          <div className="bg-gray-100 p-4 rounded">
            <ul className="list-disc pl-5 space-y-2">
              {description.split("\n").map((point, index) => (
                <li key={index}>{point.replace(/^•\s*/, "")}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="w-full">
        <h3 className="text-xl font-semibold mb-2 text-center">
          Ask a Question
        </h3>
        <form onSubmit={handleQuestionSubmit} className="mb-4">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            placeholder="Ask about the molecule..."
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Submit"}
            </button>
          </div>
        </form>
        {answer && (
          <div>
            <h4 className="text-lg font-semibold mb-2 text-center">Answer</h4>
            <p className="bg-gray-100 p-4 rounded">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoleculeAI;
