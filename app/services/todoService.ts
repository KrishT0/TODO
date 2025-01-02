import axios from "axios";

export const getTodos = async () => {
  const token = localStorage.getItem("accessToken");
  const response = await axios.get(
    `https://ec2-54-224-54-79.compute-1.amazonaws.com:8055/items/todo`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const addTodo = async (title: string) => {
  const token = localStorage.getItem("accessToken");
  const response = await axios.post(
    `https://ec2-54-224-54-79.compute-1.amazonaws.com:8055/items/todo`,
    {
      title,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const changeStatus = async ({
  id,
  completed,
}: {
  id: string;
  completed: string;
}) => {
  const token = localStorage.getItem("accessToken");
  const response = await axios.patch(
    `https://ec2-54-224-54-79.compute-1.amazonaws.com:8055/items/todo/${id}`,
    { completed },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
