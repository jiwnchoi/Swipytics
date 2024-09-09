import type TFieldType from "./TFieldType";

type TMetadataBase = {
  type: TFieldType;
  count: number;
  unique: number;
  missing: number;
};

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
};

type TMetadata = TMetadataBase | TMetadataNumeric | TMetadataCategorical | TMetadataDatetime;

export default TMetadata;
