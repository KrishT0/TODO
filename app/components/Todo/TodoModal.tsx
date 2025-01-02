import { useFetcher } from "@remix-run/react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput } from "@mantine/core";
import { useForm, hasLength } from "@mantine/form";

export default function TodoModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const fetcher = useFetcher();

  const addTodo = (title: string) => {
    fetcher.submit({ actionType: "addTodo", title }, { method: "post" });
  };

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
    },
    validate: {
      title: hasLength({ min: 6 }, "Must be at least 6 characters"),
    },
  });

  const onSubmit = (values: { title: string }) => {
    addTodo(values.title);
    form.reset();
    close();
  };

  return (
    <>
      <Modal
        opened={opened}
        title="Create new TODO"
        onClose={() => {
          form.reset();
          close();
        }}
        style={{
          color: "black",
        }}
      >
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            label="Title"
            placeholder="TODO Task Title"
            key={form.key("title")}
            {...form.getInputProps("title")}
          />
          <Button type="submit" mt="sm">
            Add
          </Button>
        </form>
      </Modal>

      <Button onClick={open}>Add TODO</Button>
    </>
  );
}
