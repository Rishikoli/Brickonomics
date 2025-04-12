import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');

    let query = supabase.from('labor_rates').select('*');

    if (location) {
      query = query.eq('location', location);
    }

    const { data, error } = await query;

    if (error) throw error;

    // Transform the data to match the frontend property names
    const transformedData = data.map(rate => ({
      id: rate.id,
      role: rate.role,
      dailyRate: rate.daily_rate,
      location: rate.location,
      skillLevel: rate.skill_level,
    }));

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching labor rates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch labor rates' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { role, dailyRate, location, skillLevel } = body;

    const { data, error } = await supabase
      .from('labor_rates')
      .insert([
        {
          role,
          daily_rate: dailyRate,
          location,
          skill_level: skillLevel,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    // Transform the response to match frontend property names
    const transformedData = {
      id: data.id,
      role: data.role,
      dailyRate: data.daily_rate,
      location: data.location,
      skillLevel: data.skill_level,
    };

    return NextResponse.json(transformedData, { status: 201 });
  } catch (error) {
    console.error('Error creating labor rate:', error);
    return NextResponse.json(
      { error: 'Failed to create labor rate' },
      { status: 500 }
    );
  }
}
