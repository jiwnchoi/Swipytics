import { Icon, Tag, TagLabel, type TagProps } from "@chakra-ui/react";
import { PRIMARY_COLOR } from "@shared/constants";
import type { TField } from "@shared/models";
import { CancelCircleIcon, CheckmarkCircle01Icon } from "hugeicons-react";

interface FieldTagProps extends TagProps {
  selected: boolean;
  field: TField;
}

export default function FieldTag({ selected, field, ...props }: FieldTagProps) {
  const { name } = field;
  return (
    <Tag gap={2} p={2} borderRadius="full" colorScheme={PRIMARY_COLOR} {...props}>
      <Icon as={selected ? CancelCircleIcon : CheckmarkCircle01Icon} boxSize={5} />
      <TagLabel fontSize={props.size}>{name}</TagLabel>
    </Tag>
  );
}
