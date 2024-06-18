import puppeteer from "puppeteer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const { content } = req.body;

    // Create a browser instance
    const browser = await puppeteer.launch();

    // Create a new page
    const page = await browser.newPage();

    // Set the content to the page
    await page.setContent(content);

    // To reflect CSS used for screens instead of print
    await page.emulateMediaType("screen");

    // Download the PDF
    const pdf = await page.pdf({
      format: "A4",
      margin: { top: "100px", right: "50px", bottom: "100px", left: "50px" },
      printBackground: true,
    });

    // Close the browser instance
    await browser.close();

    // Set response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=result.pdf");

    // Send the PDF as response
    res.status(200).send(pdf);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
}
