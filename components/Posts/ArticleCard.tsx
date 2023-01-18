import {
  createStyles,
  Card,
  Image,
  ActionIcon,
  Group,
  Text,
  Avatar,
  Badge,
} from "@mantine/core";
import { IconHeart, IconBookmark, IconShare } from "@tabler/icons";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    ":hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      transform: "translateY(-2px) scale(1.01)",
      transition: "all 0.2s ease-in-out",
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    cursor: "pointer",
    ":hover": {
      textDecoration: "underline",
    },
    transition: "all 0.2 ease-in-out",
  },

  footer: {
    padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
    marginTop: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));

interface ArticleCardVerticalProps {
  id: number;
  image: string;
  thread: {
    topic: string;
  };
  title: string;
  author: {
    name: string;
    image: string;
  };
  updatedAt: string;
}

export function ArticleCardVertical({
  id,
  image,
  thread,
  title,
  author,
  updatedAt,
}: ArticleCardVerticalProps) {
  const { classes, theme } = useStyles();
  const router = useRouter();
  const gotoPost = (id: number) => router.push(`/posts/${id}`);
  return (
    <Card withBorder p="lg" radius="md" className={classes.card}>
      <Card.Section mb="sm" onClick={() => gotoPost(id)} className="cursor-pointer">
        <Image src={image} alt={title} height={180} />
      </Card.Section>

      <Badge>{thread.topic}</Badge>

      <Text
        size="lg"
        weight={700}
        className={classes.title}
        mt="xs"
        onClick={() => gotoPost(id)}
      >
        {title}
      </Text>

      <Group mt="lg">
        <Avatar src={author.image} radius="sm" />
        <div>
          <Text weight={500}>{author.name}</Text>
          <Text size="xs" color="dimmed">
          {new Date(updatedAt).toDateString()}
          </Text>
        </div>
      </Group>

      <Card.Section className={classes.footer}>
        <Group position="apart">
          {/* <Text size="xs" color="dimmed">
            {footer}
          </Text> */}
          <Group spacing={0}>
            <ActionIcon>
              <IconHeart size={18} color={theme.colors.red[6]} stroke={1.5} />
            </ActionIcon>
            <ActionIcon>
              <IconBookmark
                size={18}
                color={theme.colors.yellow[6]}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon>
              <IconShare size={16} color={theme.colors.blue[6]} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
}
