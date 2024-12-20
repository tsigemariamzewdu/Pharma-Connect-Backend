const express = require("express");
const router = express.Router();
const searchController = require("../controller/searchController")

// Search medicine
router.get('/search',searchController.searchMedicine)
 

module.exports = router;
