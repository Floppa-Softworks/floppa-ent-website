import { Center, Paper, Stack, Title } from '@mantine/core';
import React from 'react';
import { useColorModeValue } from '../../lib/hooks/useColorModeValue';
import SongCard from './SongCard';

interface NowPlayingProps {
  height: number;
  name: string;
  author: string;
  thumbnailURL: string;
}

export default function NowPlaying({ height, name, author, thumbnailURL }: NowPlayingProps) {
  return (
    <Paper
      radius="md"
      sx={(theme) => ({
        height,
        backgroundColor: useColorModeValue(theme.white, theme.colors.dark[8]),
        boxShadow: theme.shadows.md,
      })}
    >
      <Center mt={20}>
        <Stack>
          <Title sx={{ fontFamily: 'Lexend', fontWeight: 900 }} order={1}>
            Now Playing
          </Title>
          <Center>
            <SongCard name={name} author={author} thumbnailURL={thumbnailURL} big />
          </Center>
        </Stack>
      </Center>
    </Paper>
  );
}
