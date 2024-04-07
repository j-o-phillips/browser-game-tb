"use client";

import { useUserContext } from "@/context/UserContext";

const CargoBayDisplay = () => {
  const { userData } = useUserContext();
  return (
    <div>
      <h4>Name: {userData?.ship.shipCargoBay.name}</h4>
      <h4>Damage: {userData?.ship.shipEngine.currentDamage} %</h4>
      <h4>Max Capacity: {userData?.ship.shipCargoBay.maxCapacity}</h4>
    </div>
  );
};

export default CargoBayDisplay;
