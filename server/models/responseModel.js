const mongoose = require("mongoose");

const ResponseSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Form" },
  responses: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
      answer: [String],
    },
  ],
});

const Response = mongoose.model("Response", ResponseSchema);

module.exports = Response;
