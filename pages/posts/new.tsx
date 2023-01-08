import {
  Box,
  Button,
  FileInput,
  Select,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";

const New = (props: {
  threads: {
    topic: string;
    id: number;
  };
}) => {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      title: "",
      content: "",
      thread: props.threads[0].value,
      attachments: [],
    },
    validate: {
      title: (value) => {
        if (!value) {
          return "Title is required";
        }
      },
      content: (value) => {
        if (!value) {
          return "Content is required";
        }
      },
    },
  });

  return (
    <Box>
      <Title order={1}>New Post</Title>
      <form
        onSubmit={form.onSubmit(async (values) => {
          const title = values.title;
          const content = values.content;
          const thread = values.thread;
          //  Post all the values to the API
          fetch("/api/posts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title,
              content,
              thread,
              author: 1,
            }),
          }).then((res) => {
            if (res.ok) {
              router.push("/posts");
            } else {
              alert("Error");
            }
          });
        })}
        className="max-w-2xl"
      >
        <div className="mb-4">
          <TextInput
            label="Title"
            placeholder="Title"
            withAsterisk
            {...form.getInputProps("title")}
          />
        </div>
        <div className="mb-4">
          <Select
            data={props.threads}
            label="Thread Topic"
            withAsterisk
            {...form.getInputProps("thread")}
          />
        </div>
        <div className="mb-4">
          <Textarea
            label="Content"
            placeholder="Content"
            withAsterisk
            {...form.getInputProps("content")}
          />
        </div>
        <div className="mb-4">
          <FileInput
            label="Attachments"
            placeholder="Attachments"
            multiple
            {...form.getInputProps("attachments")}
          />
        </div>
        <Button variant="outline" type="submit">
          Create Post
        </Button>
      </form>
    </Box>
  );
};

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/threads");
  let threads = (await res.json()) as Record<string, any>;
  threads = threads.map((thread) => {
    return {
      label: thread.topic,
      value: thread.id,
    };
  });
  return {
    props: {
      threads,
    },
  };
}

export default New;
