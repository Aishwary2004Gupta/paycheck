import express from "express";
import LedgerEntry from "../models/LedgerEntry.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { transactionId, userId, amount, status } = req.body;
    if (!transactionId || !userId || amount == null || !status) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const entry = await LedgerEntry.create({
      transactionId,
      userId,
      amount,
      status
    });

    return res.status(201).json(entry);
  } catch (err) {
    console.error("Create ledger entry error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const entries = await LedgerEntry.find({ userId: req.params.userId });
    return res.json(entries);
  } catch (err) {
    console.error("Get ledger entries error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
