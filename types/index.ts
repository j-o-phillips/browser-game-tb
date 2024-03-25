export type MapObjectData = {
  name: string;
  position: number[];
};

export type GlobalContextData = {
  targetName: string | null;
  targetPos: number[] | null;
  distanceToTarget: number | null;
  eta: number | null; //deprecated
  isTravelling: boolean; //deprecated
  canLand: boolean; //deprecated
};
