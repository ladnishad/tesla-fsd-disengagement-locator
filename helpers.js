export const isValidLatLong = (lat, long) => {
  const coordinatesRegex = /^([-+]?)([\d]{1,2})(((\.)(\d+)(,)))(\s*)(([-+]?)([\d]{1,3})((\.)(\d+))?)$/;

  if (coordinatesRegex.test(`${lat},${long}`)) {
    return true;
  }

  return false;
};
