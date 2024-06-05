import { Button, Container, PasswordInput, TextInput } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/auth';
import Swal from 'sweetalert2';

function SignUpPage() {
  const [name, setName] = useState('');
  const [registerId, setRegisterId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password !== passwordConfirm) {
      Swal.fire({
        title: 'Password not match',
        text: 'please enter again',
        icon: 'error',
      });
      return;
    }
    try {
      const response = await register({ name, registerId, password });
      if (response.message) {
        navigate('/signin');
      } else {
        setError('Invalid response from server');
      }
    } catch (err: any) {
      setError(
        'Sign up failed: ' + (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <Container size="xs">
      <h1>Sign Up</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <TextInput
        label="Name"
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
        required
        style={{ marginBottom: 5 }}
      />
      <TextInput
        label="Register ID"
        value={registerId}
        onChange={(event) => setRegisterId(event.currentTarget.value)}
        required
        style={{ marginBottom: 5 }}
      />
      <PasswordInput
        label="Password"
        value={password}
        onChange={(event) => setPassword(event.currentTarget.value)}
        required
        style={{ marginBottom: 5 }}
        placeholder="(6자리 이상)"
      />
      <PasswordInput
        label="Password Confirm"
        value={passwordConfirm}
        onChange={(event) => setPasswordConfirm(event.currentTarget.value)}
        required
        style={{ marginBottom: 5 }}
        placeholder="(6자리 이상)"
      />
      <Button onClick={handleSignUp} style={{ marginTop: 15 }}>
        Sign Up
      </Button>
    </Container>
  );
}

export default SignUpPage;
