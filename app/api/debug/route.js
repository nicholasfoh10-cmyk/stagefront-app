export async function GET() {
  return Response.json({
    nextauth_url: process.env.NEXTAUTH_URL,
    node_env: process.env.NODE_ENV,
  });
}
