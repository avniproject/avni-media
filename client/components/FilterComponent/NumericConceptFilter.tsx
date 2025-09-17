import { useEffect, useState, useCallback, useRef } from "react";

interface Prop {
  getNumericConcept: (fromNumber: number | null, toNumber: number | null) => void;
  numericConcept: any[];
}

export default function NumericConceptFilter({ getNumericConcept, numericConcept }: Prop) {

  const [frominputValue, setfromInputValue] = useState("");
  const [toinputValue, settoInputValue] = useState("");
  const [isValidRange, setIsValidRange] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Proper debounced function
  const debouncedGetNumericConcept = useCallback(
    (from: number | null, to: number | null) => {
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Set new timeout
      timeoutRef.current = setTimeout(() => {
        getNumericConcept(from, to);
      }, 300);
    },
    [getNumericConcept]
  );

  useEffect(() => {
    // Both empty - call getNumericConcept with null values to clear filter
    if (frominputValue === "" && toinputValue === "") {
      debouncedGetNumericConcept(null, null);
      setIsValidRange(true);
      return;
    }
    
    // Parse values - allow empty strings to be treated as null
    const fromNum = frominputValue === "" ? null : parseFloat(frominputValue);
    const toNum = toinputValue === "" ? null : parseFloat(toinputValue);
    
    // Validate range only if both values exist
    let isValid = true;
    if (fromNum !== null && toNum !== null) {
      isValid = !isNaN(fromNum) && !isNaN(toNum) && fromNum <= toNum;
    } else if (fromNum !== null) {
      isValid = !isNaN(fromNum);
    } else if (toNum !== null) {
      isValid = !isNaN(toNum);
    }
    
    setIsValidRange(isValid);
    
    // Only call if valid and at least one value exists
    if (isValid && (fromNum !== null || toNum !== null)) {
      debouncedGetNumericConcept(fromNum, toNum);
    }
  }, [frominputValue, toinputValue, debouncedGetNumericConcept]);
  useEffect(()=>{
   if(numericConcept.length===0){
    setfromInputValue('')
    settoInputValue('')
   }
  },[numericConcept])

  return (
    <div className="filter-item">
      <div className="filter-range">
        <label className="filter-label-inline">Between:</label>
        <input
          type="number"
          className="filter-input-sm"
          value={frominputValue}
          onChange={(e) => setfromInputValue(e.target.value)}
          placeholder="Min"
          min="0"
        />
        <label className="filter-label-inline">and</label>
        <input
          type="number"
          className="filter-input-sm"
          value={toinputValue}
          onChange={(e) => settoInputValue(e.target.value)}
          placeholder="Max"
          min="0"
        />
      </div>
      {!isValidRange && (
        <p className="filter-error">Invalid range: minimum must be less than or equal to maximum</p>
      )}
    </div>
  );
}
