import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextInput,
  PasswordInput,
  Button,
  MantineProvider,
} from "@mantine/core";
import api from "../api";

function SignUpPage() {
  const [name, setName] = useState("");
  const [registerId, setRegisterId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await api.post(`/auth/register`, {
        name,
        registerId,
        password,
      });
      if (response.data.message) {
        navigate("/signin");
      } else {
        setError("Invalid response from server");
      }
    } catch (err: any) {
      setError(
        "Sign up failed: " + (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <MantineProvider>
      <h1>Sign Up</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <TextInput
        label="Name"
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
        required
      />
      <TextInput
        label="Register ID"
        value={registerId}
        onChange={(event) => setRegisterId(event.currentTarget.value)}
        required
      />
      <PasswordInput
        label="Password"
        value={password}
        onChange={(event) => setPassword(event.currentTarget.value)}
        required
      />
      <Button onClick={handleSignUp}>Sign Up</Button>
    </MantineProvider>
  );
}

export default SignUpPage;
