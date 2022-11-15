import {
  get as DisengagementGetters,
  set as DisengagementSetters
} from "./helpers";
import { isValidLatLong } from "../../helpers";

export const RecordDisengagement = async (req, res) => {
  const { model, lat, long } = req.body;

  console.log("Request received to record disengagement");

  try {
    if (!isValidLatLong(lat, long)) {
      res.status(409).json({ message: "Invalid co-ordinates" });
      return res;
    }

    const recordedDisengagementResponse = await DisengagementSetters.disengagement(
      model,
      lat,
      long
    );

    if (recordedDisengagementResponse.type === "success") {
      res.status(201).send(recordedDisengagementResponse.result);
    } else {
      res.status(500).send({ message: recordedDisengagementResponse.result });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
};

export const ShowDisengagements = async (req, res) => {
  const { filters } = req.body;

  console.log("Request received to view disengagements");
  const filterInFilters = Object.keys(filters);

  if (filterInFilters.length) {
    console.log("Filters are included");
  } else {
    console.log("No filters included");
  }

  try {
    const disengagementsToShow = await DisengagementGetters.disengagements(
      filters
    );
    res.status(200).send(disengagementsToShow);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
};
