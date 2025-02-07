import { BotMessageSquare } from "lucide-react";
import ReactMarkdown from "react-markdown";

const Message = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex items-start mt-2 p-2 space-x-2 md:space-x-3${
        isUser ? "flex-row-reverse space-x-reverse ml-auto" : "mr-auto"
      }`}
    >
      {!isUser && (
        <BotMessageSquare className="w-5 h-5 md:w-6 md:h-6 mt-1 text-blue-400 flex-shrink-0" />
      )}
      <div
        className={`p-1 md:p-2 rounded-lg ${
          isUser
            ? "bg-sky-500 text-white shadow-sm"
            : "bg-gray-100 text-slate-700 shadow-sm"
        }`}
      >
        {/* <p className="text-sm md:text-base leading-relaxed break-words h-auto prose">
          {message.content}
        </p> */}
        <ReactMarkdown className="prose text-sm md:text-base leading-relaxed break-words h-auto">
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Message;
