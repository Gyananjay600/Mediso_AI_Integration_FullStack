import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Sparkles, Bot } from "lucide-react";
import { sendChatMessage } from "../lib/api";

const WELCOME_MESSAGE = {
  role: "assistant",
  content:
    "Hi! I'm the Mediso Health Assistant 👋 Tell me what you're experiencing and I'll point you to the right specialist. (I'm an AI, not a doctor — for emergencies, please call your local emergency number.)",
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  async function handleSend(e) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    const nextMessages = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setIsSending(true);

    try {
      const result = await sendChatMessage(trimmed, sessionId);
      setSessionId(result.sessionId);
      setMessages((prev) => [...prev, { role: "assistant", content: result.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I couldn't reach the assistant service right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {isOpen && (
        <div className="mb-4 w-[90vw] max-w-sm h-[65vh] max-h-[520px] bg-white rounded-3xl border border-ink/10 shadow-[0_20px_60px_rgba(22,36,29,0.18)] flex flex-col overflow-hidden animate-[fadeIn_0.2s_ease-out]">
          {/* Header */}
          <div className="bg-ink text-cream px-5 py-4 flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
              <Bot size={18} className="text-primary-light" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-semibold text-sm leading-tight">Mediso Health Assistant</p>
              <span className="inline-flex items-center gap-1 text-[10px] text-primary-light font-medium">
                <Sparkles size={10} /> AI-powered
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-cream/60 hover:text-cream transition-colors"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-cream/40">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-primary text-white rounded-br-sm"
                      : "bg-white text-ink border border-ink/5 rounded-bl-sm shadow-sm"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {isSending && (
              <div className="flex justify-start">
                <div className="bg-white border border-ink/5 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-ink/30 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-ink/30 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-ink/30 animate-bounce" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 border-t border-ink/5 bg-white flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe how you're feeling..."
              maxLength={1000}
              className="flex-1 bg-cream/60 border border-ink/10 focus:border-primary text-sm text-ink rounded-full px-4 py-2.5 outline-none transition-colors placeholder:text-ink/30"
            />
            <button
              type="submit"
              disabled={isSending || !input.trim()}
              className="h-10 w-10 shrink-0 rounded-full bg-primary hover:bg-primary-dark disabled:opacity-40 text-white flex items-center justify-center transition-colors"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="h-14 w-14 rounded-full bg-primary hover:bg-primary-dark text-white shadow-[0_10px_30px_rgba(47,107,79,0.35)] flex items-center justify-center transition-all duration-300 hover:scale-105"
        aria-label={isOpen ? "Close health assistant" : "Open health assistant"}
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
