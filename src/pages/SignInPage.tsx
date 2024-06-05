import { Button, PasswordInput, TextInput } from '@mantine/core';
import { useState } from 'react';
import useUser from '../hooks/useUser';
import { Circles } from 'react-loader-spinner';

function SignInPage() {
  const { login } = useUser();
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await login({ loginId, password });
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <>
          <Circles />
        </>
      ) : (
        <>
          <h1>Sign In</h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <TextInput
            label="Login ID"
            value={loginId}
            onChange={(event) => setLoginId(event.currentTarget.value)}
            required
          />
          <PasswordInput
            label="Password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
            required
          />
          <Button onClick={handleLogin}>Sign In</Button>
        </>
      )}
    </>
  );
}

export default SignInPage;
