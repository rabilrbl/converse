import { Avatar, Text, Button, Paper } from '@mantine/core';

interface UserInfoActionProps {
  logo: string;
  name: string;
//   email: string;
  about: string;
}

export function CommCard({ logo, name, about }: UserInfoActionProps) {
  return (
    <Paper
      radius="md"
      withBorder
      p="lg"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
      })}
    >
      <Avatar src={logo} size={120} radius={120} mx="auto" />
      <Text align="center" size="lg" weight={500} mt="md">
        {name}
      </Text>
      <Text align="center" color="dimmed" size="sm">
        {about}
      </Text>

      <Button variant="default" fullWidth mt="md">
        Learn More
      </Button>
    </Paper>
  );
}