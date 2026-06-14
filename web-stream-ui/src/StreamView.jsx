import React from 'react'

export default function StreamView({ streamUrl }) {
  if (!streamUrl) return <div className="placeholder">Enter stream URL above</div>

  return (
    <div className="stream-container">
      {/* try video tag (HLS/MPEG) */}
      <video
        src={streamUrl}
        controls
        autoPlay
        muted
        style={{ maxWidth: '100%' }}
      />
      {/* fallback image element for MJPEG endpoints */}
      <img src={streamUrl} alt="stream" style={{ maxWidth: '100%', display: 'none' }} />
    </div>
  )
}
