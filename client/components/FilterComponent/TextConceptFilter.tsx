import { useEffect, useState, useRef, useCallback } from "react";

interface Prop {
  getConcepts: (data: string) => void;
  textConcepts : any[];
}

export default function TextConceptFilter({ getConcepts, textConcepts }: Prop) {

  const [inputValue, setInputValue] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout>();
  const previousTextConceptsLength = useRef(textConcepts.length);

  // Memoized callback to prevent infinite loops
  const memoizedGetConcepts = useCallback(getConcepts, [getConcepts]);

  useEffect(() => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout to debounce the getConcepts call
    timeoutRef.current = setTimeout(() => {
      memoizedGetConcepts(inputValue);
    }, 500); // 500ms delay

    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [inputValue, memoizedGetConcepts]);
  
  // Only clear input when textConcepts is explicitly cleared (e.g., reset filters)
  // Don't clear during normal filtering operations
  useEffect(() => {
    // Only clear if we had concepts before and now we don't (explicit clear)
    // Don't clear if it starts empty or during normal state updates
    if (previousTextConceptsLength.current > 0 && textConcepts.length === 0) {
      setInputValue('');
    }
    previousTextConceptsLength.current = textConcepts.length;
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
