export const getTimeToTarget = (speed: number, distance: number) => {
  return distance / speed;
};

export const calcFuelRequiredToDest = (
  distance: number,
  fuelConsumption: number
) => {
  return distance * fuelConsumption;
};
