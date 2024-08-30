import { Flex } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { Drawer } from "vaul";

interface ControlPanelProps {
  mobile: boolean;
  children: ReactNode;
}

export default function ControlPanel({ mobile, children }: ControlPanelProps) {
  return (
    <>
      {!mobile && <> {children} </>}
      <Drawer.Root open={mobile} modal={false} closeThreshold={0.5}>
        <Drawer.Portal>
          <Drawer.Content
            onOpenAutoFocus={e => e.preventDefault()}
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              width: "100%",
              maxHeight: "90vh",
            }}>
            <Drawer.Title />
            <Drawer.Description />

            <Flex
              w="full"
              h="full"
              flexDir={"column"}
              rounded={"2xl"}
              boxShadow={
                " 0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)"
              }>
              <Flex
                className="handle"
                h="4px"
                w="40px"
                bg="gray.300"
                mx="auto"
                my={2}
                borderRadius="full"
              />
              {children}
            </Flex>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}
