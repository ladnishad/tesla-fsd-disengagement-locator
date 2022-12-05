import mongoose from "mongoose";

const { Schema, model } = mongoose;

const LocationPointSchema = new Schema({
  _id: String,
  type: {
    type: String,
    enum: ["Point"],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

const DisengagementSchema = new Schema({
  _id: String,
  carModel: {
    type: String,
    required: true
  },
  version: {
    type: String,
    required: true
  },
  timestamp:{
    type: Number,
    required: true
  },
  location: {
    type: LocationPointSchema,
    index: "2dsphere"
  }
});

DisengagementSchema.pre("save", async function(next) {
  const _id = mongoose.Types.ObjectId();
  this._id = _id;

  next();
});

export const Disengagement = model("Disengagement", DisengagementSchema);
