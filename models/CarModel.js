import mongoose from "mongoose";

const { Schema, model } = mongoose;

const CarModelSchema = new Schema({
  _id: String,
  modelName: {
    type: String,
    required: true
  }
});

CarModelSchema.pre("save", async function(next) {
  const _id = mongoose.Types.ObjectId();
  this._id = _id;

  next();
});

export const CarModel = model("CarModel", CarModelSchema);
