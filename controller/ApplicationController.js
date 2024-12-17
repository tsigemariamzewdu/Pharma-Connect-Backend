const ApplicationService = require("../services/applicationServices");
const asyncErrorHandler = require('../utils/asyncErrorHandler')


// apply
exports.ApplicationController = asyncErrorHandler(async (req, res) => {
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
exports.getApplication = asyncErrorHandler(async (req, res) => {
  const applicationId = req.params.id;  
      const application = await ApplicationService.getApplication(
        applicationId
      );
  res.status(200).json({
    success: true,
    application: application,
  });
})

//update application
exports.updateApplication = asyncErrorHandler(async (req, res) => {
  const applicationId = req.params.id;
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

// get applications
exports.getApplications = asyncErrorHandler(async (req, res) => {
  const filter = req.query;  
  const applications = await ApplicationService.getApplications(filter);

  res.status(200).json({
    success: true,
    applications: applications,
  });
})

 
 
 
