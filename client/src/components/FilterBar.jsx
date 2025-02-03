import React from "react";
import { X, User, Filter } from "lucide-react";

const FilterBar = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setFilters({
      bugId: "",
      createdBy: "",
      bugName: "",
      status: "",
      priority: "",
      date: "",
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-4  border border-gray-200 mx-4 lg:mx-12 transition-all duration-300 ease-in-out hover:shadow-xl">
      <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row gap-3 items-center">
        {/* Created By Input */}
        <div className="relative flex-grow w-full md:w-1/5">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="text-gray-400" size={18} />
          </div>
          <input
            type="text"
            name="createdBy"
            placeholder="Creator"
            value={filters.createdBy}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
          />
        </div>
        {/* Bugname input */}
        <div className="relative flex-grow w-full md:w-1/5">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="text-gray-400" size={18} />
          </div>
          <input
            type="text"
            name="bugName"
            placeholder="bugName"
            value={filters.bugName}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
          />
        </div>

        {/* Status Dropdown */}
        <div className="relative flex-grow w-full md:w-1/5">
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 appearance-none"
          >
            <option value="" className="text-gray-500">
              Status
            </option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
            <option value="In Progress">In Progress</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <Filter size={18} />
          </div>
        </div>

        {/* Priority Dropdown */}
        <div className="relative flex-grow w-full md:w-1/5">
          <select
            name="priority"
            value={filters.priority}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 appearance-none"
          >
            <option value="" className="text-gray-500">
              Priority
            </option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <Filter size={18} />
          </div>
        </div>

        {/* Date Input */}
        <div className="relative flex-grow w-full md:w-1/5">
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
          />
        </div>

        {/* Clear Filters Button */}
        <button
          onClick={clearFilters}
          className="w-full md:w-auto flex items-center justify-center px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-md hover:from-gray-200 hover:to-gray-300 transition duration-300 ease-in-out transform hover:scale-105 shadow-sm hover:shadow-md"
        >
          <X className="mr-2" size={18} />
          Clear
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
