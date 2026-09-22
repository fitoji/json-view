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
        <Card className="bg-card/80 backdrop-blur-xl shadow-lg border border-border/50 my-4 max-w-md mx-auto">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-card-foreground">
              Uso del Almacenamiento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={usage} className="h-2 bg-muted" />
            <p className="text-sm text-muted-foreground mt-2">
              {usage.toFixed(2)}% usado
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
