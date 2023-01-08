import { Button, Container, Flex, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { useRouter } from "next/router";
import { ArticleCardVertical } from "../../components/Posts/ArticleCard";
import { useSession } from "next-auth/react";

const Posts = (props: {
  posts: {
    thread: {
      topic: string;
    };
    title: string;
    author: {
      name: string;
      image: string;
    };
    content: string;
    date: string;
  }[];
}) => {
  const router = useRouter();

  return (
    <Container>
      <Flex className="gap-2 justify-between">
        <Title order={1}>Posts</Title>
        <Button
          className="bg-blue-500"
          onClick={() => {
            router.push("/posts/new");
          }}
          variant="filled"
          leftIcon={<IconPlus />}
        >
          New Post
        </Button>
      </Flex>
      <div className="mt-6 grid grid-cols-2 gap-2">
        {props.posts.map((post, index) => {
          return (
            <ArticleCardVertical
              key={index}
              image="https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
              {...post}
            />
          );
        })}
      </div>
    </Container>
  );
};

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/posts");
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
}

export default Posts;
