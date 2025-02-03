// import React from "react";
// import { useNavigate } from "react-router-dom";

// const SummaryTable = ({ bugs }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="container mx-auto px-4 lg:px-12 py-8 ">
//       <h1 className="text-center font-bold text-3xl py-10">Bugs Summary</h1>
//       <div className="overflow-x-auto shadow-lg rounded-lg">
//         <table className="min-w-full bg-white rounded-lg overflow-hidden">
//           <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
//             <tr>
//               <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">
//                 Project Name
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">
//                 Platform
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">
//                 BugName
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
//                     {bug.projectName || "Attendance Managemnt System"}
//                   </td>
//                   <td className="px-6 py-4 text-sm font-medium text-gray-700">
//                     {bug.platform || "Web App"}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-600">
//                     {bug.bugName || "Unknown"}
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
//       <div className="mt-8 flex justify-start"></div>
//     </div>
//   );
// };

// export default SummaryTable;

import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const SummaryTable = ({ bugs }) => {
  const navigate = useNavigate();

  // Prepare data for status chart
  const statusData = bugs.reduce((acc, bug) => {
    acc[bug.status] = (acc[bug.status] || 0) + 1;
    return acc;
  }, {});

  const statusChartData = Object.entries(statusData).map(([status, count]) => ({
    name: status,
    value: count,
  }));

  // Prepare data for priority chart
  const priorityData = bugs.reduce((acc, bug) => {
    acc[bug.priority] = (acc[bug.priority] || 0) + 1;
    return acc;
  }, {});

  const priorityChartData = Object.entries(priorityData).map(
    ([priority, count]) => ({
      name: priority,
      count,
    })
  );

  // Colors for pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      bugs.map((bug) => ({
        "Project Name": bug.projectName || "Attendance Management System",
        Platform: bug.platform || "Web App",
        "Bug Name": bug.bugName || "Unknown",
        Status: bug.status,
        Priority: bug.priority,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bugs");
    XLSX.writeFile(workbook, "bugs_report.xlsx");
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.text("Bugs Summary Report", 14, 15);

    const tableData = bugs.map((bug) => [
      bug.projectName || "Attendance Management System",
      bug.platform || "Web App",
      bug.bugName || "Unknown",
      new Date(bug.createdAt).toLocaleDateString() || "Unknown",
      bug.status,
      bug.priority,
    ]);

    doc.autoTable({
      head: [["Project Name", "Platform", "Bug Name", "Created At", "Status", "Priority"]],
      body: tableData,
      startY: 20,
    });

    doc.save("bugs_report.pdf");
  };

  return (
    <div className="container mx-auto px-4 lg:px-12 py-8">
      <h1 className="text-center font-bold text-3xl py-10">Bugs Summary</h1>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Status Distribution</h2>
          <PieChart width={400} height={300}>
            <Pie
              data={statusChartData}
              cx={200}
              cy={150}
              labelLine={true}
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {statusChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Priority Distribution</h2>
          <BarChart width={400} height={300} data={priorityChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </div>
      </div>

      {/* Export Buttons */}
      <div className="mb-6 flex gap-4">
        <button
          onClick={exportToExcel}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Export to Excel
        </button>
        <button
          onClick={exportToPDF}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Export to PDF
        </button>
      </div>

      {/* Existing Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">
                Project Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">
                Platform
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">
                BugName
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">
                Priority
              </th>
            </tr>
          </thead>
          <tbody>
            {bugs.length > 0 ? (
              bugs.map((bug) => (
                <tr
                  key={bug._id}
                  className="border-b last:border-b-0 hover:bg-gray-100 transition-all cursor-pointer"
                  onClick={() => navigate(`bug-detail/${bug._id}`)}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">
                    {bug.projectName || "Attendance Management System"}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">
                    {bug.platform || "Web App"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {bug.bugName || "Unknown"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(bug.createdAt).toLocaleDateString() || "Unknown"}
                  </td>
                  <td
                    className={`px-6 py-4 text-sm font-semibold ${
                      bug.status === "Open"
                        ? "text-green-500"
                        : bug.status === "Closed"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {bug.status}
                  </td>
                  <td
                    className={`px-6 py-4 text-sm ${
                      bug.priority === "High"
                        ? "text-orange-600 font-semibold"
                        : bug.priority === "Medium"
                        ? "text-yellow-600 font-semibold"
                        : bug.priority === "Critical"
                        ? "text-red-600 font-semibold"
                        : "text-green-600 font-semibold"
                    }`}
                  >
                    {bug.priority}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-4 text-center text-gray-500 italic"
                >
                  No bugs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SummaryTable;
