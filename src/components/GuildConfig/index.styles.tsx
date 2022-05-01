import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    [theme.fn.smallerThan('md')]: {
      minWidth: '90%',
    },
    [theme.fn.largerThan('md')]: {
      minWidth: '40%',
    },
  },
  title: {
    lineHeight: 1,
  },
}));
