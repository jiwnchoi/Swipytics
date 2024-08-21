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
import { getFileNameFromURL } from "@shared/utils";
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

  load: (file: File | string) => void;
  loading: boolean;
}

const useDataStore = create<DataState>(set => ({
  data: undefined,
  dataName: null,
  schema: null,
  blob: null,
  loading: false,

  load: async (file: File | string) => {
    set({ loading: true });
    load(file, [JSONLoader, CSVLoader, ParquetLoader, ArrowLoader], {
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
        // biome-ignore lint/nursery/noConsole: <explanation>
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
