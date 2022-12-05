import path from "path";
import { startCase } from "lodash";
import { VersionModel } from "../../models/VersionModel"
import {
  get as DisengagementGetters,
  set as DisengagementSetters,
} from "./helpers";
import { isValidLatLong, typeOfVersionInput } from "../../helpers";

export const RecordDisengagement = async (req, res) => {
  const { model, lat, long, version } = req.body;

  console.log("Request received to record disengagement");

  try {
    if (!isValidLatLong(lat, long)) {
      res.status(409).json({ message: "Invalid co-ordinates" });
      return res;
    }

    else {
      const versionInputType = await typeOfVersionInput(version)

      if(versionInputType === null){
        res.status(409).json({ message: "Invalid version input" });
        return res;
      }

      let versionOnDb;

      if(versionInputType === 1){
        versionOnDb = await VersionModel.findOne({ fsdVersionNumber: version }).exec()

        if(!versionOnDb){
          versionOnDb = await VersionModel.findOne({ softwareVersionNumber: version }).exec()
        }
      }

      if(versionInputType === 0) {
        versionOnDb = await VersionModel.findOne({ _id: version }).exec()
      }

      const recordedDisengagementResponse =
        await DisengagementSetters.disengagement(model, lat, long, versionOnDb);

      if (recordedDisengagementResponse.type === "success") {
        res.status(201).send(recordedDisengagementResponse.result);
      } else {
        res.status(500).send({ message: recordedDisengagementResponse.result });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
};

export const DisplayDisengagements = async (req, res) => {
  try {
    res.status(200).sendFile(path.join(__dirname + "../../../view/index.html"));
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
};

export const GetDisengagements = async (req, res) => {
  const { filters } = req.body;

  console.log("Request received to view disengagements");

  try {
    const disengagementsToShow = await DisengagementGetters.disengagements(
      filters || {}
    );

    // const disengagementsGeoJSON = {
    //   type: "FeatureCollection",
    //   features: [],
    // };

    // disengagementsToShow.forEach((disengagement) => {
    //   const { _id, car, carModel, location } = disengagement;

    //   const disengagementToAdd = {
    //     type: "Feature",
    //     properties: {
    //       _id,
    //       carModel: startCase(car.modelName),
    //       carModelId: carModel,
    //     },
    //     geometry: location,
    //   };

    //   disengagementsGeoJSON.features.push(disengagementToAdd);
    // });

    res.status(200).send(disengagementsToShow);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
};
