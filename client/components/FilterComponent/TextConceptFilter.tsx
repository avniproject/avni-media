import { useEffect, useState, useRef } from "react";

interface Prop {
  getConcepts: (data: string) => void;
  textConcepts : any[];
}

export default function TexConceptFilter({ getConcepts, textConcepts }: Prop) {

  const [inputValue, setInputValue] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout to debounce the getConcepts call
    timeoutRef.current = setTimeout(() => {
      getConcepts(inputValue);
    }, 500); // 500ms delay

    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [inputValue, getConcepts]);
  
  // Only clear input when textConcepts is explicitly cleared (e.g., reset filters)
  useEffect(() => {
    if (textConcepts.length === 0) {
      setInputValue('');
    }
  }, [textConcepts])

  return (
    <div className="filter-item">
      <input
        type="text"
        className="filter-input w-52"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter text here"
      />
    </div>
  );
}
