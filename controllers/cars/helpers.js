import { CarModel } from "../../models/CarModel";

export const get = {
  car: async model => {
    const correctCaseModelName = model.toLowerCase();
    const carCursorFetched = await CarModel.find({
      modelName: correctCaseModelName
    }).exec();

    return carCursorFetched.pop();
  }
};

export const set = {
  car: async model => {
    const correctCaseModelName = model.toLowerCase();

    try {
      const carToSave = new CarModel({
        modelName: correctCaseModelName
      });

      const savedCar = await carToSave.save();

      return {
        type: "success",
        result: savedCar
      };
    } catch (e) {
      console.log(e);
      return {
        type: "error",
        result: "Something went wrong wile saving the car model"
      };
    }
  }
};
