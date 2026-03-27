# SEO & GEO Analiz Raporu — Qoodly Software

> Tarih: 2026-03-27
> Proje: qoodly-web-modern (Next.js 16.2.1, 4 dil: en / tr / de / ru)
> Amaç: Mevcut dil ve URL yapısına tam uyumlu, uygulamaya hazır SEO + GEO stratejisi

---

## 1. Mevcut Durum Özeti

### Güçlü Taraflar
| Özellik | Durum |
|---------|-------|
| 4 dil desteği (en/tr/de/ru) | ✅ Aktif |
| Locale-prefix URL yapısı (`/en`, `/tr`, `/de`, `/ru`) | ✅ Her zaman açık |
| `generateStaticParams` ile statik çıktı | ✅ Build-time render |
| Cookie consent bileşeni | ✅ Mevcut |
| Mobil-responsive tasarım | ✅ Tailwind |
| Şirket bilgileri (adres, telefon, email) | ✅ ContactFormSection |

### Kritik Eksikler
| Eksik | Etki |
|-------|------|
| `robots.txt` yok | Crawler'lar karanlıkta |
| `sitemap.xml` yok | Sayfa keşfi yok |
| `hreflang` tag'leri yok | Dil alternatifleri bilinmiyor |
| `canonical` URL yok | Duplicate içerik riski |
| Open Graph / Twitter Card yok | Sosyal paylaşım önizlemesi yok |
| Sayfa bazlı locale metadata yok | Her sayfa aynı title/description |
| JSON-LD structured data yok | Rich snippet fırsatı kaçıyor |
| `asistant.png` 2.1MB | Core Web Vitals (LCP) risk |
| Analytics / Tracking yok | Performans ölçülemiyor |

---

## 2. URL & Dil Yapısı Haritası

Mevcut routing `localePrefix: "always"` ile çalışıyor. Tüm SEO işlemleri bu yapıya göre kurgulanmalı.

```
https://qoodly.com/en          → Ana sayfa (İngilizce)
https://qoodly.com/tr          → Ana sayfa (Türkçe)
https://qoodly.com/de          → Ana sayfa (Almanca)
https://qoodly.com/ru          → Ana sayfa (Rusça)

https://qoodly.com/en/about    → Hakkımızda (İngilizce)
https://qoodly.com/tr/about    → Hakkımızda (Türkçe)
https://qoodly.com/de/about    → Hakkımızda (Almanca)
https://qoodly.com/ru/about    → Hakkımızda (Rusça)

https://qoodly.com/en/work     → Projeler (İngilizce)
https://qoodly.com/en/contact  → İletişim (İngilizce)
```

`/` → `/en` redirect mevcut (middleware + page.tsx), bu canonical için dikkat edilmeli.

---

## 3. Metadata Stratejisi (Sayfa × Dil)

### 3.1 Root Layout — Şu An

```typescript
// src/app/layout.tsx — SADECE İngilizce, tüm diller için geçerli
metadata = {
  title: "Qoodly Software",
  description: "Qoodly Software – Digital products that empower businesses and inspire users.",
}
```

**Sorun:** Türkçe sayfada da İngilizce meta görünüyor. Google yanlış dili indexliyor.

### 3.2 Önerilen Metadata — `[locale]/layout.tsx`'e Taşı

`generateMetadata` fonksiyonunu genişleterek her dil + sayfa kombinasyonu için ayrı metadata üret. Aşağıdaki tablo uygulama için doğrudan kullanılabilir.

#### Ana Sayfa (`/[locale]`)

| Dil | title | description |
|-----|-------|-------------|
| **en** | `Qoodly Software – Web & Mobile Development Agency` | `Qoodly is an Ankara-based software agency delivering high-quality web, mobile, and AI-powered digital products for businesses worldwide.` |
| **tr** | `Qoodly Software – Web ve Mobil Yazılım Ajansı` | `Qoodly, Ankara merkezli bir yazılım ajansıdır. İşletmelere özel web, mobil ve yapay zeka destekli dijital ürünler geliştiriyoruz.` |
| **de** | `Qoodly Software – Web- & Mobile-Entwicklungsagentur` | `Qoodly ist eine Softwareagentur aus Ankara, die hochwertige Web-, Mobile- und KI-Lösungen für Unternehmen weltweit entwickelt.` |
| **ru** | `Qoodly Software – Агентство веб- и мобильной разработки` | `Qoodly — программное агентство из Анкары, создающее высококачественные веб-, мобильные и AI-продукты для бизнеса по всему миру.` |

#### Hakkımızda (`/[locale]/about`)

| Dil | title | description |
|-----|-------|-------------|
| **en** | `About Qoodly – Our Team & Mission` | `Meet the Qoodly team: passionate developers based in Ankara since 2024, delivering 10+ projects with a focus on innovation and quality.` |
| **tr** | `Hakkımızda – Qoodly Ekibi ve Misyonumuz` | `2024'ten bu yana Ankara merkezli, 10+ proje teslim etmiş tutkulu yazılım ekibimizi tanıyın. İnovasyon ve kalite odaklı çalışıyoruz.` |
| **de** | `Über Qoodly – Unser Team & Mission` | `Lernen Sie das Qoodly-Team kennen: leidenschaftliche Entwickler aus Ankara, seit 2024 aktiv, mit über 10 erfolgreich abgeschlossenen Projekten.` |
| **ru** | `О нас – Команда и миссия Qoodly` | `Познакомьтесь с командой Qoodly: увлечённые разработчики из Анкары, работающие с 2024 года и реализовавшие 10+ проектов.` |

#### Projeler (`/[locale]/work`)

| Dil | title | description |
|-----|-------|-------------|
| **en** | `Our Work – Projects by Qoodly Software` | `Explore Qoodly's portfolio: Weekweeky mobile app, GFS Corporate CMS, and AI-powered e-commerce solutions built for real impact.` |
| **tr** | `Projelerimiz – Qoodly Software Portföyü` | `Qoodly portföyünü keşfedin: Weekweeky mobil uygulaması, GFS Kurumsal CMS ve gerçek etki yaratan yapay zeka e-ticaret çözümleri.` |
| **de** | `Unsere Projekte – Portfolio von Qoodly` | `Entdecken Sie Qoodlys Portfolio: Weekweeky-App, GFS Corporate CMS und KI-gestützte E-Commerce-Lösungen mit messbarem Erfolg.` |
| **ru** | `Наши проекты – Портфолио Qoodly Software` | `Изучите портфолио Qoodly: мобильное приложение Weekweeky, корпоративная CMS GFS и AI-решения для e-commerce.` |

#### İletişim (`/[locale]/contact`)

| Dil | title | description |
|-----|-------|-------------|
| **en** | `Contact Qoodly – Start Your Project` | `Get in touch with Qoodly Software. We're based in Ankara, Turkey. Reach us via phone, email or the contact form to start building together.` |
| **tr** | `İletişim – Qoodly ile Projenize Başlayın` | `Qoodly Software ile iletişime geçin. Ankara, Türkiye merkezliyiz. Telefon, e-posta veya iletişim formu ile bize ulaşın.` |
| **de** | `Kontakt – Starten Sie Ihr Projekt mit Qoodly` | `Nehmen Sie Kontakt mit Qoodly Software auf. Sitz in Ankara, Türkei. Erreichen Sie uns per Telefon, E-Mail oder Kontaktformular.` |
| **ru** | `Контакты – Начните проект с Qoodly` | `Свяжитесь с Qoodly Software. Мы находимся в Анкаре, Турция. Напишите нам по email или через форму обратной связи.` |

---

## 4. hreflang Implementasyonu

Her sayfanın `<head>` bölümüne tüm dil alternatifleri eklenmelidir. `generateMetadata` içinde `alternates` alanı kullanılır.

### Örnek implementasyon (`[locale]/layout.tsx`):

```typescript
// BASE_URL'i next.config.ts içinden veya env'den al
const BASE_URL = "https://qoodly.com";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        "en":    `${BASE_URL}/en`,
        "tr":    `${BASE_URL}/tr`,
        "de":    `${BASE_URL}/de`,
        "ru":    `${BASE_URL}/ru`,
        "x-default": `${BASE_URL}/en`,  // Dil eşleşmeyince varsayılan
      },
    },
  };
}
```

**Not:** Her alt sayfa (`/about`, `/work`, `/contact`) için path segment de eklenmeli:
```typescript
`${BASE_URL}/${locale}/about`  // about sayfasında
```

---

## 5. Open Graph & Twitter Card

Sosyal medyada paylaşılınca preview gösterimi ve AI tarayıcılarının içeriği anlaması için gerekli.

### Önerilen OG Metadata (sayfa bazlı eklenecek):

```typescript
openGraph: {
  type: "website",
  url: `${BASE_URL}/${locale}`,
  siteName: "Qoodly Software",
  title: pageTitle,          // Yukarıdaki tablodan
  description: pageDesc,     // Yukarıdaki tablodan
  locale: locale,            // "en_US", "tr_TR", "de_DE", "ru_RU"
  images: [
    {
      url: `${BASE_URL}/og-image.png`,   // 1200x630px oluşturulacak
      width: 1200,
      height: 630,
      alt: "Qoodly Software – Web & Mobile Development",
    },
  ],
},
twitter: {
  card: "summary_large_image",
  title: pageTitle,
  description: pageDesc,
  images: [`${BASE_URL}/og-image.png`],
},
```

### OG Image Oluşturma:
- Boyut: **1200 × 630 px**
- İçerik: Logo + tagline + arka plan (#0a0a0a + #88ce02 vurgu)
- Dosya: `public/og-image.png`
- Opsiyonel: Sayfa bazlı dinamik OG image için `next/og` (ImageResponse API) kullanılabilir

---

## 6. JSON-LD Structured Data

Google ve AI motorlarının (ChatGPT, Perplexity, Gemini) içeriği doğru anlaması için kritik.

### 6.1 Organization Schema — Root Layout veya Ana Sayfa

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Qoodly Software",
  "url": "https://qoodly.com",
  "logo": "https://qoodly.com/logo-dark.png",
  "description": "Ankara-based software agency delivering web, mobile, and AI-powered digital products.",
  "foundingDate": "2024",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Çukurambar Mah. 1474. Sokak Pembe Köşk",
    "addressLocality": "Ankara",
    "addressCountry": "TR"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+90-541-420-15-60",
    "contactType": "customer support",
    "email": "info@qoodly.com",
    "availableLanguage": ["English", "Turkish", "German", "Russian"]
  },
  "sameAs": [
    "https://www.linkedin.com/company/qoodly/",
    "https://www.instagram.com/qoodly.io"
  ]
}
```

### 6.2 LocalBusiness Schema — ContactFormSection veya Ana Sayfa

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Qoodly Software",
  "image": "https://qoodly.com/og-image.png",
  "telephone": "+90-541-420-15-60",
  "email": "info@qoodly.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Çukurambar Mah. 1474. Sokak Pembe Köşk",
    "addressLocality": "Ankara",
    "addressRegion": "Ankara",
    "postalCode": "06530",
    "addressCountry": "TR"
  },
  "url": "https://qoodly.com",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "09:00",
    "closes": "18:00"
  },
  "priceRange": "$$",
  "areaServed": ["TR", "DE", "RU", "Worldwide"],
  "serviceType": [
    "Web Development",
    "Mobile App Development",
    "UI/UX Design",
    "AI Integration",
    "E-Commerce Development"
  ]
}
```

### 6.3 FAQPage Schema — `AboutFAQSection.tsx`

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What services does Qoodly offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[faq0a cevabı buraya — messages/en.json faq0a değeri]"
      }
    },
    {
      "@type": "Question",
      "name": "Where is Qoodly based, and do you work with international clients?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[faq1a cevabı]"
      }
    }
    // ... 9 soru için devam
  ]
}
```

**Uygulama notu:** `useTranslations("about")` ile mesaj değerlerini alıp dinamik JSON-LD üretebilirsiniz. Ancak JSON-LD'nin SSR'da renderlanması gerektiğinden, FAQPage schema'sını Server Component'e veya `generateMetadata`'ya taşımak daha doğru.

### 6.4 Person Schema — Team Members (AboutTeamSection / ToolsSection)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Toprak Özkale",
  "jobTitle": "Full Stack Developer",
  "worksFor": { "@type": "Organization", "name": "Qoodly Software" },
  "url": "https://www.linkedin.com/in/toprakozkale/"
},
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Eren Öz",
  "jobTitle": "Backend Developer",
  "worksFor": { "@type": "Organization", "name": "Qoodly Software" },
  "url": "https://www.linkedin.com/in/eren-öz-93aa94317/"
},
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Furkan Bozdaş",
  "jobTitle": "AI Integrator",
  "worksFor": { "@type": "Organization", "name": "Qoodly Software" },
  "url": "https://www.linkedin.com/in/furkan-bozdaş-915576177/"
}
```

### 6.5 CreativeWork / SoftwareApplication — Work Sayfası Projeleri

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Weekweeky",
  "applicationCategory": "MobileApplication",
  "operatingSystem": "iOS, Android",
  "description": "A mobile-focused solution that simplifies weekly planning...",
  "creator": { "@type": "Organization", "name": "Qoodly Software" }
},
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "GFS Corporate CMS",
  "applicationCategory": "BusinessApplication",
  "description": "A customized, high-security and scalable content management platform...",
  "creator": { "@type": "Organization", "name": "Qoodly Software" }
}
```

---

## 7. robots.txt

`public/robots.txt` olarak oluşturulacak:

```
User-agent: *
Allow: /

# Dil alternatifleri erişilebilir
Allow: /en/
Allow: /tr/
Allow: /de/
Allow: /ru/

# API ve Next.js internal rotaları engelle
Disallow: /api/
Disallow: /_next/

Sitemap: https://qoodly.com/sitemap.xml
```

---

## 8. sitemap.xml

Next.js 16'da `src/app/sitemap.ts` ile dinamik üretilebilir:

```typescript
// src/app/sitemap.ts
import { MetadataRoute } from "next";

const BASE_URL = "https://qoodly.com";
const locales = ["en", "tr", "de", "ru"];
const pages = ["", "/about", "/work", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE_URL}/${l}${page}`])
          ),
        },
      });
    }
  }

  return entries;
}
```

Bu yapı **16 URL** üretir (4 dil × 4 sayfa), her birinde `alternates` ile hreflang bilgisi gömülü.

---

## 9. GEO — Generative Engine Optimization

GEO, ChatGPT, Perplexity, Google AI Overviews, Bing Copilot gibi AI motorlarının sayfanızı alıntılamasını sağlamak için yapılan optimizasyondur.

### 9.1 Neden GEO Önemli?

Qoodly'nin hedef kitlesinin (kurumsal müşteriler, startup'lar, uluslararası şirketler) bir kısmı artık yazılım ajansı araştırmasını "Ankara'da web geliştirme ajansı" yerine ChatGPT'ye sorarak yapıyor. AI motorları yanıt oluştururken alıntı yaptığı kaynakları şu kriterlere göre seçiyor:

1. **Yetki sinyalleri** — Schema.org verisi, doğrulanmış sosyal profiller
2. **Alıntılanabilir cümleler** — Net, kısa, bilgi yoğun ifadeler
3. **Soru-cevap yapısı** — FAQ'lar doğrudan alıntılanır
4. **Dil tutarlılığı** — Sayfa dili ile içerik dili uyuşmalı

### 9.2 İçerik Optimizasyonu Önerileri

#### Ana Sayfa Hero
**Şu an:** Kelime kelime animasyonlu metin (JS render)
**Sorun:** AI tarayıcıları JS render etmez; metin görünmeyebilir
**Öneri:** `<h1>` tagı SSR'da okunabilir olmalı; animasyon sadece görsel katmanda çalışmalı

```tsx
// HeroSection içinde h1 her zaman DOM'da statik olmalı
<h1 className="sr-only">
  {t("hero.title")} {/* "Qoodly Software – Quality Digital Products" */}
</h1>
```

#### WhyQoodlySection
Kelime kelime animasyonlu metin AI'a anlamsız görünüyor. Tam paragraf `<p>` tagı içinde, animasyon CSS/JS ile üzerine katmanlanmalı. Şu anki yapıda içerik SEO açısından okunabilir durumda, bu iyi.

#### FAQ Bölümü (AboutFAQSection)
En yüksek GEO değeri burada. AI motorları FAQ yapısını doğrudan alıntılar.
- Sorular `<h3>` veya `<dt>` tagı olmalı
- Cevaplar `<dd>` veya `<p>` tagı içinde tam cümle olarak
- FAQPage JSON-LD ile desteklenmeli (bkz. Bölüm 6.3)

#### Dil Kalitesi (AI Alıntı Kriterleri)
Mevcut İngilizce içerik genel olarak iyi. Almanca ve Rusça mesajların native speaker veya profesyonel çeviri ile kontrol edilmesi GEO skorunu artırır. AI motorları düşük kaliteli çeviriyi güvenilir kaynak olarak almaz.

### 9.3 GEO için Ek İçerik Fırsatları

| İçerik | GEO Değeri | Not |
|--------|-----------|-----|
| Proje case study sayfaları | Çok Yüksek | `/work/weekweeky`, `/work/gfs-cms` |
| Blog / Insights bölümü | Yüksek | Teknik içerik AI'ın sık alıntıladığı format |
| Karşılaştırma sayfaları | Orta | "Ankara web ajansı vs İstanbul" tarzı |
| Glossary / Terimler sözlüğü | Orta | Tanımlı terimler AI motorlarına çekici |

### 9.4 E-E-A-T Sinyalleri (Experience, Expertise, Authoritativeness, Trustworthiness)

Google ve AI motorları bu sinyalleri arar:

| Sinyal | Mevcut Durum | Öneri |
|--------|-------------|-------|
| Kurucu/ekip profilleri | ✅ AboutTeamSection mevcut | LinkedIn URL'lerini rel="me" ile işaretle |
| Şirket adresi | ✅ ContactFormSection'da var | LocalBusiness schema ile destekle |
| İletişim numarası | ✅ +90 541 420 15 60 | Schema'ya ekle |
| Müşteri logoları | ✅ BrandsSection var | Her logo için `alt` ve `title` ekle |
| Referans projeler | ✅ WorkProjectsSection | CreativeWork schema ekle |
| Tarih/kuruluş yılı | ✅ 2024 | Organization schema'da foundingDate |
| SSL / HTTPS | ⚠️ Deployment'a bağlı | Zorunlu |

---

## 10. Teknik SEO

### 10.1 Canonical URL Sorunu

`/` → `/en` redirect var. Canonical tag olmadan Google ikisini de index'leyebilir.

**Çözüm:**
```typescript
// src/app/layout.tsx
alternates: {
  canonical: "https://qoodly.com/en",
}

// src/app/[locale]/layout.tsx — her locale için
alternates: {
  canonical: `https://qoodly.com/${locale}`,
}
```

### 10.2 `lang` Attribute

`src/app/[locale]/layout.tsx`'de sadece `other: { lang: locale }` var; bu `<html lang="">` attribute'unu set etmiyor.

**Düzeltme:**
```typescript
// src/app/[locale]/layout.tsx — RootLayout içinde
<html lang={locale}>
```
Şu an `src/app/layout.tsx`'de `<html suppressHydrationWarning>` var ama `lang` yok. Locale layout, locale `lang` attribute'unu override etmeli.

### 10.3 Görsel Optimizasyonu

| Dosya | Boyut | Sorun | Öneri |
|-------|-------|-------|-------|
| `asistant.png` | 2.1 MB | LCP'yi doğrudan etkiler | WebP'ye dönüştür, max 150KB |
| `gfs-global.png` | 357 KB | Görsel büyük | WebP, max 80KB |
| `ww-logo.png` | 428 KB | Görsel büyük | WebP, max 80KB |
| `logo-dark.png` | 130 KB | Navbar'da her sayfada yüklenir | SVG formatına geç |
| `rback-logo-ligh.png` | 190 KB | Favicon için çok büyük | `.ico` veya 32px PNG kullan |

`next.config.ts`'de `images: { unoptimized: true }` var. Static export için makul, ancak resimler manuel optimize edilmeli.

### 10.4 Sayfa Başlıkları Hiyerarşisi

Her sayfada H1-H2-H3 hiyerarşisinin doğru kurulması gerekiyor:

```
Ana Sayfa:
  H1 → "Qoodly Software – Web & Mobile Development" (gizli veya hero title)
  H2 → "Why Qoodly?" / "Features" / "Our Team" / "Showcase"

About:
  H1 → "About Qoodly – Who We Are"
  H2 → "Our Mission" / "The Team" / "Core Values" / "FAQ"
  H3 → Her ekip üyesi ismi, her FAQ sorusu

Work:
  H1 → "Reference Projects by Qoodly"
  H2 → Her proje başlığı

Contact:
  H1 → "Contact Qoodly Software"
  H2 → Form başlığı, bilgi kartları
```

### 10.5 `next.config.ts` Eklentileri

```typescript
const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Eklenmeli:
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};
```

---

## 11. Mesaj Dosyaları (messages/) — SEO'ya Uygun İçerik

Her dil için `messages/*.json` dosyaları metadata alanlarını da barındırabilir. Önerilen yapı:

```json
// messages/en.json — mevcut yapıya eklenecek alanlar
{
  "meta": {
    "home": {
      "title": "Qoodly Software – Web & Mobile Development Agency",
      "description": "Qoodly is an Ankara-based software agency delivering high-quality web, mobile, and AI-powered digital products for businesses worldwide."
    },
    "about": {
      "title": "About Qoodly – Our Team & Mission",
      "description": "Meet the Qoodly team: passionate developers based in Ankara since 2024, delivering 10+ projects with a focus on innovation and quality."
    },
    "work": {
      "title": "Our Work – Projects by Qoodly Software",
      "description": "Explore Qoodly's portfolio: Weekweeky mobile app, GFS Corporate CMS, and AI-powered e-commerce solutions built for real impact."
    },
    "contact": {
      "title": "Contact Qoodly – Start Your Project",
      "description": "Get in touch with Qoodly Software. Based in Ankara, Turkey. Reach us via phone, email or the contact form."
    }
  }
}
```

Bu yapı ile `generateMetadata` dil dosyasından beslenebilir:
```typescript
const t = await getTranslations({ locale, namespace: "meta.home" });
return { title: t("title"), description: t("description") };
```

---

## 12. Uygulama Öncelik Sırası

### Seviye 1 — Kritik (hemen yap)
1. `robots.txt` oluştur → `public/robots.txt`
2. `src/app/sitemap.ts` oluştur → 16 URL, hreflang dahil
3. `[locale]/layout.tsx` → `html lang={locale}` ekle
4. Root layout metadata'yı `[locale]/layout.tsx`'e taşı, locale bazlı title/description
5. Organization + LocalBusiness JSON-LD'yi ana sayfaya ekle

### Seviye 2 — Önemli (bu sprint)
6. `alternates.canonical` ve `alternates.languages` ekle (tüm sayfalarda)
7. Open Graph ve Twitter Card metadata
8. `og-image.png` oluştur (1200×630)
9. `asistant.png` WebP'ye dönüştür (2.1MB → ~100KB)
10. FAQPage JSON-LD'yi AboutFAQSection'a ekle

### Seviye 3 — Güçlendirme (sonraki sprint)
11. H1-H2 hiyerarşisini tüm sayfalarda düzelt
12. `next.config.ts`'e güvenlik header'ları ekle
13. `messages/*.json`'a `meta` anahtarları ekle, generateMetadata'yı bu kaynaktan besle
14. Person schema (ekip üyeleri)
15. CreativeWork schema (projeler)
16. Görsel alt text ve logo'ları optimize et

---

## 13. Anahtar Kelime Hedefleme (Locale Bazlı)

| Locale | Birincil Kelimeler | İkincil Kelimeler |
|--------|-------------------|------------------|
| **en** | ankara software agency, web development turkey, mobile app development ankara | react developer ankara, next.js agency, ai integration service |
| **tr** | ankara yazılım şirketi, web geliştirme ankara, mobil uygulama geliştirme | react geliştirici ankara, yapay zeka entegrasyonu, kurumsal yazılım |
| **de** | softwareentwicklung türkei, webentwicklung ankara, mobile app agentur | react entwickler ankara, ki-integration service |
| **ru** | разработка по анкара, веб-разработка турция, мобильное приложение | react разработчик, интеграция ии, корпоративный сайт |

---

## 14. Analytics Önerisi

SEO performansını ölçmek için:

| Araç | Amaç | Kurulum |
|------|------|---------|
| **Google Search Console** | Indexleme durumu, hangi sorgulardan trafik geliyor | `<meta name="google-site-verification">` veya DNS |
| **Google Analytics 4** | Kullanıcı davranışı, dil bazlı traffic | `@next/third-parties` ile ekle |
| **Vercel Analytics** | Core Web Vitals, sayfa yükleme | `@vercel/analytics` paketi |
| **Bing Webmaster Tools** | Bing + Copilot indexlemesi | Özellikle DE ve RU lokaller için önemli |

---

*Bu doküman, Qoodly Software projesinin mevcut kod yapısı analiz edilerek oluşturulmuştur. Tüm öneriler `/src/app/[locale]` route yapısı ve `messages/*.json` mimarisiyle tam uyumludur.*
