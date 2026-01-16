const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/tasks");

const app = express();
const PORT = process.env.PORT || 5001;

// ✅ Middlewares FIRST
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// ✅ Routes
app.use("/api/tasks", taskRoutes);

// ✅ MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/smart-planner")
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log("MongoDB connection error:", err));

// ✅ Start server
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
