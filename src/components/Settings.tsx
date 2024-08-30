import {
  Button,
  Flex,
  Icon,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  type StackProps,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useSettings } from "@hooks";
import type { TDemo } from "@shared/models";
import { ArrowDown01Icon, StartUp02Icon } from "hugeicons-react";

function Settings(props: StackProps) {
  const {
    loadDemo,
    loadingDemo,
    selectedDemo,
    apiKey,
    handleApiKeyChange,
    handleDownloadLogs,
    handleDemoSelect,
  } = useSettings();
  return (
    <VStack {...props}>
      <Text>Load Demo</Text>
      <Flex w="full">
        <Menu>
          <MenuButton
            w="full"
            as={Button}
            variant={"outline"}
            borderRightRadius={0}
            rightIcon={<Icon as={ArrowDown01Icon} />}>
            {selectedDemo ? DEMO_LIST.find(demo => demo === selectedDemo)?.name : "Select Demo"}
          </MenuButton>
          <MenuList>
            {DEMO_LIST.map(demo => (
              <MenuItem key={demo.name} onClick={() => handleDemoSelect(demo)}>
                {demo.name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <IconButton
          borderLeftRadius={0}
          colorScheme="blue"
          type="submit"
          isLoading={loadingDemo}
          icon={<Icon as={StartUp02Icon} />}
          aria-label="Load Data"
          onClick={loadDemo}
        />
      </Flex>

      <Text>OpenAI API Key</Text>
      <Input minW="full" placeholder="sk-..." value={apiKey} onChange={handleApiKeyChange} />
      <Text>System Logs</Text>
      <Button w="full" variant="outline" onClick={handleDownloadLogs}>
        Load Latest Sessions
      </Button>
      <Button w="full" variant="outline" onClick={handleDownloadLogs}>
        Download Logs
      </Button>
    </VStack>
  );
}

export default Settings;

const DEMO_LIST: TDemo[] = [
  { name: "Barley", href: "https://cdn.jsdelivr.net/npm/vega-datasets@2/data/barley.json" },
  { name: "Cars", href: "https://cdn.jsdelivr.net/npm/vega-datasets@2/data/cars.json" },
  { name: "Crimea", href: "https://cdn.jsdelivr.net/npm/vega-datasets@2/data/crimea.json" },
  { name: "Jobs", href: "https://cdn.jsdelivr.net/npm/vega-datasets@2/data/jobs.json" },
  { name: "Population", href: "https://cdn.jsdelivr.net/npm/vega-datasets@2/data/population.json" },
  { name: "Movies", href: "https://cdn.jsdelivr.net/npm/vega-datasets@2/data/movies.json" },
  {
    name: "Birdstrikes",
    href: "https://cdn.jsdelivr.net/npm/vega-datasets@2/data/birdstrikes.csv",
  },
  { name: "Burtin", href: "https://cdn.jsdelivr.net/npm/vega-datasets@2/data/burtin.json" },
];
