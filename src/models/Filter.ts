export enum Filter {
  all = "All",
  low = "Low Sugar",
  keto = "Keto",
  vegan = "Vegan",
}

export function getFilterApiKey(filter: Filter) {
  switch (filter) {
    case Filter.low:
      return { health: "low-sugar" };
    case Filter.keto:
      return { health: "keto-friendly" };
    case Filter.vegan:
      return { health: "vegan" };
    default:
      return {};
  }
}
