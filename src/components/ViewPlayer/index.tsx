/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import {
  Button,
  Center,
  Container,
  Divider,
  Grid,
  Group,
  Paper,
  ScrollArea,
  SimpleGrid,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { useInterval } from '@mantine/hooks';
import { useModals } from '@mantine/modals';
import SongCard from './SongCard';
import { useSocket } from '../../lib/hooks/useSocket';
import NowPlaying from './NowPlaying';
import { useColorModeValue } from '../../lib/hooks/useColorModeValue';

const PRIMARY_COL_HEIGHT = 475;

export function ViewPlayer({ guildId }: { guildId: string }) {
  const theme = useMantineTheme();
  const socket = useSocket();
  const router = useRouter();

  const notifications = useNotifications();
  const modals = useModals();

  const [current, setCurrent] = useState<any | null>(null);
  const [queue, setQueue] = useState<any[] | null>(null);

  const interval = useInterval(() => socket.emit('requestQueue', guildId), 1000);

  const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;

  const showMusicControls = (e: any) => {
    e.preventDefault();

    modals.openModal({
      title: 'Music Controls',
      children: (
        <>
          <TextInput label="Add a song" />
          <Divider sx={{ marginTop: 12, marginBottom: 12 }} />
          <Group grow>
            <Button onClick={() => socket.emit('skip')}>Skip</Button>
            <Button onClick={() => socket.emit('pause')}>Pause</Button>
            <Button color="red">Stop</Button>
          </Group>
        </>
      ),
    });
  };

  useEffect(() => {
    socket.emit('hello', 'world');
    socket.emit('requestQueue', guildId);
    interval.start();

    socket.on('queue', (data) => {
      const player = JSON.parse(data);
      console.log(player, queue, current);

      if (!player.current) console.log('oh noes');

      setCurrent(player.current);
      setQueue(player.queue);
    });

    socket.on('error', (message, fatal) => {
      if (!fatal) {
        console.log(message);
        notifications.showNotification({
          title: 'Whoops',
          color: 'red',
          message,
        });
        router.push('/dashboard');
      }
    });

    return () => {
      socket.off('queue');
      socket.off('error');
      interval.stop();
    };
  }, []);

  guildId;

  return (
    <Container my="md">
      <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        {current && (
          <NowPlaying
            height={PRIMARY_COL_HEIGHT}
            name={current.title}
            author={current.author}
            thumbnailURL={current.thumbnail.replace('default', 'mqdefault')}
          />
        )}
        <Grid gutter="md">
          <Grid.Col>
            <Paper
              sx={{
                backgroundColor: useColorModeValue(theme.white, theme.colors.dark[8]),
                height: SECONDARY_COL_HEIGHT,
              }}
              shadow="md"
            >
              <Center>
                <Title sx={{ marginTop: 20, fontFamily: 'Lexend', fontWeight: 900 }} order={1}>
                  Controls
                </Title>
              </Center>
              <Center sx={{ marginTop: 50 }}>
                <Button onClick={showMusicControls}>Open Music Controls</Button>
              </Center>
            </Paper>
          </Grid.Col>
          <Grid.Col>
            <ScrollArea
              sx={{
                backgroundColor: useColorModeValue(theme.white, theme.colors.dark[8]),
                boxShadow: theme.shadows.md,
              }}
              style={{ height: SECONDARY_COL_HEIGHT, borderRadius: theme.radius.md }}
            >
              {(queue?.length ?? 0) === 0 && (
                <Center>
                  <Title order={1} sx={{ marginTop: 20 }}>
                    The queue is empty.
                  </Title>
                </Center>
              )}
              <div style={{ width: 275 * (queue?.length ?? 1), marginLeft: 20, marginRight: 20 }}>
                <Grid>
                  {queue &&
                    queue.length !== 0 &&
                    queue.map((song) => (
                      <SongCard
                        name={song.title}
                        author={song.author}
                        thumbnailURL={song.thumbnail.replace('default', 'mqdefault')}
                        big={false}
                      />
                    ))}
                </Grid>
              </div>
            </ScrollArea>
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}
