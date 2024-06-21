const Form = require("../models/formModel");
const Response = require("../models/responseModel");

exports.createForm = async (req, res) => {
  try {
    const { title, questions } = req.body;
    const form = new Form({ title, questions });
    await form.save();
    res.json(form);
  } catch (err) {
    res.status(500).json({ error: "Failed to create form" });
  }
};

exports.getForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch forms" });
  }
};

exports.getFormById = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    res.json(form);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch form" });
  }
};

exports.saveResponses = async (req, res) => {
  try {
    const { id } = req.params;
    const { responses } = req.body;

    if (!responses || !Array.isArray(responses)) {
      return res.status(400).json({ error: "Invalid responses format" });
    }

    const response = new Response({ formId: id, responses });
    await response.save();
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: "Failed to save responses" });
  }
};

exports.deleteForm = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedForm = await Form.findByIdAndDelete(id);
    if (!deletedForm) {
      return res.status(404).json({ error: "Form not found" });
    }
    // Also delete any responses associated with this form
    await Response.deleteMany({ formId: id });
    res.json({ message: "Form deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete form" });
  }
};
