import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CoffeeRatingForm } from "@/components/ui/CoffeeRatingForm";

export default function RatePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Rate a Coffee</h1>
      <Card>
        <CardHeader>
          <CardTitle>Coffee Rating Form</CardTitle>
        </CardHeader>
        <CardContent>
          <CoffeeRatingForm />
        </CardContent>
      </Card>
    </div>
  );
}