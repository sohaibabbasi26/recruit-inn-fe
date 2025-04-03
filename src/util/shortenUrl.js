const BITLY_ACCESS_TOKEN = "2539c659338fc6676215bf0646d88e2f5946b575"; // Replace with your actual token

export const shortenUrl = async (longUrl) => {
  try {
    const response = await fetch("https://api-ssl.bitly.com/v4/shorten", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${BITLY_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ long_url: longUrl }),
    });

    if (!response.ok) throw new Error("Failed to shorten URL");

    const data = await response.json();
    return data.link; // Returns the shortened URL
  } catch (error) {
    console.error("Error shortening URL:", error);
    return longUrl; // Return the original URL if shortening fails
  }
};
