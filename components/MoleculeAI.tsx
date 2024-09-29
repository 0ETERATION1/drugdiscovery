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
    <div className="flex justify-center items-center min-h-screen w-full bg-white dark:bg-gray-900">
      <div className="w-full max-w-4xl p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-black dark:text-white">
          Theoretical AI Analysis for {diseaseName}
        </h2>
        <p className="text-red-500 mb-8 text-center">
          Disclaimer: This is a hypothetical compound for educational purposes
          only. It is not a real drug and has not been tested or approved for
          use.
        </p>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-center text-black dark:text-white">
            Hypothetical Molecule Description
          </h3>
          {isLoading ? (
            <p className="text-center text-black dark:text-white">
              Generating description...
            </p>
          ) : (
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
              <pre className="whitespace-pre-wrap text-center text-black dark:text-white">
                {description}
              </pre>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4 text-center text-black dark:text-white">
            Ask a Question About This Concept
          </h3>
          <form onSubmit={handleQuestionSubmit} className="mb-6 relative">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full py-3 px-6 pr-12 border rounded-full text-black dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ask about this theoretical molecule..."
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition duration-300 ease-in-out"
              disabled={isLoading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
          </form>
          {answer && (
            <div>
              <h4 className="text-xl font-semibold mb-3 text-center text-black dark:text-white">
                Answer
              </h4>
              <p className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg text-black dark:text-white">
                {answer}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoleculeAI;
