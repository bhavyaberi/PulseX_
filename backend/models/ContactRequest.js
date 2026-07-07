const mongoose = require("mongoose");

const ContactRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true
    },
    subject: {
      type: String,
      default: "General Inquiry",
      trim: true
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true
    },
    status: {
      type: String,
      enum: ["new", "read", "resolved"],
      default: "new"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("ContactRequest", ContactRequestSchema);
