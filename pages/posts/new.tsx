import {
  Avatar,
  Box,
  Button,
  Container,
  FileInput,
  Group,
  Select,
  Textarea,
  TextInput,
  Title,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { forwardRef } from "react";
import { PrismaClient } from "@prisma/client";

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  image: string;
  label: string;
  description: string;
  value: Number;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(function SelectItem(
  { image, label, description, value, ...others }: ItemProps,
  ref
) {
  return (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image} />

        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" opacity={0.65}>
            {description}
          </Text>
        </div>
      </Group>
    </div>
  );
});

const New = (props: { threads: any }) => {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      title: "",
      content: "",
      thread: 0,
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
      thread: (value) => {
        if (!value) {
          return "Thread is required";
        }
      },
    },
  });

  useSession({
    required: true,
  });

  return (
    <Container>
      <Title order={1}>New Post</Title>
      <form
        onSubmit={form.onSubmit(async (values) => {
          fetch("/api/posts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
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
            label="Topic"
            withAsterisk
            placeholder="Pick one"
            itemComponent={SelectItem}
            data={props.threads}
            searchable
            maxDropdownHeight={400}
            nothingFound="Nobody here"
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
    </Container>
  );
};

export async function getServerSideProps() {
  const res = await new PrismaClient().thread.findMany();
  let threads = res.map((thread) => {
    return {
      label: thread.topic,
      value: thread.id,
      description: thread.description,
      image: thread.image,
    };
  });
  return {
    props: {
      threads,
    },
  };
}

export default New;
