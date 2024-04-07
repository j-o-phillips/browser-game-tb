"use client";

import { useUserContext } from "@/context/UserContext";

const EngineDisplay = () => {
  const { userData } = useUserContext();
  return (
    <div>
      <h4>Name: {userData?.ship.shipEngine.name}</h4>
      <h4>Damage: {userData?.ship.shipEngine.currentDamage} %</h4>
      <h4>Speed: {userData?.ship.shipEngine.speed}</h4>
      <h4>Fuel Consumption: {userData?.ship.shipEngine.fuelConsumption}</h4>
      <h4>Max Jump Distance: {userData?.ship.shipEngine.maxJump}</h4>
    </div>
  );
};

export default EngineDisplay;
