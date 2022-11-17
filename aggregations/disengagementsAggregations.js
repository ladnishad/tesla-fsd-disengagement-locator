import { Disengagement } from "../models/Disengagement";

export const DisengagementAggregations = {
  "disengagements.getAllDisengagementsDetails": async () => {
    const pipeline = [
      {
        $lookup: {
          from: "carmodels",
          localField: "carModel",
          foreignField: "_id",
          as: "car"
        }
      },
      {
        $unwind: {
          path: "$car"
        }
      }
    ];

    try {
      const result = await Disengagement.aggregate(pipeline);
      return result;
    } catch (e) {
      return e;
    }
  }
};
