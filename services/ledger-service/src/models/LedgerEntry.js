import mongoose from "mongoose";

const ledgerEntrySchema = new mongoose.Schema(
  {
    transactionId: { type: String, required: true },
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true }
  },
  { timestamps: true }
);

const LedgerEntry = mongoose.model("LedgerEntry", ledgerEntrySchema);
export default LedgerEntry;
