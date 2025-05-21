import main from "@/gemini/gemini";
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
