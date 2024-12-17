const Pharmacy = require("../models/pharmacyModel");
const Inventory = require("../models/inventoryModel")
const CustomError = require("../utils/customError");


// Create a new pharmacy
exports.createPharmacy = async (pharmacyData) => {
  const existingPharmacy = await Pharmacy.findOne({
    name: pharmacyData.name.trim(),
    address: pharmacyData.address.trim(),
  });

  if (existingPharmacy) {
    throw new CustomError('A pharmacy with the same name and address already exists.', 400);
  }

  const newPharmacy = new Pharmacy(pharmacyData);
  await newPharmacy.save();
  return newPharmacy;
};

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
  const inventory = await Inventory.findById(pharmacyId);
   
  if (!inventory) {
    throw new CustomError("This pharmacy doesn't have inventory.", 404);
  }

  return inventory;
};

// add medicine to inventory  
exports.addInventoryItem =  async (pharmacyId,medicineData) => {
  const { medicineId } = medicineData;

  if (!pharmacyId) {
    throw new CustomError(`A pharmacy with id: ${pharmacyId} doesn't exist.`, 404);
  }

  // if (!medicineId) {
  //   throw new CustomError(`A medicine with id: ${medicineId} doesn't exist.`, 404);
  // }

  const medicine = new Inventory(medicineData)
  await medicine.save()

  return medicine;
};
 

// update quantity,price & expiredate
exports.updateInventoryItem =  async (pharmacyId, medicineId, price, quantity, expirationDate) => {


  if (!pharmacyId) {
    throw new CustomError(`A pharmacy with id: ${pharmacyId} doesn't exist.`, 404);
  }

  if (!medicineId) {
    throw new CustomError(`Medicine not found in pharmacy inventory`, 404);
  }

  const updatedMedicine = await Inventory.findOneAndUpdate(
    { pharmacy: pharmacyId, medicine: medicineId },
    { price, quantity, expirationDate },
    { new: true }   
  );


  return updatedMedicine;
   
};

// delete medicine from inventory
exports.deleteInventoryItem =  async (pharmacyId, medicineId) => {
 
  if (!pharmacyId) {
    throw new CustomError(`A pharmacy with id: ${pharmacyId} doesn't exist.`, 404);
  }

  if (!medicineId) {
    throw new CustomError(`Medicine not found in pharmacy inventory`, 404);
  }
  
  const deletedmedicine = await Inventory.deleteOne({pharmacy: pharmacyId, medicine:medicineId});
  return deletedmedicine;
};
 
