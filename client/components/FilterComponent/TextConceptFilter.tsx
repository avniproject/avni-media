import { useEffect, useState } from "react";

interface Prop {
  conceptNote: (data: string) => void;
}

export default function TexConceptFilter({ conceptNote }: Prop) {

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {

    conceptNote(inputValue);
    
  }, [inputValue]);

  return (
    <div className="inline-flex w-52 mt-5">
      <input
        type="text"
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter Text Here"
      />
    </div>
  );
}
