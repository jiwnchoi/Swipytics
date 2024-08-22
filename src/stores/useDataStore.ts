import { JSONLoader, fetchFile, parse } from "@loaders.gl/core";
import { CSVLoader } from "@loaders.gl/csv";
import type { Schema } from "@loaders.gl/schema";
import type { TSupportedDataType } from "@shared/models";
import { getFileNameFromURL } from "@shared/utils";
import { getPyodide } from "@workers";
import { create } from "zustand";

interface DataState {
  file: string | File | null;
  data: TSupportedDataType | undefined;
  dataName: string | null;
  schema: Schema | null;
  byte: Uint8Array | null;

  load: (file: File | string) => void;
  loading: boolean;
}

const loaderMap = {
  json: JSONLoader,
  csv: CSVLoader,
};

const useDataStore = create<DataState>(set => ({
  file: null,
  data: undefined,
  dataName: null,
  schema: null,
  byte: null,
  loading: false,

  load: async (file: File | string) => {
    set({ loading: true });
    const fileName = file instanceof File ? file.name : getFileNameFromURL(file);
    const fileExtension = fileName.split(".").pop();

    try {
      // Fetching Files
      const fetchedFile = await fetchFile(file);
      const buffer = await fetchedFile.arrayBuffer();
      const uint8Array = new Uint8Array(buffer);
      const pyodide = getPyodide();
      // Save buffer to pyodide
      if (!pyodide) {
        throw new Error("Pyodide not loaded");
      }
      pyodide.FS.writeFile(`/${fileName}`, uint8Array, { encoding: "binary" });
      pyodide.runPython(`loadData("/${fileName}")`);

      // Parse the file
      const data = await parse(buffer, loaderMap[fileExtension as keyof typeof loaderMap], {
        worker: true,
        fetch: { mode: "no-cors" },
      });

      const loadedData = data as TSupportedDataType;
      // biome-ignore lint/nursery/noConsole: <explanation>
      console.log(loadedData);
      set({
        data: loadedData,
        dataName: fileName,
        schema: loadedData.schema,
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
      });
      throw error;
    }
  },
}));

export default useDataStore;
