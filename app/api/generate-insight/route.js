import insight from "@/gemini/ai-insight";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { amount, category, is_member } = await request.json();
  if (!amount || !category || !is_member) {
    return NextResponse.json(
      {
        message: "incomplete fields",
      },
      { status: 400 }
    );
  }
  if (is_member === false) {
    return NextResponse.json(
      {
        message: "not a premium member",
      },
      { status: 201 }
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
