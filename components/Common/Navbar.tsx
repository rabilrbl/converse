import { useState } from "react";
import {
  createStyles,
  Navbar,
  Group,
  Center,
  useMantineColorScheme,
  SegmentedControl,
  Box,
  Code,
  Divider,
} from "@mantine/core";
import {
  IconLogout,
  IconSun,
  IconMoon,
  IconCalendarEvent,
  IconAlertCircle,
  IconFloatLeft,
  IconMessage,
  IconAffiliate,
  IconLogin,
} from "@tabler/icons";
// import { MantineLogo } from "@mantine/ds";
import { useRouter } from "next/router";
import ProfileCard from "../Users/ProfileCard";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.variant({
          variant: "light",
          color: theme.primaryColor,
        }).background,
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
        [`& .${icon}`]: {
          color: theme.fn.variant({
            variant: "light",
            color: theme.primaryColor,
          }).color,
        },
      },
    },
  };
});

const data = [
  { link: "/posts", label: "Posts", icon: IconFloatLeft },
  { link: "/chat", label: "Chat", icon: IconMessage },
  { link: "/calendar", label: "Calendar", icon: IconCalendarEvent },
  { link: "/clubs", label: "Communities", icon: IconAffiliate },
  { link: "/about", label: "About", icon: IconAlertCircle },
];

export function VerticalNavbar() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const Icon = colorScheme === "dark" ? IconSun : IconMoon;
  const router = useRouter();
  const { classes, cx } = useStyles();
  const [active, setActive] = useState(
    (router.pathname !== "/" &&
      data.find((item) => item.link.includes(router.pathname.split("/")[1]))
        ?.label) ||
      ""
  );

  const { data: session, status: loginStatus } = useSession();

  const links = data.map((item) => (
    <Link
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <Navbar
      height="100vh"
      width={{ sm: 300 }}
      p="md"
      className={router.pathname === "/login" ? "hidden" : "hidden md:block"}
    >
      <Navbar.Section grow className="py-2">
        <Group className={classes.header} position="apart">
          {/* <MantineLogo size={28} /> */}
          <Link href="/" onClick={() => setActive("")}>
            <h1 className="font-extrabold text-sky-500">Converse</h1>
          </Link>
        </Group>
        {links}
      </Navbar.Section>

      <Divider className="pb-4" />
      <SegmentedControl
        className="w-full"
        value={colorScheme}
        onChange={(value: "light" | "dark") => toggleColorScheme(value)}
        data={[
          {
            value: "light",
            label: (
              <Center>
                <IconSun size={16} stroke={1.5} />
                <Box ml={10}>Light</Box>
              </Center>
            ),
          },
          {
            value: "dark",
            label: (
              <Center>
                <IconMoon size={16} stroke={1.5} />
                <Box ml={10}>Dark</Box>
              </Center>
            ),
          },
        ]}
      />

      <Navbar.Section className={classes.footer}>
        {loginStatus === "authenticated" ? (
          <>
            <a
              href="#"
              className=""
              onClick={(event) => event.preventDefault()}
            >
              <ProfileCard
                name={session.user.name}
                email={session.user.email}
                image={session.user.image}
              />
            </a>
            <a
              href="#logout"
              className={classes.link}
              onClick={(event) => {
                event.preventDefault();
                signOut();
              }}
            >
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Logout</span>
            </a>
          </>
        ) : (
          <a className={classes.link+" cursor-pointer"} onClick={() => signIn("google")}>
            <IconLogin className={classes.linkIcon} stroke={1.5} />
            <span>Login</span>
          </a>
        )}
      </Navbar.Section>
    </Navbar>
  );
}
