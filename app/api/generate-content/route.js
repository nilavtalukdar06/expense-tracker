import main from "@/gemini/gemini";
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
  const result = await main(amount, category);
  if (!result) {
    return NextResponse.json(
      {
        message: "failed to generate ai response",
      },
      { status: 500 }
    );
  } else {
    return NextResponse.json(
      {
        message: result,
      },
      { status: 201 }
    );
  }
}
