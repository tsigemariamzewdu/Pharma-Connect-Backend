const ApplicationService = require("../services/ApplicationServices");

const ApplicationController = {
  async createApplication(req, res) {
    try {
      const applicationData = req.body; // Assuming application data is sent in the request body
      const createdApplication = await ApplicationService.createApplication(
        applicationData
      );
      res.status(201).json(createdApplication);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getApplication(req, res) {
    try {
      const applicationId = req.params.id; // Assuming application ID is in the URL parameter
      const application = await ApplicationService.getApplication(
        applicationId
      );
      res.status(200).json(application);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  async updateApplication(req, res) {
    try {
      const applicationId = req.params.id;
      const updateData = req.body;
      const updatedApplication = await ApplicationService.updateApplication(
        applicationId,
        updateData
      );
      res.status(200).json(updatedApplication);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  async getApplications(req, res) {
    try {
      const filter = req.query; // Assuming filter criteria are in the query parameters
      const applications = await ApplicationService.getApplications(filter);
      res.status(200).json(applications);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = ApplicationController;
