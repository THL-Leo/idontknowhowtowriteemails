import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { generateEmailWithClaude } from '@/lib/claude';

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    
    if (!user || !user.email) {
      return NextResponse.json(
        { error: 'You must be signed in to generate emails' },
        { status: 401 }
      );
    }
    
    const { description } = await req.json();
    
    if (!description) {
      return NextResponse.json(
        { error: 'Email description is required' },
        { status: 400 }
      );
    }
    
    const result = await generateEmailWithClaude(user.email, description);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      email: result.email
    });
  } catch (error) {
    console.error('Error in Claude API route:', error);
    return NextResponse.json(
      { error: 'Failed to generate email' },
      { status: 500 }
    );
  }
}