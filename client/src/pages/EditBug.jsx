import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBugById, updateBug } from "../api/bugApi";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react"; // For loading spinner

const EditBug = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);

  const [bugData, setBugData] = useState({
    bugName: "",
    description: "",
    priority: "Low",
    status: "Open",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Priority colors mapping
  const priorityColors = {
    Low: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    High: "bg-orange-100 text-orange-800",
    Critical: "bg-red-100 text-red-800",
  };

  // Status colors mapping
  const statusColors = {
    Open: "bg-blue-100 text-blue-800",
    "In Progress": "bg-purple-100 text-purple-800",
    Resolved: "bg-green-100 text-green-800",
    Closed: "bg-gray-100 text-gray-800",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bugResponse = await getBugById(id, token);
        setBugData({
          bugName: bugResponse.bugName,
          description: bugResponse.description,
          priority: bugResponse.priority,
          status: bugResponse.status,
        });
      } catch (err) {
        setError("Failed to fetch bug data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBugData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await updateBug(id, bugData, token);
      navigate(`/bug-detail/${id}`);
    } catch (err) {
      setError("Failed to update bug. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Bug</h1>
          <p className="text-gray-600">
            Update bug details and tracking information
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 animate-fadeIn">
            <p>{error}</p>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-lg overflow-hidden"
        >
          <div className="p-6 space-y-6">
            {/* Bug Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Bug Name
              </label>
              <input
                type="text"
                name="bugName"
                value={bugData.bugName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Description
              </label>
              <textarea
                name="description"
                value={bugData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              ></textarea>
            </div>

            {/* Priority and Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Priority */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Priority
                </label>
                <select
                  name="priority"
                  value={bugData.priority}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    priorityColors[bugData.priority]
                  }`}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Status
                </label>
                <select
                  name="status"
                  value={bugData.status}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    statusColors[bugData.status]
                  }`}
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
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
              disabled={submitting}
              className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                submitting ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {submitting ? (
                <div className="flex items-center">
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Updating...
                </div>
              ) : (
                "Update Bug"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBug;
