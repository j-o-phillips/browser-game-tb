import {
  Cronresource,
  Factory,
  Market,
  ProductionLine,
  Resource,
  ShipCargoBaySaleTemplate,
  ShipEngineSaleTemplate,
} from "@prisma/client";

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
  mapModalOpen: boolean;
  cargoModalOpen: boolean;
  dataCenterModalOpen: boolean;
  currentFactoryData:
    | (Factory & { productionLines: ProductionLine[] | null })
    | null;
};

export type MarketData = Market & {
  resources: Resource[];
  cronResources: Cronresource[];
  shipEngineSaleTemplates: ShipEngineSaleTemplate[];
  shipCargoBaySaleTemplates: ShipCargoBaySaleTemplate[];
  factories: Factory[];
};
