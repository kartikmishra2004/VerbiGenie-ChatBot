import React, { useState } from "react";
import ReactMarkdown from 'react-markdown';

const App = () => {

  const [chat, setChat] = useState({
    prompt: ""
  });

  const [resData, setResData] = useState("")

  const [res, setRes] = useState("hidden");

  const handleChange = (e) => {
    setChat({
      prompt: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/v1/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chat),
      });
      const data = await response.json();
      setRes("block");
      setResData(data);
    } catch (error) {
      console.log("Faild to get response!!", error);

    }
  }

  return (
    <div class="max-w-md mx-auto my-40 bg-white dark:bg-zinc-800 shadow-2xl border border-zinc-200 rounded-lg overflow-hidden">
      <div class="flex flex-col h-[400px]">
        <div class="px-4 py-3 border-b dark:border-zinc-700">
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-semibold text-zinc-800 dark:text-white">
              VerbiGenie
            </h2>
            <div class="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              Online
            </div>
          </div>
        </div>
        <div
          class="flex-1 p-3 overflow-y-auto flex flex-col space-y-2"
          id="chatDisplay">
          <div class="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
            Hello! How can I assist you today?
          </div>
          <div class={`chat-message ${res} self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm`}><ReactMarkdown>{resData}</ReactMarkdown></div>
        </div>
        <div class="px-3 py-2 border-t dark:border-zinc-700">
          <form onSubmit={handleSubmit}>
            <div class="flex gap-2">
              <input
                name="prompt"
                value={chat.prompt}
                onChange={handleChange}
                placeholder="Type your message..."
                class="flex-1 p-2 border rounded-lg dark:bg-zinc-700 dark:text-white dark:border-zinc-600 text-sm"
                id="chatInput"
                type="text" />
              <button
                type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-lg transition duration-300 ease-in-out text-sm"
                id="sendButton">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
