import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function TwitterImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 45%, #1f2937 100%)',
        color: '#f8fafc',
        padding: '72px',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div style={{ fontSize: 30, opacity: 0.85, letterSpacing: '0.08em', textTransform: 'uppercase' }}>mcomper.at</div>
      <div style={{ fontSize: 76, fontWeight: 700, marginTop: '18px' }}>Matthieu Compérat</div>
      <div style={{ fontSize: 42, marginTop: '16px', opacity: 0.95 }}>Frontend Developer · React · Next.js</div>
    </div>,
    size
  );
}
