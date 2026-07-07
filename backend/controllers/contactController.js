const ContactRequest = require("../models/ContactRequest");

// @desc    Submit a contact inquiry from the public Contact page
// @route   POST /api/contact
// @access  Public
const createContactRequest = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      res.status(400);
      throw new Error("Please provide name, email, and message");
    }

    const contactRequest = await ContactRequest.create({
      name,
      email,
      subject,
      message
    });

    res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully",
      data: contactRequest
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all submitted contact inquiries (newest first)
// @route   GET /api/contact
// @access  Private (Admin only)
const getContactRequests = async (req, res, next) => {
  try {
    const contactRequests = await ContactRequest.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contactRequests.length,
      data: contactRequests
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update the status of a contact inquiry (new / read / resolved)
// @route   PATCH /api/contact/:id
// @access  Private (Admin only)
const updateContactRequestStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const contactRequest = await ContactRequest.findById(req.params.id);
    if (!contactRequest) {
      res.status(404);
      throw new Error("Contact request not found");
    }

    contactRequest.status = status || contactRequest.status;
    await contactRequest.save();

    res.status(200).json({
      success: true,
      message: "Contact request updated",
      data: contactRequest
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a contact inquiry
// @route   DELETE /api/contact/:id
// @access  Private (Admin only)
const deleteContactRequest = async (req, res, next) => {
  try {
    const contactRequest = await ContactRequest.findById(req.params.id);
    if (!contactRequest) {
      res.status(404);
      throw new Error("Contact request not found");
    }

    await contactRequest.deleteOne();

    res.status(200).json({
      success: true,
      message: "Contact request deleted"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createContactRequest,
  getContactRequests,
  updateContactRequestStatus,
  deleteContactRequest
};
