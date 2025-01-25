import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export const BalanceCard = () => {
  return (
      <Card className="flex flex-col">
        <div>
          <CardHeader>
            <CardTitle>Balance:</CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className="text-4xl font-extrabold">${2500}</h1>
          </CardContent>
        </div>
      </Card>
  );
};
