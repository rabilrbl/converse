import { ThemeContext } from "@emotion/react";
import { Box, Container, Divider, Text, useMantineTheme } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { MessageInput } from "../components/Chat/MessageInput";

const Chat = () => {
  const [messages, setMessages] = useState<any>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    async function fetchMessages() {
      setMessages([
        {
          id: 1,
          user: "User 1",
          text: "Hello World",
        },
        {
          id: 2,
          user: "User 2",
          text: "Hello World",
        },
        {
          id: 3,
          user: "User 3",
          text: "Hello World",
        },
      ]);
    }

    fetchMessages();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // await axios.post("http://my-api.com/messages", {
    //   message: newMessage,
    // });
    // setNewMessage("");
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        user: "User",
        text: newMessage,
      },
    ]);
  };

  const theme = useMantineTheme();

  return (
    <Container>
      <div className="bg-inherit h-[95vh] flex flex-col">
        <div className="px-4 py-2 shadow-md">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
            Chat
          </h1>
        </div>
        <div className="flex-1 overflow-y-scroll">
          {messages.map((message: { id: number; user: string; text: string }) => (
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
                <p className="">{message.text}</p>
              </Box>
              <Divider my="sm" />
            </div>
          ))}
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
