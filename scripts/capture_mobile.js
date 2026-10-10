import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/USER/.gemini/antigravity-ide/brain/fb71a455-af50-4658-a7ae-77c771a87eb2';

async function main() {
  const listRes = await fetch('http://localhost:9222/json/list');
  const listData = await listRes.json();
  const pageTarget = listData.find(t => t.type === 'page') || listData[0];
  const pageWsUrl = pageTarget.webSocketDebuggerUrl;

  const ws = new WebSocket(pageWsUrl);

  let idCounter = 1;
  const callbacks = new Map();

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && callbacks.has(msg.id)) {
      callbacks.get(msg.id)(msg);
      callbacks.delete(msg.id);
    }
  };

  const send = (method, params = {}) => {
    return new Promise((resolve) => {
      const id = idCounter++;
      callbacks.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
  };

  await new Promise((resolve) => (ws.onopen = resolve));

  await send('Page.enable');
  await send('Runtime.enable');
  await send('DOM.enable');

  // Set iPhone mobile viewport 390x844
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });

  // Navigate and skip preloader
  await send('Page.navigate', { url: 'http://localhost:3000/' });
  await new Promise((r) => setTimeout(r, 1000));
  await send('Runtime.evaluate', {
    expression: 'sessionStorage.setItem("cv_preloader_seen", "true"); window.location.reload();',
  });
  await new Promise((r) => setTimeout(r, 2000));

  async function takeScreenshot(filename) {
    const res = await send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(res.result.data, 'base64');
    const outPath = path.join(ARTIFACT_DIR, filename);
    fs.writeFileSync(outPath, buffer);
    console.log(`Saved screenshot: ${filename}`);
  }

  // 1. Hero
  await takeScreenshot('mobile_verified_01_hero.png');

  // 2. Open Mobile Menu Drawer
  await send('Runtime.evaluate', {
    expression: '(() => { const btn = document.querySelector("button[aria-label=\'Toggle navigation menu\']"); if (btn) btn.click(); })()',
  });
  await new Promise((r) => setTimeout(r, 600));
  await takeScreenshot('mobile_verified_02_drawer.png');

  // Close Mobile Menu Drawer
  await send('Runtime.evaluate', {
    expression: '(() => { const btn = document.querySelector("button[aria-label=\'Close menu\']"); if (btn) btn.click(); const dBtn = document.querySelector("button[aria-label=\'Close drawer\']"); if (dBtn) dBtn.click(); })()',
  });
  await new Promise((r) => setTimeout(r, 600));

  // 3. Scroll to "WE VALUE"
  await send('Runtime.evaluate', {
    expression: '(() => { const heading = Array.from(document.querySelectorAll("h2")).find(h => h.textContent.includes("WE VALUE")); if (heading) heading.scrollIntoView({ behavior: "instant", block: "start" }); })()',
  });
  await new Promise((r) => setTimeout(r, 500));
  await takeScreenshot('mobile_verified_03_we_value.png');

  // 4. Scroll to Panel B Best School & Achiever
  await send('Runtime.evaluate', {
    expression: '(() => { const heading = Array.from(document.querySelectorAll("h2")).find(h => h.textContent.includes("PALGHAR DISTRICT")); if (heading) heading.scrollIntoView({ behavior: "instant", block: "start" }); })()',
  });
  await new Promise((r) => setTimeout(r, 500));
  await takeScreenshot('mobile_verified_04_panel_b.png');

  // 5. Scroll to Notice & Event Board
  await send('Runtime.evaluate', {
    expression: '(() => { const heading = Array.from(document.querySelectorAll("h2")).find(h => h.textContent.includes("NOTICE & EVENT")); if (heading) heading.scrollIntoView({ behavior: "instant", block: "start" }); })()',
  });
  await new Promise((r) => setTimeout(r, 500));
  await takeScreenshot('mobile_verified_05_notices.png');

  // 6. Scroll to Helpdesk Card & Final Conversion Banner
  await send('Runtime.evaluate', {
    expression: '(() => { const heading = Array.from(document.querySelectorAll("h2")).find(h => h.textContent.includes("SHAPE A FUTURE")); if (heading) heading.scrollIntoView({ behavior: "instant", block: "center" }); })()',
  });
  await new Promise((r) => setTimeout(r, 500));
  await takeScreenshot('mobile_verified_06_conversion_banner.png');

  // 7. Scroll to Footer & Bottom Bar
  await send('Runtime.evaluate', {
    expression: 'window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" })',
  });
  await new Promise((r) => setTimeout(r, 500));
  await takeScreenshot('mobile_verified_07_footer.png');

  ws.close();
  console.log('Mobile verification capture finished successfully!');
}

main().catch(console.error);
