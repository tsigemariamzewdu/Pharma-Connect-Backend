const express = require("express");
const router = express.Router();
const pharmacyController = require("../controller/PharmacyController");

/**pharmacy routes */

// add pharmacy (after admin approved)
router.post("/pharmacy", pharmacyController.addPharmacy);

// get pharmacy detail/profile  (everybody)
router.get("/pharmacies/:id", pharmacyController.getPharmacy);

// update pharmacy profile (pharmacist)
router.patch("/pharmacy/:id", pharmacyController.updatePharmacy);

// delete pharmacy (pharmacist & system admins)
router.delete("/pharmacy/:id", pharmacyController.deletePharmacy);

// get all pharmacies ( )
router.get("/pharmacy", pharmacyController.getPharmacies);


/**manage inventory routes */

// get inventory of a pharmacy/list of medicines&quantiies+price (phramacist & pharmacy profile)
router.get('/pharmacies/:pharmacyId/inventory', pharmacyController.getInventory);

// add medicine to inventory (pharmacist)
router.post('/pharmacies/:pharmacyId/inventory', pharmacyController.addInventoryItem);

// update quantity,price & expiredate
router.put('/pharmacies/:pharmacyId/inventory/:inventoryId', pharmacyController.updateInventoryItem);

// delete medicine from inventory
router.delete('/pharmacies/:pharmacyId/inventory/:inventoryId', pharmacyController.deleteInventoryItem);

// // Submit application
// router.post('/pharmacies', pharmacyController.submitApplication);

module.exports = router;








// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userController');

// // Search for medicinesN
// router.get('/medicines', userController.searchMedicines);

// // View pharmacy details
// router.get('/pharmacies/:pharmacyId', userController.viewPharmacyDetails);

// // Save to cart
// router.post('/users/:userId/cart', userController.addToCart);
// router.get('/users/:userId/cart', userController.getCart);
// router.delete('/users/:userId/cart/:itemId', userController.removeFromCart);

// module.exports = router;


 


 


// const express = require('express');
// const router = express.Router();
// const adminController = require('../controllers/adminController');

// // Approve/Reject Pharmacy Applications
// router.get('/admin/pharmacy-applications', adminController.getPharmacyApplications);
// router.put('/admin/pharmacy-applications/:applicationId', adminController.processPharmacyApplication);

// // Manage Pharmacies
// router.get('/admin/pharmacies', adminController.getPharmacies);
// router.post('/admin/pharmacies', adminController.addPharmacy);
// router.put('/admin/pharmacies/:pharmacyId', adminController.updatePharmacy);
// router.delete('/admin/pharmacies/:pharmacyId', adminController.deletePharmacy);

// module.exports = router;