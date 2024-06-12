// Define controller outside the function
let controller = new AbortController();

export default async function getIcons(query) {
  // Abort the previous request if it exists
  controller.abort();
  // Reset controller for the next call
  controller = new AbortController();

  try {
    const response = await fetch(`/api/stack-icons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      signal: controller.signal,
    });

    if (!response.ok) {
      return { error: "Failed to fetch data" };
    }

    const data = await response.json();

    return { data };
  } catch (err) {
    console.log("error", err);
    if (err.name !== "AbortError") {
      console.error("Error fetching data:", err);
      return { err: "Error fetching data" };
    }
  }
  controller.abort();
}
