const Application = require("../models/applicationModel");
const CustomError = require('../utils/customError')


exports.createApplication = async(data) => {
  const application = new Application(data);
    await application.save();
    return application;
}


exports.getApplication = async() => {
  const application = await Application.findById(id);
    if (!application) {
      throw new CustomError("Application not found",404);
    }
    return application;
}


exports.updateApplication = async(id, data) => {
  const application = await Application.findByIdAndUpdate(id, data, {
    new: true,
  });
  if (!application) {
    throw new CustomError("Application not found", 404);
  }
  return application;
}


exports.getApplications = async(filter) => {
  const applications = await Application.find(filter);
  return applications; 
}

 

 