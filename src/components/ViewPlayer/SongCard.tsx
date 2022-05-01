import { Card, Image, Text, Group, useMantineTheme } from '@mantine/core';

interface SongCardProps {
  name: string;
  author: string;
  thumbnailURL: string;
  big: boolean;
}

export default function SongCard({ name, author, thumbnailURL, big }: SongCardProps) {
  const theme = useMantineTheme();
  const HEIGHT_VALUE = 400 / 2 - theme.spacing.sm / 2;

  const secondaryColor = theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];

  // To be used later
  name;
  author;
  thumbnailURL;

  return (
    <div style={{ width: big ? 220 : 250, marginLeft: big ? 0 : 20 }}>
      <Card
        shadow="sm"
        radius="md"
        sx={{ height: big ? 300 : HEIGHT_VALUE, marginTop: 24, marginBottom: 12 }}
      >
        <Card.Section>
          <Image src={thumbnailURL} height={big ? 150 : 100} alt="Norway" />
        </Card.Section>
        <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
          <Text weight={500}>{name}</Text>
        </Group>

        <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
          By {author}
        </Text>
      </Card>
    </div>
  );
}
