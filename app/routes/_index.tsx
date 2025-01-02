import type { MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import {
  ClientActionFunctionArgs,
  useActionData,
  useNavigate,
} from "@remix-run/react";
import { validationError } from "remix-validated-form";

import { Title, Box } from "@mantine/core";

import SignIn from "~/components/Auth/SignIn";
import SignUp from "~/components/Auth/SignUp";
import { SignInService, SignUpService } from "~/services/authSerivce";
import { SignUpvalidator, SignInValidator } from "~/utils/AuthValidator";

export const meta: MetaFunction = () => {
  return [
    { title: "Todo | Auth" },
    { name: "description", content: "please login" },
  ];
};

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const formData = await request.formData();
  const { first_name, email, password, actionType } = Object.fromEntries(
    formData.entries()
  );

  if (actionType === "signup") {
    const requiredData = {
      first_name: first_name as string,
      email: email as string,
      password: password as string,
    };

    const validateData = await SignUpvalidator.validate(requiredData);
    if (validateData.error) {
      return validationError(validateData.error);
    }
    try {
      await SignUpService(requiredData);

      const response = await SignInService({
        email: email as string,
        password: password as string,
      });

      localStorage.setItem("accessToken", response.data.access_token);
      return null;
    } catch (error: any) {
      // console.log(error.response);
      return error.response.data;
    }
  } else {
    const requiredData = {
      email: email as string,
      password: password as string,
    };

    const validateData = await SignInValidator.validate(requiredData);
    if (validateData.error) {
      return validationError(validateData.error);
    }

    try {
      const response = await SignInService({
        email: email as string,
        password: password as string,
      });

      localStorage.setItem("accessToken", response.data.access_token);
      return { redirectTo: "/todo" };
    } catch (error: any) {
      console.log(error.response);
      return error;
    }
  }
};

export default function Index() {
  const [showLogin, setShowLogin] = useState(true);
  const actionData = useActionData<typeof clientAction>();
  const navigate = useNavigate();
  console.log(actionData);

  useEffect(() => {
    if (actionData?.redirectTo) {
      navigate(actionData.redirectTo);
    }
  }, [actionData]);

  return (
    <Box
      component="div"
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        height: "calc(100vh - 19px)",
        padding: "1rem",
      }}
    >
      <Title order={2} style={{ textAlign: "center" }}>
        TODO
      </Title>
      <Box
        component="section"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {showLogin ? (
          <SignIn showLogin={setShowLogin} />
        ) : (
          <SignUp showLogin={setShowLogin} />
        )}
      </Box>
    </Box>
  );
}
