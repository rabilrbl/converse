import { Avatar, Badge, Container, Flex, Text, Title, Image } from "@mantine/core";
import { RichTextEditor } from "@mantine/tiptap";
import { PrismaClient } from "@prisma/client";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { GetServerSideProps } from "next";
import Back from "../../components/Common/Back";
import { Uploads } from "@prisma/client";

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
    banner: string;
    attachments: Uploads[];
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
      <RichTextEditor editor={editor} className="rounded-xl px-2 py-4">
        <RichTextEditor.Content />
      </RichTextEditor>
      {props.post.attachments.length > 0 && (
        <div className="p-2 border border-slate-500 mt-4 rounded-xl">
          <Title order={3}>Attachments</Title>
          <ul className="list-disc">
            {props.post.attachments.map((attachment) => (
              <li className="ml-4" key={attachment.id}>
                <a
                  className="text-blue-500 underline text-xl hover:text-2xl transition-all ease-in-out duration-200 overflow-auto"
                  href={attachment.file}
                >
                  {attachment.fileName}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
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
      banner: true,
      attachments: {
        select: {
          id: true,
          fileName: true,
          file: true,
        },
      },
    },
  });
  return {
    props: {
      post,
    },
  };
};

export default ViewPost;
