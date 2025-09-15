import { useEffect, useState } from "react";

interface Prop {
  getConcepts: (data: string) => void;
  textConcept : string;
}

export default function TexConceptFilter({ getConcepts, textConcept }: Prop) {

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {

    getConcepts(inputValue);
    
  }, [inputValue]);
  
  useEffect(()=>{

  if(textConcept.length===0){
    setInputValue('')
   }

  },[textConcept])

  return (
    <div className="inline-flex w-52 mt-5">
      <input
        type="text"
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
        value={inputValue}
       onFocus={() => setInputValue('')}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter Text Here"
      />
    </div>
  );
}
