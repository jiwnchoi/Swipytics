import { useSessionsStore } from "@stores";
import Fuse from "fuse.js";
import { useMemo } from "react";

const fuseOptions = {
  includeScore: false,
  threshold: 0.3, // 0 : strict matching, 1 : loose matching
};

const getFuse = (fieldNames: string[]) => new Fuse(fieldNames, fuseOptions);

export default function useFieldNameMatches(query: string) {
  const fields = useSessionsStore((state) => state.fields);
  const fieldNames = useMemo(() => fields.map((field) => field.name), [fields]);
  const fuse = getFuse(fieldNames);

  return fuse.search(query);
}
