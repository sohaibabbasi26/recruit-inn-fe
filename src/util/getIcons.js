// Define controller outside the function
let controller = new AbortController();

export default async function getIcons(query) {
  // Abort the previous request if it exists
  controller.abort();
  // Reset controller for the next call
  controller = new AbortController();
  const signal = controller.signal;

  try {
    const response = await fetch(`/api/stack-icons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      signal, // Pass the signal to the fetch request
    });

    if (!response.ok) {
      return { error: "Failed to fetch data" };
    }

    const data = await response.json();

    return { data };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: "Error fetching data" };
  }
}
