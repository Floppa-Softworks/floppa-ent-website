import React, { useEffect, useState } from 'react';
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  Button,
  MediaQuery,
  ActionIcon,
  Avatar,
  Menu,
  Text,
  Divider,
} from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { TwitterLogoIcon } from '@modulz/radix-icons';
import { NextLink } from '@mantine/next';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ChevronDown, ExternalLink, Logout, UserCheck } from 'tabler-icons-react';
import { ColorSchemeToggle } from '../../../ColorSchemeToggle/ColorSchemeToggle';
import { DiscordIcon } from '../../Icons/DiscordIcon';

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
    marginLeft: 100,
  },

  seperatedItems: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  themeToggle: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.md,
    fontWeight: 900,
    fontFamily: 'Greycliff CF',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  loginButtonBurger: {
    [theme.fn.smallerThan('sm')]: {
      textAlign: 'left',
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
    },
  },
}));

interface HeaderResponsiveProps {
  links: { link: string; label: string }[];
  children: any;
}

export function HeaderResponsive({ links, children }: HeaderResponsiveProps) {
  const [opened, toggleOpened] = useBooleanToggle(false);
  const [active, setActive] = useState<string>();

  const { classes, cx } = useStyles();
  const { status, data: session } = useSession();

  const router = useRouter();

  const signInWithDiscord = () => {
    if (status === 'authenticated') signOut();
    signIn('discord');
  };

  useEffect(() => {
    if (router.pathname !== '/') setActive(router.pathname);
    if (!links.find((link) => link.link === router.pathname)) setActive('');
  }, [router.pathname]);

  const items = links.map((link) => (
    <NextLink
      key={link.label}
      href={link.link}
      className={cx(classes.link, { [classes.linkActive]: active === link.link })}
      onClick={() => {
        if (link.link !== '/') setActive(link.link);
        toggleOpened(false);
      }}
    >
      {link.label}
    </NextLink>
  ));

  return (
    <>
      <Header height={HEADER_HEIGHT} mb={120} className={classes.root}>
        <Container className={classes.header}>
          <ActionIcon component={NextLink} href="/">
            <Avatar
              onClick={() => {
                setActive('');
                toggleOpened(false);
              }}
              radius="xl"
              src="/Avatar.jpeg"
            />
            <TwitterLogoIcon onClick={() => setActive('')} />
          </ActionIcon>
          <Group
            spacing={5}
            className={classes.links}
            sx={{ marginLeft: status === 'unauthenticated' ? 120 : 110 }}
          >
            {items}
          </Group>
          <Group spacing={12} align="flex-end">
            {status === 'authenticated' && (
              <Menu
                transition="pop"
                size={200}
                control={
                  <Button
                    variant="default"
                    className={classes.seperatedItems}
                    sx={(theme) => ({
                      fontFamily: 'Lexend',
                      height: 33.4,
                      backgroundColor:
                        theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                    })}
                    leftIcon={<ChevronDown width={20} height={20} />}
                  >
                    <Avatar size={25} radius="xl" src={session?.user.image} />
                  </Button>
                }
              >
                <Menu.Item>
                  <Group>
                    <div>
                      <Text weight={300} size="sm">
                        Welcome, {session?.user.name}!
                      </Text>
                    </div>
                  </Group>
                </Menu.Item>
                <Divider />

                <Menu.Item
                  component={NextLink}
                  href="/invite"
                  sx={(theme) => ({
                    color: theme.colors.blue[3],
                  })}
                  icon={<ExternalLink width={20} height={20} />}
                >
                  Invite
                </Menu.Item>
                <Menu.Item
                  sx={(theme) => ({
                    color: theme.colors.blue[3],
                  })}
                  icon={<UserCheck width={20} height={20} />}
                >
                  Sync data
                </Menu.Item>
                <Menu.Item
                  onClick={() => signOut()}
                  color="red"
                  icon={<Logout width={20} height={20} />}
                >
                  Logout
                </Menu.Item>
              </Menu>
            )}
            {status === 'unauthenticated' && (
              <Button
                className={classes.seperatedItems}
                sx={() => ({
                  height: 33,
                  fontFamily: 'Lexend',
                })}
                onClick={() => signInWithDiscord()}
                leftIcon={status === 'unauthenticated' ? <DiscordIcon /> : <DiscordIcon />}
              >
                Login
              </Button>
            )}

            <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
              <Group>
                <ColorSchemeToggle />
              </Group>
            </MediaQuery>
          </Group>
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Group>
              <ColorSchemeToggle />
              <Burger
                opened={opened}
                onClick={() => toggleOpened()}
                className={classes.burger}
                size="sm"
              />
            </Group>
          </MediaQuery>

          <Transition transition="pop-top-right" duration={200} mounted={opened}>
            {(styles) => (
              <Paper className={classes.dropdown} withBorder style={styles}>
                {items}
                <Button
                  leftIcon={<DiscordIcon />}
                  sx={{ display: 'block', borderRadius: 0 }}
                  fullWidth
                  styles={{
                    root: { paddingLeft: 12 },
                    inner: { justifyContent: 'start' },
                  }}
                  onClick={() => signInWithDiscord()}
                >
                  {status === 'authenticated' ? 'Logout' : 'Login'}
                </Button>
              </Paper>
            )}
          </Transition>
        </Container>
      </Header>
      {children}
    </>
  );
}
