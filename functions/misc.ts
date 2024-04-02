export const validateFuelAndJumpDist = (
  currentFuel: number,
  maxJump: number,
  fuelRequiredToDest: number,
  distanceToTarget: number
) => {
  if (currentFuel < fuelRequiredToDest) {
    return "Not enough fuel";
  }
  if (maxJump < distanceToTarget) {
    return "Exceeds maximum jump distance";
  }
  return null;
};
