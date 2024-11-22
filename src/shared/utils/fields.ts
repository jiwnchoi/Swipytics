import { type TField } from "@shared/models";

export function sortDataFieldCallback(a: TField, b: TField) {
  const sortKey = {
    numeric: 0,
    categorical: 1,
    datetime: 2,
    name: 3,
  };
  return sortKey[a.type] - sortKey[b.type];
}
