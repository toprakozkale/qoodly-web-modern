import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const taglines: Record<string, string> = {
  en: "Web & Mobile Development Agency",
  tr: "Web ve Mobil Yazılım Ajansı",
  de: "Web- & Mobile-Entwicklungsagentur",
  ru: "Агентство веб- и мобильной разработки",
};

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tagline = taglines[locale] ?? taglines.en;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Yeşil aksent çizgi */}
        <div
          style={{
            width: "80px",
            height: "6px",
            backgroundColor: "#88ce02",
            marginBottom: "32px",
            borderRadius: "3px",
          }}
        />
        {/* Ana başlık */}
        <div
          style={{
            fontSize: "88px",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-3px",
            lineHeight: 1,
            marginBottom: "28px",
          }}
        >
          Qoodly
        </div>
        {/* Alt başlık */}
        <div
          style={{
            fontSize: "34px",
            color: "#88ce02",
            fontWeight: 500,
            letterSpacing: "-0.5px",
          }}
        >
          {tagline}
        </div>
        {/* Domain watermark */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            right: "80px",
            fontSize: "22px",
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "1px",
          }}
        >
          qoodly.com
        </div>
        {/* Dekoratif köşe aksent */}
        <div
          style={{
            position: "absolute",
            top: "60px",
            right: "80px",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(136,206,2,0.15) 0%, transparent 70%)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
