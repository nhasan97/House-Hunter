const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const HousesSchema = new Schema({
  house_name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  num_bedrooms: {
    type: Number,
    required: true,
  },
  num_bathrooms: {
    type: Number,
    required: true,
  },
  room_size: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  availability_date: {
    type: String,
    required: true,
  },
  rent_per_month: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Number,
    required: true,
  },
  owners_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  owners_phone_number: {
    type: String,
    required: true,
  },
});

const Houses = model("Houses", HousesSchema);

module.exports = Houses;
