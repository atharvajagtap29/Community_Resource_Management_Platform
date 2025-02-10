import React from "react";
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
  Center,
} from "@mantine/core";
import login_page_image from "../../Images/login_page_image.svg";

const LoginComponent = () => {
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
        {/* Left Side - Image */}
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

        {/* Right Side - Form */}
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
            <TextInput label="Email" placeholder="you@example.com" required />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              mt="md"
            />
            <Space h="md" />
            <Button fullWidth mt="xl">
              Login
            </Button>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default LoginComponent;
