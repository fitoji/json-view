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
      <Dialog className="bg-slate-800 shadow-lg">
        <DialogTrigger asChild>
          <Button variant="outline">
            <BotMessageSquare className="w-6 h-6 mt-1 text-sky-400" />
            JavGPT
          </Button>
        </DialogTrigger>
        <DialogContent className=" w-[70%] max-w-none h-auto">
          <DialogHeader>
            <DialogTitle>JavGpt responde.</DialogTitle>
            <DialogDescription>
              Clickea en las opciones y ¡JavGpt te aclará las dudas!
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <BoltChat question={question} />
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                type="button"
                className="bg-emerald-400 hover:bg-emerald-300"
              >
                Cerrar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
