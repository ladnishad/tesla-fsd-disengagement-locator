export const isValidLatLong = (lat, long) => {
  const coordinatesRegex =
    /^([-+]?)([\d]{1,2})(((\.)(\d+)(,)))(\s*)(([-+]?)([\d]{1,3})((\.)(\d+))?)$/;

  if (coordinatesRegex.test(`${lat},${long}`)) {
    return true;
  }

  return false;
};

export const dataToGeoJson = (data, propertyFields = [], geometryFieldName) => {
  const geoJsonObj = {
    type: "FeatureCollection",
    features: [],
  };

  data.forEach((dataPoint) => {
    const featureToAdd = {
      type: "Feature",
      properties: {},
      geometry: dataPoint[geometryFieldName],
    };

    propertyFields.forEach((field) => {
      featureToAdd.properties[field] = dataPoint[field];
    });

    geoJsonObj.features.push(featureToAdd);
  });

  return geoJsonObj;
};
