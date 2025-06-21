import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.AZURE_API_KEY,
  baseURL: `${process.env.AZURE_ENDPOINT}/openai/deployments/${process.env.AZURE_DEPLOYMENT}`,
  defaultQuery: { 'api-version': process.env.AZURE_API_VERSION },
  defaultHeaders: { 'api-key': process.env.AZURE_API_KEY as string },
});

export async function POST(req: NextRequest) {
  try {
    const { reviewText } = await req.json();
    console.log(reviewText)
    if (!reviewText) {
      return NextResponse.json({ error: 'Review text is required.' }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are an expert at identifying if a review is written by a human or if it seems promotional or AI-generated.
Respond with ONLY one of the following:
- "promotional"
- "ai-generated"
- "authentic"`,
        },
        {
          role: 'user',
          content: `Review: "${reviewText}"`,
        },
      ],
      model: process.env.AZURE_DEPLOYMENT as string,
      temperature: 0.2,
      max_tokens: 10,
    });

    const result = response.choices[0].message.content?.trim().toLowerCase();

    return NextResponse.json({
      result,
      isAuthentic: result === 'authentic',
    });
  } catch (error: any) {
    console.error('Error in /api/verify:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
