const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  ownerName: {
    type: String,
    required: true,
    trim: true,
  },
  pharmacyId: {
    type: String,
    required: true,
    trim: true,
  },
  contactNumber: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    enum: ["Pending", "Approved", "Suspended", "Closed"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  latitude: {
    type: Number,
    required: [true, "location latitude is required"],
  },
  longitude: {
    type: Number,
    required: [true, "Longitude is required"],
  },
  licenseNumber: {
    type: String,
    required: [true, "license is a pre-requisite for a legal pharmacy"],
    trim: true,
  },
  licenseImage: {
    type: String,
    required: [true, "license image should be provided"],
    trim: true,
  },
});

ApplicationSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Application = mongoose.model("Pharmacy", ApplicationSchema);
module.exports = Application;
