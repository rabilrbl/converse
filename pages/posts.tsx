import React from "react";
import { ArticleCardVertical } from "../components/Posts/ArticleCard";

const posts = () => {
  const posts = [
    {
      image:
        "https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
      category: "technology",
      title: "The best laptop for Frontend engineers in 2022",
      date: "Feb 6th",
      author: {
        name: "Elsa Brown",
        avatar:
          "https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
      },
    },
    {
      image:
        "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
      category: "technology",
      title: "The best laptop for Frontend engineers in 2022",
      date: "Feb 6th",
      author: {
        name: "Elsa Brown",
        avatar:
          "https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
      },
    },
    {
      image:
        "https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
      category: "technology",
      title: "The best laptop for Frontend engineers in 2022",
      date: "Feb 6th",
      author: {
        name: "Elsa Brown",
        avatar:
          "https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
      },
    },
    {
      image:
        "https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
      category: "technology",
      title: "The best laptop for Frontend engineers in 2022",
      date: "Feb 6th",
      author: {
        name: "Elsa Brown",
        avatar:
          "https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
      },
    },
  ];
  return (
    <div>
      <h1>Posts</h1>
      <h2 className="text-lg font-bold">Featured</h2>
      <div className="grid grid-cols-2 gap-2">
        {posts.map((post, index) => {
          return <ArticleCardVertical key={index} {...post} />;
        })}
      </div>
    </div>
  );
};

export default posts;
