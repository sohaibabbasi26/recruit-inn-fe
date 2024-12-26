import fs from "fs";
import path from "path";
import googleTTS from "node-google-tts-api";
import {v4} from "uuid";

export const POST = async (req) => {
  try {
    const body = await req.json(); // Parse the JSON body
    const text = body?.text; // Safely access 'text'

    // Validate 'text'
    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Invalid 'text' in request body" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const lang = "ar";

    // Generate the MP3 buffer
    const tts = new googleTTS();
    const audioBuffer = await tts.get({ text, lang, limit_bypass: true });
    const generatedUUID = v4();

    // Define file path in the public folder
    const filePath = path.join(
      process.cwd(),
      "public",
      "audio",
      `${generatedUUID}.mp3`
    );

    // Ensure the directory exists
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    // Write the file to the public folder
    fs.writeFileSync(filePath, audioBuffer);

    return new Response(
      JSON.stringify({
        uuid: generatedUUID,
        message: "Audio generated successfully!",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error generating audio:", error);
    return new Response(JSON.stringify({ error: "Failed to generate audio" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
