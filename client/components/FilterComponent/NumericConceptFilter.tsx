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
    <>
      <div className="mt-4 inline-block ml-2">
        <label className="mr-2 flex-shrink-0">Between:</label>
        <input
          type="number"
          className="w-20 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          value={frominputValue}
          onChange={(e) => setfromInputValue(e.target.value)}
          placeholder="Min Value"
          min="0"
        />
        <label className="mx-2 flex-shrink-0">and</label>
        <input
          type="number"
          className="w-20 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          value={toinputValue}
          onChange={(e) => settoInputValue(e.target.value)}
          placeholder="Max Value"
          min="0"
        />
        {!isValidRange && (
          <p className="text-red-500 text-sm ml-2">Invalid range</p>
        )}
      </div>
    </>
  );
}
