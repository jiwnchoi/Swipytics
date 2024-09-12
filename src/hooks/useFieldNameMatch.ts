import Fuse from "fuse.js";
import { useSessionsStore } from "../stores";

const fuseOptions = {
  includeScore: false,
  threshold: 0.3, // 0 : strict matching, 1 : loose matching
};

const getFuse = (fieldNames: string[]) => new Fuse(fieldNames, fuseOptions);

export default function useFieldNameMatches(query: string) {
  const fieldNames = useSessionsStore((state) => state.fields.map((field) => field.name));
  const fuse = getFuse(fieldNames);

  return fuse.search(query);
}
