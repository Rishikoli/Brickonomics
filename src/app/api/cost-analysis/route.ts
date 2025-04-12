import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      projectName,
      projectType,
      totalArea,
      estimatedDuration,
      location,
      requirements,
    } = body;

    // 1. Create the project
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .insert([
        {
          project_name: projectName,
          project_type: projectType,
          total_area: parseFloat(totalArea),
          estimated_duration: parseInt(estimatedDuration),
          location,
          requirements,
          status: 'pending',
        },
      ])
      .select()
      .single();

    if (projectError) throw projectError;

    // 2. Create initial cost analysis
    const { data: costAnalysis, error: costError } = await supabase
      .from('cost_analysis')
      .insert([
        {
          project_id: project.id,
          material_cost: 0,
          labor_cost: 0,
          transportation_cost: 0,
          overhead_cost: 0,
          total_cost: 0,
          cost_per_sqft: 0,
        },
      ])
      .select()
      .single();

    if (costError) throw costError;

    // 3. Return the combined data
    return NextResponse.json(
      {
        project,
        costAnalysis,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Failed to create cost analysis:', error);
    return NextResponse.json(
      { error: 'Failed to create cost analysis' },
      { status: 500 }
    );
  }
}
