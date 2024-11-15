import { Icon, type IconProps } from "@chakra-ui/react";
import { type TFieldType } from "@shared/models";
import { Calendar03Icon, GridIcon, Tag01Icon, TextFontIcon } from "hugeicons-react";

const FieldIcon = ({ fieldType, ...props }: IconProps & { fieldType: TFieldType }) => {
  switch (fieldType) {
    case "numeric":
      return <Icon as={GridIcon} {...props} />;
    case "categorical":
      return <Icon as={TextFontIcon} {...props} />;
    case "datetime":
      return <Icon as={Calendar03Icon} {...props} />;
    case "name":
      return <Icon as={Tag01Icon} {...props} />;
    default:
      return null;
  }
};

export default FieldIcon;
