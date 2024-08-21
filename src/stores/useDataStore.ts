import { ArrowLoader, type ArrowTable } from "@loaders.gl/arrow";
import { JSONLoader, type Loader, load, registerLoaders } from "@loaders.gl/core";
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
import { getFileNameFromURL } from "@shared/utils";
import { create } from "zustand";

registerLoaders([JSONLoader, CSVLoader, ParquetLoader, ArrowLoader]);

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

  load: (file: File | string) => void;
  loading: boolean;
}

const getLoaderByFileExtension = (url: string | File): Loader | undefined => {
  if (url instanceof File) {
    return undefined;
  }
  const extension = url.split(".").pop();
  switch (extension) {
    case "json":
      return JSONLoader;
    case "csv":
      return CSVLoader;
    case "parquet":
      return ParquetLoader;
    default:
      return JSONLoader;
  }
};

const useDataStore = create<DataState>(set => ({
  data: undefined,
  dataName: null,
  schema: null,
  blob: null,
  loading: false,

  load: async (file: File | string) => {
    set({ loading: true });
    load(file, {
      worker: true,
      fetch: { mode: "no-cors" },
      arrow: {
        shape: "columnar-table",
      },
      json: {
        header: "auto",
        shape: "object-row-table",
      },
      csv: {
        header: "auto",
        shape: "object-row-table",
      },
    })
      .then(data => {
        const loadedData = data as SupportedDataType;
        console.log(loadedData);
        set({
          data: loadedData,
          dataName: file instanceof File ? file.name : getFileNameFromURL(file),
          schema: loadedData.schema,
          blob: file instanceof File ? file : null,
          loading: false,
        });
      })
      .catch(e => {
        throw e;
      });
  },
}));

export default useDataStore;
