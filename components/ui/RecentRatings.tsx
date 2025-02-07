"use client"

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Rating {
  id: number;
  coffee_name: string;
  flavor: number;
  created_at: string;
}

export function RecentRatings() {
  const [ratings, setRatings] = useState<Rating[]>([]);

  useEffect(() => {
    const fetchRatings = async () => {
      const { data, error } = await supabase
        .from('coffee_ratings')
        .select('id, coffee_name, flavor, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching ratings:', error);
      } else {
        setRatings(data);
      }
    };

    fetchRatings();
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Coffee</TableHead>
          <TableHead>Flavor</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ratings.map((rating) => (
          <TableRow key={rating.id}>
            <TableCell>{rating.coffee_name}</TableCell>
            <TableCell>{rating.flavor}</TableCell>
            <TableCell>{new Date(rating.created_at).toLocaleDateString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}