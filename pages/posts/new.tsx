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
import prisma from "../../lib/prisma";
import TextEditor from "../../components/Posts/TextEditor";
import Back from "../../components/Common/Back";

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  image: string;
  label: string;
  description: string;
  value: Number;
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

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
      content:
        '<h2 style="text-align: center;">Welcome to Converse rich text editor</h2><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users.<ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li></ul>',
      thread: 0,
      banner: "",
      attachments: [""],
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
    <Container size="lg">
      <Back />
      <Title order={1}>New Post</Title>
      <form
        onSubmit={form.onSubmit(async (values) => {
          fetch("/api/posts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: values.title,
              content: values.content,
              thread: values.thread,
            }),
          }).then(async (res) => {
            if (res.ok) {
              const post = await res.json();
              if (values.banner) {
                const formData = new FormData();
                formData.append("banner", values.banner);
                formData.append("postId", post.id);
                await fetch("/api/posts/upload", {
                  method: "POST",
                  body: formData,
                }).then((res) => {
                  if (!res.ok) {
                    alert("Error");
                  }
                });
              }
              if (values.attachments[0] === "") {
                router.push("/posts");
              } else {
                const attachmentFormData = new FormData();
                attachmentFormData.append("postId", post.id);
                values.attachments.forEach((attachment) => {
                  attachmentFormData.append("attachments", attachment);
                });
                await fetch("/api/posts/attachments", {
                  method: "POST",
                  body: attachmentFormData,
                }).then((res) => {
                  if (res.ok) {
                    router.push("/posts");
                  } else {
                    alert("Error");
                  }
                });
              }
            } else {
              alert("Error");
            }
          });
        })}
      >
        <div className="mb-4">
          <TextInput
            size="lg"
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
          <FileInput
            label="Banner"
            placeholder="Banner"
            {...form.getInputProps("banner")}
          />
        </div>
        <div className="mb-4 w-full">
          <Title order={3}>Content</Title>
          <TextEditor
            content={form.values.content}
            setContent={(content) => {
              form.setFieldValue("content", content);
            }}
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
  const res = await prisma.thread.findMany();
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
