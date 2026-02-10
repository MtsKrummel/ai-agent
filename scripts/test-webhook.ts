
import { StreamClient } from "@stream-io/node-sdk";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const apiKey = process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY!;
const secret = process.env.STREAM_VIDEO_SECRET_KEY!;

if (!apiKey || !secret) {
  console.error("Missing API key or secret in .env file");
  process.exit(1);
}

// Initialize Stream Client (server-side)
const client = new StreamClient(apiKey, secret);

// Use a meeting ID that likely exists or use a placeholder.
// Ideally, the user should replace this with a real ID from their database.
const MEETING_ID_TO_TEST = "REPLACE_WITH_REAL_MEETING_ID";

const payload = {
  type: "call.session_started",
  created_at: new Date().toISOString(),
  call_cid: `default:${MEETING_ID_TO_TEST}`,
  call: {
    type: "default",
    id: MEETING_ID_TO_TEST,
    custom: {
      meetingId: MEETING_ID_TO_TEST,
    },
  },
};

const body = JSON.stringify(payload);

// Generate signature using the secret (mimicking Stream's behavior)
// The SDK documentation says verifyWebhook uses the raw body and signature.
// Here we generate the signature manually if the SDK doesn't expose it easily for testing,
// but client.verifyWebhook is for verifying. To generate, we might need a utility or just rely on the SDK if it has a signing method?
// Actually, Stream's backend signs with HMAC-SHA256. 
// Let's see if we can use a simple crypto approach if the SDK doesn't expose `sign`.
// Wait, the SDK has `verifyWebhook`. It doesn't seemingly expose `signWebhook`.
// We can use crypto to sign it.

import crypto from "crypto";
const signature = crypto.createHmac('sha256', secret).update(body).digest('hex');

async function sendWebhook() {
  console.log(`Sending fake webhook for meeting: ${MEETING_ID_TO_TEST}`);
  console.log("Ensure your Next.js server is running at http://localhost:3000");

  try {
    const response = await fetch("http://localhost:3000/api/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "x-signature": signature,
      },
      body: body,
    });

    const text = await response.text();
    console.log(`Status: ${response.status}`);
    console.log(`Response: ${text}`);
  } catch (error) {
    console.error("Error sending webhook:", error);
  }
}

sendWebhook();
