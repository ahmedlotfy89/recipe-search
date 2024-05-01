import { Recipe } from "./Recipe";

export type SearchResponse = {
  from: number;
  to: number;
  count: number;
  hits: [{ recipe: Recipe }];
};
