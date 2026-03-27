@AGENTS.md

---

# PROJE ANALİZİ: GSAP Clone

## Genel Bakış

GSAP (GreenSock Animation Platform) tanıtım sitesinin klonu. Next.js 16.2.1, React 19.2.4, TypeScript, Tailwind CSS v4, GSAP 3.14.2 ve Lenis 1.3.20 kullanılarak yapılmış statik bir landing page.

- **Build çıktısı:** `/dist` (static export)
- **Animasyon kütüphanesi:** GSAP + @gsap/react
- **Smooth scroll:** Lenis
- **Stil:** Tailwind CSS v4 + globals.css

---

## Proje Yapısı

```
src/
├── app/
│   ├── layout.tsx              → Root layout, SmoothScrollProvider sarmalıyor
│   ├── page.tsx                → Ana sayfa (tüm section'ları sırayla render eder)
│   └── globals.css             → CSS değişkenleri, keyframe animasyonlar, Lenis stilleri
└── components/
    ├── SmoothScrollProvider.tsx → Lenis + GSAP ScrollTrigger entegrasyonu
    ├── Navbar.tsx               → Scroll'a göre arka plan değişen fixed navbar
    ├── HeroSection.tsx          → Karakter animasyonları + parallax
    ├── WhyGSAPSection.tsx       → Kelime kelime fade-in + renk geçişi
    ├── FeaturesSection.tsx      → Tag, 3D element, SVG bezier çizim animasyonları
    ├── ToolsSection.tsx         → 4 araç kartı, zıt yönden giriş animasyonları
    ├── BrandsSection.tsx        → Sonsuz döngü yatay kaydırma carousel
    ├── ShowcaseSection.tsx      → Manuel kontrollü carousel (React state)
    └── Footer.tsx               → Fade-in animasyonlu çok sütunlu footer
```

---

## Renk Paleti

```
#0a0a0a  → Ana arka plan (neredeyse siyah)
#f5f5f5  → Ana metin (neredeyse beyaz)
#88ce02  → Yeşil vurgu (primary accent)
#ff6b9d  → Pembe vurgu
#ff8c42  → Turuncu vurgu
#9d4edd  → Mor vurgu
#00b4d8  → Mavi/cyan vurgu
#fefae0  → Krem (footer alt kısım)
```

---

## Animasyon Sistemi

### Temel Mimari

Her component aynı pattern'ı kullanır:

```typescript
const ref = useRef<HTMLElement>(null);

useEffect(() => {
  const el = ref.current;
  if (!el) return;

  const ctx = gsap.context(() => {
    gsap.registerPlugin(ScrollTrigger);
    // animasyonlar buraya
  }, el);

  return () => ctx.revert(); // cleanup
}, []);
```

`gsap.context()` → animasyonları gruplar, component unmount olunca otomatik temizler.

---

### SmoothScrollProvider — Lenis + GSAP Entegrasyonu

Lenis konfigürasyonu:
```javascript
new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // üstel yumuşama
  smoothWheel: true,
  touchMultiplier: 2,
})
```

GSAP ticker ile senkronizasyon:
```javascript
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0); // titreme önleme
lenis.on('scroll', ScrollTrigger.update); // scroll → ScrollTrigger güncelle
```

---

### Navbar — Scroll Tespiti

```
Trigger: ScrollTrigger
Start: "top -100" (100px aşağı kaydırıldığında)
Efekt: nav elementine bg-[#0a0a0a]/90 + backdrop-blur-md class'ı eklenir
Yukarı dönünce: class'lar kaldırılır
```

---

### HeroSection — Karakter & Parallax Animasyonları

**A. Karakter Animasyonu (sayfa yüklenince)**

"Animate" ve "anything" kelimeleri harf harf split edilir, her harf ayrı `<span>`:

```javascript
gsap.fromTo(chars,
  { y: 100, opacity: 0, rotateX: -90 },   // başlangıç
  {
    y: 0, opacity: 1, rotateX: 0,
    duration: 0.8,
    ease: "back.out(1.7)",   // sıçramalı giriş
    stagger: 0.05,           // her harf 50ms arayla
    delay: 0.3,
  }
)
```
Efekt: Harfler alt-arkadan 3D dönerek sıçrayarak girer.

**B. Dekoratif Element Animasyonları (sıralı giriş)**

| Element   | Başlangıç                 | Easing              | Delay |
|-----------|---------------------------|---------------------|-------|
| Çiçek     | scale:0, rotate:-180      | elastic.out(1, 0.5) | 0.8s  |
| Yıldız    | scale:0, rotate:180       | back.out(1.7)       | 1.0s  |
| Şimşek    | scale:0, x:-50            | power3.out          | 1.2s  |
| Spiral    | scale:0, y:50             | elastic.out(1, 0.5) | 1.4s  |

**C. Parallax (scroll'a bağlı, scrub:1)**

```javascript
// ScrollTrigger: start:"top top", end:"bottom top", scrub:1
çiçek    → y:-100, rotate:45
yıldız   → y:-80,  rotate:90
şimşek   → y:-120, rotate:-15  (en hızlı)
spiral   → y:-60,  rotate:180
başlık   → y:-150             (en fazla hareket)
```

**CSS Animasyonu:** Çiçek `animate-spin-slow` ile sürekli döner (20s, linear, infinite).

---

### WhyGSAPSection — Kelime Kelime Açılma

**A. Kelime fade-in (scroll'a bağlı)**

```javascript
gsap.fromTo(".word",
  { opacity: 0.2, y: 20 },
  {
    opacity: 1, y: 0,
    stagger: 0.05,
    scrollTrigger: { start:"top 80%", end:"top 30%", scrub:1 }
  }
)
```

**B. Highlight kelimelerin renk geçişi**

"effortlessly", "animate", "silky-smooth" kelimeleri:

```javascript
gsap.fromTo(".highlight",
  { color: "#f5f5f5" },       // beyaz
  {
    color: "#88ce02",          // yeşile döner
    stagger: 0.1,
    scrollTrigger: { start:"top 60%", end:"top 20%", scrub:1 }
  }
)
```

---

### FeaturesSection — 4 Farklı Animasyon Türü

**A. Feature Tags (soldan giriş)**

```javascript
gsap.fromTo(".feature-tag",
  { x: -100, opacity: 0, rotate: -10 },
  {
    x: 0, opacity: 1, rotate: 0,
    duration: 0.8, ease: "back.out(1.7)",
    scrollTrigger: { start:"top 85%", toggleActions:"play none none reverse" }
  }
)
```

**B. 3D Elementler (Y ekseninde dönüş)**

```javascript
gsap.fromTo(".element-3d",
  { scale: 0, rotateY: -90 },
  {
    scale: 1, rotateY: 0,
    duration: 1, ease: "elastic.out(1, 0.5)",
    delay: i * 0.2,  // index'e göre sıralı giriş
    scrollTrigger: { start:"top 85%", toggleActions:"play none none reverse" }
  }
)
```

**C. Metin Blokları (aşağıdan yukarı)**

```javascript
gsap.fromTo(".text-block",
  { y: 50, opacity: 0 },
  { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
    scrollTrigger: { start:"top 85%", toggleActions:"play none none reverse" } }
)
```

**D. Bezier Eğri Çizim Animasyonu (SVG stroke)**

```javascript
// 1. Çizgiyi gizle (dash = path uzunluğu kadar)
gsap.set(".bezier-path", {
  strokeDasharray: pathLength,
  strokeDashoffset: pathLength,
})

// 2. Scroll'la birlikte çiz (offset 0'a gider)
gsap.to(".bezier-path", {
  strokeDashoffset: 0,
  duration: 2, ease: "power2.inOut",
  scrollTrigger: { start:"top 80%", end:"top 40%", scrub:1 }
})
```
Efekt: SVG eğrileri kullanıcı scroll'ladıkça kendi kendine çizilir.

---

### ToolsSection — Zıt Yönden Giriş

4 araç: Scroll (pembe), SVG (turuncu), Text (mor), UI Interactions (mavi)

**A. Sol element (shape) — soldan gelir**

```javascript
gsap.fromTo(".tool-shape",
  { x: -100, opacity: 0, rotate: -30 },
  { x: 0, opacity: 1, rotate: 0,
    duration: 1, ease: "back.out(1.7)",
    scrollTrigger: { start:"top 80%", toggleActions:"play none none reverse" } }
)
```

**B. Sağ element (metin) — sağdan gelir, 0.2s sonra**

```javascript
gsap.fromTo(".tool-content",
  { x: 100, opacity: 0 },
  { x: 0, opacity: 1,
    duration: 0.8, ease: "power3.out", delay: 0.2,
    scrollTrigger: { start:"top 80%", toggleActions:"play none none reverse" } }
)
```

**Layout ritmi:** Çift indexli kartlar sol-sağ, tek indexli kartlar sağ-sol (md:order-2 ile).

---

### BrandsSection — Sonsuz Döngü Carousel

Markalar: Intel, YouTube, Netlify, Amazon, Ford, Microsoft

**A. Logo fade-in (scroll)**

```javascript
gsap.fromTo(".brand-item",
  { opacity: 0, y: 30 },
  { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power3.out",
    scrollTrigger: { start:"top 80%", toggleActions:"play none none reverse" } }
)
```

**B. Sonsuz yatay kaydırma**

```javascript
gsap.to(track, {
  x: -totalWidth,       // toplam genişliğin yarısı kadar sola
  duration: 30,
  ease: "none",         // sabit hız
  repeat: -1,           // sonsuz döngü
})
```

JSX'te marka dizisi iki kez render edilir (`[...brands, ...brands]`) → seamless loop sağlar.

---

### ShowcaseSection — React State Carousel

3 adet showcase öğesi. Animasyon GSAP değil, CSS transition ile yapılır:

```css
transform: translateX(${-currentIndex * 100}%);
transition-all 500ms;
```

Aktif slide: `scale-100`, `opacity-100`
Pasif slide: `scale-95`, `opacity-50`

GSAP yalnızca başlık ve container'ın sayfa girişi için kullanılır:

```javascript
// Başlık
gsap.fromTo(".showcase-title",
  { y: 50, opacity: 0 },
  { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
    scrollTrigger: { start:"top 80%", toggleActions:"play none none reverse" } }
)

// Container (0.2s gecikmeli)
gsap.fromTo(".carousel-container",
  { y: 80, opacity: 0 },
  { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2, ... }
)
```

---

### Footer — Fade-in

```javascript
gsap.fromTo(".footer-content",
  { y: 50, opacity: 0 },
  { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
    scrollTrigger: { start:"top 90%", toggleActions:"play none none reverse" } }
)
```

---

## GSAP Yöntemleri Özeti

| Yöntem | Kullanım |
|--------|----------|
| `gsap.fromTo()` | Başlangıç → bitiş durumu animasyonu (tüm component'larda) |
| `gsap.to()` | Şu anki durumdan → hedefe (BrandsSection loop, bezier) |
| `gsap.set()` | Anında özellik atama, animasyonsuz (bezier stroke init) |
| `gsap.context()` | Animasyon grubu + otomatik cleanup |
| `gsap.ticker` | Lenis ile senkronizasyon |

## ScrollTrigger Parametreleri Özeti

| Parametre | Değer | Anlam |
|-----------|-------|-------|
| `start` | `"top 80%"` | Element viewport'un %80'ine girince başla |
| `end` | `"top 30%"` | Element viewport'un %30'ine ulaşınca bitir |
| `scrub: 1` | 1 saniye | Animasyonu scroll pozisyonuna bağla (1s smoothing) |
| `toggleActions` | `"play none none reverse"` | Girince çal, çıkınca geri al |

## CSS Keyframe Animasyonları

```css
/* Float: 6s yukarı-aşağı sallanma */
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50%       { transform: translateY(-20px) rotate(5deg); }
}

/* Spin-slow: 20s tam dönüş */
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* Pulse-glow: 3s nefes alma efekti */
@keyframes pulse-glow {
  0%, 100% { opacity: 0.8; transform: scale(1); }
  50%      { opacity: 1;   transform: scale(1.05); }
}
```

## Easing Fonksiyonları

| Easing | Etki |
|--------|------|
| `back.out(1.7)` | Hafif geri çekilip fırlayan giriş |
| `elastic.out(1, 0.5)` | Elastik zıplama |
| `power3.out` | Hızlı başlayıp yavaşlayan akıcı geçiş |
| `power2.inOut` | Simetrik, yumuşak giriş-çıkış |
| `none` | Sabit hız (linear) |
