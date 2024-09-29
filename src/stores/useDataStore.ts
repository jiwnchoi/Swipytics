import { router } from "@api";
import { JSONLoader, fetchFile, parse } from "@loaders.gl/core";
import { CSVLoader } from "@loaders.gl/csv";
import { logger } from "@logger";
import type { TSupportedDataType } from "@shared/models";
import { getFileNameFromURL } from "@shared/utils";
import { isEqual, pickBy } from "es-toolkit";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface DataState {
  filename: string | null;
  fileCache: File | string | null;
  data: TSupportedDataType | undefined;

  writeFile: (file: File | string) => Promise<void>;
  writingFile: boolean;
}

const loaderMap = {
  json: JSONLoader,
  csv: CSVLoader,
};

const useDataStore = create(
  devtools<DataState>(
    (set) => ({
      filename: null,
      fileCache: null,
      data: undefined,
      writingFile: false,

      writeFile: async (file: File | string) => {
        set({
          writingFile: true,
          filename: null,
          fileCache: null,
          data: undefined,
        });

        try {
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
            fileCache: file,
            data,
            writingFile: false,
          });
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e);
        } finally {
          set({ writingFile: false });
        }
      },
    }),
    {
      name: "DataStore",
      anonymousActionType: "DataStore Action",
      enabled: import.meta.env.MODE === "development",
    },
  ),
);

useDataStore.subscribe((state, prevState) => {
  if (!isEqual(state, prevState)) return;
  logger.log(
    "Data Store",
    "state",
    pickBy(state, (value) => typeof value !== "function"),
  );
});

export default useDataStore;
