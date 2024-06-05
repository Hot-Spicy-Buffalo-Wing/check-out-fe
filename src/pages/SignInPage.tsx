import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextInput,
  PasswordInput,
  Button,
  MantineProvider,
  Flex,
} from "@mantine/core";
import api from "../api";

function SignInPage() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  //  Login Logic
  const handleLogin = async () => {
    try {
      const response = await api.post(`/auth/login`, {
        loginId,
        password,
      });

      if (response.data.accessToken && response.data.refreshToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);

        navigate("/main");
      } else {
        setError("Invalid response from server");
      }
    } catch (err: any) {
      setError("Login failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <MantineProvider>
      <h1>Sign In</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
    </MantineProvider>
  );
}

export default SignInPage;
