import type { ArrowTable } from "@loaders.gl/arrow";
import type {
  ArrayRowTable,
  ColumnarTable,
  GeoJSONTable,
  ObjectRowTable,
  Table,
} from "@loaders.gl/schema";

type TSupportedDataType =
  | ArrowTable
  | ArrayRowTable
  | ObjectRowTable
  | GeoJSONTable
  | ColumnarTable
  | Table;

export default TSupportedDataType;
