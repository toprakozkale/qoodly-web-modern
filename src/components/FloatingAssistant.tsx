"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface Message {
  id: number;
  from: "user" | "ai";
  text: string;
}

const PLATFORM_ICONS: Record<string, string> = {
  whatsapp: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
  linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  email: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
};

function getPlatformIcon(label: string) {
  const l = label.toLowerCase();
  if (l.includes("whatsapp")) return PLATFORM_ICONS.whatsapp;
  if (l.includes("linkedin")) return PLATFORM_ICONS.linkedin;
  if (l.includes("instagram")) return PLATFORM_ICONS.instagram;
  if (l.includes("e-posta") || l.includes("email") || l.includes("mail") || l.includes("e-mail")) return PLATFORM_ICONS.email;
  return null;
}

function renderMessageText(text: string) {
  // 1. Strip bold/italic markdown
  const clean = text.replace(/\*\*(.*?)\*\*/g, "$1").replace(/\*(.*?)\*/g, "$1");

  // 2. Extract [BUTTON:Label:URL] tokens
  const buttonRegex = /\[BUTTON:([^\]:]+):([^\]]+)\]/g;
  const buttons: Array<{ label: string; url: string }> = [];
  const withoutButtons = clean.replace(buttonRegex, (_, label, url) => {
    buttons.push({ label: label.trim(), url: url.trim() });
    return "";
  }).trim();

  // 3. Convert markdown links [label](url) and bare URLs/phones/emails
  const mdLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  const tokens: Array<{ type: "mdlink"; label: string; url: string } | { type: "text"; value: string }> = [];

  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = mdLinkRegex.exec(withoutButtons)) !== null) {
    if (m.index > last) tokens.push({ type: "text", value: withoutButtons.slice(last, m.index) });
    tokens.push({ type: "mdlink", label: m[1], url: m[2] });
    last = m.index + m[0].length;
  }
  if (last < withoutButtons.length) tokens.push({ type: "text", value: withoutButtons.slice(last) });

  const inlineRegex = /(https?:\/\/[^\s]+|[\+\d][\d\s\-]{7,}\d|[\w.-]+@[\w.-]+\.\w+)/g;
  const elements: React.ReactNode[] = [];

  tokens.forEach((token, ti) => {
    if (token.type === "mdlink") {
      elements.push(
        <a key={`md-${ti}`} href={token.url} target="_blank" rel="noopener noreferrer"
          className="underline font-medium break-all" style={{ color: "#88ce02" }}>
          {token.label}
        </a>
      );
      return;
    }
    const parts = token.value.split(inlineRegex);
    parts.forEach((part, pi) => {
      if (/^https?:\/\//.test(part)) {
        elements.push(
          <a key={`${ti}-${pi}`} href={part} target="_blank" rel="noopener noreferrer"
            className="underline font-medium break-all" style={{ color: "#88ce02" }}>{part}</a>
        );
      } else if (/^[\+\d][\d\s\-]{7,}\d$/.test(part)) {
        elements.push(
          <a key={`${ti}-${pi}`} href={"tel:" + part.replace(/\s/g, "")}
            className="underline font-medium" style={{ color: "#88ce02" }}>{part}</a>
        );
      } else if (/^[\w.-]+@[\w.-]+\.\w+$/.test(part)) {
        elements.push(
          <a key={`${ti}-${pi}`} href={`mailto:${part}`}
            className="underline font-medium" style={{ color: "#88ce02" }}>{part}</a>
        );
      } else {
        elements.push(<span key={`${ti}-${pi}`}>{part}</span>);
      }
    });
  });

  return (
    <span style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}>
      <span>{elements}</span>
      {buttons.length > 0 && (
        <span className="flex flex-wrap gap-1.5 mt-2">
          {buttons.map((btn, i) => {
            const iconPath = getPlatformIcon(btn.label);
            return (
              <a
                key={i}
                href={btn.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
                style={{
                  background: "rgba(136,206,2,0.12)",
                  border: "1px solid rgba(136,206,2,0.35)",
                  color: "#88ce02",
                  borderRadius: 10,
                  padding: "5px 10px",
                  fontSize: 11,
                  fontWeight: 600,
                  textDecoration: "none",
                  lineHeight: 1,
                }}
              >
                {iconPath && (
                  <svg viewBox="0 0 24 24" width={12} height={12} fill="currentColor" style={{ flexShrink: 0 }}>
                    <path d={iconPath} />
                  </svg>
                )}
                {btn.label}
              </a>
            );
          })}
        </span>
      )}
    </span>
  );
}

export function FloatingAssistant() {
  const t = useTranslations("assistant");

  const entryRef    = useRef<HTMLDivElement>(null); // outer fixed wrapper
  const pulseRef    = useRef<HTMLDivElement>(null);
  const avatarRef   = useRef<HTMLDivElement>(null); // standalone avatar button
  const panelRef    = useRef<HTMLDivElement>(null); // morphing chat panel
  const contentRef  = useRef<HTMLDivElement>(null); // chat content inside panel
  const tooltipRef  = useRef<HTMLDivElement>(null); // greeting tooltip bubble
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesScrollRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const [isOpen, setIsOpen]   = useState(false);
  const [input, setInput]     = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Fix translation on mount
  useEffect(() => {
    setMessages([{ id: 0, from: "ai", text: t("greeting") }]);
  }, [t]);

  // Entry + pulse + tooltip — cookie consent sonrası başlar
  useEffect(() => {
    const entry = entryRef.current;
    const tooltip = tooltipRef.current;
    if (!entry || !tooltip) return;

    gsap.set(entry, { y: 120, opacity: 0 });
    gsap.set(tooltip, { opacity: 0, x: 16, scale: 0.9 });

    let showTimer: ReturnType<typeof setTimeout>;
    let hideTimer: ReturnType<typeof setTimeout>;

    const startAnimations = () => {
      // Icon giriş animasyonu
      gsap.fromTo(
        entry,
        { y: 120, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "back.out(1.7)" }
      );
      // Pulse
      gsap.fromTo(
        pulseRef.current,
        { scale: 1, opacity: 0.5 },
        { scale: 1.6, opacity: 0, duration: 1.8, ease: "power2.out", repeat: -1, repeatDelay: 0.4 }
      );
      // Tooltip: icon'dan 2s sonra çık, 3s görün, kaybol
      showTimer = setTimeout(() => {
        gsap.to(tooltip, { opacity: 1, x: 0, scale: 1, duration: 0.4, ease: "back.out(1.5)" });
      }, 2000);
      hideTimer = setTimeout(() => {
        gsap.to(tooltip, { opacity: 0, x: 16, scale: 0.9, duration: 0.3, ease: "power2.in" });
      }, 5000);
    };

    const alreadyConsented = !!localStorage.getItem("qoodly_cookie_consent");

    if (alreadyConsented) {
      // Daha önce consent vermişse direkt başlat
      startAnimations();
    } else {
      // Cookie consent dismiss edilince başlat
      window.addEventListener("qoodly:cookie-dismissed", startAnimations, { once: true });
    }

    return () => {
      window.removeEventListener("qoodly:cookie-dismissed", startAnimations);
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);


  const openChat = () => {
    if (isAnimating.current || isOpen) return;
    isAnimating.current = true;

    const panelW = Math.min(340, window.innerWidth - 24);
    const panelH = Math.min(460, window.innerHeight - 120);

    // Pre-set panel: full size, anchored bottom-right, invisible
    gsap.set(panelRef.current, {
      display: "flex",
      width: panelW,
      height: panelH,
      y: 30,
      scale: 0.88,
      opacity: 0,
      transformOrigin: "bottom right",
    });
    gsap.set(contentRef.current, { opacity: 0, y: 12 });

    const tl = gsap.timeline({
      onComplete: () => { isAnimating.current = false; },
    });

    // 1. Pulse & avatar out — avatar pops slightly then vanishes
    tl.to(pulseRef.current, { opacity: 0, scale: 0.8, duration: 0.1 }, 0);
    tl.to(avatarRef.current, { scale: 1.08, duration: 0.08, ease: "power2.out" }, 0);
    tl.to(avatarRef.current, { scale: 0, opacity: 0, duration: 0.14, ease: "power3.in" }, 0.08);

    // 2. Panel springs up from bottom-right
    tl.to(panelRef.current, {
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 0.42,
      ease: "back.out(1.4)",
    }, 0.15);

    // 3. Content fades in with slight upward drift
    tl.to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.22,
      ease: "power2.out",
    }, 0.38);

    tl.call(() => setIsOpen(true), [], 0.15);
    tl.call(() => messagesScrollRef.current?.focus(), [], 0.52);
  };

  const closeChat = () => {
    if (isAnimating.current || !isOpen) return;
    isAnimating.current = true;

    const tl = gsap.timeline({
      onComplete: () => { isAnimating.current = false; },
    });

    // 1. Content fades out
    tl.to(contentRef.current, { opacity: 0, y: 10, duration: 0.1, ease: "power2.in" }, 0);

    // 2. Panel shrinks back down to bottom-right
    tl.to(panelRef.current, {
      y: 30,
      scale: 0.85,
      opacity: 0,
      duration: 0.22,
      ease: "power3.in",
      transformOrigin: "bottom right",
    }, 0.07);

    // 3. Hide panel, restore avatar (React state)
    tl.call(() => {
      gsap.set(panelRef.current, { display: "none" });
      setIsOpen(false);
    }, [], 0.3);

    // 4. Avatar bounces back in
    tl.fromTo(avatarRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.28, ease: "back.out(2)" },
      0.28
    );

    // 5. Pulse resumes
    tl.to(pulseRef.current, { opacity: 0.5, scale: 1, duration: 0.2 }, 0.45);
  };
  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    const userMsg: Message = { id: Date.now(), from: "user", text: trimmed };
    const newMessages = [...messages, userMsg];
    
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) throw new Error("Failed to connect");

      const data = await response.json();
      
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, from: "ai", text: data.text || t("autoReply") },
      ]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, from: "ai", text: t("error") },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Invisible overlay — click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={closeChat}
        />
      )}
    <div
      ref={entryRef}
      className="fixed bottom-8 right-8 z-50"
    >
      {/* ── Greeting Tooltip ── */}
      <div
        ref={tooltipRef}
        className="absolute pointer-events-none"
        style={{
          display: isOpen ? "none" : undefined,
          bottom: "50%",
          right: "calc(100% + 14px)",
          transform: "translateY(50%)",
          whiteSpace: "nowrap",
          opacity: 0,
        }}
      >
        <div
          style={{
            background: "linear-gradient(160deg, #1a1a22 0%, #111118 100%)",
            border: "1px solid rgba(136,206,2,0.3)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(136,206,2,0.1)",
            borderRadius: 14,
            padding: "10px 14px",
            fontSize: 13,
            fontWeight: 500,
            color: "#f0f0f0",
            lineHeight: 1.4,
          }}
        >
          {t("tooltip")}
          {/* Arrow pointing right */}
          <span
            style={{
              position: "absolute",
              right: -7,
              top: "50%",
              transform: "translateY(-50%)",
              width: 0,
              height: 0,
              borderTop: "7px solid transparent",
              borderBottom: "7px solid transparent",
              borderLeft: "7px solid rgba(136,206,2,0.3)",
            }}
          />
        </div>
      </div>

      {/* ── Standalone Avatar (closed state) ── */}
      <div
        ref={avatarRef}
        className="relative cursor-pointer"
        onClick={openChat}
        style={{ display: isOpen ? "none" : "block" }}
      >
        {/* Pulse ring */}
        <div
          ref={pulseRef}
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: "-10px",
            background: "linear-gradient(135deg, #88ce02, #2ec4b6)",
          }}
        />
        {/* Avatar image */}
        <div className="relative w-24 h-24 rounded-full overflow-hidden"
          style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}
        >
          <Image src="/asistant.webp" alt="AI Assistant" fill className="object-contain" style={{ objectPosition: "center calc(50% + 3px)" }} />
        </div>
      </div>

      {/* ── Morphing Chat Panel ── */}
      <div
        ref={panelRef}
        className="overflow-hidden flex-col"
        style={{
          display: "none",
          position: "absolute",
          bottom: 0,
          right: 0,
          borderRadius: 20,
          background: "linear-gradient(160deg, #0f0f14 0%, #0a0a0f 100%)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(136,206,2,0.2)",
        }}
      >
        {/* Chat content (fades in after morph) */}
        <div ref={contentRef} className="flex flex-col h-full min-h-0 opacity-0">

          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3 shrink-0"
            style={{
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(136,206,2,0.04)",
            }}
          >
            <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0">
              <Image src="/asistant.webp" alt="AI" fill className="object-contain" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white leading-none">{t("name")}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#88ce02] inline-block" />
                <p className="text-xs text-[#88ce02]">{t("status")}</p>
              </div>
            </div>
            <button
              onClick={closeChat}
              className="text-white/30 hover:text-white/70 transition-colors p-1 rounded-lg hover:bg-white/5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div
            ref={messagesScrollRef}
            tabIndex={-1}
            className="flex-1 min-h-0 overflow-y-auto px-4 py-3 flex flex-col gap-3 outline-none scrollbar-thin"
            style={{ overscrollBehavior: "contain", scrollbarWidth: "thin", scrollbarColor: "rgba(136,206,2,0.3) transparent" }}
            onWheel={(e) => e.stopPropagation()}
          >
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-2 ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                {msg.from === "ai" && (
                  <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0 mt-0.5">
                    <Image src="/asistant.webp" alt="AI" fill className="object-contain" />
                  </div>
                )}
                <div
                  className="max-w-[78%] px-3 py-2 text-sm leading-relaxed min-w-0"
                  style={msg.from === "user" ? {
                    background: "linear-gradient(135deg, #88ce02, #5a9900)",
                    color: "#0a0a0a",
                    borderRadius: "16px 16px 4px 16px",
                    fontWeight: 500,
                    wordBreak: "break-word",
                    overflowWrap: "anywhere",
                  } : {
                    background: "rgba(255,255,255,0.06)",
                    color: "#e8e8e8",
                    borderRadius: "4px 16px 16px 16px",
                    border: "1px solid rgba(255,255,255,0.07)",
                    wordBreak: "break-word",
                    overflowWrap: "anywhere",
                  }}
                >
                  {renderMessageText(msg.text)}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-2 justify-start">
                <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0 mt-0.5">
                  <Image src="/asistant.webp" alt="AI" fill className="object-contain" />
                </div>
                <div className="px-4 py-3 flex gap-1 items-center"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "4px 16px 16px 16px",
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#88ce02]/60 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-3 pb-3 pt-2 shrink-0 flex gap-2 items-center"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={t("placeholder")}
              className="flex-1 text-sm text-white placeholder-white/25 outline-none bg-transparent"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12,
                padding: "8px 12px",
              }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all disabled:opacity-25 hover:scale-105 active:scale-95"
              style={{ background: "linear-gradient(135deg, #88ce02, #5a9900)" }}
            >
              <svg className="w-4 h-4 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19V5m0 0l-7 7m7-7l7 7" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </div>
    </>
  );
}
