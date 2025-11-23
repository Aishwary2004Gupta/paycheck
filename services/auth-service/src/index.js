import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT || 4001;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/paycheck";

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Auth-service connected to MongoDB");
    app.listen(PORT, () => console.log(`Auth-service running on port ${PORT}`));
  })
  .catch((err) => console.error("Auth-service DB error:", err));
