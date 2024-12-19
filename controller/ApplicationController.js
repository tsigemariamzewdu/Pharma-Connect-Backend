const ApplicationService = require("../services/applicationServices");
const asyncErrorHandler = require('../utils/asyncErrorHandler')


// apply
exports.createApplicationController = asyncErrorHandler(async (req, res) => {
  const applicationData = req.body;  
      const createdApplication = await ApplicationService.createApplication(
        applicationData
      );
  res.status(200).json({
    success: true,
    createdApplication : createdApplication
  });
})

// get applicatino by id
exports.getApplicationController = asyncErrorHandler(async (req, res) => {
  const applicationId = req.params.applicationId;  
      const application = await ApplicationService.getApplication(
        applicationId
      );
  res.status(200).json({
    success: true,
    application: application,
  });
})

//update application
exports.updateApplicationController = asyncErrorHandler(async (req, res) => {
  const applicationId = req.params.applicationId;
      const updateData = req.body;
      const updatedApplication = await ApplicationService.updateApplication(
        applicationId,
        updateData
      );
  res.status(200).json({
    success: true,
    updatedApplication: updatedApplication,
  });
})

//update application status (approve/reject)
exports.updateApplicationStatusController = asyncErrorHandler(async (req, res) => {
  const applicationId = req.params.applicationId;
      const updateData = req.body;
      const updatedApplication = await ApplicationService.updateApplicationStatus(
        applicationId,
        updateData
      );
  res.status(200).json({
    success: true,
    status: updatedApplication.status,
    updatedApplication: updatedApplication,
  });
})

//delete application
exports.deleteApplicationController = asyncErrorHandler(async (req, res) => {
  const applicationId = req.params.applicationId;
      await ApplicationService.deleteApplication(
        applicationId,
      );
  res.status(204).json({
    success: true,
    message: "Application deleted successfully.",
    deletedApplication: {},
  });
})

// get applications
exports.getApplicationsController = asyncErrorHandler(async (req, res) => {
  const filter = req.query;  
  const applications = await ApplicationService.getApplications(filter);

  res.status(200).json({
    success: true,
    applications: applications,
  });
})

 
 
 
