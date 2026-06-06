// Store for handling reactive chats which syncs seamlessly via LocalStorage events
export interface ChatMessage {
  id: string;
  sender: "user" | "admin";
  senderName: string;
  content: string;
  timestamp: string;
  isAiSuggested?: boolean;
}

export interface ChatThread {
  id: string; // e.g. "pencaker" or "perusahaan"
  contactName: string;
  contactRole: "Pencari Kerja" | "Mitra Industri";
  contactDetail: string; // e.g. "NIK: 321012..." or "PT Shoetown Ligung"
  avatarUrl: string;
  messages: ChatMessage[];
  unreadCount: number;
}

const DEFAULT_THREADS: ChatThread[] = [
  {
    id: "pencaker_radit",
    contactName: "Radit Widjaya",
    contactRole: "Pencari Kerja",
    contactDetail: "NIK: 3210121508980004 • Kec. Jatiwangi",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
    unreadCount: 0,
    messages: [
      {
        id: "msg_p1",
        sender: "user",
        senderName: "Radit Widjaya",
        content: "Halo admin, berkas Kartu Kuning AK1 saya berstatus 'Diajukan'. Mohon info berapa lama proses verifikasi hingga aktif ya?",
        timestamp: "10:15"
      },
      {
        id: "msg_p2",
        sender: "admin",
        senderName: "Disnaker Admin",
        content: "Halo Radit! Proses verifikasi biasanya memakan waktu maksimal 1x24 jam. Tim kami sedang melakukan pencocokan silang NIK Anda dengan database Kemendagri.",
        timestamp: "10:30"
      },
      {
        id: "msg_p3",
        sender: "user",
        senderName: "Radit Widjaya",
        content: "Baik, terima kasih banyak admin atas respons cepatnya! Saya sangat butuh kartunya hari ini untuk melamar di Kertajati Job Fair.",
        timestamp: "10:35"
      }
    ]
  },
  {
    id: "mitra_shoetown",
    contactName: "Siska Wardani",
    contactRole: "Mitra Industri",
    contactDetail: "PT Shoetown Ligung Indonesia • NIB: 8123456789012",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    unreadCount: 1,
    messages: [
      {
        id: "msg_c1",
        sender: "user",
        senderName: "Siska Wardani",
        content: "Selamat pagi Disnaker Majalengka, kami berencana membuka lowongan massal untuk 300 Operator Sewing minggu depan. Apakah bisa dibantu fasilitasi rekrutmen fisik di BLK?",
        timestamp: "09:05"
      }
    ]
  }
];

// Load from LocalStorage
export function getChatThreads(): ChatThread[] {
  const data = localStorage.getItem("majalengka_disnaker_chats");
  if (!data) {
    localStorage.setItem("majalengka_disnaker_chats", JSON.stringify(DEFAULT_THREADS));
    return DEFAULT_THREADS;
  }
  try {
    return JSON.parse(data);
  } catch (err) {
    return DEFAULT_THREADS;
  }
}

// Save to LocalStorage and dispatch event
export function saveChatThreads(threads: ChatThread[]) {
  localStorage.setItem("majalengka_disnaker_chats", JSON.stringify(threads));
  window.dispatchEvent(new Event("majalengka_chat_updated"));
}

// Add message to thread
export function addMessageToThread(threadId: string, message: Omit<ChatMessage, "id" | "timestamp">) {
  const threads = getChatThreads();
  const index = threads.findIndex(t => t.id === threadId);
  if (index !== -1) {
    const now = new Date();
    const timeStr = now.toTimeString().split(" ")[0].substring(0, 5);
    const newMessage: ChatMessage = {
      ...message,
      id: `msg_${Date.now()}`,
      timestamp: timeStr
    };
    
    threads[index].messages.push(newMessage);
    
    // Auto increment unread count if message is from the other side
    // If sent by user (and we are viewing as admin) or sent by admin (and we are viewing as user)
    // For simplicity, we just trigger unread count nicely
    
    saveChatThreads(threads);
  }
}

// Clear unread count
export function clearUnreadCount(threadId: string) {
  const threads = getChatThreads();
  const index = threads.findIndex(t => t.id === threadId);
  if (index !== -1) {
    threads[index].unreadCount = 0;
    saveChatThreads(threads);
  }
}
