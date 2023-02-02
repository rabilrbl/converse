import Meta from "../components/Common/Meta";
import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  content: {
    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,
    borderRadius: theme.radius.sm,
    padding: "4px 12px",
  },
}));

export default function Home() {
  const { classes } = useStyles();
  return (
    <div className="">
      <Meta
        title="Converse"
        description="Converse is an app built with Next.js and Mantine."
      />
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              <span className={classes.highlight}>Converse</span> for SJEC <br />
            </Title>
            <Text color="dimmed" mt="md" size="xl">
              Converse is an SJEC student forum to communicate with your peers.
              Chat with your peers, post your thoughts and ideas, and more.
              Explore various communities and find your niche. Calender events on campus and holidays.
            </Text>
            <List
              mt={30}
              spacing="sm"
              size="lg"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <IconCheck size={12} stroke={1.5} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>Global Chat</b> – chat with your peers from SJEC
              </List.Item>
              <List.Item>
                <b>Posts</b> – post your thoughts and ideas
              </List.Item>
              <List.Item>
                <b>Free Open Source Software</b> – Converse is open source and free to use. You can contribute to the project on GitHub.
              </List.Item>
            </List>
            <Group mt={30}>
              <Link href="/posts">
                <Button variant="outline" radius="xl" size="xl" className={classes.control}>
                  Explore
                </Button>
              </Link>
              <Button
                variant="default"
                radius="xl"
                size="xl"
                className={classes.control}
                component="a"
                href="https://github.com/rabilrbl/converse"
              >
                Contribute
              </Button>
            </Group>
          </div>
          <Image src="peer.png" alt="Peers chatting" className={classes.image} />
        </div>
      </Container>
    </div>
  );
}
