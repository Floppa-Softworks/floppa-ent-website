import { useMutation, useQuery } from '@apollo/client';
import {
  Card,
  Text,
  Center,
  Divider,
  Slider,
  Button,
  Stack,
  Checkbox,
  LoadingOverlay,
} from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { GET_GUILD_CONFIG_QUERY, UPDATE_GUILD_CONFIG_MUTATION } from '../../lib/gql/guilds';
import { useStyles } from './index.styles';

export default function GuildConfig({ guildId }: { guildId: string }) {
  const { classes } = useStyles();
  const { status } = useSession();

  const [volume, setVolume] = useState<number>();
  const [autoplay, setAutoplay] = useState<boolean>();
  const [disabled, setDisabled] = useState(false);

  const notifications = useNotifications();

  const { data, error, loading } = useQuery(GET_GUILD_CONFIG_QUERY(guildId));
  const [updateGuildConfig, { loading: mutationLoading }] = useMutation(
    UPDATE_GUILD_CONFIG_MUTATION,
    {
      variables: { guildId, autoplayOnQueueCreate: autoplay, defaultVolume: volume },
    }
  );

  // eslint-disable-next-line consistent-return
  const saveSettings = async (e: MouseEvent) => {
    e.preventDefault();
    if (disabled) {
      return notifications.showNotification({
        title: 'Whoops...',
        message: 'Your doing this too fast! Wait a few seconds.',
        color: 'red',
      });
    }

    try {
      await updateGuildConfig();
      notifications.showNotification({
        title: 'Success!',
        message: 'Successfully updated the configuration.',
      });
      setDisabled(true);
      setTimeout(() => setDisabled(false), 5000);
    } catch (err) {
      // eslint-disable-next-line no-console
      if (err) console.log(JSON.stringify(error, null, 2));
    }
  };

  useEffect(() => {
    if (data?.getGuildConfig) {
      const guildConfig = JSON.parse(data.getGuildConfig);

      setVolume(guildConfig.defaultVolume);
      setAutoplay(guildConfig.autoplayOnQueueCreate);
    }
  }, [data]);

  if (status === 'unauthenticated') signIn('discord');
  if (error) return <Center>{error}</Center>;

  return (
    <Card withBorder radius="md" p="xl" className={classes.card}>
      <LoadingOverlay visible={status === 'loading' || loading} />

      <Text size="xl" className={classes.title} weight={500}>
        Guild Configuration
      </Text>
      <Text size="xs" color="dimmed" mt={3} mb="xl">
        Edit the guild configuration for &quot;Guild&quot;
      </Text>
      <Divider />

      <Stack spacing={4}>
        <Text sx={{ paddingTop: 24 }} size="md">
          Default volume
        </Text>
        <Slider value={volume} onChange={setVolume} min={1} max={100} size="md" />

        <Checkbox
          checked={autoplay}
          onChange={(event) => setAutoplay(event.currentTarget.checked)}
          sx={{ paddingTop: 24 }}
          label="Autoplay on queue create"
        />

        <Button
          sx={{ marginTop: 24, align: 'center' }} // @ts-ignore
          onClick={saveSettings}
          loading={mutationLoading}
          disabled={disabled}
        >
          Save Settings
        </Button>
      </Stack>
    </Card>
  );
}
