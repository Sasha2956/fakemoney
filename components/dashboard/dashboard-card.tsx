import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  description: string;
  endAdorment?: React.ReactNode;
  className?: string;
}

export const DashboardCard = ({
  title,
  children,
  description,
  endAdorment,
  className,
}: DashboardCardProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{title}</CardTitle>
          {endAdorment}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
