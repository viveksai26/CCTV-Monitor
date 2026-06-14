const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const envPath = path.join(repoRoot, '.env');
const envExample = path.join(repoRoot, '.env.example');

const envFile = fs.existsSync(envPath) ? envPath : fs.existsSync(envExample) ? envExample : null;
if (!envFile) {
  console.error('No .env or .env.example found at repo root');
  process.exit(1);
}

const content = fs.readFileSync(envFile, 'utf8');
const lines = content.split(/\r?\n/);
const env = {};

lines.forEach(line => {
  let l = line.trim();
  if (!l || l.startsWith('#')) return;
  // remove inline // comments
  l = l.replace(/\/\/.*$/, '').trim();
  const m = l.match(/^([^=]+)=(.*)$/);
  if (m) {
    const k = m[1].trim();
    let v = m[2].trim();
    // strip surrounding quotes
    v = v.replace(/^['\"]|['\"]$/g, '').trim();
    env[k] = v;
  }
});

const DVR_USER = env.DVR_USER || 'admin';
const DVR_PASSWORD = env.DVR_PASSWORD || '';
const DVR_IP = env.DVR_IP || '';
const SUBTYPE = env.SUBTYPE || '1';

const streams = [];
for (let i = 1; i <= 32; i++) {
  const ch = env[`CAMERA_${i}_CHANNEL`];
  const name = env[`CAMERA_${i}_NAME`];
  if (!ch || !name) continue;

  const encoded = encodeURIComponent(DVR_PASSWORD);
  const rtsp = `rtsp://${DVR_USER}:${encoded}@${DVR_IP}:554/cam/realmonitor?channel=${ch}&subtype=${SUBTYPE}`;

  streams.push({ name, channel: ch, url: rtsp });
}

const outPath = path.join(repoRoot, 'web-stream-ui', 'src', 'streams.json');
fs.writeFileSync(outPath, JSON.stringify(streams, null, 2));
console.log(`Wrote ${outPath} (${streams.length} streams)`);
