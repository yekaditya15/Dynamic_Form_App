const express = require("express");
const router = express.Router();
const formController = require("../controllers/formController");

router.post("/forms", formController.createForm);
router.get("/forms", formController.getForms);
router.get("/forms/:id", formController.getFormById);
router.post("/forms/:id/responses", formController.saveResponses);
router.delete("/forms/:id", formController.deleteForm);

module.exports = router;
