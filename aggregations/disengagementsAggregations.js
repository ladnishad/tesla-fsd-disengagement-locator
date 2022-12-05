import { Disengagement } from "../models/Disengagement";

export const DisengagementAggregations = {
  "disengagements.getAllDisengagementsDetails": async () => {
    const pipeline = [
      {
        $lookup: {
          from: "carmodels",
          localField: "carModel",
          foreignField: "_id",
          as: "car",
        },
      },
      {
        $lookup: {
          from: "versionmodels",
          localField: "version",
          foreignField: "_id",
          as: "version",
        },
      },
      {
        $unwind: {
          path: "$car",
        },
      },
      {
        $unwind: {
          path: "$version",
        },
      },
    ];

    try {
      const result = await Disengagement.aggregate(pipeline);
      return result;
    } catch (e) {
      return e;
    }
  },
};
