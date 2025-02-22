import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Send, Trash2 } from "lucide-react";

export default function TestChat({
  handleSubmit,
  input,
  setInput,
  isLoading,
  data2,
}) {
  const data = data2;
  //console.log("valor de data", data);

  const handleClick = (value) => {
    setInput((prevValue) => prevValue + (prevValue ? " " : "") + value);
  };

  const buttonKeys = ["question", "option1", "option2", "option3", "option4"];
  const buttonKeysQuestion = [
    "¿porqué?",
    "¿dónde?",
    "¿cómo?",
    "¿cuál?",
    "¿que?",
  ];
  const contextoPregunta = `Responde considerando el modulo ${data2.asignatura}, dentro del tema ${data2.tema}`;
  //console.log("el contexto es", contextoPregunta);

  const handleDelete = () => {
    setInput("");
  };

  return (
    <div className="flex flex-col bg-primary-foreground w-auto rounded-lg p-4 md:p-6 shadow-md">
      <div>
        {buttonKeys.map((key) => (
          <Button
            key={key}
            onClick={() => handleClick(data2[key])}
            className={`w-full text-sm md:text-base font-medium text-left text-slate-800 border-solid rounded-sm transition-colors duration-200 ${
              key === "question"
                ? "bg-emerald-50 border col-span-1 md:col-span-2 lg:col-span-3 hover:bg-emerald-200"
                : "bg-emerald-100 hover:bg-sky-200"
            } truncate px-3 py-2`}
          >
            <span className="block truncate">{data2[key]}</span>
          </Button>
        ))}
      </div>

      <Separator className="my-2 md:my-3 bg-slate-400" />

      <div className="flex flex-wrap gap-2 mb-4 justify-around">
        {buttonKeysQuestion.map((key, index) => (
          <Button
            key={index}
            onClick={() => handleClick(key)}
            className="text-sm md:text-base bg-sky-200 text-slate-800 hover:bg-sky-300 px-4 py-2 rounded-lg transition-colors duration-200"
          >
            {key}
          </Button>
        ))}
      </div>

      <Separator className="mb-4 bg-slate-400" />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-around gap-2">
            <Button
              size="sm"
              className="bg-rose-600 hover:bg-rose-400 transition-colors duration-200 px-4 py-2"
              onClick={handleDelete}
            >
              <Trash2 className="w-5 h-5" />
            </Button>
            <Button
              size="sm"
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 transition-colors duration-200 px-4 py-2"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <Textarea
            name="message"
            placeholder="Clickea en las opciones para formar la pregunta a JavGPT"
            value={input}
            rows={4}
            onChange={(e) => setInput(e.target.value)}
            className="w-full min-h-[100px] md:min-h-[120px] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
          />
        </div>
      </form>
    </div>
  );
}
