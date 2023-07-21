import React, { useState } from 'react';
import { ChakraProvider, Box, Grid, theme,} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

import Nav from './components/Menubar';
import FormHandler from './components/Form';

function App() {
  const [username, setUsername] = useState('Xin')
  const changeUsername = (newUser) => {
    setUsername(newUser);
  }

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <Nav username={username}/>
          <ColorModeSwitcher justifySelf="flex-end" />
          <FormHandler setUsername={changeUsername}/>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;