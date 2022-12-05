import mongoose from "mongoose";

const { Schema, model } = mongoose;

const VersionModelSchema = new Schema({
  _id: String,
  fsdVersionNumber: {
    type: String,
    required: true
  },
  softwareVersionNumber: {
    type: String,
    required: true
  }
});

VersionModelSchema.pre("save", async function(next) {
  const _id = mongoose.Types.ObjectId();
  this._id = _id;

  next();
});

export const VersionModel = model("VersionModel", VersionModelSchema);
