const asyncErrorHandler = require("../utils/asyncErrorHandler");
const customError = require('../utils/customError');


exports.searchMedicine = asyncErrorHandler(async(req, res) => {
    const { medicineName, latitude, longitude } = req.query;

    if (!medicineName) {
        throw new customError('Please provide a medicine name to search.', 400);
      }

    let userLocation = null;
    if (latitude && longitude) {
        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);

        if (isNaN(lat) || lat < -90 || lat > 90) {
            throw new customError("Invalid latitude value.", 400);
        }

        if (isNaN(lon) || lat < -180 || lat > 180) {
            throw new customError("Invalid longitude value.", 400);
        }

        userLocation = { latitude:lat, longitude: lon}
    }

    const results = await searchServices.findPharmaciesWithMedicine({
        medicineName,
        latitude: userLocation?.latitude,
        latitude: userLocation?.latitude,
    });

    res.status(200).json({
        success: true,
        count: results.length,
        data: results,
    })
})