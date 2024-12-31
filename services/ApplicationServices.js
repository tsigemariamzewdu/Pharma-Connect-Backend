const Application = require("../models/applicationModel");
const Pharmacy = require("../models/pharmacyModel");
const CustomError = require('../utils/customError')


// create application
exports.createApplication = async(applicationData) => {

  //license number??
  const existingApplication = await Application.findOne({
    address: applicationData.address,  
  })

  if (existingApplication) {
    throw new CustomError("An application with this pharmacy address alread exist.", 400)
  }

  const application = new Application(applicationData);
    await application.save();
    return application;
}

// get application by id
exports.getApplication = async(applicationId) => {
  const application = await Application.findById(applicationId);
    if (!application) {
      throw new CustomError("Application not found", 404);
    }
    return application;
}

// update application
exports.updateApplication = async(applicationId, data) => {

  // if (data.status && User.role !== 'Admin') {
  //    throw new CustomError("Only Admins can update status.")
  // }
  
  const existingApplication = await Application.findById(applicationId);

  if (!existingApplication) {
    throw new CustomError("Application not found", 404);
  }

  if (existingApplication.status === "Approved") {
      throw new CustomError("Can't update application. Application is already approved", 400)
  }

  const application = await Application.findByIdAndUpdate(applicationId, data, {
    new: true,
    runValidators: true,
  });
  return application;
}


// update application status
exports.updateApplicationStatus = async(applicationId, data) => {

  const application = await Application.findByIdAndUpdate(applicationId, data, {
    new: true,
    runValidators: true,
  });

  if (!application) {
    throw new CustomError("Application not found", 404);
  }

  if (data.status !== "Approved") {
    return application
  }

  const pharmacy = new Pharmacy({
    ownerName:application.ownerName,
    name: application.pharmacyName,
    contactNumber: application.contactNumber,
    email: application.email,
    address: application.address,
    city: application.city,
    state:  application.state,
    zipCode: application.zipCode,
    latitude: application.latitude,
    longitude: application.longitude,
    licenseNumber: application.licenseNumber,
    licenseImage: application.licenseImage,
  })

  application.pharmacyId = pharmacy._id;
  application.status = "Approved";
  await application.save()
  await pharmacy.save()

  return {application, pharmacy};
}


// delete application
exports.deleteApplication = async(applicationId, data) => {

  const existingApplication = await Application.findById(applicationId);

  if (!existingApplication) {
    throw new CustomError("Application not found", 404);
  }

  await Application.findByIdAndDelete(applicationId);
  return ;
}


// get all applications
exports.getApplications = async(filter) => {
  const applications = await Application.find(filter);
  return applications; 
}

 

 