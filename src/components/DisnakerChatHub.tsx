import React, { useState, useEffect, useRef } from "react";
import { 
  Send, 
  MessageSquare, 
  Bot, 
  Sparkles, 
  User, 
  Building2, 
  RefreshCw, 
  Clock, 
  CheckCheck, 
  ShieldAlert,
  Loader2,
  Bookmark,
  Volume2,
  VolumeX,
  Plus
} from "lucide-react";
import { 
  getChatThreads, 
  saveChatThreads, 
  addMessageToThread, 
  clearUnreadCount, 
  ChatThread, 
  ChatMessage 
} from "../utils/chatStore";

interface DisnakerChatHubProps {
  userRole: "Pencari Kerja" | "Mitra Industri" | "Admin";
  currentUserName?: string;
}

export default function DisnakerChatHub({ userRole, currentUserName = "User" }: DisnakerChatHubProps) {
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [selectedThreadId, setSelectedThreadId] = useState<string>("");
  const [typedMessage, setTypedMessage] = useState<string>("");
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState<boolean>(false);
  const [isRefreshingSuggestions, setIsRefreshingSuggestions] = useState<boolean>(false);
  const [hasBeep, setHasBeep] = useState<boolean>(true);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Sync threads on mount and event listeners
  const loadThreadsFromStore = () => {
    const list = getChatThreads();
    setThreads(list);

    // Auto select appropriate thread for clients
    if (userRole === "Pencari Kerja") {
      setSelectedThreadId("pencaker_radit");
    } else if (userRole === "Mitra Industri") {
      setSelectedThreadId("mitra_shoetown");
    } else if (userRole === "Admin" && !selectedThreadId) {
      if (list.length > 0) {
        setSelectedThreadId(list[0].id);
      }
    }
  };

  useEffect(() => {
    loadThreadsFromStore();
    window.addEventListener("majalengka_chat_updated", loadThreadsFromStore);
    return () => {
      window.removeEventListener("majalengka_chat_updated", loadThreadsFromStore);
    };
  }, [userRole]);

  const activeThread = threads.find(t => t.id === selectedThreadId);

  // Scroll to bottom when messages list size shifts
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeThread?.messages?.length]);

  // Load AI suggested prepared answers whenever the active thread's message history updates (only for Admin)
  useEffect(() => {
    if (userRole === "Admin" && activeThread) {
      fetchAiSuggestions();
    }
  }, [selectedThreadId, activeThread?.messages?.length, userRole]);

  // Sound beep synthesizers
  const triggerNotificationSound = (type: "send" | "incoming") => {
    if (!hasBeep) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(type === "send" ? 600 : 900, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) {
      console.warn("Audio Context error:", e);
    }
  };

  // Fetch AI prepared responses from server
  const fetchAiSuggestions = async () => {
    if (!activeThread) return;
    setLoadingSuggestions(true);
    try {
      const response = await fetch("/api/gemini/chat-suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactRole: activeThread.contactRole,
          contactName: activeThread.contactName,
          messageHistory: activeThread.messages
        })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.suggestions && Array.isArray(data.suggestions)) {
          setAiSuggestions(data.suggestions);
        }
      }
    } catch (err) {
      console.error("Gagal memuat jawaban AI:", err);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  // Clear unreads on opening a thread
  useEffect(() => {
    if (selectedThreadId) {
      clearUnreadCount(selectedThreadId);
    }
  }, [selectedThreadId]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!typedMessage.trim() || !selectedThreadId) return;

    // Send logic
    const senderType = userRole === "Admin" ? "admin" : "user";
    const senderName = userRole === "Admin" ? "Disnaker Admin" : currentUserName;

    addMessageToThread(selectedThreadId, {
      sender: senderType,
      senderName,
      content: typedMessage.trim()
    });

    triggerNotificationSound("send");
    setTypedMessage("");

    // Simulate auto-recipient replies for demo if user is chatting as candidate
    if (userRole !== "Admin") {
      simulateAdminAutoReply();
    }
  };

  // Automated smart simulated responses from Admin when user initiates a chat
  const simulateAdminAutoReply = () => {
    setTimeout(() => {
      const answers = [
        "Aduan & pertanyaan Anda telah diteruskan ke bidang penempatan tenaga kerja Disnaker Majalengka. Terima kasih telah melapor silih asih silih asuh.",
        "Terima kasih telah berkomunikasi dengan layanan digital Disnaker. Tiket konsultasi Anda direkam secara realtime. Tim verifikator kami akan menjawab dalam 10 menit.",
        "Silakan periksa secara berkala menu AK1 Digital Anda, sistem kami terus menyinkronkan data dengan Disdukcapil Majalengka."
      ];
      const randomReply = answers[Math.floor(Math.random() * answers.length)];
      
      addMessageToThread(selectedThreadId, {
        sender: "admin",
        senderName: "Disnaker Admin",
        content: randomReply
      });
      triggerNotificationSound("incoming");
    }, 2500);
  };

  // Click suggestions triggers immediate insertion or direct dispatch
  const handleUseSuggestion = (suggestion: string) => {
    setTypedMessage(suggestion);
  };

  return (
    <div className="rounded-[32px] border border-blue-100 bg-white shadow-lg overflow-hidden flex flex-col md:flex-row h-[580px]" id="disnaker-chat-hub-root">
      
      {/* LEFT COLUMN: CONTACT THREADS LIST (Only visible for admin, clients only see their own thread) */}
      {userRole === "Admin" && (
        <div className="w-full md:w-80 border-r border-gray-100 bg-slate-50/50 flex flex-col">
          <div className="p-4 border-b border-gray-100 bg-white">
            <h3 className="font-black text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare size={15} className="text-blue-600" />
              Kotak Masuk Aduan & Chat ({threads.length})
            </h3>
            <p className="text-[10px] text-gray-400 font-semibold mt-1">Interaksi real-time Kandidat & Mitra Industri</p>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {threads.map((thread) => {
              const isSelected = thread.id === selectedThreadId;
              const lastMsg = thread.messages[thread.messages.length - 1];
              
              return (
                <button
                  key={thread.id}
                  onClick={() => setSelectedThreadId(thread.id)}
                  className={`w-full flex items-start gap-2.5 p-3 rounded-2xl transition text-left cursor-pointer ${
                    isSelected 
                      ? "bg-white shadow border border-blue-100/60" 
                      : "hover:bg-slate-100/60"
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={thread.avatarUrl}
                      alt={thread.contactName}
                      className="h-10 w-10 rounded-full object-cover border border-gray-200"
                    />
                    {thread.unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white font-mono font-bold text-[8px] h-4 w-4 rounded-full flex items-center justify-center animate-bounce">
                        {thread.unreadCount}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-800 truncate block">
                        {thread.contactName}
                      </span>
                      <span className="text-[9px] font-bold text-slate-400 shrink-0">
                        {lastMsg ? lastMsg.timestamp : "Baru"}
                      </span>
                    </div>
                    <span className={`text-[8px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                      thread.contactRole === "Pencari Kerja" 
                        ? "bg-blue-50 text-blue-800" 
                        : "bg-indigo-50 text-indigo-900"
                    }`}>
                      {thread.contactRole}
                    </span>
                    <p className="text-[10px] text-gray-500 truncate font-medium mt-1">
                      {lastMsg ? lastMsg.content : "Belum ada pesan."}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
          
          <div className="p-3 border-t border-gray-150 bg-white flex items-center justify-between text-[10px] font-bold text-gray-400">
            <span>Disnaker Chat Hub v2.1</span>
            <button 
              onClick={() => setHasBeep(!hasBeep)} 
              className="text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
            >
              {hasBeep ? <Volume2 size={12} /> : <VolumeX size={12} />} Audio
            </button>
          </div>
        </div>
      )}

      {/* RIGHT COLUMN: ACTIVE CONVERSATION SHEET */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
        {activeThread ? (
          <>
            {/* Active Thread Bar header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white relative z-10">
              <div className="flex items-center gap-3">
                <img
                  src={activeThread.avatarUrl}
                  alt={activeThread.contactName}
                  className="h-10 w-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-black text-slate-900 text-xs leading-none">
                      {userRole === "Admin" ? activeThread.contactName : "Disnaker Kabupaten Majalengka"}
                    </h4>
                    {userRole === "Admin" && (
                      <span className={`text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        activeThread.contactRole === "Pencari Kerja" 
                          ? "bg-blue-100 text-blue-900" 
                          : "bg-indigo-100 text-indigo-900"
                      }`}>
                        {activeThread.contactRole}
                      </span>
                    )}
                  </div>
                  <p className="text-[9px] text-gray-500 font-semibold mt-1">
                    {userRole === "Admin" ? activeThread.contactDetail : "Konsultasi Publik Resmi • Aktif"}
                  </p>
                </div>
              </div>

              {/* Badges and sound control */}
              <div className="flex items-center gap-2">
                {userRole !== "Admin" && (
                  <button 
                    onClick={() => setHasBeep(!hasBeep)} 
                    className="p-2 bg-slate-50 hover:bg-slate-100 rounded-xl transition text-slate-500 cursor-pointer"
                  >
                    {hasBeep ? <Volume2 size={13} /> : <VolumeX size={13} />}
                  </button>
                )}
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest block">ONLINE</span>
              </div>
            </div>

            {/* Render Scrollable Message Threads list */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50/40 space-y-3">
              {activeThread.messages.map((msg) => {
                const isMe = userRole === "Admin" ? msg.sender === "admin" : msg.sender === "user";
                return (
                  <div 
                    key={msg.id} 
                    className={`flex flex-col max-w-[85%] ${
                      isMe ? "ml-auto items-end" : "mr-auto items-start"
                    }`}
                  >
                    {/* Speaker name */}
                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
                      {msg.senderName} • {msg.timestamp}
                    </span>

                    {/* Speech bubble */}
                    <div 
                      className={`rounded-2xl p-3 text-xs leading-relaxed font-medium shadow-sm transition ${
                        isMe 
                          ? "bg-gradient-to-r from-[#1A365D] to-accent-blue text-white rounded-tr-none" 
                          : "bg-white border border-blue-50 text-slate-800 rounded-tl-none"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* CO-PILOT AI SECTION: Prepared Answer suggestions (Disiapkan Jawaban AI - Only for Admin) */}
            {userRole === "Admin" && (
              <div className="bg-blue-50/50 border-t border-b border-blue-100 p-3 space-y-2 relative">
                <div className="flex items-center justify-between text-[10px] uppercase font-black tracking-wider text-blue-900 leading-none">
                  <span className="flex items-center gap-1">
                    <Bot size={13} className="text-blue-600 animate-bounce" />
                    🤖 Co-Pilot AI: Rekomendasi Jawaban Cepat
                  </span>
                  <button 
                    onClick={fetchAiSuggestions}
                    disabled={loadingSuggestions}
                    className="hover:text-amber-700 text-slate-500 font-extrabold flex items-center gap-1 disabled:opacity-50 transition cursor-pointer"
                  >
                    <RefreshCw size={10} className={loadingSuggestions ? "animate-spin" : ""} />
                    Regenerasi Balasan
                  </button>
                </div>

                {loadingSuggestions ? (
                  <div className="flex items-center gap-2 py-2 text-[10px] text-blue-700/80 font-bold">
                    <Loader2 size={12} className="animate-spin text-blue-600 font-bold" />
                    Menyusun saran balasan sopan & solutif berdasarkan konteks riwayat chat via Gemini...
                  </div>
                ) : aiSuggestions.length > 0 ? (
                  <div className="grid grid-cols-1 gap-2">
                    {aiSuggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleUseSuggestion(suggestion)}
                        className="text-left px-3 py-2 bg-white hover:bg-slate-50 border border-blue-100 hover:border-blue-300 rounded-xl transition text-[11px] text-slate-700 font-semibold cursor-pointer block leading-normal relative group"
                        title="Klik untuk menggunakan balasan cepat ini"
                      >
                        <span className="absolute top-1 right-2 text-[8px] font-mono text-gray-300 font-bold group-hover:text-blue-500">AI OPTION #{idx + 1}</span>
                        <p className="pr-12">{suggestion}</p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-[9px] text-gray-400 font-semibold">Gagal atau belum ada rekomendasi balasan untuk pesan terkirim.</p>
                )}
              </div>
            )}

            {/* Interactive Input Form bar */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-100 bg-white flex items-center gap-2">
              <input
                type="text"
                value={typedMessage}
                onChange={(e) => setTypedMessage(e.target.value)}
                placeholder={
                  userRole === "Admin" 
                    ? `Balas pesan ini atau klik opsi "Jawaban Cepat AI" di atas...` 
                    : `Ketik pesan konsultasi Anda di sini...`
                }
                className="flex-1 bg-slate-50 hover:bg-slate-100/50 focus:bg-white outline-none rounded-xl border border-blue-50 focus:border-blue-300 px-4 py-2.5 text-xs font-semibold text-slate-800 transition"
              />
              <button
                type="submit"
                className="p-3 rounded-xl bg-gradient-to-r from-[#1A365D] to-accent-blue hover:opacity-95 text-white shadow-sm flex items-center justify-center transition cursor-pointer shrink-0"
              >
                <Send size={14} />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-400 space-y-2">
            <MessageSquare size={36} className="text-gray-300 mx-auto animate-pulse" />
            <p className="text-xs font-bold uppercase tracking-wider text-slate-700">Hub Obrolan Disnaker</p>
            <p className="text-[10px] text-gray-400 max-w-sm">
              Silakan pilih salah satu percakapan di bilah kiri untuk membuka dan mengelola aduan.
            </p>
          </div>
        )}
      </div>
      
    </div>
  );
}
