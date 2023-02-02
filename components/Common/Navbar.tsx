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
  Flex,
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
import logo from "../../public/logo.svg";
import Image from "next/image";
import converseText from "../../public/CONVERSE.png";

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
        <Link href="/" onClick={() => setActive("")}>
          <Flex
            className={classes.header}
            direction="column"
            justify="center"
            align="center"
          >
            <Image alt="Converse logo" src={logo} className="h-64 w-auto -mt-20" />
            <h1 className="font-extrabold -mt-16 bg-gradient-to-br from-red-500 to-sky-500 bg-clip-text text-transparent text-5xl font-sans">
              Converse</h1>
          </Flex>
        </Link>
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
            <Link href="/profile" className="">
              <ProfileCard
                name={session.user.name}
                email={session.user.email}
                image={session.user.image}
              />
            </Link>
            <Link
              href="#logout"
              className={classes.link}
              onClick={(event) => {
                event.preventDefault();
                signOut();
              }}
            >
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Logout</span>
            </Link>
          </>
        ) : (
          <a
            className={classes.link + " cursor-pointer"}
            onClick={() => signIn()}
          >
            <IconLogin className={classes.linkIcon} stroke={1.5} />
            <span>Login</span>
          </a>
        )}
      </Navbar.Section>
    </Navbar>
  );
}
