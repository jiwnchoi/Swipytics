import { router } from "@api";
import { JSONLoader, fetchFile, parse } from "@loaders.gl/core";
import { CSVLoader } from "@loaders.gl/csv";
import { logger } from "@logger";
import type { TSupportedDataType } from "@shared/models";
import { getDifferences, getFileNameFromURL } from "@shared/utils";
import { isEqual, pick } from "es-toolkit";
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

function pickDataStore(state: Partial<DataState>) {
  return pick(state, ["filename"]);
}

useDataStore.subscribe((state, prevState) => {
  const pickedState = pickDataStore(state);
  const pickedPrevState = pickDataStore(prevState);

  if (isEqual(pickedState, pickedPrevState)) return;
  logger.log("data-store", "state", getDifferences(pickedState, pickedPrevState));
});

export default useDataStore;
