const fs = require("fs");
const path = require("path");

export const DELETE = async (req) => {
  try {
    const requestBody = await req.json();
    console.log(requestBody);

    const { uuid } = requestBody; // Extract 'uuid' from the parsed request body
    if (!uuid || typeof uuid !== "string" || uuid.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Invalid 'uuid' in request URL" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Define file path in the public folder
    const filePath = path.join(process.cwd(), "public", "audio", `${uuid}.mp3`);
    console.log(filePath);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return new Response(JSON.stringify({ error: "Audio file not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Delete the file
    fs.unlinkSync(filePath);
    console.log("Audio deleted successfully!");

    return new Response(
      JSON.stringify({ message: "Audio deleted successfully!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error deleting audio:", error.message);
    return new Response(JSON.stringify({ error: "Failed to delete audio" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
