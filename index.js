const { execSync } = require("child_process");
const puppeteer = require("puppeteer");

const url = process.argv.find(s => s.match(/^--url=/)).slice(6);
const path = process.argv.find(s => s.match(/^--path=/)).slice(7);

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const startLoadTime = new Date();
  await page.goto(url, {
    waitUntil: "networkidle2",
  });
  const endLoadTime = new Date();

  const dateString = startLoadTime.toISOString();
  const timeTaken = endLoadTime.getTime() - startLoadTime.getTime();
  execSync(`echo "${dateString} ${timeTaken}" >> ${path}`);

  await browser.close();
})();
