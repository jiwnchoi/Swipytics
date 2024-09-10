import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Flex,
  Grid,
  Heading,
  Icon,
  type IconProps,
  Spacer,
  type StackProps,
  TabPanel,
  type TabPanelProps,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { TDataField, TFieldType, TMetadata } from "@shared/models";
import { scrollbarStyle } from "@shared/theme";
import { useSessionsStore } from "@stores";
import { format } from "d3-format";
import { Calendar03Icon, GridIcon, Tag01Icon, TextFontIcon } from "hugeicons-react";

const FieldIcon = ({ metadataType, ...props }: IconProps & { metadataType: TFieldType }) => {
  switch (metadataType) {
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

const formatter = format(".3~s");

// Badge 너무 구리다 디자인 수정하기
function MetadataKeyBadge({ children }: { children: string }) {
  return (
    <Flex flexDir={"column"} justify={"center"} alignItems={"start"} w="full" h="full">
      <Badge>{children}</Badge>
    </Flex>
  );
}

function EachMetaData({ metadata }: { metadata: TMetadata }) {
  switch (metadata.type) {
    case "datetime":
      return (
        <Grid gridTemplateColumns="1fr 4fr">
          <MetadataKeyBadge>min</MetadataKeyBadge>
          <Text>{metadata.min}</Text>
          <MetadataKeyBadge>max</MetadataKeyBadge>
          <Text>{metadata.max}</Text>
        </Grid>
      );
    case "numeric":
      return (
        <Grid gridTemplateColumns="2fr 3fr 2fr 3fr">
          <MetadataKeyBadge>min</MetadataKeyBadge>
          <Text>{formatter(metadata.min)}</Text>
          <MetadataKeyBadge>max</MetadataKeyBadge>
          <Text>{formatter(metadata.max)}</Text>
          <MetadataKeyBadge>mean</MetadataKeyBadge>
          <Text>{formatter(metadata.mean)}</Text>
          <MetadataKeyBadge>median</MetadataKeyBadge>
          <Text>{formatter(metadata.median)}</Text>
          <MetadataKeyBadge>std</MetadataKeyBadge>
          <Text>{formatter(metadata.std)}</Text>
        </Grid>
      );
    case "categorical":
      return (
        <Grid gridTemplateColumns="1fr 4fr">
          <MetadataKeyBadge>top</MetadataKeyBadge>
          <Text>{metadata.top}</Text>
          <MetadataKeyBadge>freq</MetadataKeyBadge>
          <Text>{metadata.freq}</Text>
        </Grid>
      );
    case "name":
    default:
      return null;
  }
}

function EachField({ field }: { field: TDataField }) {
  return (
    <AccordionItem>
      <AccordionButton borderRadius={"md"}>
        <Flex w="full" gap={2} align={"center"}>
          <FieldIcon metadataType={field.type} boxSize={4} />
          <Heading fontSize="md">{field.name}</Heading>
          <Spacer />
          <AccordionIcon />
        </Flex>
      </AccordionButton>
      <AccordionPanel px={2} pb={2}>
        <Grid gridTemplateColumns="2fr 3fr 2fr 3fr">
          <MetadataKeyBadge>unique</MetadataKeyBadge>
          <Text>{field.metadata.unique}</Text>
          <MetadataKeyBadge>missing</MetadataKeyBadge>
          <Text>{field.metadata.missing}</Text>
        </Grid>
        <EachMetaData metadata={field.metadata} />
      </AccordionPanel>
    </AccordionItem>
  );
}

function MetadataFields(props: TabPanelProps & StackProps) {
  const fields = useSessionsStore((state) => state.fields);

  return (
    <TabPanel as={VStack} h="full" {...props}>
      <Flex h="full" w="full" sx={scrollbarStyle} overflowY="auto" flexDir="column">
        <Accordion allowMultiple>
          {fields.map((field) => (
            <EachField key={field.name} field={field} />
          ))}
        </Accordion>
      </Flex>
    </TabPanel>
  );
}

export default MetadataFields;
