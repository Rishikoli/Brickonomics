import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { projectName, projectType, totalArea, estimatedDuration, location, requirements } = body;

    const { data, error } = await supabase
      .from('projects')
      .insert([
        {
          project_name: projectName,
          project_type: projectType,
          total_area: parseFloat(totalArea),
          estimated_duration: parseInt(estimatedDuration),
          location,
          requirements: requirements || '',
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Failed to create project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        project_materials (
          *,
          materials (*)
        ),
        project_labor (
          *,
          labor_rates (*)
        ),
        cost_analysis (*)
      `);

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
