import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import bugRoutes from "./routes/bugRoutes.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api", authRoutes);
app.use("/api/bugs", bugRoutes);

// testing route
// app.get("/", (req, res) => {
//   res.send("Hello World!");
//   res.send("API running...");
// });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}✅✅✅`));
