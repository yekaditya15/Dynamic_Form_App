const mongoose = require("mongoose");

const FormSchema = new mongoose.Schema({
  title: String,
  questions: [
    {
      questionText: String,
      questionType: String, // single-choice or multiple-choice
      options: [String], // Changed to array of strings for options
    },
  ],
});

const Form = mongoose.model("Form", FormSchema);

module.exports = Form;
