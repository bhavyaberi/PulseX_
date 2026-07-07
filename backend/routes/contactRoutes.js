const express = require("express");
const router = express.Router();
const {
  createContactRequest,
  getContactRequests,
  updateContactRequestStatus,
  deleteContactRequest
} = require("../controllers/contactController");
const { protectAdmin } = require("../middleware/adminMiddleware");

// Public: submit a new inquiry from the Contact page
router.post("/", createContactRequest);

// Admin only: view and manage submitted inquiries
router.get("/", protectAdmin, getContactRequests);
router.patch("/:id", protectAdmin, updateContactRequestStatus);
router.delete("/:id", protectAdmin, deleteContactRequest);

module.exports = router;
