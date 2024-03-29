import axios from "axios";
import { Key, ReactNode, useEffect, useState } from "react";
import { getUserUuidFromToken } from "@/utils/helpers";

export default function Download() {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    const username = getUserUuidFromToken();
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_MEDIA_VIEWER}/allData?username=${username}`
      );

      setData(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-5">
      <div className="sm:flex sm:items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">
          Available Downloads
        </h1>
        <a href="/avni-media" className=" text-gray-900">
          Back To Media Viewer
        </a>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr className="divide-x divide-gray-200">
                <th
                  scope="col"
                  className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Download Description
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  No. of Images
                </th>
                <th
                  scope="col"
                  className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {data.map(
                (
                  files: {
                    image_description: ReactNode;
                    image_count: string | number | null | undefined;
                    created_date_time: string | number | null | undefined;
                    status: string | number | null | undefined;
                    zip_url: string | undefined;
                    file_size: string | number | null | undefined;
                  },
                  index: Key | null | undefined
                ) => (
                  <tr key={index} className="divide-x divide-gray-200">
                    <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                      {files.image_description}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                      {files.image_count}
                    </td>
                    <td className="py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6">
                      {files.status === "Complete" ? (
                        <>
                          <a
                            href={files.zip_url}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Download
                          </a>
                          <p>{files.file_size}</p>
                        </>
                      ) : (
                        <span className="text-gray-500">{files.status}</span>
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
