import type TFieldType from "./TFieldType";
import type TMetadata from "./TMetadata";

interface TField {
  name: string;
  clingo_name: string;
  type: TFieldType;
  metadata: TMetadata;
}

export default TField;
