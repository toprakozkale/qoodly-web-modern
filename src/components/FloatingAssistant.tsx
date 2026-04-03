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

export function FloatingAssistant() {
  const t = useTranslations("assistant");

  const entryRef    = useRef<HTMLDivElement>(null); // outer fixed wrapper
  const pulseRef    = useRef<HTMLDivElement>(null);
  const avatarRef   = useRef<HTMLDivElement>(null); // standalone avatar button
  const panelRef    = useRef<HTMLDivElement>(null); // morphing chat panel
  const contentRef  = useRef<HTMLDivElement>(null); // chat content inside panel
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const [isOpen, setIsOpen]   = useState(false);
  const [input, setInput]     = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Fix translation on mount
  useEffect(() => {
    setMessages([{ id: 0, from: "ai", text: t("greeting") }]);
  }, [t]);

  // Entry + pulse animations
  useEffect(() => {
    gsap.set(entryRef.current, { y: 120, opacity: 0 });
    const ctx = gsap.context(() => {
      gsap.fromTo(
        entryRef.current,
        { y: 120, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "back.out(1.7)", delay: 2 }
      );
      gsap.fromTo(
        pulseRef.current,
        { scale: 1, opacity: 0.5 },
        { scale: 1.6, opacity: 0, duration: 1.8, ease: "power2.out", repeat: -1, repeatDelay: 0.4 }
      );
    });
    return () => ctx.revert();
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

    const tl = gsap.timeline({
      onComplete: () => { isAnimating.current = false; },
    });

    tl.to(pulseRef.current, { opacity: 0, scale: 1, duration: 0.15 }, 0);
    tl.to(avatarRef.current, { scale: 0.6, opacity: 0, duration: 0.25, ease: "power2.in" }, 0);
    tl.fromTo(
      panelRef.current,
      { width: 96, height: 96, borderRadius: "50%", opacity: 1, display: "flex" },
      { width: panelW, height: panelH, borderRadius: 20, duration: 0.5, ease: "power3.inOut" },
      0.1
    );
    tl.fromTo(
      contentRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
      0.45
    );
    tl.call(() => setIsOpen(true), [], 0.1);
  };

  const closeChat = () => {
    if (isAnimating.current || !isOpen) return;
    isAnimating.current = true;

    const tl = gsap.timeline({
      onComplete: () => { isAnimating.current = false; },
    });

    // 1. Content fades out
    tl.to(contentRef.current, { opacity: 0, y: 8, duration: 0.2, ease: "power2.in" }, 0);

    // 2. Panel morphs back rect → circle
    tl.to(panelRef.current, {
      width: 96, height: 96, borderRadius: "50%",
      duration: 0.4, ease: "power3.inOut",
    }, 0.15);

    // 3. Hide panel, show avatar
    tl.call(() => {
      gsap.set(panelRef.current, { display: "none" });
      setIsOpen(false);
    }, [], 0.55);

    tl.to(avatarRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }, 0.5);

    // 4. Pulse back
    tl.to(pulseRef.current, { opacity: 0.5, duration: 0.3 }, 0.7);
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
          <Image src="/asistant.webp" alt="AI Assistant" fill className="object-contain" />
        </div>
      </div>

      {/* ── Morphing Chat Panel ── */}
      <div
        ref={panelRef}
        className="overflow-hidden flex-col"
        style={{
          display: "none",
          width: 96,
          height: 96,
          borderRadius: "50%",
          background: "linear-gradient(160deg, #0f0f14 0%, #0a0a0f 100%)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(136,206,2,0.2)",
        }}
      >
        {/* Chat content (fades in after morph) */}
        <div ref={contentRef} className="flex flex-col h-full opacity-0">

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
          <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3"
            style={{ scrollbarWidth: "none" }}
          >
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-2 ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                {msg.from === "ai" && (
                  <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0 mt-0.5">
                    <Image src="/asistant.webp" alt="AI" fill className="object-contain" />
                  </div>
                )}
                <div
                  className="max-w-[78%] px-3 py-2 text-sm leading-relaxed"
                  style={msg.from === "user" ? {
                    background: "linear-gradient(135deg, #88ce02, #5a9900)",
                    color: "#0a0a0a",
                    borderRadius: "16px 16px 4px 16px",
                    fontWeight: 500,
                  } : {
                    background: "rgba(255,255,255,0.06)",
                    color: "#e8e8e8",
                    borderRadius: "4px 16px 16px 16px",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  {msg.text}
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
