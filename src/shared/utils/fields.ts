import { type TDataField } from "@shared/models";

export function sortDataFieldCallback(a: TDataField, b: TDataField) {
  const sortKey = {
    numeric: 0,
    categorical: 1,
    datetime: 2,
    name: 3,
  };
  return sortKey[a.type] - sortKey[b.type];
}
