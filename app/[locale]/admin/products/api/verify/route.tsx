import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.AZURE_API_KEY,
  baseURL: `${process.env.AZURE_ENDPOINT}/openai/deployments/${process.env.AZURE_DEPLOYMENT}`,
  defaultQuery: { 'api-version': process.env.AZURE_API_VERSION },
  defaultHeaders: { 'api-key': process.env.AZURE_API_KEY },
});

export async function POST(req: NextRequest) {
  const { image1, image2, description } = await req.json();
  
  try {
    const matchRes = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a vision model that checks if an image matches a description.' },
        {
          role: 'user',
          content: [
            { type: 'text', text: `Does this image match the description: "${description}"? Reply with only 'true' or 'false'.` },
            { type: 'image_url', image_url: { url: image1 } }
          ]
        }
      ],
      model: process.env.AZURE_DEPLOYMENT as string,
      temperature: 0.2,
      max_tokens: 10
    });

    const comparisonRes = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a vision model that compares two images.' },
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Compare these images and reply with only "same" or "different".' },
            { type: 'image_url', image_url: { url: image1 } },
            { type: 'image_url', image_url: { url: image2 } }
          ]
        }
      ],
      model: process.env.AZURE_DEPLOYMENT as string ?? "your-default-model",
      temperature: 0.2,
      max_tokens: 10
    });

    return NextResponse.json({
      match: matchRes.choices[0].message.content?.trim().toLowerCase() ?? null,
      comparison: comparisonRes.choices[0].message.content?.trim().toLowerCase() ?? null,
    });
  } catch (err) {
    return NextResponse.json({ error: 'Verification failed', detail: (err as Error).message }, { status: 500 });
  }
}
