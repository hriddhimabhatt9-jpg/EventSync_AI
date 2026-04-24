"use client";

import React, { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "Hello! I'm your EventSync AI assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: getSimulatedResponse(newUserMsg.text),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getSimulatedResponse = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes("event") || lower.includes("schedule")) {
      return "You can view all upcoming events and schedules in the Dashboard or Events tab.";
    }
    if (lower.includes("safe") || lower.includes("sos")) {
      return "Safety is our priority. You can use the SOS button in the Safety tab to alert event organizers immediately.";
    }
    if (lower.includes("map") || lower.includes("navigate") || lower.includes("where")) {
      return "Check out the Map section for crowd-aware navigation to find your way around the venue.";
    }
    if (lower.includes("network") || lower.includes("connect") || lower.includes("people")) {
      return "The Networking tab shows you people with similar interests. It's a great place to start connecting!";
    }
    return "That's an interesting question! I'm still learning, but you can explore the platform's tabs to find more information.";
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 h-[30rem] glass-surface shadow-cloud-lg rounded-2xl border border-outline-variant/30 flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-primary text-on-primary p-4 flex items-center justify-between shadow-md z-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">smart_toy</span>
              </div>
              <div>
                <h3 className="font-headline font-semibold text-sm">EventSync AI</h3>
                <p className="text-[10px] text-white/80">Intelligent Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close chat"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-surface-container-lowest/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                } animate-fade-in`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.sender === "user"
                      ? "gradient-primary text-on-primary rounded-br-sm shadow-sm"
                      : "bg-surface text-on-surface border border-outline-variant/30 rounded-bl-sm shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-on-surface-variant mt-1 px-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-start animate-fade-in">
                <div className="bg-surface border border-outline-variant/30 text-on-surface p-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce delay-200"></div>
                  <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce delay-300"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-surface-container-lowest border-t border-outline-variant/20">
            <div className="flex items-center gap-2 bg-surface-container-low rounded-full px-4 py-2 border border-outline-variant/30 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent border-none focus:outline-none text-sm text-on-surface placeholder:text-on-surface-variant/70"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="p-1.5 rounded-full text-primary hover:bg-primary/10 disabled:opacity-50 disabled:hover:bg-transparent transition-colors flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[20px] filled">send</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full gradient-primary text-on-primary shadow-cloud-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center animate-scale-in"
          aria-label="Open AI Chatbot"
        >
          <span className="material-symbols-outlined text-[28px]">smart_toy</span>
        </button>
      )}
    </div>
  );
}
