import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Button, Flex } from '@chakra-ui/react';

import Login from './pages/Login';
import Profile from './pages/Profile';
import Registration from './pages/Registration';

const menuList = [
  {
    id: 1,
    text: 'Регистрация',
    link: '/reg',
  },
  {
    id: 2,
    text: 'Войти',
    link: '/auth',
  },
];

const App = () => {
  return (
    <div>
      <header>
        <Flex as="ul">
          {menuList.map(menuItem => (
            <li key={menuItem.id}>
              <Button as={Link} to={menuItem.link} colorScheme="blue">
                {menuItem.text}
              </Button>
            </li>
          ))}
        </Flex>
      </header>
      <Switch>
        <Route path="/reg">
          <Registration />
        </Route>
        <Route path="/auth">
          <Login />
        </Route>
        <Route path="/">
          <Profile />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
