const express = require("express");
const router = express.Router();
const PharmacyController = require("../controller/PharmacyController");

router.post("/", PharmacyController.createPharmacy);
router.get("/:id", PharmacyController.getPharmacy);
router.put("/:id", PharmacyController.updatePharmacy);
router.delete("/:id", PharmacyController.deletePharmacy);
router.get("/", PharmacyController.getPharmacies);

module.exports = router;
