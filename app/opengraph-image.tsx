import { ImageResponse } from "next/og";

export const alt = "python-mastery, personal Python practice site";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px",
          background: "#0c0a09",
          color: "#f5f5f4",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 14,
              background: "#facc15",
            }}
          />
          <div style={{ fontSize: 24, color: "#a8a29e" }}>
            damato-python.vercel.app
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#facc15",
              lineHeight: 1,
            }}
          >
            python-mastery
          </div>
          <div
            style={{
              fontSize: 36,
              marginTop: 22,
              color: "#e7e5e4",
              lineHeight: 1.3,
              maxWidth: 940,
              fontFamily:
                "-apple-system, BlinkMacSystemFont, system-ui, sans-serif",
            }}
          >
            Interactive Python lessons that run real code in your browser via
            Pyodide.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 40,
            fontSize: 22,
            color: "#78716c",
          }}
        >
          <div>Next.js</div>
          <div>·</div>
          <div>TypeScript</div>
          <div>·</div>
          <div>Pyodide</div>
          <div>·</div>
          <div>Tailwind</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
