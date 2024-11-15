import { Tag, TagLabel, type TagProps } from "@chakra-ui/react";
import { PRIMARY_COLOR } from "@shared/constants";
import type { TDataField } from "@shared/models";
import FieldIcon from "./FieldIcon";

export default function FieldTag({ field, ...props }: { field: TDataField } & TagProps) {
  const { name, type } = field;
  return (
    <Tag gap={2} borderRadius="full" colorScheme={PRIMARY_COLOR} {...props}>
      <FieldIcon fieldType={type} />
      <TagLabel>{name}</TagLabel>
    </Tag>
  );
}
