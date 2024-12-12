const PharmacyService = require("../services/PharamcyServices");

const PharmacyController = {
  async createPharmacy(req, res) {
    try {
      const pharmacyData = req.body;
      const createdPharmacy = await PharmacyService.createPharmacy(
        pharmacyData
      );
      res.status(201).json(createdPharmacy);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getPharmacy(req, res) {
    try {
      const pharmacyId = req.params.id;
      const pharmacy = await PharmacyService.getPharmacyById(pharmacyId);
      res.status(200).json(pharmacy);
    } catch (error) {
      if (error.message === "Pharmacy not found") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },

  async updatePharmacy(req, res) {
    try {
      const pharmacyId = req.params.id;
      const updateData = req.body;
      const updatedPharmacy = await PharmacyService.updatePharmacy(
        pharmacyId,
        updateData
      );
      res.status(200).json(updatedPharmacy);
    } catch (error) {
      if (error.message === "Pharmacy not found") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },

  async deletePharmacy(req, res) {
    try {
      const pharmacyId = req.params.id;
      const deletedPharmacy = await PharmacyService.deletePharmacy(pharmacyId);
      res.status(200).json(deletedPharmacy);
    } catch (error) {
      if (error.message === "Pharmacy not found") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },

  async getPharmacies(req, res) {
    try {
      const filter = req.query;
      const pharmacies = await PharmacyService.getPharmacies(filter);
      res.status(200).json(pharmacies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = PharmacyController;
