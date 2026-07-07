const express = require("express");
const router = express.Router();
const {
  getNotifications,
  markAsRead,
  markAllAsRead,
  createNotification
} = require("../controllers/notificationController");
const { protect } = require("../middleware/authMiddleware");

// All routes are guarded by token authorization check
router.use(protect);

router.route("/")
  .get(getNotifications)
  .post(createNotification);

router.put("/read-all", markAllAsRead);
router.put("/:id/read", markAsRead);

module.exports = router;
