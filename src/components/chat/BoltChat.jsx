import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { generateResponse } from "./huggingface";
import TestChat from "./TestChat";
import { BotMessageSquare } from "lucide-react";

const BoltChat = ({ onSubmit, question }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const data2 = question;
  console.log(data2);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const botResponse = await generateResponse(input);
      const assistantMessage = { role: "assistant", content: botResponse };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Lo siento, hubo un error al procesar tu mensaje.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col p-1 md:p-2 lg:p-2 ">
      <div className="w-fit">
        <TestChat
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          data2={data2}
        />
      </div>
      <div className="w-full fito-fondo rounded-lg p-1 md:p-6 shadow-xl mt-6 h-[300px]">
        <div className="overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {messages.map((message, index) => (
            <Message key={index} message={message} />
          ))}
          {isLoading && (
            <div className="flex items-start space-x-2 mr-auto">
              <BotMessageSquare className="w-5 h-5 md:w-6 md:h-6 mt-1 text-blue-400" />
              <div className="p-2 md:p-3 rounded-lg bg-gray-100">
                <p className="text-sm text-slate-700">Escribiendo...</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default BoltChat;
