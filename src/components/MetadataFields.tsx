import { Box, Flex, Grid, type StackProps, TabPanel, Text, VStack } from "@chakra-ui/react";
import { format } from "d3-format";
import { Calendar03Icon, GridIcon, StarIcon, Tag01Icon } from "hugeicons-react";
import type TDataField from "../shared/models/TDataField";
import type TFieldType from "../shared/models/TFieldType";
import type TMetadata from "../shared/models/TMetadata";
import { useSessionsStore } from "../stores";

const FieldIcon = ({ metadataType }: { metadataType: TFieldType }) => {
  switch (metadataType) {
    case "numeric":
      return <GridIcon size="16px" />;
    case "categorical":
      return <StarIcon size="16px" />;
    case "datetime":
      return <Calendar03Icon size="16px" />;
    case "name":
      return <Tag01Icon size="16px" />;
    default:
      return null;
  }
};

function EachMetaData({ metadata }: { metadata: TMetadata }) {
  switch (metadata.type) {
    case "datetime":
      return (
        <Grid gridTemplateColumns="1fr 4fr">
          <Text>min</Text>
          <Text>{metadata.min}</Text>
          <Text>max</Text>
          <Text>{metadata.max}</Text>
        </Grid>
      );
    case "numeric":
      return (
        <Grid gridTemplateColumns="2fr 3fr 2fr 3fr">
          <Text>min</Text>
          <Text>{format("~s")(metadata.min)}</Text>
          <Text>max</Text>
          <Text>{format("~s")(metadata.max)}</Text>
          <Text>mean</Text>
          <Text>{format("~s")(metadata.mean)}</Text>
          <Text>median</Text>
          <Text>{format("~s")(metadata.median)}</Text>
          <Text>std</Text>
          <Text>{format("~s")(metadata.std)}</Text>
        </Grid>
      );
    case "categorical":
      return (
        <Grid gridTemplateColumns="1fr 4fr">
          <Text>top</Text>
          <Text>{metadata.top}</Text>
          <Text>freq</Text>
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
    <Box w="100%">
      <Flex alignItems="center" gap="8px" bgColor="gray.100" p="2px" borderRadius="2px">
        <FieldIcon metadataType={field.type} /> <Text>{field.name}</Text>
        <Text> (total: {field.metadata.count})</Text>
      </Flex>
      <Grid gridTemplateColumns="2fr 3fr 2fr 3fr">
        <Text>unique</Text>
        <Text>{field.metadata.unique}</Text>
        <Text>missing</Text>
        <Text>{field.metadata.missing}</Text>
      </Grid>
      <EachMetaData metadata={field.metadata} />
    </Box>
  );
}

function MetadataFields(props: StackProps) {
  const fields = useSessionsStore((state) => state.fields);

  return (
    <TabPanel as={VStack} {...props}>
      {fields.length === 0 && <Text>Load data</Text>}
      {fields.map((field) => (
        <EachField key={field.name} field={field} />
      ))}
    </TabPanel>
  );
}

export default MetadataFields;
