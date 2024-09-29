"use client";

import React, { useState, useEffect, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  // List of diseases for autocomplete
  const diseases = [
    "covid",
    "cholera",
    "flu",
    "diabetes",
    "arthritis",
    "crohns",
    "hepatitis",
    "breastcancer",
    "malaria",
    "acetylcholinesterase",
    "influenza",

    // Add more diseases here
  ];

  // Updated function to handle both autocorrect and autocomplete
  const handleInputChange = (input: string) => {
    setQuery(input);
    setSelectedIndex(-1);

    // Autocorrect
    const correctedInput = autocorrect(input);
    if (correctedInput !== input) {
      setQuery(correctedInput);
      return;
    }

    // Autocomplete
    if (input.length > 0) {
      const matchedSuggestions = diseases.filter((disease) =>
        disease.toLowerCase().startsWith(input.toLowerCase())
      );
      setSuggestions(matchedSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case "Enter":
        if (selectedIndex >= 0) {
          e.preventDefault();
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
    }
  };

  // Existing autocorrect function
  const autocorrect = (input: string): string => {
    const corrections: { [key: string]: string } = {
      covd: "covid-19",
      chlorea: "cholera",
      flue: "flu",
      diebetes: "diabetes",
      artritis: "arthritis",
      // Add more corrections here as needed
    };
    return corrections[input.toLowerCase()] || input;
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setSuggestions([]);
    setSelectedIndex(-1);
  };

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Query submitted:", query);
    setSuggestions([]);
    router.push(`/drug?query=${encodeURIComponent(query)}`);
  };

  // Add this function to limit the number of visible suggestions
  const getVisibleSuggestions = () => {
    return suggestions.slice(0, 5); // Show only the first 5 suggestions
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0">
        <div className="relative w-full h-full overflow-hidden rounded-lg">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source src="/video1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="relative w-full max-w-lg mx-4">
          <input
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter a Disease..."
            className="w-full py-3 px-6 pr-12 rounded-full bg-white bg-opacity-60 backdrop-blur-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white rounded-2xl shadow-lg overflow-hidden max-h-40 overflow-y-auto mt-1">
              {getVisibleSuggestions().map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`px-6 py-1.5 hover:bg-gray-100 cursor-pointer text-blue-500 ${
                    index === selectedIndex ? "bg-gray-100" : ""
                  }`}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition duration-300 ease-in-out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
      </div>
    </div>
  );
};

export default Home;
