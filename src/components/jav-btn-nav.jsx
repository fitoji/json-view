import React from "react";
import { BotMessageSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
export default function JavBtn() {
  return (
    <div id="driver-step-6">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">
            <BotMessageSquare className="w-6 h-6 mt-1 text-blue-400" />
            JavGPT
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>JavGpt responde.</DialogTitle>
            <DialogDescription>
              Modo Experimentación, activalo en el Test y podrás preguntarle a
              la IA rapidamente. Clickea en las palabras claves y ¡JavGpt te
              aclará las dudas!
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <div>
              <h1>Modo Experimentación</h1>
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            {/* <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
