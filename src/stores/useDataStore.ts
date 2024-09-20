import { JSONLoader, fetchFile, parse } from "@loaders.gl/core";
import { CSVLoader } from "@loaders.gl/csv";
import type { Schema } from "@loaders.gl/schema";
import { router } from "@router";
import type { TSupportedDataType } from "@shared/models";
import { getFileNameFromURL } from "@shared/utils";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface DataState {
  filename: string | null;
  fileBuffer: Uint8Array | null;
  data: TSupportedDataType | undefined;
  schema: Schema | null;

  writeFile: (file: File | string) => Promise<string>;
  writingFile: boolean;
}

const loaderMap = {
  json: JSONLoader,
  csv: CSVLoader,
};

const useDataStore = create(
  devtools<DataState>((set) => ({
    filename: null,
    fileBuffer: null,
    data: undefined,
    schema: null,
    writingFile: false,

    writeFile: async (file: File | string) => {
      set({
        writingFile: true,
        filename: null,
        fileBuffer: null,
        data: undefined,
        schema: null,
      });

      const filename = file instanceof File ? file.name : getFileNameFromURL(file);
      const fileExtension = filename.split(".").pop();

      // Fetching file
      const fetchedFile = await fetchFile(file);
      const buffer = await fetchedFile.arrayBuffer();
      const fileBuffer = new Uint8Array(buffer);

      // Parsing file
      const data = (await parse(buffer, loaderMap[fileExtension as keyof typeof loaderMap], {
        worker: true,
        fetch: { mode: "no-cors" },
      })) as TSupportedDataType;

      // Writing File
      await router.lazyCall("writeFile", { filename, fileBuffer });

      set({
        filename,
        fileBuffer,
        data,
        schema: data.schema,
        writingFile: false,
      });

      return filename;
    },
  })),
);

export default useDataStore;
