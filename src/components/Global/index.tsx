import { Global as GlobalStyle } from '@mantine/core';

export function Global() {
  return (
    <GlobalStyle
      styles={[
        {
          '@font-face': {
            fontFamily: 'Greycliff CF',
            src: 'url(\'/fonts/GreycliffCF-Heavy.woff2\') format("woff2")',
            fontWeight: 700,
            fontStyle: 'normal',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Greycliff CF',
            src: 'url(\'/fonts/GreycliffCF-Bold.woff2\') format("woff2")',
            fontWeight: 900,
            fontStyle: 'normal',
          },
        },
      ]}
    />
  );
}
