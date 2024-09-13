import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  const { imageBase64 } = await request.json();

  if (!imageBase64) {
    return NextResponse.json(
      { error: "Image data is required" },
      { status: 400 }
    );
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Generate a concise and descriptive alt text for this image:",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64.split(",")[1]}`,
              },
            },
          ],
        },
      ],
      max_tokens: 300,
    });

    const altText = response.choices[0].message.content;
    return NextResponse.json({ altText });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "Failed to generate alt text", details: error.message },
      { status: 500 }
    );
  }
}
