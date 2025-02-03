import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBug } from "../api/bugApi";
import axios from "axios";
import { Loader2, Upload, AlertCircle, X } from "lucide-react";

const CreateBug = () => {
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bugName: "",
    description: "",
    priority: "Low",
    status: "Open",
  });
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Priority and status colors (unchanged)
  const priorityColors = {
    Low: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    High: "bg-orange-100 text-orange-800",
    Critical: "bg-red-100 text-red-800",
  };

  const statusColors = {
    Open: "bg-blue-100 text-blue-800",
    "In Progress": "bg-purple-100 text-purple-800",
    Resolved: "bg-green-100 text-green-800",
    Closed: "bg-gray-100 text-gray-800",
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setError("");
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);

    // Validate each file
    const invalidFiles = newFiles.filter((file) => file.size > 5 * 1024 * 1024);
    if (invalidFiles.length > 0) {
      setError("One or more files exceed the 5MB limit");
      return;
    }

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    setError("");
    // Reset the input value to allow selecting the same file again
    e.target.value = "";
  };

  const removeFile = (indexToRemove) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith("image/")) return "🖼️";
    if (fileType === "application/pdf") return "📄";
    if (fileType.startsWith("video/")) return "🎥";
    if (fileType.startsWith("audio/")) return "🎵";
    return "📎";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Upload all files to Cloudinary
      const uploadedFiles = await Promise.all(
        files.map(async (file) => {
          const formDataForFile = new FormData();
          formDataForFile.append("file", file);
          formDataForFile.append("upload_preset", "myCloud");

          const cloudinaryResponse = await axios.post(
            "https://api.cloudinary.com/v1_1/dz0msc6pb/auto/upload",
            formDataForFile
          );

          return {
            filename: file.name,
            filepath: cloudinaryResponse.data.secure_url,
          };
        })
      );

      // Create bug with all attachments
      await createBug(
        {
          ...formData,
          attachments: uploadedFiles,
        },
        token
      );

      navigate("/");
    } catch (error) {
      console.error("Error while creating bug: ", error);
      setError("Failed to create bug. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create New Bug Report
          </h1>
          <p className="text-gray-600">
            Track and manage software issues effectively
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-lg overflow-hidden"
        >
          <div className="p-6 space-y-6">
            {/* Bug Name and Description fields remain unchanged */}
            <div className="space-y-2">
              <label
                htmlFor="bugName"
                className="text-sm font-medium text-gray-700 block"
              >
                Bug Name
              </label>
              <input
                type="text"
                id="bugName"
                value={formData.bugName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter a descriptive name for the bug"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-medium text-gray-700 block"
              >
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Provide detailed information about the bug"
              />
            </div>

            {/* Priority and Status Grid remains unchanged */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="priority"
                  className="text-sm font-medium text-gray-700 block"
                >
                  Priority
                </label>
                <select
                  id="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    priorityColors[formData.priority]
                  }`}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="status"
                  className="text-sm font-medium text-gray-700 block"
                >
                  Status
                </label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    statusColors[formData.status]
                  }`}
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            {/* Updated File Upload Section */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Attachments
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-blue-500 transition-colors">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="attachments"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Upload files</span>
                      <input
                        id="attachments"
                        type="file"
                        onChange={handleFileChange}
                        className="sr-only"
                        multiple
                        accept="image/*,.pdf,video/*,audio/*,.doc,.docx,.xls,.xlsx,.txt"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-gray-700">
                    Selected Files:
                  </p>
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                      >
                        <div className="flex items-center space-x-2">
                          <span>{getFileIcon(file.type)}</span>
                          <span className="text-sm text-gray-600">
                            {file.name}
                          </span>
                          <span className="text-xs text-gray-400">
                            ({(file.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                isSubmitting ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Creating Bug...
                </>
              ) : (
                "Create Bug"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

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
//                 Date
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">
//                 Bug ID
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">
//                 BugName
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">
//                 CreatedBy
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
//                     {bug.bugName || "Unknown"}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-600">
//                     {bug.createdBy.name || "Unknown"}
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
