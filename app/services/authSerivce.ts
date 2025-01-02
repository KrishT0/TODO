import axios from "axios";

type SignUpProps = {
  email: string;
  password: string;
  first_name: string;
};

type SignInProps = {
  email: string;
  password: string;
};

export const SignUpService = async (body: SignUpProps) => {
  const newBody = { ...body, role: "36065c6a-44f2-4baf-952a-e6db62b4bda4" };
  const response = await axios.post(
    `http://ec2-54-224-54-79.compute-1.amazonaws.com:8055/users`,
    newBody
  );
  return response.data;
};

export const SignInService = async (body: SignInProps) => {
  const response = await axios.post(
    `http://ec2-54-224-54-79.compute-1.amazonaws.com:8055/auth/login`,
    body
  );
  return response.data;
};
