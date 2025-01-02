import { FC } from "react";
import { Box, Button, TextInput, Text } from "@mantine/core";
import { Form, useActionData } from "@remix-run/react";
import { clientAction as authAction } from "~/routes/_index";

type SignUpProps = {
  showLogin: (show: boolean) => void;
};

const SignUp: FC<SignUpProps> = ({ showLogin }) => {
  const data = useActionData<typeof authAction>();
  console.log("returned: ", data);
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
        Sign Up
      </Text>
      {data?.errors &&
        data?.errors.map((item: any) => {
          return (
            <Text
              style={{
                color: "red",
                margin: "3px 0",
                textAlign: "center",
              }}
            >
              {item.message}
            </Text>
          );
        })}
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
            label="Name"
            name="first_name"
            placeholder="Enter your name"
          />
          {data?.fieldErrors?.first_name && (
            <Text style={{ color: "red", margin: "0px" }}>
              {data.fieldErrors.first_name}
            </Text>
          )}
        </Box>
        <TextInput
          name="actionType"
          value="signup"
          style={{ display: "none" }}
          readOnly
        />
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
        <Button type="submit">Sign Up</Button>
      </Form>
      <Text
        style={{
          marginTop: "1rem",
          fontSize: "15px",
          textAlign: "center",
        }}
      >
        Already have an account?{" "}
        <Text
          component="span"
          style={{
            color: "#06f",
            cursor: "pointer",
            textDecoration: "underline",
          }}
          onClick={() => showLogin(true)}
        >
          Sign In
        </Text>
      </Text>
    </Box>
  );
};

export default SignUp;
