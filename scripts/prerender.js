import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const routes = [
  '/',
  '/about',
  '/contact',
  '/app-admin/products',
  '/app-admin/farm-owners',
  '/farm-admin/dashboard',
  '/farm-admin/products',
  '/farm-admin/farm-detail',
  '/farm-admin/farm-gallery-upload'
];

async function prerender() {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
  });
  const page = await browser.newPage();

  for (const route of routes) {
    const url = `file://${path.resolve('dist/index.html')}`;
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.evaluate((path) => {
      window.history.pushState({}, '', path);
    }, route);
    await page.waitForTimeout(1000); // Wait for any async operations to complete

    const html = await page.content();
    const filePath = path.join('dist', route === '/' ? 'index.html' : `${route}.html`);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, html);

    console.log(`Prerendered: ${route}`);
  }

  await browser.close();
}

prerender().catch(console.error);