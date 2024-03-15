import { useEffect } from "react";
import mongoose from "mongoose";
// import Credemail from "../mongodb/Credemail";

import { NextResponse } from "next/server";


export async function POST(req) {
  const { name } = req.body
  try {
    console.log('Received request:', req);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.log(err)
  }
}