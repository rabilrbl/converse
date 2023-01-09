import { Button, Container, Group, Text, Title } from "@mantine/core";
import { RichTextEditor } from "@mantine/tiptap";
import { PrismaClient } from "@prisma/client";
import { IconArrowLeft } from "@tabler/icons";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Back from "../../components/Common/Back";

const ViewPost = (props: {
  post: {
    id: number;
    title: string;
    content: string;
    author: {
      name: string;
      image: string;
    };
    thread: {
      topic: string;
    };
    published: boolean;
  };
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    editable: false,
    content: props.post.content,
  });
  return (
    <Container>
      <Back />
      <Title order={1}>{props.post.title}</Title>
      <Group className="divide-x-2 divide-dotted">
        <Text>{props.post.thread.topic}</Text>
        <Text>{props.post.author.name}</Text>
        <Text>{props.post.published ? "Published" : "Draft"}</Text>
      </Group>
      <RichTextEditor editor={editor}>
        <RichTextEditor.Content />
      </RichTextEditor>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params.id;
  const post = await new PrismaClient().posts.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      title: true,
      content: true,
      author: {
        select: {
          name: true,
          image: true,
        },
      },
      thread: {
        select: {
          topic: true,
        },
      },
      published: true,
    },
  });
  return {
    props: {
      post,
    },
  };
};

export default ViewPost;
