const Application = require("../models/Application");

async function createApplication(data) {
  try {
    const application = new Application(data);
    await application.save();
    return application;
  } catch (error) {
    throw new Error(`Error creating application: ${error.message}`);
  }
}

async function getApplication(id) {
  try {
    const application = await Application.findById(id);
    if (!application) {
      throw new Error("Application not found");
    }
    return application;
  } catch (error) {
    throw new Error(`Error fetching application: ${error.message}`);
  }
}

async function updateApplication(id, data) {
  try {
    const application = await Application.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!application) {
      throw new Error("Application not found");
    }
    return application;
  } catch (error) {
    throw new Error(`Error updating application: ${error.message}`);
  }
}

async function getApplications(filter) {
  try {
    const applications = await Application.find(filter);
    return applications;
  } catch (error) {
    throw new Error(`Error fetching applications: ${error.message}`);
  }
}

module.exports = {
  createApplication,
  getApplication,
  updateApplication,
  getApplications,
};
