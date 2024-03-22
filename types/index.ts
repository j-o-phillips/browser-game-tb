export type MapObjectData = {
  name: string;
  position: number[];
};

export type GlobalContextData = {
  targetName: string | null;
  targetPos: number[] | null;
  distanceToTarget: number | null;
  eta: number | null;
  isTravelling: boolean;
  canLand: boolean;
};
