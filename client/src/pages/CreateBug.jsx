import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBug } from "../api/bugApi";
import axios from "axios";
import {
  Loader2,
  Upload,
  AlertCircle,
  X,
  FileText,
  Image,
  File,
} from "lucide-react";

const CreateBug = () => {
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    projectName: "",
    platform: "",
    bugName: "",
    description: "",
    priority: "Low",
    status: "Open",
  });
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Priority and status colors
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

    // File validation
    const validationErrors = [];
    newFiles.forEach((file) => {
      // Size validation (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        validationErrors.push(`${file.name} exceeds 5MB limit`);
      }

      // Type validation
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ];

      if (!allowedTypes.includes(file.type)) {
        validationErrors.push(`${file.name} has unsupported file type`);
      }
    });

    if (validationErrors.length > 0) {
      setError(validationErrors.join(", "));
      return;
    }

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    setError("");
    e.target.value = "";
  };

  const removeFile = (indexToRemove) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  const getFileIcon = (file) => {
    if (file.type.startsWith("image/")) return <Image className="w-5 h-5" />;
    if (file.type === "application/pdf")
      return <FileText className="w-5 h-5" />;
    return <File className="w-5 h-5" />;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Separate files by type
      const imageFiles = files.filter((file) => file.type.startsWith("image/"));
      const otherFiles = files.filter(
        (file) => !file.type.startsWith("image/")
      );

      // Upload images to Cloudinary
      const uploadedImages = await Promise.all(
        imageFiles.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "myCloud");

          const cloudinaryResponse = await axios.post(
            "https://api.cloudinary.com/v1_1/dz0msc6pb/auto/upload",
            formData
          );

          return {
            filename: file.name,
            filepath: cloudinaryResponse.data.secure_url,
            fileType: file.type,
          };
        })
      );

      // Process other files for database storage
      const processedOtherFiles = await Promise.all(
        otherFiles.map(async (file) => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve({
                filename: file.name,
                filepath: reader.result,
                fileType: file.type,
              });
            };
            reader.readAsDataURL(file);
          });
        })
      );

      // Combine all attachments
      const allAttachments = [...uploadedImages, ...processedOtherFiles];

      // Create bug with all attachments
      await createBug(
        {
          ...formData,
          attachments: allAttachments,
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
            {/* Project Name */}
            <div className="space-y-2">
              <label
                htmlFor="projectName"
                className="text-sm font-medium text-gray-700 block"
              >
                Project Name
              </label>
              <input
                type="text"
                id="projectName"
                value={formData.projectName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter a descriptive name for the bug"
              />
            </div>
            {/* Platform*/}
            <div className="space-y-2">
              <label
                htmlFor="platform"
                className="text-sm font-medium text-gray-700 block"
              >
                Platform
              </label>
              <input
                type="text"
                id="platform"
                value={formData.platform}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter a descriptive name for the bug"
              />
            </div>
            {/* Bug Name */}
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

            {/* Description */}
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

            {/* Priority and Status Grid */}
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

            {/* File Upload Section */}
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
                        accept="image/*,.pdf,.doc,.docx,.txt"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    JPG, JPEG, PNG upto 5MB
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
                          {getFileIcon(file)}
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

export default CreateBug;
