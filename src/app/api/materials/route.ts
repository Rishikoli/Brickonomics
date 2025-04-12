import { NextResponse } from 'next/server';
import { getMaterials, addMaterial, updateMaterial } from '@/lib/localDb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const materials = await getMaterials(category || undefined);
    return NextResponse.json(materials || []);
  } catch (error) {
    console.error('Error fetching materials:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch materials' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received material data:', body);

    const { name, unit, baseRate, category, description } = body;

    // Validate required fields
    if (!name || !unit || !baseRate || !category) {
      console.error('Missing required fields:', { name, unit, baseRate, category });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const id = await addMaterial({
      name,
      unit,
      baseRate,
      category,
      description,
    });

    return NextResponse.json({ id, name, unit, baseRate, category, description });
  } catch (error) {
    console.error('Error saving material:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to save material' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Missing material ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    console.log('Updating material:', body);

    const { name, unit, baseRate, category, description } = body;

    // Validate required fields
    if (!name || !unit || !baseRate || !category) {
      console.error('Missing required fields:', { name, unit, baseRate, category });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await updateMaterial(id, {
      name,
      unit,
      baseRate,
      category,
      description,
    });

    return NextResponse.json({ id, name, unit, baseRate, category, description });
  } catch (error) {
    console.error('Error updating material:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update material' },
      { status: 500 }
    );
  }
}
