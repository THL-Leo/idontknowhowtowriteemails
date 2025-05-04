import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { addSample, deleteSample, ensureDatabaseReady } from '@/lib/db';

export async function POST(req: Request) {
  try {
    // Make sure database is set up correctly
    await ensureDatabaseReady();
    
    const user = await getCurrentUser();
    
    if (!user || !user.email) {
      console.log('No authenticated user found');
      return NextResponse.json(
        { error: 'You must be signed in to add samples' },
        { status: 401 }
      );
    }
    
    console.log('User authenticated:', user.email);
    
    const body = await req.json();
    const { description, content } = body;
    
    console.log('Received sample data:', { description, contentLength: content?.length });
    
    if (!description || !content) {
      return NextResponse.json(
        { error: 'Description and content are required' },
        { status: 400 }
      );
    }
    
    console.log('Adding sample for user:', user.email);
    const result = await addSample(user.email, content, description);
    
    if (!result.success) {
      console.error('Failed to add sample:', result.error);
      return NextResponse.json(
        { error: result.error || 'Failed to add sample' },
        { status: 500 }
      );
    }
    
    console.log('Sample added successfully');
    return NextResponse.json({
      success: true,
      sample: result.data?.[0] || { id: 'sample-added' }
    });
  } catch (error) {
    console.error('Error in samples API route:', error);
    return NextResponse.json(
      { error: 'Failed to add sample' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const sampleId = url.searchParams.get('id');
    
    if (!sampleId) {
      return NextResponse.json(
        { error: 'Sample ID is required' },
        { status: 400 }
      );
    }
    
    const user = await getCurrentUser();
    
    if (!user || !user.email) {
      return NextResponse.json(
        { error: 'You must be signed in to delete samples' },
        { status: 401 }
      );
    }
    
    const result = await deleteSample(sampleId, user.email);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to delete sample' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to delete sample: ${error}` },
      { status: 500 }
    );
  }
}