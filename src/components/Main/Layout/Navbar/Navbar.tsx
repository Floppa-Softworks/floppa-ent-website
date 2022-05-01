import {
  Navbar,
  ActionIcon,
  Box,
  Group,
  useMantineColorScheme,
  ThemeIcon,
  UnstyledButton,
  Text,
} from '@mantine/core';
import { TwitterLogoIcon } from '@modulz/radix-icons';
import { Sun, MoonStars } from 'tabler-icons-react';

export default function MainNav() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Navbar height={600} p="xs" width={{ base: 300 }}>
      <Navbar.Section mt="xs">
        <Box
          sx={(theme) => ({
            paddingLeft: theme.spacing.xs,
            paddingRight: theme.spacing.xs,
            paddingBottom: theme.spacing.lg,
            borderBottom: `1px solid ${
              theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
            }`,
          })}
        >
          <Group position="apart">
            <TwitterLogoIcon />
            <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
              {colorScheme === 'dark' ? <Sun size={16} /> : <MoonStars size={16} />}
            </ActionIcon>
          </Group>
        </Box>
      </Navbar.Section>
      <Navbar.Section grow mt="md">
        <UnstyledButton
          sx={(theme) => ({
            display: 'block',
            width: '100%',
            padding: theme.spacing.xs,
            borderRadius: theme.radius.sm,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

            '&:hover': {
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            },
          })}
        >
          <Group>
            <ThemeIcon color="blue" variant="light">
              <TwitterLogoIcon />
            </ThemeIcon>

            <Text size="sm">Discord</Text>
          </Group>
        </UnstyledButton>
      </Navbar.Section>
    </Navbar>
  );
}
