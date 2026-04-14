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
        <Card
          className="text-sm my-4 bg-[#89eae0] bg-linear-to-br from-[#89eae0] to-[#f1e8fb]
       hover:bg-linear-to-br"
        >
          <CardHeader>
            <CardTitle className="text-sm">
              Uso del Almacenamiento Persistente del Navegador
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={usage} className="w-full" />
            <p className="">{usage.toFixed(2)}% usado</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
