import { useFetcher } from "@remix-run/react";
import { Paper, Badge, Box, Button } from "@mantine/core";

type TodoCardProps = {
  id: number;
  title: string;
  completed: "not_started" | "completed";
};

export default function TodoCard({ id, title, completed }: TodoCardProps) {
  const fetcher = useFetcher();

  const changeStatus = (id: number) => {
    fetcher.submit(
      { actionType: "changeStatus", id: id.toString(), completed },
      { method: "patch" }
    );
  };

  return (
    <Paper
      shadow="sm"
      radius="md"
      style={{
        backgroundColor: "#222331",
        padding: "0 20px",
        margin: "8px 0",
        fontWeight: "600",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        component="div"
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <Box component="p">{id}.</Box>
        <h3>{title}</h3>
      </Box>
      <Button
        color={completed === "completed" ? "lime.9" : "red.6"}
        onClick={() => changeStatus(id)}
        style={{ cursor: "pointer", borderRadius: "20px" }}
        // disabled={fetcher.state === "submitting"}
      >
        {completed === "completed" ? "Completed" : "Not Started"}
      </Button>
    </Paper>
  );
}
