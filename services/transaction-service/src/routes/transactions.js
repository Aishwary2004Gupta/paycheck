import express from "express";
import jwt from "jsonwebtoken";
import axios from "axios";
import Transaction from "../models/Transaction.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const LEDGER_SERVICE_URL =
  process.env.LEDGER_SERVICE_URL || "http://localhost:4003";

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "No token provided" });

  const token = header.split(" ")[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    console.error("JWT error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
}

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { amount, currency = "INR" } = req.body;

    if (amount == null || amount <= 0) {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number" });
    }

    let tx = await Transaction.create({
      userId: req.user.userId,
      amount,
      currency,
      status: "PENDING"
    });

    // simulate payment success
    tx.status = "SUCCESS";
    await tx.save();

    // notify ledger
    try {
      await axios.post(`${LEDGER_SERVICE_URL}/api/ledger`, {
        transactionId: tx._id.toString(),
        userId: tx.userId,
        amount: tx.amount,
        status: tx.status
      });
    } catch (err) {
      console.error("Error calling ledger service:", err.message);
      // still return success but log this
    }

    return res.status(201).json(tx);
  } catch (err) {
    console.error("Create transaction error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const tx = await Transaction.findById(req.params.id);
    if (!tx) return res.status(404).json({ message: "Transaction not found" });
    return res.json(tx);
  } catch (err) {
    console.error("Get transaction error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
