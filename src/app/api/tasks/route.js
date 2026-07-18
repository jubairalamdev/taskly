import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const BACKEND = process.env.API_URL || "http://localhost:5000";

async function getSession() {
  const h = await headers();
  return { session: await auth.api.getSession({ headers: h }), cookie: h.get("cookie") || "" };
}

export async function GET() {
  const { session, cookie } = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const res = await fetch(`${BACKEND}/api/tasks`, { headers: { cookie } });
  return Response.json(await res.json(), { status: res.status });
}

export async function POST(request) {
  const { session, cookie } = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const res = await fetch(`${BACKEND}/api/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie },
    body: JSON.stringify(body),
  });
  return Response.json(await res.json(), { status: res.status });
}
