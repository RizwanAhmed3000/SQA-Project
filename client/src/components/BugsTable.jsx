// import React from "react";
// import { useNavigate } from "react-router-dom";

// const BugsTable = ({ bugs }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="container mx-auto px-4 lg:px-12 py-8 ">
//       <h1 className="text-center font-bold text-3xl py-10">Bugs Report</h1>
//       <div className="overflow-x-auto shadow-lg rounded-lg">
//         <table className="min-w-full bg-white rounded-lg overflow-hidden">
//           <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
//             <tr>
//               <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">
//                 Date
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">
//                 Bug ID
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">
//                 Created By
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">
//                 Status
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">
//                 Priority
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {bugs.length > 0 ? (
//               bugs.map((bug, index) => (
//                 <tr
//                   key={bug._id}
//                   className="border-b last:border-b-0 hover:bg-gray-100 transition-all cursor-pointer"
//                   onClick={() => navigate(`bug-detail/${bug._id}`)}
//                 >
//                   <td className="px-6 py-4 text-sm font-medium text-gray-700">
//                     {new Date(bug.createdAt).toLocaleDateString()}
//                   </td>
//                   <td className="px-6 py-4 text-sm font-medium text-gray-700">
//                     {index + 1}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-600">
//                     {bug.createdBy.name || "Unknown"}
//                   </td>
//                   <td
//                     className={`px-6 py-4 text-sm font-semibold ${
//                       bug.status === "Open"
//                         ? "text-green-500"
//                         : bug.status === "Closed"
//                         ? "text-red-500"
//                         : "text-yellow-500"
//                     }`}
//                   >
//                     {bug.status}
//                   </td>
//                   <td
//                     className={`px-6 py-4 text-sm ${
//                       bug.priority === "High"
//                         ? "text-orange-600 font-semibold"
//                         : bug.priority === "Medium"
//                         ? "text-yellow-600 font-semibold"
//                         : bug.priority === "Critical"
//                         ? "text-red-600 font-semibold"
//                         : "text-green-600 font-semibold"
//                     }`}
//                   >
//                     {bug.priority}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan="4"
//                   className="px-6 py-4 text-center text-gray-500 italic"
//                 >
//                   No bugs found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//       <div className="mt-8 flex justify-start">
//         <button
//           onClick={() => navigate("/create-bug")}
//           className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-6 rounded-lg hover:scale-105 transition-transform shadow-md"
//         >
//           Create New Bug
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BugsTable;

import React from "react";
import { useNavigate } from "react-router-dom";

const BugsTable = ({ bugs }) => {
  const navigate = useNavigate();
  console.log(bugs)
  return (
    <div className="container mx-auto px-4 lg:px-12 py-8 ">
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">
                Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">
                Bug ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">
                BugName
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">
                Created By
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">
                Comments
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {bugs.length > 0 ? (
              bugs.map((bug, index) => (
                <tr
                  key={bug._id}
                  className="border-b last:border-b-0 hover:bg-gray-100 transition-all cursor-pointer"
                  onClick={() => navigate(`bug-detail/${bug._id}`)}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">
                    {new Date(bug.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {bug.bugName || "Unknown"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {bug.createdBy.name || "Unknown"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {bug.comments?.length}
                  </td>
                  <td className={`px-6 py-4 text-sm font-semibold ${bug.status === "Open"
                    ? "text-green-500"
                    : bug.status === "Closed"
                      ? "text-red-500"
                      : "text-yellow-500"
                    }`}>
                    {bug.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-4 text-center text-gray-500 italic"
                >
                  No bugs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-8 flex justify-start">
        <button
          onClick={() => navigate("/create-bug")}
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-6 rounded-lg hover:scale-105 transition-transform shadow-md"
        >
          Create New Bug
        </button>
      </div>
    </div>
  );
};

export default BugsTable;
