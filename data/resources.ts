const defaultCron = 1000;
const defaultResource = 200;

export const cronResources = [
  {
    name: "Oxygen",
    amount: defaultCron,
    baseValue: 50,
  },
  {
    name: "Food",
    amount: defaultCron,
    baseValue: 10,
  },
  {
    name: "Fuel",
    amount: defaultCron,
    baseValue: 20,
  },
];

export const resources = [
  {
    name: "Iron",
    amount: defaultResource,
    baseValue: 20,
  },
];

//This is more of a reference
export const allResources = [
  {
    name: "Oxygen",
    amount: defaultCron,
    baseValue: 50,
  },
  {
    name: "Food",
    amount: defaultCron,
    baseValue: 10,
  },
  {
    name: "Fuel",
    amount: defaultCron,
    baseValue: 20,
    recipe: {
      Hydrogen: 10,
      o2: 10,
    },
    timeToProduce: 10,
  },
  {
    name: "Iron",
    amount: defaultResource,
    baseValue: 20,
  },
];
