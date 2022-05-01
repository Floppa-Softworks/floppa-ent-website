import { createStyles } from '@mantine/core';
import { useColorModeValue } from '../../lib/hooks/useColorModeValue';

export default createStyles((theme) => ({
  title: {
    color: useColorModeValue(theme.black, theme.white),
    fontSize: 100,
    fontWeight: 900,
    letterSpacing: -2,
    fontFamily: 'Greycliff CF',

    [theme.fn.smallerThan('md')]: {
      fontSize: 50,
    },
  },
}));
