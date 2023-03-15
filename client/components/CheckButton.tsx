/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function CheckButton() {
    return (
      <fieldset className="space-y-5">
        <legend className="sr-only">Notifications</legend>
        <div className="relative flex items-start">
          <div className="flex items-center h-5">
            <input
              id="comments"
              aria-describedby="comments-description"
              name="comments"
              type="checkbox"
              className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="comments" className="font-medium text-gray-700">
              Image Name
            </label>
          </div>
        </div>
        
      </fieldset>
    )
  }
  