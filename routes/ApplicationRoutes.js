const express = require("express");
const router = express.Router();
const ApplicationController = require("../controller/ApplicationController");

router.post("/", ApplicationController.createApplication);
router.get("/:id", ApplicationController.getApplication);
router.put("/:id", ApplicationController.updateApplication);
router.get("/", ApplicationController.getApplications);

module.exports = router;
