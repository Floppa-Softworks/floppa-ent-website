import {
  createStyles,
  useMantineTheme,
  Center,
  Paper,
  Group,
  Avatar,
  Button,
  Text,
  Menu,
} from '@mantine/core';
import { NextLink } from '@mantine/next';
import { useNotifications } from '@mantine/notifications';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Server2, Music } from 'tabler-icons-react';
import { useColorModeValue } from '../../lib/hooks/useColorModeValue';
import { useSocket } from '../../lib/hooks/useSocket';

// @ts-ignore
export const AnimatedPaper = motion(Paper);

const useStyles = createStyles((theme) => ({
  root: {
    [theme.fn.smallerThan('sm')]: {
      width: '350px',
    },

    [theme.fn.largerThan('sm')]: {
      width: '650px',
    },
  },
  text: {
    [theme.fn.smallerThan('sm')]: {
      align: 'left',
      fontSize: theme.fontSizes.xs,
    },
    align: 'center',
    fontSize: theme.fontSizes.md,
  },
}));

const GuildSelectionMenu = ({ name, guildId }: { name: string; guildId: string }) => {
  const socket = useSocket();
  const notifications = useNotifications();
  const router = useRouter();

  useEffect(() => {
    socket.off('error').on('error', (message) => {
      console.log('error');
      notifications.showNotification({
        title: 'Whoops',
        color: 'red',
        message,
      });
    });
    socket.off('ok').once('ok', (guild) => router.push(`/dashboard/players/${guild}`));
  }, []);

  return (
    <Menu control={<Button sx={{ justifyContent: 'flex-end' }}>View</Button>}>
      <Menu.Label>Guild &quot;{name}&quot;</Menu.Label>
      <Menu.Item
        icon={<Music size={16} />}
        onClick={() => {
          socket.emit('requestQueue', guildId);
        }}
      >
        View Player
      </Menu.Item>
      <Menu.Item
        component={NextLink}
        href={`/dashboard/config/${guildId}`}
        icon={<Server2 size={16} />}
      >
        View Configuration
      </Menu.Item>
    </Menu>
  );
};

interface GuildCardProps {
  name: string;
  iconURL: string;
  id: string;
}

const GuildCard = ({ name, iconURL, id }: GuildCardProps) => {
  const theme = useMantineTheme();

  const { classes } = useStyles();

  return (
    <Center>
      <AnimatedPaper
        whileHover={{
          y: -5,
        }}
        transition={{ ease: 'easeOut', duration: 0.2 }}
        component={Paper}
        sx={{
          backgroundColor: useColorModeValue(theme.white, theme.colors.dark[8]),
        }}
        p="md"
        shadow="sm"
        className={classes.root}
      >
        <Group sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Group align="flex-start" sx={{ alignItems: 'center' }}>
            {iconURL !== '' ? (
              <Avatar radius="xl" src={`https://cdn.discordapp.com/icons/${id}/${iconURL}.png`} />
            ) : (
              <Avatar radius="xl" />
            )}
            <Text lineClamp={1} className={classes.text}>
              {name}
            </Text>
          </Group>
          <GuildSelectionMenu name={name} guildId={id} />
        </Group>
      </AnimatedPaper>
    </Center>
  );
};

export default GuildCard;
