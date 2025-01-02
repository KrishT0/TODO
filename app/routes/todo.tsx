import type { MetaFunction } from "@remix-run/node";
import { Title, Box, Text } from "@mantine/core";
import TodoCard from "~/components/Todo/TodoCard";
import { useLoaderData, useNavigate } from "@remix-run/react";
import TodoModal from "~/components/Todo/TodoModal";
import { addTodo, changeStatus, getTodos } from "~/services/todoService";
import { useEffect } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Todo" },
    { name: "description", content: "Add your todos" },
  ];
};

type Todo = {
  id: number;
  title: string;
  completed: "not_started" | "completed";
};

export const clientLoader = async () => {
  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken);
  if (accessToken == null) {
    console.log("Redirecting to login");
    return { redirectTo: "/" };
  }
  try {
    const data = await getTodos();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const clientAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  console.log(formData);
  const actionType = formData.get("actionType");

  if (actionType === "addTodo") {
    try {
      const title = formData.get("title") as string;
      const response = await addTodo(title);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  if (actionType === "changeStatus") {
    try {
      const id = formData.get("id") as string;
      const completed = formData.get("completed") as string;
      console.log(id, completed);
      const completedValue =
        completed === "completed" ? "not_started" : "completed";
      const response = await changeStatus({ id, completed: completedValue });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  return null;
};

export default function Index() {
  const loaderData = useLoaderData<typeof clientLoader>();
  console.log(loaderData);
  const navigate = useNavigate();

  useEffect(() => {
    if (loaderData.redirectTo !== null) {
      navigate(loaderData.redirectTo);
    }
  }, [loaderData.redirectTo]);

  return (
    <Box
      component="div"
      style={{
        position: "relative",
        maxWidth: "1200px",
        margin: "0 auto",
        height: "100vh",
        padding: "1rem",
      }}
    >
      <Text
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          cursor: "pointer",
          color: "#FA5252",
          fontWeight: "bold",
        }}
        onClick={() => {
          localStorage.removeItem("accessToken");
          navigate("/");
        }}
      >
        Logout
      </Text>
      <Title order={2} style={{ textAlign: "center" }}>
        TODO
      </Title>

      <Box
        component="div"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        <TodoModal />

        <Box component="div">
          {loaderData?.data === null || loaderData?.data?.length === 0 ? (
            <Text
              style={{
                textAlign: "center",
                fontSize: "1.5rem",
                color: "#495057",
                fontWeight: "bold",
              }}
            >
              Please Create a TODO
            </Text>
          ) : (
            loaderData?.data?.map((task: Todo) => {
              return (
                <TodoCard
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  completed={task.completed}
                />
              );
            })
          )}
        </Box>
      </Box>
    </Box>
  );
}
