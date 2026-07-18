import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const BACKEND = process.env.API_URL || "http://localhost:5000";

async function fetchWithTimeout(url, options, timeout = 5000) {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), timeout);
  try {
    const res = await fetch(url, { ...options, signal: ctrl.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}

export async function GET() {
  const h = await headers();
  const sessionData = await auth.api.getSession({ headers: h });
  if (!sessionData) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const token = sessionData.session.token;
  const res = await fetchWithTimeout(`${BACKEND}/api/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return Response.json(await res.json(), { status: res.status });
}

export async function POST(request) {
  const h = await headers();
  const sessionData = await auth.api.getSession({ headers: h });
  if (!sessionData) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const token = sessionData.session.token;
  const body = await request.json();
  const res = await fetchWithTimeout(`${BACKEND}/api/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });
  return Response.json(await res.json(), { status: res.status });
}
