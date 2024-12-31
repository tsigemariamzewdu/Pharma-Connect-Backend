const Pharmacy = require("../models/pharmacyModel");
const Inventory = require("../models/inventoryModel")
const Medicine = require("../models/MedicineModel")
const CustomError = require("../utils/customError");


// Get pharmacy by ID
exports.getPharmacyById = async (id) => {
  const pharmacy = await Pharmacy.findById(id);
  
  if (!pharmacy) {
    throw new CustomError('Pharmacy not found', 404);
  }

  return pharmacy;
};

// Update a pharmacy's information
exports.updatePharmacy = async (id, updateData) => {
  const updatedPharmacy = await Pharmacy.findByIdAndUpdate(id, updateData, {
    new: true,  
  });

  
  if (!updatedPharmacy) {
    throw new CustomError('Pharmacy not found', 404);
  }

  return updatedPharmacy;
};

// Delete a pharmacy
exports.deletePharmacy = async (id) => {
  const deletedPharmacy = await Pharmacy.findByIdAndDelete(id);

  if (!deletedPharmacy) {
    throw new CustomError('Pharmacy not found', 404);
  }

  return deletedPharmacy;
};

// Get all pharmacies with optional filtering
exports.getPharmacies = async (filter = {}) => {
  const pharmacies = await Pharmacy.find(filter);
  return pharmacies;
};


/***inventory */
 
// get inventory of a pharmacy 
exports.getInventory =  async (pharmacyId) => {

  const pharmacy = await Pharmacy.findById(pharmacyId);
   
  if (!pharmacy) {
    throw new CustomError("pharmacy doesn't exist.", 404);
  }
  
  const inventory = await Inventory.find({pharmacy: pharmacyId});
   
  if (!inventory) {
    throw new CustomError("This pharmacy doesn't have inventory.", 404);
  }

  return inventory;
};

// add medicine to inventory  
exports.addInventoryItem =  async (pharmacyId,medicineData) => {
  const inventoryData= {... medicineData, pharmacy:pharmacyId};

  const pharmacy = await Pharmacy.findById(pharmacyId);

  if (!pharmacy) {
    throw new CustomError(`A pharmacy with id: ${pharmacyId} doesn't exist.`, 404);
  }
  
  const medicine = await Inventory.findOne({medicine: medicineData.medicine});

  if (medicine) {
    throw new CustomError(`medicine already exist in the inventory.`, 404);
  }

  const medicines = await Medicine.findById(medicineData.medicine);

  if (!medicines) {
    throw new CustomError(`A medicine with id: ${medicineData.medicine} doesn't exist.`, 404);
  }

  const addedMedicine = new Inventory(inventoryData)
  await addedMedicine.save()

  return addedMedicine;
};
 

// update quantity,price & expiredate
exports.updateInventoryItem = async (pharmacyId, medicineId, medicineData) => {
  const pharmacy = await Pharmacy.findById(pharmacyId);

  if (!pharmacy) {
    throw new CustomError(`A pharmacy with id: ${pharmacyId} doesn't exist.`, 404);
  }

  const medicine = await Inventory.findOne({ pharmacy: pharmacyId, medicine: medicineId });

  if (!medicine) {
    throw new CustomError(`Medicine doesn't exist in the inventory.`, 404);
  }

  const updatedMedicine = await Inventory.findOneAndUpdate(
    { pharmacy: pharmacyId, medicine: medicineId },
    {
      $set: {
        price: medicineData.price,
        quantity: medicineData.quantity,
        expiryDate: medicineData.expiryDate, 
      },
    },
    { new: true } 
  );

  return updatedMedicine;
};


// Delete medicine from inventory
exports.deleteInventoryItem = async (pharmacyId, medicineId) => {

  const pharmacy = await Pharmacy.findById(pharmacyId);
  if (!pharmacy) {
    throw new CustomError(`Pharmacy with id: ${pharmacyId} doesn't exist.`, 404);
  }

  const medicine = await Inventory.findOne({ pharmacy: pharmacyId, medicine: medicineId });
  if (!medicine) {
    throw new CustomError(`Medicine doesn't exist in the inventory.`, 404);
  }

  const deletedMedicine = await Inventory.deleteOne({ pharmacy: pharmacyId, medicine: medicineId });
   
  return deletedMedicine
};
