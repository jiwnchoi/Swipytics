import { JSONLoader, fetchFile, parse } from "@loaders.gl/core";
import { CSVLoader } from "@loaders.gl/csv";
import type { Schema } from "@loaders.gl/schema";
import type { TSupportedDataType } from "@shared/models";
import { getFileNameFromURL } from "@shared/utils";
import { create } from "zustand";

interface DataState {
  filename: string | null;
  fileBuffer: Uint8Array | null;
  data: TSupportedDataType | undefined;
  schema: Schema | null;

  loadData: (file: File | string) => Promise<void>;
  loading: boolean;
}

const loaderMap = {
  json: JSONLoader,
  csv: CSVLoader,
};

const useDataStore = create<DataState>(set => ({
  filename: null,
  fileBuffer: null,

  data: undefined,
  schema: null,
  loading: false,

  loadData: async (file: File | string) => {
    set({ loading: true, filename: null, fileBuffer: null, data: undefined, schema: null });

    try {
      const filename = file instanceof File ? file.name : getFileNameFromURL(file);
      const fileExtension = filename.split(".").pop();

      // Fetching Files
      const fetchedFile = await fetchFile(file);
      const buffer = await fetchedFile.arrayBuffer();
      const fileBuffer = new Uint8Array(buffer);

      // Parse the file
      const data = (await parse(buffer, loaderMap[fileExtension as keyof typeof loaderMap], {
        worker: true,
        fetch: { mode: "no-cors" },
      })) as TSupportedDataType;

      set({
        filename,
        fileBuffer,
        data,
        schema: data.schema,
        loading: false,
      });
    } catch (error) {
      // biome-ignore lint/nursery/noConsole: <explanation>
      console.error(error);
    } finally {
      set({
        loading: false,
      });
    }
  },
}));

export default useDataStore;
