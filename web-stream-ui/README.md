Web Stream UI

Minimal React + Vite UI to view camera streams.

Quick start:
1. cd web-stream-ui
2. npm install
3. npm run dev

Generating streams from cctv_ai:
From the repository root run:

  node tools/generate_streams.js

This reads .env or .env.example and writes web-stream-ui/src/streams.json used by the UI. Update .env with DVR and CAMERA_* values before running.

Notes:
- Use an MJPEG URL (served as image stream) or an HLS (.m3u8) URL for <video> tag support.
- RTSP is not directly supported by browsers; use a proxy (ffmpeg/gst) or convert to HLS/MJPEG.
