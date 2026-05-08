import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Progress } from "../components/ui/progress";

export default function StorageUsage({ usage }) {
  return (
    <div>
      {usage > 0.3 && (
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 my-4 max-w-md mx-auto">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-700 dark:text-slate-200">
              Uso del Almacenamiento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={usage} className="h-2 bg-slate-200 dark:bg-slate-700" />
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              {usage.toFixed(2)}% usado
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}