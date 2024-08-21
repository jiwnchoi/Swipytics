import { ArrowLoader, type ArrowTable } from "@loaders.gl/arrow";
import { JSONLoader, load } from "@loaders.gl/core";
import { CSVLoader } from "@loaders.gl/csv";
import { ParquetLoader } from "@loaders.gl/parquet";
import type {
  ArrayRowTable,
  ColumnarTable,
  GeoJSONTable,
  ObjectRowTable,
  Schema,
  Table,
} from "@loaders.gl/schema";
import { create } from "zustand";

type SupportedDataType =
  | ArrowTable
  | ArrayRowTable
  | ObjectRowTable
  | GeoJSONTable
  | ColumnarTable
  | ArrowTable
  | Table;

interface DataState {
  data: SupportedDataType | undefined;
  dataName: string | null;
  schema: Schema | null;
  blob: Blob | null;

  load: (file: File) => void;
}

const useDataStore = create<DataState>(set => ({
  data: undefined,
  dataName: null,
  schema: null,
  blob: null,

  load: async file => {
    const data = (await load(file, [
      JSONLoader,
      CSVLoader,
      ParquetLoader,
      ArrowLoader,
    ])) as SupportedDataType;

    if (!data) {
      throw new Error("Unsupported file type");
    }

    set({ data: data, dataName: file.name, schema: data.schema, blob: file });
  },
}));

export default useDataStore;
