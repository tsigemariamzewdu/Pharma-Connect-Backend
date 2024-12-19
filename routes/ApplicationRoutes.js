const express = require("express");
const router = express.Router();
const ApplicationController = require("../controller/ApplicationController");

// pharmacy application (by owner)
router.post("/apply", ApplicationController.createApplication);

// get application (see application detail, ) (by system admin, owner)
router.get("/:id", ApplicationController.getApplication);

// update application  (owner)
router.put("/:id", ApplicationController.updateApplication);

// application status update (approve, reject , pending, on progress)  (admin)

// get all applications (admin)       ??? filters???
router.get("/", ApplicationController.getApplications);

module.exports = router;
