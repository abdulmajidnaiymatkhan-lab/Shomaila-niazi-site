import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FAF6F0",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 116,
            fontWeight: 600,
            fontFamily: "Georgia, 'Times New Roman', serif",
            color: "#212B23",
            lineHeight: 1,
          }}
        >
          S
        </div>
      </div>
    ),
    { ...size }
  );
}
