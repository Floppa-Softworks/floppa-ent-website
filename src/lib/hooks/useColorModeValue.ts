import { useMantineTheme } from '@mantine/core';

export function useColorModeValue(lightValue: any, darkValue: any) {
  const theme = useMantineTheme();
  return theme.colorScheme === 'dark' ? darkValue : lightValue;
}
