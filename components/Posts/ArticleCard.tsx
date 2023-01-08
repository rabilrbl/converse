import { createStyles, Card, Image, Avatar, Text, Group } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
  },
}));

interface ArticleCardVerticalProps {
  image: string;
  thread: {
    topic: string;
  };
  title: string;
  date: string;
  author: {
    name: string;
    image: string;
  };
}

export function ArticleCardVertical({
  image,
  thread,
  title,
  date,
  author,
}: ArticleCardVerticalProps) {
  const { classes } = useStyles();
  return (
    <Card withBorder radius="md" p={0} className={classes.card}>
      <Group noWrap spacing={0}>
        <Image alt="An article image" src={image} height={140} width={140} />
        <div className={classes.body}>
          <Text transform="uppercase" color="dimmed" weight={700} size="xs">
            {thread.topic}
          </Text>
          <Text className={classes.title} mt="xs" mb="md">
            {title}
          </Text>
          <Group noWrap spacing="xs">
            <Group spacing="xs" noWrap>
              <Avatar size={20} src={author.image} />
              <Text size="xs">{author.name}</Text>
            </Group>
            <Text size="xs" color="dimmed">
              •
            </Text>
            <Text size="xs" color="dimmed">
              {date}
            </Text>
          </Group>
        </div>
      </Group>
    </Card>
  );
}