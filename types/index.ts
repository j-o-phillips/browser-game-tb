import { Market, Resource } from "@prisma/client";

export type MapObjectData = {
  name: string;
  position: number[];
};

export type GlobalContextData = {
  targetName: string | null;
  targetPos: number[] | null;
  distanceToTarget: number | null;
  fuelRequiredToDest: number | null;
  eta: number | null; //deprecated
  isTravelling: boolean; //deprecated
  canLand: boolean; //deprecated
};

export type MarketData = Market & {
  resources: Resource[];
};
