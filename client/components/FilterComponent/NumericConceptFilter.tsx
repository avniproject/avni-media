import { useEffect, useState } from "react";

interface Prop {
  getNumericConcept: (fromNumber: number, toNumber: number) => void;
  numericConcept: any[];
}

export default function NumericConceptFilter({ getNumericConcept, numericConcept }: Prop) {

  const [frominputValue, setfromInputValue] = useState("");
  const [toinputValue, settoInputValue] = useState("");
  const [isValidRange, setIsValidRange] = useState(true);

  useEffect(() => {
    const isValid =
      frominputValue === "" ||
      toinputValue === "" ||
      parseInt(frominputValue) <= parseInt(toinputValue);
    setIsValidRange(isValid);
    if (isValid) {
     
      getNumericConcept(parseInt(frominputValue), parseInt(toinputValue));

    }
  }, [frominputValue, toinputValue]);
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
