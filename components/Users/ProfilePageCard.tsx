import { createStyles, Avatar, Text, Group, Flex, Title } from "@mantine/core";
import { IconMail } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

interface UserInfoIconsProps {
  image: string;
  name: string;
  branchName: string;
  email: string;
}

export default function UserInfoIcons({
  image,
  name,
  branchName,
  email,
}: UserInfoIconsProps) {
  const { classes } = useStyles();
  return (
    <div>
      <Flex direction="column" align="center" justify="center" gap={8}>
        <Avatar src={image} size={94} radius="md" />
        <div>
          <Text
            size="xs"
            sx={{ textTransform: "uppercase" }}
            weight={700}
            color="dimmed"
          >
            {branchName}
          </Text>

          <Title order={1} weight={500} className={classes.name}>
            {name}
          </Title>

          <Flex align="center" justify="center" gap="10" mt={3}>
            <IconMail stroke={1.5} className={classes.icon} />
            &nbsp;
            <Text size="lg">
              {email}
            </Text>
          </Flex>
        </div>
      </Flex>
      <Group>
        
      </Group>
    </div>
  );
}
