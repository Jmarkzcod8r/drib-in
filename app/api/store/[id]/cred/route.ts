import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  console.log('----api/store/[id]/cred------------')


  const payload = await req.json()
  console.log(`payload`, payload)
 return Response.json({ message: 'jasd' });
}