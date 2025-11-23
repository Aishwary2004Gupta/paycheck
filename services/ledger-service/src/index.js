import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import ledgerRoutes from "./routes/ledger.js";

const app = express();
const PORT = process.env.PORT || 4003;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/paycheck";

app.use(cors());
app.use(express.json());

app.use("/api/ledger", ledgerRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Ledger-service connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`Ledger-service running on port ${PORT}`)
    );
  })
  .catch((err) => console.error("Ledger-service DB error:", err));
