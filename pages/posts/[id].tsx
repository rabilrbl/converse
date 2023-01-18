import { Avatar, Badge, Container, Flex, Group, Text, Title } from "@mantine/core";
import { RichTextEditor } from "@mantine/tiptap";
import { PrismaClient } from "@prisma/client";
import { IconArrowLeft } from "@tabler/icons";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
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
        <Badge>{props.post.thread.topic}</Badge>
      <Flex justify="space-between" className="my-4">
        <div className="flex items-center justify-center gap-2">
          <Avatar src={props.post.author.image} size={40} radius="md" />
          <Title order={4}>{props.post.author.name}</Title>
        </div>
        <Text>{props.post.published ? "Published" : "Draft"}</Text>
      </Flex>
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
