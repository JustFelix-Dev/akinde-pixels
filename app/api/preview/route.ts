import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const path = searchParams.get("path") || "/";

  if (!secret || secret !== (process.env.PREVIEW_SECRET || "preview-secret")) {
    return NextResponse.json({ message: "Invalid preview secret" }, { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  return NextResponse.redirect(new URL(path, request.url));
}
