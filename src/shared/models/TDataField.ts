import type TFieldType from "./TFieldType";
import type TMetadata from "./TMetadata";

interface TDataField {
  name: string;
  clingo_name: string;
  type: TFieldType;
  metadata: TMetadata;
}

export default TDataField;
