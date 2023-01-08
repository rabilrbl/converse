import { Button, Flex, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { openModal } from "@mantine/modals";
import { IconPlus } from "@tabler/icons";
import React, { useState } from "react";
import { ArticleCardVertical } from "../components/Posts/ArticleCard";

const Posts = (props: {
  posts: {
    thread: {
      topic: string;
    };
    title: string;
    author: {
      name: string;
      profilePicture: string;
    };
    content: string;
    date: string;
  }[];
}) => {
  const newPostModal = () =>
    openModal({
      title: "New Post",
      children: <div>Modal Content</div>,
      centered: true,
    });

  const form = useForm({
    initialValues: {
      title: "",
    },
    validate: (values) => {
      const errors: any = {};
      if (!values.title) {
        errors.title = "Title is required";
      }
      return errors;
    },
  });

  return (
    <div>
      <Flex className="gap-2 justify-between">
        <Title order={1}>Posts</Title>
        <Button
          className="bg-blue-500"
          onClick={newPostModal}
          variant="filled"
          leftIcon={<IconPlus />}
        >
          New Post
        </Button>
      </Flex>
      <h2 className="text-lg font-bold">Featured</h2>
      <div className="grid grid-cols-2 gap-2">
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
    </div>
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
