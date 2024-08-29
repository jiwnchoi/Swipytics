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

  load: (file: File | string) => Promise<[string | null, Uint8Array | null]>;
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

  load: async (file: File | string) => {
    set({ loading: true });

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

      // biome-ignore lint/nursery/noConsole: <explanation>
      console.log(data);
      set({
        filename,
        fileBuffer,
        data,
        schema: data.schema,
        loading: false,
      });
      return [filename, fileBuffer];
    } catch (error) {
      // biome-ignore lint/nursery/noConsole: <explanation>
      console.error(error);
    } finally {
      set({
        loading: false,
      });
    }
    return [null, null];
  },
}));

export default useDataStore;
