const Notification = require("../models/Notification");

// @desc    Get user notifications
// @route   GET /api/notifications
// @access  Private
const getNotifications = async (req, res, next) => {
  try {
    const list = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });

    // Seed mock notification if none exist so the interface doesn't feel empty
    if (list.length === 0) {
      const welcomeNotification = await Notification.create({
        user: req.user._id,
        title: "Welcome to PulseX!",
        message: "Your biometric telemetry dashboard is fully operational. Share your trainer access code to get started.",
        type: "system",
        read: false
      });
      return res.status(200).json({
        success: true,
        data: [welcomeNotification]
      });
    }

    res.status(200).json({
      success: true,
      data: list
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
const markAsRead = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      res.status(404);
      throw new Error("Notification not found");
    }

    if (notification.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not authorized");
    }

    notification.read = true;
    const updated = await notification.save();

    res.status(200).json({
      success: true,
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark all user notifications as read
// @route   PUT /api/notifications/read-all
// @access  Private
const markAllAsRead = async (req, res, next) => {
  try {
    await Notification.updateMany(
      { user: req.user._id, read: false },
      { $set: { read: true } }
    );

    res.status(200).json({
      success: true,
      message: "All notifications marked as read"
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Post a custom system notification (internal / debug use)
// @route   POST /api/notifications
// @access  Private
const createNotification = async (req, res, next) => {
  try {
    const { title, message, type } = req.body;

    if (!title || !message) {
      res.status(400);
      throw new Error("Title and message are required");
    }

    const notif = await Notification.create({
      user: req.user._id,
      title,
      message,
      type: type || "system",
      read: false
    });

    res.status(201).json({
      success: true,
      data: notif
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotifications,
  markAsRead,
  markAllAsRead,
  createNotification
};
