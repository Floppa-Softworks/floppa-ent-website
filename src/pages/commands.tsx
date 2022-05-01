import { Accordion, Center, Text, Loader, Paper, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import useSWR from 'swr';
import StyledAccordion from '../components/Styled/StyledAccordion';
import { useColorModeValue } from '../lib/hooks/useColorModeValue';
import { Command } from '../lib/types';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function CommandsPage() {
  const { data: commands, error } = useSWR('http://localhost:5000/commands', fetcher);
  const theme = useMantineTheme();
  const query = useMediaQuery('(max-width: 600px');

  return (
    <Center>
      <Paper
        sx={{
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
          width: query ? '100%' : '50%',
          alignSelf: 'center',
          borderRadius: theme.radius.md,
        }}
        p="md"
        shadow="sm"
      >
        <Center>
          <Text size="xl" style={{ marginBottom: 12 }}>
            Commands
          </Text>
          {error && `Error: ${error}`}
        </Center>

        {!commands && (
          <Center>
            <Loader />
          </Center>
        )}

        {commands && (
          <StyledAccordion sx={{ display: 'flex', flexDirection: 'column' }}>
            {(commands as Command[]).map((category) => (
              <Accordion.Item
                sx={{ width: query ? '100%' : '50%', alignSelf: 'center' }}
                label={category.category}
              >
                {category.commands.map((command: any) => (
                  <StyledAccordion>
                    <Accordion.Item
                      sx={{
                        backgroundColor: useColorModeValue(theme.white, theme.colors.dark[4]),
                        borderRadius: theme.radius.md,
                        marginTop: 16,
                      }}
                      label={command.name}
                    >
                      {command?.description ||
                        command.description.trim() !== '' ||
                        'No description'}
                    </Accordion.Item>
                  </StyledAccordion>
                ))}
              </Accordion.Item>
            ))}
          </StyledAccordion>
        )}
      </Paper>
    </Center>
  );
}
