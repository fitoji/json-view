import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { BotMessageSquare } from "lucide-react";
import BoltChat from "./chat/BoltChat";

export default function BotonJavGpt({ question }) {
  return (
    <div>
      <Dialog className="shadow-lg">
        <DialogTrigger asChild>
          <Button variant="outline">
            <BotMessageSquare className="w-6 h-6 mt-1 text-sky-400" />
            JavGPT
          </Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col gap-4 w-fit max-w-[70vw] min-w-[50vw]">
          <DialogHeader className="w-full">
            <DialogTitle>JavGpt responde.</DialogTitle>
            <DialogDescription className="text-slate-800">
              Clickea en las opciones y ¡JavGpt te aclará las dudas!
            </DialogDescription>
          </DialogHeader>
          <div className="flex w-full">
            <BoltChat question={question} />
          </div>
          <div className="flex justify-end mt-auto">
            <DialogClose asChild>
              <Button
                type="button"
                className="bg-emerald-400 hover:bg-emerald-300"
              >
                Cerrar
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
