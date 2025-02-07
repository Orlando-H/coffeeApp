"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Coffee, Star, Users, Zap } from "lucide-react"
import { CoffeeQualityChart } from "@/components/ui/CoffeeQualityChart"
import { RecentRatings } from "@/components/ui/RecentRatings"
import { supabase } from "@/lib/supabaseClient"

export default function Dashboard() {
  const [totalCoffees, setTotalCoffees] = useState<number>(0)
  const [avgRating, setAvgRating] = useState<number>(0)
  const [ratingsToday, setRatingsToday] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      const { data: coffeeData, error: coffeeError } = await supabase
        .from('coffee_ratings')
        .select('id', { count: 'exact' })
      if (coffeeError) {
        console.error('Error fetching total coffees:', coffeeError)
      } else {
        setTotalCoffees(coffeeData.length)
      }

      const { data: avgRatingData, error: avgRatingError } = await supabase
        .from('coffee_ratings')
        .select('aroma, flavor, acidity, body, aftertaste')
      if (avgRatingError) {
        console.error('Error fetching average rating:', avgRatingError)
      } else {
        const totalRatings = avgRatingData.length
        const totalScore = avgRatingData.reduce((acc, rating) => {
          return acc + rating.aroma + rating.flavor + rating.acidity + rating.body + rating.aftertaste
        }, 0)
        setAvgRating(totalScore / (totalRatings * 5))
      }

      
      const today = new Date().toISOString().split('T')[0]
      const { data: ratingsTodayData, error: ratingsTodayError } = await supabase
        .from('coffee_ratings')
        .select('id')
        .gte('created_at', today)
      if (ratingsTodayError) {
        console.error('Error fetching ratings today:', ratingsTodayError)
      } else {
        setRatingsToday(ratingsTodayData.length)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex flex-row items-center justify-between p-6">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Total Coffees</p>
              <p className="text-2xl font-bold">{totalCoffees}</p>
            </div>
            <Coffee className="h-4 w-4 text-muted-foreground" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-row items-center justify-between p-6">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
              <p className="text-2xl font-bold">{avgRating.toFixed(1)}</p>
            </div>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-row items-center justify-between p-6">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Active Users</p>
              <p className="text-2xl font-bold">1,234</p>
            </div>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-row items-center justify-between p-6">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Ratings Today</p>
              <p className="text-2xl font-bold">+{ratingsToday}</p>
            </div>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Coffee Quality Overview</h2>
            <CoffeeQualityChart />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Ratings</h2>
            <RecentRatings />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}