import { Button, type ButtonProps, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";

interface ResponsiveButtonProps extends ButtonProps {
  icon: React.ElementType;
  label: string;
}

function ResponsiveButton({ icon, label, ...props }: ResponsiveButtonProps) {
  const isMobile = useBreakpointValue({ base: true, md: true });

  return (
    <>
      {isMobile ? (
        <IconButton aria-label={`button-of-${label}`} icon={<Icon as={icon} />} {...props} />
      ) : (
        <Button aria-label={`button-of-${label}`} leftIcon={<Icon as={icon} />} {...props}>
          {label}
        </Button>
      )}
    </>
  );
}

export default ResponsiveButton;
