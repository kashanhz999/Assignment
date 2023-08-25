// theme.js

import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'white', // Set the background color to white
        color:'black'
      },
    },
  },
});

export default theme;
