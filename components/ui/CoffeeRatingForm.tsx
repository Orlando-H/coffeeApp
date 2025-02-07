"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { supabase } from "@/lib/supabaseClient"

const formSchema = z.object({
  coffee_name: z.string().min(2, {
    message: "Coffee name must be at least 2 characters.",
  }),
  origin: z.string().min(2, {
    message: "Origin must be at least 2 characters.",
  }),
  roast_level: z.string().min(2, {
    message: "Roast level must be at least 2 characters.",
  }),
  aroma: z.number().min(1).max(10),
  flavor: z.number().min(1).max(10),
  acidity: z.number().min(1).max(10),
  body: z.number().min(1).max(10),
  aftertaste: z.number().min(1).max(10),
})

export function CoffeeRatingForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coffee_name: "",
      origin: "",
      roast_level: "",
      aroma: 5,
      flavor: 5,
      acidity: 5,
      body: 5,
      aftertaste: 5,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // Insert the data into the coffee_ratings table in Supabase
    const { data, error } = await supabase
      .from('coffee_ratings')
      .insert([values])

    if (error) {
      console.error('Error submitting rating:', error)
      alert('Error submitting rating')
    } else {
      alert('Coffee rating submitted successfully!')
      form.reset()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="coffee_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Coffee Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Ethiopian Yirgacheffe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="origin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Origin</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Ethiopia" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="roast_level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Roast Level</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Medium" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="aroma"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aroma</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-4">
                  <Slider
                    min={1}
                    max={10}
                    step={1}
                    value={[field.value]}
                    onValueChange={(value) => field.onChange(value[0])}
                  />
                  <span className="w-12 text-center">{field.value}</span>
                </div>
              </FormControl>
              <FormDescription>Rate the aroma from 1 to 10</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="flavor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Flavor</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-4">
                  <Slider
                    min={1}
                    max={10}
                    step={1}
                    value={[field.value]}
                    onValueChange={(value) => field.onChange(value[0])}
                  />
                  <span className="w-12 text-center">{field.value}</span>
                </div>
              </FormControl>
              <FormDescription>Rate the flavor from 1 to 10</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="acidity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Acidity</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-4">
                  <Slider
                    min={1}
                    max={10}
                    step={1}
                    value={[field.value]}
                    onValueChange={(value) => field.onChange(value[0])}
                  />
                  <span className="w-12 text-center">{field.value}</span>
                </div>
              </FormControl>
              <FormDescription>Rate the acidity from 1 to 10</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Body</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-4">
                  <Slider
                    min={1}
                    max={10}
                    step={1}
                    value={[field.value]}
                    onValueChange={(value) => field.onChange(value[0])}
                  />
                  <span className="w-12 text-center">{field.value}</span>
                </div>
              </FormControl>
              <FormDescription>Rate the body from 1 to 10</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="aftertaste"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aftertaste</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-4">
                  <Slider
                    min={1}
                    max={10}
                    step={1}
                    value={[field.value]}
                    onValueChange={(value) => field.onChange(value[0])}
                  />
                  <span className="w-12 text-center">{field.value}</span>
                </div>
              </FormControl>
              <FormDescription>Rate the aftertaste from 1 to 10</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit Rating</Button>
      </form>
    </Form>
  )
}