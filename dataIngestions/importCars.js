import { CarModelsData } from "../dataSources/CarModels";
import { set as CarSetters } from "../controllers/cars/helpers";

export const importCars = () => {
  const addedModels = [];
  CarModelsData.forEach(carModel => {
    try {
      const addedModelResponse = CarSetters.car(carModel);

      if (addedModelResponse.type === "success") {
        addedModels.push(addedModelResponse.result);
        console.log(`Added ${carModel}`);
      }
    } catch (e) {
      console.log(e);
    }
  });

  return addedModels;
};
