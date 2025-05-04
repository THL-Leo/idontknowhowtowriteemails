import { getUserSamples } from './db';

export async function generateEmailWithClaude(userEmail: string, description: string) {
  try {
    // Get user's email samples
    const samples = await getUserSamples(userEmail);
    
    if (!samples || samples.length === 0) {
      return {
        success: false,
        error: 'No email samples found. Please add some samples first.'
      };
    }

    // Format samples for the prompt
    const formattedSamples = samples
      .slice(0, 5) // Only use up to 5 samples
      .map((sample, index) => {
        return `Sample ${index + 1}: ${sample.content}\n\n`;
      })
      .join('');

    // Construct the prompt for Claude
    const systemPrompt = `You are an email writing assistant that helps users write emails in their own style.
      Your job is to draft emails based on the user's description, matching their writing style.

      Here are examples of the user's email writing style:
      ${formattedSamples}

      When drafting emails:
      1. Use the same level of formality as shown in the examples
      2. Mirror sentence length and complexity
      3. Use similar greetings and sign-offs
      4. Maintain similar paragraph structure
      5. Include only the email content, no subject line or metadata
    `;

    const userPrompt = `Write an email based on this description: ${description}`;

    // Call Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-opus-20240229',
        max_tokens: 1024,
        system: systemPrompt,
        messages: [
          { role: 'user', content: userPrompt }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Claude API error: ${errorData.error?.message || 'Unknown error'}`); 
    }

    const data = await response.json();
    const generatedEmail = data.content[0].text;

    return {
      success: true,
      email: generatedEmail
    };
  } catch (error) {
    console.error('Error generating email with Claude:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}
