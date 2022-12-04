import { useState } from "react";
import {
  createStyles,
  Navbar,
  Group,
  Code,
  UnstyledButton,
  Center,
  useMantineColorScheme,
  Text,
  SegmentedControl,
  Box,
  Divider,
} from "@mantine/core";
import {
  IconWiper,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
  IconSun,
  IconMoon,
  IconPeace,
  IconCalendar,
  IconCalendarEvent,
  IconHomeExclamation,
  IconExchange,
  IconExclamationMark,
  IconAlertTriangle,
  IconAlertCircle,
  IconPhotoStar,
  IconCode,
  IconActivity,
  IconBrandHipchat,
  IconFloatLeft,
  IconMessage,
  IconMessage2,
} from "@tabler/icons";
import { MantineLogo } from "@mantine/ds";
import { useRouter } from "next/router";
import { upperFirst } from "@mantine/hooks";

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
  { link: "", label: "Global Chat", icon: IconMessage },
  { link: "", label: "Calendar", icon: IconCalendarEvent },
  { link: "", label: "Posts", icon: IconFloatLeft },
  { link: "", label: "Security", icon: IconFingerprint },
  { link: "", label: "Databases", icon: IconDatabaseImport },
  { link: "", label: "Authentication", icon: Icon2fa },
  { link: "", label: "About", icon: IconAlertCircle },
];

export function VerticalNavbar() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const Icon = colorScheme === "dark" ? IconSun : IconMoon;
  const router = useRouter();
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Billing");

  const links = data.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <Navbar
      height={700}
      width={{ sm: 300 }}
      p="md"
      className={router.pathname === "/login" ? "hidden" : ""}
    >
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          {/* <MantineLogo size={28} /> */}
          <h1 className="font-extrabold text-sky-500">Converse</h1>
          {/* <Code sx={{ fontWeight: 700 }}>v3.1.2</Code> */}
        </Group>
        {links}
      </Navbar.Section>

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
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
}
