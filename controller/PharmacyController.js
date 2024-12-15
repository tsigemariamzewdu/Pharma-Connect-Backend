const PharmacyService = require("../services/pharamcyServices");
const asyncErrorHandler = require('../utils/asyncErrorHandler')


// add pharmacy
exports.addPharmacyController = asyncErrorHandler(async (req, res) => {
  const pharmacyData = req.body;
  const createdPharmacy = await PharmacyService.createPharmacy(pharmacyData);
  res.status(200).json({
    success: true,
    data: {
      createdPharmacy: createdPharmacy
    }
  });
});

// get pharmacy
exports.getPharmacyController = asyncErrorHandler( async(req, res) => {
    const pharmacyId = req.params.id;
    const pharmacy = await PharmacyService.getPharmacyById(pharmacyId);
    res.status(200).json({
      success: true,
      data: pharmacy,
    });
})

// update pharmacy
exports.updatePharmacyController = asyncErrorHandler( async (req, res) => {
      const pharmacyId = req.params.id;
      const updateData = req.body;
      const updatedPharmacy = await PharmacyService.updatePharmacy(
        pharmacyId,
        updateData
      );
      res.status(200).json({
        success: true,
        data: updatedPharmacy,
      });
})

// delete pharmacy
exports.deletePharmacyController = asyncErrorHandler( async (req, res) => { 
    const pharmacyId = req.params.id;
    const deletedPharmacy = await PharmacyService.deletePharmacy(pharmacyId);
    res.status(200).json({
      success: true,
      message: "Pharmacy deleted successfully.",
      data: deletedPharmacy,
    });
      
})

// get pharmacies
exports.getPharmaciesController = asyncErrorHandler( async (req, res) => {
      const filter = req.query;
      const pharmacies = await PharmacyService.getPharmacies(filter);
      res.status(200).json({
        success: true,
        data: pharmacies,
      });
      
})
 
 
