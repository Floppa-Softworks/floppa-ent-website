import { Center } from '@mantine/core';
import { useRouter } from 'next/router';
import GuildConfig from '../../../components/GuildConfig';

export default function ConfigPage() {
  const { query } = useRouter();
  const guildId = query.guildId as string | undefined;

  return (
    <Center>
      <GuildConfig guildId={guildId ?? ''} />
    </Center>
  );
}
