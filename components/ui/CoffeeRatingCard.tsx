import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"

interface CoffeeRating {
  id: number
  coffeeName: string
  rating: number
  review: string
  date: string
}

export default function CoffeeRatingCard({ rating }: { rating: CoffeeRating }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{rating.coffeeName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(rating.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="font-bold">{rating.rating.toFixed(1)}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-2">{rating.review}</p>
        <p className="text-xs text-muted-foreground">Rated on: {rating.date}</p>
      </CardContent>
    </Card>
  )
}

