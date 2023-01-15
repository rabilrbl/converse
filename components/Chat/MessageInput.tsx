import {
  TextInput,
  TextInputProps,
  ActionIcon,
  useMantineTheme,
} from "@mantine/core";
import { IconArrowRight, IconArrowLeft, IconMessage } from "@tabler/icons";

export function MessageInput(props: TextInputProps) {
  const theme = useMantineTheme();

  return (
    <TextInput
      icon={<IconMessage size={18} stroke={1.5} />}
      autoComplete="off"
      radius="xl"
      size="lg"
      rightSection={
        <ActionIcon
          component="button"
          type="submit"
          size={40}
          mr={12}
          radius="xl"
          color={theme.primaryColor}
          variant="outline"
        >
          {theme.dir === "ltr" ? (
            <IconArrowRight size={18} stroke={1.5} />
          ) : (
            <IconArrowLeft size={18} stroke={1.5} />
          )}
        </ActionIcon>
      }
      placeholder="Send message"
      rightSectionWidth={42}
      {...props}
    />
  );
}
