import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Generate a simple project ID
    const project_id = `PROJ-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // TODO: Implement actual project submission logic
    // - Save to database
    // - Trigger AI evaluation
    // - Send to Confluence
    // - Notify Slack
    
    console.log('New project submission:', {
      project_id,
      title: data.title,
      team: data.team,
      useCaseType: data.useCaseType,
      problemCategory: data.problemCategory
    });
    
    return NextResponse.json({
      success: true,
      project_id,
      message: 'Project submitted successfully'
    });
    
  } catch (error) {
    console.error('Error submitting project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit project' },
      { status: 500 }
    );
  }
}