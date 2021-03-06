import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Avatar, Spinner, Button } from '@chakra-ui/react';

import { getMe } from '../api/user';
import { removeAuthStorage } from '../api/index';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      try {
        const response = await getMe();
        setUser(response);
      } catch (error) {
        console.error(error);
      }
    })();

    setIsLoading(false);
  }, []);

  const exitHandler = () => {
    removeAuthStorage();

    history.push(`/auth`);
  };

  return (
    <Container>
      {isLoading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : (
        <div>
          <p>Привет, {user?.name}!</p>
          <Avatar name={user?.name} src={user?.avatar} />
          <Button colorScheme="blue" onClick={exitHandler}>
            Выйти
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Profile;
