import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import txRoutes from "./routes/transactions.js";

const app = express();
const PORT = process.env.PORT || 4002;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/paycheck";

app.use(cors());
app.use(express.json());

app.use("/api/transactions", txRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Transaction-service connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`Transaction-service running on port ${PORT}`)
    );
  })
  .catch((err) => console.error("Transaction-service DB error:", err));
