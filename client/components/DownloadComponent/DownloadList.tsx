
const folder = [
    { name: '23', title: '23-03-2023 10:25:35.zip', size: '45 MB' },
  ]
  
  export default function Download() {
    return (
      <div className="px-4 sm:px-6 lg:px-8 mt-5">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Available Downloads</h1>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr className="divide-x divide-gray-200">
                      <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Size Of Download
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                        File Name 
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {folder.map((files,index) => (
                      <tr key={index}  className="divide-x divide-gray-200">
                        <td  className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                          {files.name}
                        </td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">{files.title}</td>
                        <td className="py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6">
                          <a href="#" className="text-indigo-600 hover:text-indigo-900">Download</a>
                          <br/>
                          <span>{files.size}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  