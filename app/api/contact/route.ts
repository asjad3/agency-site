import { NextRequest, NextResponse } from "next/server";

interface ContactRequestBody {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactRequestBody = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "MISSING_REQUIRED_FIELDS" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "INVALID_EMAIL_FORMAT" },
        { status: 400 }
      );
    }

    // In a real application, you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Add to CRM, etc.

    // For now, we'll just log and return success
    console.log("Contact form submission:", {
      name: body.name,
      email: body.email,
      message: body.message,
      timestamp: new Date().toISOString(),
    });

    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json(
      { success: true, message: "TRANSMISSION_RECEIVED" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "INTERNAL_SERVER_ERROR" },
      { status: 500 }
    );
  }
}
