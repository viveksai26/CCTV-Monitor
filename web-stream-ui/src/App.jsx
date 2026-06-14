import React, { useState } from 'react'
import StreamView from './StreamView'
import streams from './streams.json'

export default function App() {
  const [url, setUrl] = useState('')
  const [selected, setSelected] = useState(null)

  const openStream = (s) => {
    setUrl(s.url)
    setSelected(s)
  }

  return (
    <div className="app">
      <h1>Web Stream UI</h1>

      {streams && streams.length > 0 && (
        <div className="streams-list">
          <h3>Available streams</h3>
          <ul>
            {streams.map((s, idx) => (
              <li key={idx}>
                <button onClick={() => openStream(s)}>{s.name || s.channel}</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <input
        placeholder="Stream URL (e.g. http://camera/mjpeg or HLS .m3u8)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <StreamView streamUrl={url} />
    </div>
  )
}
