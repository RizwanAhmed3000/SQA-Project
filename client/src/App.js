import "./App.css";
import BugDetails from "./pages/BugDetails";
import CreateBug from "./pages/CreateBug";
import EditBug from "./pages/EditBug";
import ForgotPassword from "./pages/ForgotPassword";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Signup from "./pages/Signup";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bug-detail/:id" element={<BugDetails />} />
        <Route path="/create-bug" element={<CreateBug />} />
        <Route path="/edit-bug/:id" element={<EditBug />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
