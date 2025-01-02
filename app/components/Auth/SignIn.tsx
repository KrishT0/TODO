import { FC } from "react";
import { Box, Text, TextInput, Button } from "@mantine/core";
import { Form, useActionData } from "@remix-run/react";
import { clientAction as authAction } from "~/routes/_index";

type ShowLoginProps = {
  showLogin: (show: boolean) => void;
};

const SignIn: FC<ShowLoginProps> = ({ showLogin }) => {
  const data = useActionData<typeof authAction>();
  // console.log(data?.fieldErrors);
  return (
    <Box
      style={{
        padding: "1rem",
        width: "500px",
        backgroundColor: "#222331",
        borderRadius: "10px",
      }}
    >
      <Text
        style={{
          fontSize: "30px",
          textAlign: "center",
        }}
      >
        Login
      </Text>
      <Form
        method="post"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <TextInput
            label="Email"
            name="email"
            placeholder="Enter your email"
          />
          {data?.fieldErrors?.email && (
            <Text style={{ color: "red", margin: "0px" }}>
              {data.fieldErrors.email}
            </Text>
          )}
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <TextInput
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
          />
          {data?.fieldErrors?.password && (
            <Text style={{ color: "red", margin: "0px" }}>
              {data.fieldErrors.password}
            </Text>
          )}
        </Box>
        <TextInput
          name="actionType"
          value="signin"
          style={{ display: "none" }}
          readOnly
        />
        {data?.error && (
          <Text style={{ color: "red", textAlign: "center" }}>
            {data.error}
          </Text>
        )}
        <Button type="submit">Sign In</Button>
      </Form>
      <Text
        style={{
          marginTop: "1rem",
          fontSize: "15px",
          textAlign: "center",
        }}
      >
        Don't have an account?{" "}
        <Text
          component="span"
          style={{
            color: "#06f",
            cursor: "pointer",
            textDecoration: "underline",
          }}
          onClick={() => showLogin(false)}
        >
          Sign up
        </Text>
      </Text>
    </Box>
  );
};

export default SignIn;
