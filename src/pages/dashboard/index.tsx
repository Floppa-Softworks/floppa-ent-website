/* eslint-disable no-console */
import { Center, Loader, Stack } from '@mantine/core';
import { getSession, signIn, useSession } from 'next-auth/react';
import useSWR from 'swr';
import GuildCard from '../../components/ViewGuilds/GuildCard';
import { discordApiFetcher } from '../../lib/fetchers/discord';
import { determineMutualGuilds } from '../../lib/util/guilds';

export default function Hello({ token }: { token: string }) {
  const { data: session, status } = useSession();

  const { data: botGuilds, error: botGuildsError } = useSWR(
    ['/users/@me/guilds', session?.accessToken, false],
    discordApiFetcher
  );
  const { data: userGuilds, error: userGuildsError } = useSWR(
    ['/users/@me/guilds', token, true],
    discordApiFetcher
  );

  if (typeof window === 'undefined') return null;

  if (status === 'unauthenticated') return signIn('discord');
  if (status === 'loading' && !session) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  if (botGuildsError || userGuildsError) {
    return <Center>{botGuildsError || userGuildsError}</Center>;
  }

  if (!userGuilds || !botGuilds) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  const mutual = determineMutualGuilds(userGuilds, botGuilds);

  return (
    <Stack spacing={10}>
      {mutual.map((guild) => (
        <GuildCard key={guild.id} name={guild.name} iconURL={guild.icon ?? ''} id={guild.id} />
      ))}
    </Stack>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      token: process.env.DISCORD_BOT_TOKEN,
      session: await getSession(),
    },
  };
}
