import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import App from './App';

ReactDom.render(
  <Router>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </Router>,
  document.getElementById('app'),
);
