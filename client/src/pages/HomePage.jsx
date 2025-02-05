import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBugs } from "../api/bugApi";
import DefaultLayout from "../components/DefaultLayout";
import BugsTable from "../components/BugsTable";
import FilterBar from "../components/FilterBar";
import SummaryTable from "../components/SummaryTable";

const HomePage = () => {
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [bugs, setBugs] = useState([]);
  const [filters, setFilters] = useState({
    bugId: "",
    createdBy: "",
    bugName: "",
    status: "",
    priority: "",
    date: "",
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchBugs(token);
    }
  }, [token]);

  const fetchBugs = async (token) => {
    try {
      const response = await getBugs(token);
      setBugs(response);
    } catch (error) {
      console.log("Error while fetching bugs: ", error);
    }
  };

  // console.log(bugs)

  const filteredBugs = bugs.filter((bug) => {
    return (
      (filters.bugId ? bug._id.includes(filters.bugId) : true) &&
      (filters.createdBy
        ? bug.createdBy.name
          ?.toLowerCase()
          .includes(filters.createdBy.toLowerCase())
        : true) &&
      (filters.bugName
        ? bug.bugName.toLowerCase().includes(filters.bugName.toLowerCase())
        : true) &&
      (filters.status ? bug.status === filters.status : true) &&
      (filters.priority ? bug.priority === filters.priority : true) &&
      (filters.date
        ? new Date(bug.createdAt).toLocaleDateString() ===
        new Date(filters.date).toLocaleDateString()
        : true)
    );
  });

  


  return (
    <DefaultLayout>
      <h1 className="text-center font-bold text-3xl py-10">Bugs Report</h1>
      <FilterBar filters={filters} setFilters={setFilters} />
      <BugsTable bugs={filteredBugs} />
      <SummaryTable bugs={bugs} />
    </DefaultLayout>
  );
};

export default HomePage;
