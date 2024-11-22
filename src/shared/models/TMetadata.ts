import type TFieldType from "./TFieldType";

interface TMetadataBase {
  type: TFieldType;
  count: number;
  unique: number;
  missing: number;
}

type TMetadataNumeric = TMetadataBase & {
  type: "numeric";
  min: number;
  max: number;
  mean: number;
  median: number;
  std: number;
};

type TMetadataCategorical = TMetadataBase & {
  type: "categorical";
  top: string;
  freq: number;
};

type TMetadataDatetime = TMetadataBase & {
  type: "datetime";
  min: string;
  max: string;

  yearUnique: number;
  monthUnique: number;
  dayUnique: number;
  hoursUnique: number;
};

type TMetadataName = TMetadataBase & {
  type: "name";
};

type TMetadata = TMetadataName | TMetadataNumeric | TMetadataCategorical | TMetadataDatetime;

export default TMetadata;
