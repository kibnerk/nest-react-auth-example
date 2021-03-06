import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  AlertDescription,
  CloseButton,
} from '@chakra-ui/react';
import { postRegistration } from '../api/auth';

const Registration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('string');
  const [password, setPassword] = useState('string');
  const [avatar, setAvatar] = useState('string');
  const [error, setError] = useState('');

  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      history.push(`/`);
    }
  }, []);

  const onSubmitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await postRegistration(name, password, avatar);

      history.push('/auth');
    } catch (error) {
      console.error(error);
      setError(error?.response?.data?.message);
    }
    setIsLoading(false);
  };

  return (
    <Container>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>{error}</AlertDescription>
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={() => setError('')}
          />
        </Alert>
      )}
      <form onSubmit={onSubmitForm}>
        <FormControl id="login">
          <FormLabel>Логин</FormLabel>
          <Input
            value={name}
            onChange={event => setName(event.target.value)}
            type="login"
          />
        </FormControl>
        <FormControl id="avatar">
          <FormLabel>Ссылка на аватар</FormLabel>
          <Input
            value={avatar}
            onChange={event => setAvatar(event.target.value)}
            type="text"
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Пароль</FormLabel>
          <Input
            value={password}
            onChange={event => setPassword(event.target.value)}
            type="password"
          />
        </FormControl>
        <Button
          colorScheme="blue"
          isLoading={isLoading}
          css={{ marginTop: 16 }}
          type="submit"
        >
          Зарегистрироваться
        </Button>
      </form>
    </Container>
  );
};

export default Registration;
