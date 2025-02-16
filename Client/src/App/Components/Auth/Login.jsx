import React, { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Container,
  Paper,
  Title,
  Space,
  Grid,
  Image,
} from "@mantine/core";
import login_page_image from "../../Images/login_page_image.svg";
import { loginUserAPI } from "../../API/Users/User";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext"; // ✅ Import AuthContext

const LoginComponent = () => {
  const { login } = useAuth(); // ✅ Get login function from AuthContext
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const payload = { email, password };

    try {
      const response = await loginUserAPI(payload);
      console.log("Login successful:", response);

      if (response?.success) {
        login(response?.user); // ✅ Store user in AuthContext
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      size="xl"
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        marginTop: 50,
      }}
    >
      <Grid style={{ flex: 1, height: "80vh" }} gutter={0} align="center">
        <Grid.Col
          span={6}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Image
            src={login_page_image}
            alt="Login Page Image"
            width={500}
            height={500}
            marginTop={-100}
          />
        </Grid.Col>
        <Grid.Col
          span={6}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Paper
            withBorder
            shadow="md"
            p={40}
            radius="md"
            style={{ width: "100%", maxWidth: 400 }}
          >
            <Title align="center" mb="md">
              Login
            </Title>
            <TextInput
              label="Email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              mt="md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Space h="md" />
            <Button fullWidth mt="xl" onClick={handleSubmit} loading={loading}>
              Login
            </Button>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default LoginComponent;
