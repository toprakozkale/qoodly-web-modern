import { NextResponse } from "next/server";

export async function GET() {
  const content = `# Qoodly Software

> Qoodly is an Ankara-based software agency founded in 2024, delivering high-quality web, mobile, and AI-powered digital products for B2B businesses worldwide.

## About

- Company: Qoodly Software
- Founded: 2024
- Location: Çukurambar Mah. 1474. Sokak Pembe Köşk, Ankara, 06530, Turkey
- Contact: info@qoodly.com / +90-541-420-15-60
- Languages: English, Turkish (Türkçe), German (Deutsch), Russian (Русский)

## Services

- Web Development: Custom web apps built with Next.js, React, TypeScript
- Mobile Development: iOS and Android apps with React Native
- UI/UX Design: User research, design systems, Figma prototyping
- AI Integration: OpenAI-powered features, custom AI pipelines
- E-Commerce Development: Scalable online store solutions
- Technology Consulting: Architecture reviews, digital transformation advisory

## Notable Projects

- Weekweeky: Mobile application for simplified weekly planning (iOS & Android)
- GFS Corporate CMS: High-security, scalable content management platform for enterprise

## Team

- Toprak Özkale – Full Stack Developer
- Eren Öz – Backend Developer
- Furkan Bozdaş – AI Integrator

## Pages

- [Home](https://qoodly.com/en)
- [About](https://qoodly.com/en/about)
- [Work / Portfolio](https://qoodly.com/en/work)
- [Contact](https://qoodly.com/en/contact)

## Social

- LinkedIn: https://www.linkedin.com/company/qoodly/
- Instagram: https://www.instagram.com/qoodly.io
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
