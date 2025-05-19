import insight from "@/gemini/ai-insight";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { amount, category } = await request.json();
  if (!amount || !category) {
    return NextResponse.json(
      {
        message: "incomplete fields",
      },
      { status: 400 }
    );
  }
  const result = await insight(amount, category);
  if (!result) {
    return NextResponse.json(
      {
        message: "failed to generate ai insight",
      },
      { status: 500 }
    );
  }
  return NextResponse.json(
    {
      message: result,
    },
    { status: 201 }
  );
}
