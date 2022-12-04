import {
  ActionIcon,
  Button,
  Group,
  Switch,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import Meta from "../components/Common/Meta";
import { IconSun, IconMoonStars } from "@tabler/icons";

export default function Home() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  return (
    <div className="">
      <Meta
        title="Converse"
        description="Converse is a chat app built with Next.js and Mantine."
      />

      <main>
        <Group position="center" my={30}>
          <Switch
            checked={colorScheme === "dark"}
            onChange={() => toggleColorScheme()}
            size="lg"
            onLabel={<IconSun color={theme.white} size={20} stroke={1.5} />}
            offLabel={
              <IconMoonStars
                color={theme.colors.gray[6]}
                size={20}
                stroke={1.5}
              />
            }
          />
        </Group>
      </main>

      <footer className="p-4">
        <Button className="" variant="outline">
          Footer
        </Button>
      </footer>
    </div>
  );
}
