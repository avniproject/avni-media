import { useState } from "react";
interface Prop {
  label: string;
  min: number;
  max: number;
  step: number;
  onChange: (value: any[]) => void;
}

const NumberDropdown = ({ label, min, max, step, onChange }: Prop) => {
  const [value, setValue] = useState(min);

  const handleChange = (event: { target: { value: string } }) => {
    const newValue = parseInt(event.target.value, 10);
    setValue(newValue);
    onChange(newValue);
  };

  const options = [];
  for (let i = min; i <= max; i += step) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <div>
      <label>{label}</label>
      <select className=" rounded-md border border-gray-300" value={value} onChange={handleChange}>
        {options}
      </select>
    </div>
  );
};

export default NumberDropdown;
