// // pages/api/generate-pdf.js
// import puppeteer from 'puppeteer';

// export default async (req, res) => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.setContent(req.body.htmlContent, { waitUntil: 'networkidle0' });
//   const pdf = await page.pdf({ format: 'A4' });
//   await browser.close();
//   res.setHeader('Content-Type', 'application/pdf');
//   res.send(pdf);
// };

// pages/api/generate-pdf.js
// import puppeteer from 'puppeteer';

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const { content } = req.body;

//     try {
//       const browser = await puppeteer.launch();
//       const page = await browser.newPage();
//       await page.setContent(content); // Set content on the page

//       // Generate PDF
//       const pdfBuffer = await page.pdf({ format: 'A4' });

//       await browser.close();

//       // Send PDF as response
//       res.setHeader('Content-Type', 'application/pdf');
//       res.setHeader('Content-Disposition', 'attachment; filename=overlay.pdf');
//       res.send(pdfBuffer);
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//       res.status(500).send('Error generating PDF');
//     }
//   } else {
//     res.status(405).send('Method Not Allowed');
//   }
// }
import puppeteer from 'puppeteer';

export default async function handler(req, res) {
  try{
    if (req.method === 'POST') {
      const { content } = req.body;
  
      try {
        // Launch Puppeteer with the new Headless mode
        // const browser = await puppeteer.launch({ headless: "new" });
        const browser = await puppeteer.launch({
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
          headless: true 
        });
        const page = await browser.newPage();
        await page.setContent(content); // Set content on the page
  
        // Generate PDF
        const pdfBuffer = await page.pdf({ format: 'A4' });
  
        await browser.close();
  
        // Send PDF as response
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=overlay.pdf');
        res.send(pdfBuffer);
      } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Error generating PDF');
      }
    } else {
      res.status(405).send('Method Not Allowed');
    }
  } catch(err){
    console.log("error:",err);
  }
}