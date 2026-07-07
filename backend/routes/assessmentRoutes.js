const express = require("express");
const router = express.Router();
const { logAssessment, getAssessmentHistory } = require("../controllers/assessmentController");
const { protect } = require("../middleware/authMiddleware");

// All routes are guarded by token authorization check
router.use(protect);

router.route("/")
  .post(logAssessment)
  .get(getAssessmentHistory);

module.exports = router;
