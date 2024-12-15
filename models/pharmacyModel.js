const mongoose = require("mongoose");

const PharmacySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  zipCode: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  ownerName: {
    type: String,
    required: true,
    trim: true,
  },

  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
});

PharmacySchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Pharmacy = mongoose.model("Pharmacy", PharmacySchema);

module.exports = Pharmacy;
