import useSWR from "swr";
import fetcher from "../lib/fetcher";
import { Box, Container, Divider, Text, useMantineTheme } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { MessageInput } from "../components/Chat/MessageInput";
import { useSession } from "next-auth/react";

const Chat = () => {
  const [newMessage, setNewMessage] = useState("");
  const {
    data: messages,
    error,
    isLoading,
  } = useSWR("/api/chats", fetcher, {
    refreshInterval: 1000,
  });
  useSession({
    required: true,
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!newMessage) {
      return;
    } else {
      const res = await fetch("/api/chats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: newMessage,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      } else {
        setNewMessage("");
      }
    }
  };

  const theme = useMantineTheme();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load</div>;

  return (
    <Container>
      <div className="bg-inherit h-[95vh] flex flex-col">
        <div className="px-4 py-2 shadow-md">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
            Chat
          </h1>
        </div>
        <div className="flex-1 overflow-y-scroll">
          {messages ? (
            messages.map(
              (message: { id: number; user: string; message: string }) => (
                <div key={message.id}>
                  <Box
                    sx={(theme) => ({
                      backgroundColor:
                        theme.colorScheme === "dark"
                          ? theme.colors.dark[6]
                          : theme.colors.gray[0],
                      textAlign: "start",
                      padding: theme.spacing.md,
                      borderRadius: theme.radius.md,
                      cursor: "default",
                      "&:hover": {
                        backgroundColor:
                          theme.colorScheme === "dark"
                            ? theme.colors.dark[5]
                            : theme.colors.gray[1],
                      },
                    })}
                  >
                    <Text fz="xs" fw="bold" color={theme.colors.blue[2]}>
                      {message.user}
                    </Text>
                    <p className="">{message.message}</p>
                  </Box>
                  <Divider my="sm" />
                </div>
              )
            )
          ) : (
            <div>No messages</div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="px-4 py-2 shadow-md">
          <MessageInput
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
            }}
          />
        </form>
      </div>
    </Container>
  );
};

export default Chat;
