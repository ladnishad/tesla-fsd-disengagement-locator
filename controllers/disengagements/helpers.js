import { Disengagement } from "../../models/Disengagement";
import { DisengagementAggregations } from "../../aggregations/disengagementsAggregations";
import { get as CarGetters } from "../cars/helpers";

export const get = {
  disengagements: async filters => {
    const disengagementsFetched = await DisengagementAggregations[
      "disengagements.getAllDisengagementsDetails"
    ]();
    return disengagementsFetched;
  }
};

export const set = {
  disengagement: async (model, lat, long) => {
    const carModel = await CarGetters.car(model);

    try {
      if (!carModel) {
        throw new Error("Invalid car model.");
      }

      const disengagementToSave = new Disengagement({
        carModel: carModel._id,
        location: {
          type: "Point",
          coordinates: [long, lat]
        }
      });

      const savedDisengagement = await disengagementToSave.save();

      return {
        type: "success",
        result: `Disengagement recorded for ${model} at ${lat}, ${long}`
      };
    } catch (e) {
      return {
        type: "error",
        result: "Something went wrong while recording the disengagement."
      };
    }
  }
};
