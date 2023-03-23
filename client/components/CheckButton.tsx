import { useState } from "react"

interface prop{
  name : string,
  id :string,
}
export default function CheckButton({name,id}:prop) {
  const [check,setChecked]=useState<string[]>([]);
  const handleChecked = (e) => {
   
    const { value, checked } = e.target;
    console.log("check",checked,check,id)
    if (checked) {
      console.log("chexked")
      const data = check;
        data.push(value)
        setChecked(data)
      // setChecked([...check, value]);
     
    } else {
      console.log("else block ")
      setChecked(check.filter((e) => e !== value));
    }
  }; 

    return (
      <fieldset className="space-y-5">
        <legend className="sr-only">Notifications</legend>
        <div className="relative flex items-start">
          <div className="flex items-center h-5">
            <input
              id={id}
              value={id}
              aria-describedby="comments-description"
              name="comments"
              type="checkbox"
              className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded"
              onChange={(e)=>handleChecked(e)}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="comments" className="font-medium text-gray-700">
            {name}
            </label>
          </div>
        </div>
        
      </fieldset>
    )
  }
  