import React, { useEffect, useState } from "react";

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

  return (
    <div className="bg-gray-200 h-screen flex flex-col">
      <div className="px-4 py-2 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">Global Chat</h1>
      </div>
      <div className="flex-1 overflow-y-scroll">
        {messages.map((message: { id: number; user: string; text: string }) => (
          <div
            key={message.id}
            className="px-4 py-2 bg-white shadow-md rounded-lg my-2"
          >
            <h1 className="text-xl font-bold text-gray-800">{message.user}</h1>
            <p className="text-gray-700">{message.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="px-4 py-2 bg-white shadow-md">
        <input
          type="text"
          placeholder="Type your message here"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          className="px-2 py-1 rounded-lg w-full"
        />
        <button
          type="submit"
          className="px-4 py-1 rounded-lg bg-blue-500 text-white ml-2"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
