// {
//   /* <div className="container mx-auto px-4 py-8 pt-20">
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white shadow-md rounded">
//             <thead className="bg-blue-600 text-white">
//               <tr>
//                 <th className="px-4 py-2 text-left">Date </th>
//                 <th className="px-4 py-2 text-left">Created By</th>
//                 <th className="px-4 py-2 text-left">Status</th>
//                 <th className="px-4 py-2 text-left">Priority</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bugs.length > 0 ? (
//                 bugs.map((bug) => (
//                   <tr
//                     key={bug._id}
//                     className="border-b hover:bg-gray-100 transition"
//                   >
//                     <td className="px-4 py-2">
//                       {new Date(bug.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-4 py-2">{bug.createdBy}</td>
//                     <td className="px-4 py-2">{bug.status}</td>
//                     <td className="px-4 py-2">{bug.priority}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="4"
//                     className="px-4 py-2 text-center text-gray-500"
//                   >
//                     No bugs found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//         <div className="mt-12 text-left">
//           <button
//             onClick={() => navigate("/bug-detail")}
//             className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
//           >
//             Create New Bug
//           </button>
//         </div>
//       </div> */
// }

// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { getBugs } from "../api/bugApi";
// import DefaultLayout from "../components/DefaultLayout";
// import BugsTable from "../components/BugsTable";

// const HomePage = () => {
//   const { token } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const [bugs, setBugs] = useState([]);

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//     } else {
//       fetchBugs(token);
//     }
//   }, [token]);

//   const fetchBugs = async (token) => {
//     try {
//       const response = await getBugs(token);
//       setBugs(response);
//     } catch (error) {
//       console.log("Error while fetching bugs: ", error);
//     }
//   };

//   return (
//     <DefaultLayout>
//       <BugsTable bugs={bugs} />
//     </DefaultLayout>
//   );
// };

// export default HomePage;

// import React from "react";
// import { useNavigate } from "react-router-dom";

// const BugsTable = ({ bugs }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="container mx-auto px-4 lg:px-12 py-8 pt-20">
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
//               bugs.map((bug) => (
//                 <tr
//                   key={bug._id}
//                   className="border-b last:border-b-0 hover:bg-gray-100 transition-all cursor-pointer"
//                   onClick={() => navigate(`bug-detail/${bug._id}`)}
//                 >
//                   <td className="px-6 py-4 text-sm font-medium text-gray-700">
//                     {new Date(bug.createdAt).toLocaleDateString()}
//                   </td>
//                   <td className="px-6 py-4 text-sm font-medium text-gray-700">
//                     {bug._id}
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
//                         ? "text-red-600 font-semibold"
//                         : bug.priority === "Medium"
//                         ? "text-yellow-600 font-semibold"
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

// i want to add  filter genre where user can filter the bugs by creator  or status or priority or bug id or date
