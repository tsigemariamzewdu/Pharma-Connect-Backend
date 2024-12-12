const Pharmacy = require("../models/Pharmacy");

const PharmacyService = {
  async createPharmacy(pharmacyData) {
    try {
      const newPharmacy = new Pharmacy(pharmacyData);
      await newPharmacy.save();
      return newPharmacy;
    } catch (error) {
      throw new Error(`Error creating pharmacy: ${error.message}`);
    }
  },

  async getPharmacyById(id) {
    try {
      const pharmacy = await Pharmacy.findById(id);
      if (!pharmacy) {
        throw new Error("Pharmacy not found");
      }
      return pharmacy;
    } catch (error) {
      throw new Error(`Error fetching pharmacy: ${error.message}`);
    }
  },

  async updatePharmacy(id, updateData) {
    try {
      const updatedPharmacy = await Pharmacy.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      if (!updatedPharmacy) {
        throw new Error("Pharmacy not found");
      }
      return updatedPharmacy;
    } catch (error) {
      throw new Error(`Error updating pharmacy: ${error.message}`);
    }
  },

  async deletePharmacy(id) {
    try {
      const deletedPharmacy = await Pharmacy.findByIdAndDelete(id);
      if (!deletedPharmacy) {
        throw new Error("Pharmacy not found");
      }
      return deletedPharmacy;
    } catch (error) {
      throw new Error(`Error deleting pharmacy: ${error.message}`);
    }
  },

  async getPharmacies(filter) {
    try {
      const pharmacies = await Pharmacy.find(filter);
      return pharmacies;
    } catch (error) {
      throw new Error(`Error fetching pharmacies: ${error.message}`);
    }
  },
};

module.exports = PharmacyService;
