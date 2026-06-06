import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare, 
  Phone, 
  ShieldCheck, 
  FileCheck,
  Send
} from "lucide-react";

interface FAQItem {
  id: string;
  category: "ak1" | "complaint" | "general";
  question: string;
  answer: string;
}

interface HelpCenterProps {
  isDarkMode: boolean;
  onNavigateTab?: (tab: string) => void;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-ak1-1",
    category: "ak1",
    question: "Apa itu Kartu Kuning (AK1) Digital?",
    answer: "Kartu Kuning (AK1) Digital adalah bukti registrasi pencari kerja resmi yang diterbitkan oleh Dinas Ketenagakerjaan Kabupaten Majalengka secara digital. Kartu ini berlaku secara nasional serta dilengkapi dengan kode QR unik terverifikasi untuk memudahkan pencocokan profil dengan lowongan kerja aktif."
  },
  {
    id: "faq-ak1-2",
    category: "ak1",
    question: "Berapa biaya pengajuan Kartu AK1 di portal ini?",
    answer: "Pengajuan dan penerbitan Kartu AK1 Digital di portal Karir Majalengka adalah GRATIS 100%. Sesuai dengan peraturan ketenagakerjaan pemerintah, seluruh proses administrasi pencarian kerja bebas dari segala pungutan liar atau biaya tambahan."
  },
  {
    id: "faq-ak1-3",
    category: "ak1",
    question: "Dokumen apa saja yang wajib diunggah untuk pengajuan?",
    answer: "Anda hanya perlu mempersiapkan dokumen dasar yang meliputi: NIK KTP (terintegrasi otomatis dengan Disdukcapil), pas foto formal terbaru, ijazah pendidikan terakhir (atau surat keterangan kelulusan), serta draf riwayat hidup (CV) dasar yang dapat dipoles bantuan asisten kecerdasan buatan (AI) kami."
  },
  {
    id: "faq-ak1-4",
    category: "ak1",
    question: "Berapa lama proses verifikasi hingga Kartu AK1 saya aktif?",
    answer: "Proses peninjauan dokumen oleh validator Dinas Ketenagakerjaan Majalengka biasanya selesai dalam waktu maksimal 1x24 jam kerja. Setelah disetujui, Anda akan menerima pemberitahuan resmi dan dapat langsung mengunduh kartu PDF interaktif Anda di bawah menu profil pencari kerja."
  },
  {
    id: "faq-complaint-1",
    category: "complaint",
    question: "Bagaimana cara mengajukan sengketa hubungan kerja atau aduan karyawan?",
    answer: "Anda dapat mengakses tab 'Aduan & Panic Sistem' di menu navigasi utama. Isikan formulir pengaduan secara lengkap beserta identitas pribadi, nama perusahaan terlapor, rincian kronologi (misal Pemotongan Upah Sepihak, Status Kontrak bermasalah), serta dokumen pendukung (slip gaji, surat kontrak). Tiket aduan Anda akan ditangani langsung oleh staf mediator Disnaker."
  },
  {
    id: "faq-complaint-2",
    category: "complaint",
    question: "Apa tindakan lanjutan setelah tiket pengaduan saya terdaftar?",
    answer: "Sistem akan melakukan triase laporan awal dalam waktu 48 jam. Jika laporan memenuhi kriteria penyelesaian sengketa, Disnaker akan menerbitkan undangan Tripartit resmi untuk mempertemukan perwakilan buruh dan manajemen perusahaan dalam agenda musyawarah mufakat (mediasi damai) yang diawasi oleh mediator profesional."
  },
  {
    id: "faq-complaint-3",
    category: "complaint",
    question: "Kapan saya boleh menekan tombol Panic Button (Alarm Bahaya)?",
    answer: "Fitur Panic Button adalah sistem deteksi bahaya berprioritas tinggi. Tombol ini HANYA boleh ditekan sewaktu-waktu terjadi pelanggaran keselamatan kerja (K3) berat yang membahayakan nyawa secara langsung, penyekapan di lingkungan industri, atau intimidasi fisik di tempat kerja. Penyalahgunaan alarm ini dapat dikenai sanksi administratif."
  },
  {
    id: "faq-complaint-4",
    category: "complaint",
    question: "Apakah identitas saya dijamin aman jika melaporkan pelanggaran perusahaan?",
    answer: "Sangat dijamin. Di dalam formulir, Anda dapat mencentang opsi 'Laporkan Secara Anonim'. Tim investigasi Disnaker berkomitmen merahasiakan identitas pelapor sepenuhnya dari pihak eksternal, dan proses audit pengawasan akan dijalankan atas nama inspeksi dinas independen demi melindungi privasi Anda."
  },
  {
    id: "faq-general-1",
    category: "general",
    question: "Bagaimana cara mendaftarkan lowongan perusahaan (HRD)?",
    answer: "Untuk perwakilan industri atau HRD, silakan klik tombol 'Masuk' kemudian pilih 'Daftar Sebagai Perusahaan'. Setelah mengisi data legalitas SIUP/NIB, Anda dapat langsung mengajukan draf loker untuk dimoderasi. Begitu disetujui, lowongan akan tampil otomatis di hadapan ribuan pencari kerja lokal."
  },
  {
    id: "faq-general-2",
    category: "general",
    question: "Bagaimana menguji kesiapan CV saya dengan AI?",
    answer: "Silakan masuk ke terminal 'Pencari Kerja', gulir ke bawah ke modul 'AI Career Assistant'. Unggah berkas teks draf riwayat hidup Anda, asisten cerdas kami akan menganalisis relevansi dengan kebutuhan industri Rebana dan memberikan masukan konstruktif dalam hitungan detik."
  }
];

export default function HelpCenter({ isDarkMode, onNavigateTab }: HelpCenterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | "ak1" | "complaint" | "general">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Simple feedback message system logic
  const [feedbackInput, setFeedbackInput] = useState("");
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  const toggleAccordion = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredFAQs = FAQ_DATA.filter(item => {
    const matchesSearch = 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackInput.trim()) return;
    setFeedbackSuccess(true);
    setFeedbackInput("");
    setTimeout(() => {
      setFeedbackSuccess(false);
    }, 4500);
  };

  return (
    <section 
      id="help-center-section"
      className={`rounded-[32px] border p-6 md:p-8 shadow-sm transition-colors ${
        isDarkMode 
          ? "bg-slate-900/50 border-slate-800 text-slate-100" 
          : "bg-white border-blue-100 text-slate-800"
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Header, Category Navigation, Search & Dynamic Contact Widget */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-accent-blue">
              <span className="p-2 bg-accent-blue/10 rounded-xl text-accent-blue">
                <HelpCircle size={20} className="animate-pulse" />
              </span>
              <span className="text-xs font-black tracking-widest uppercase text-accent-blue">
                Pusat Bantuan Rakyat
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-primary-navy">
              Ada yang Bisa Kami <span className="text-accent-blue italic">Bantu?</span>
            </h2>
            <p className="text-xs text-slate-500 font-semibold leading-relaxed">
              Panduan interaktif seputar pengajuan berkas AK1 Digital (Kartu Kuning), mediasi sengketa buruh, serta solusi ketenagakerjaan Kabupaten Majalengka.
            </p>
          </div>

          {/* Elegant Search Input with ID */}
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-gray-400" />
            <input
              id="faq-search-input"
              type="text"
              placeholder="Cari pertanyaan Anda... (misal: AK1, aduan)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-accent-blue transition-all ${
                isDarkMode 
                  ? "bg-slate-855/60 border-slate-700 text-white placeholder-slate-500" 
                  : "bg-slate-50 border-gray-200 text-slate-900 placeholder-slate-400"
              }`}
            />
          </div>

          {/* Quick Category Tab Filters with ID */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: "all", label: "Semua FAQ" },
              { id: "ak1", label: "Kartu AK1" },
              { id: "complaint", label: "Aduan & Sengketa" },
              { id: "general", label: "Perusahaan & AI" }
            ].map((cat) => (
              <button
                id={`faq-cat-btn-${cat.id}`}
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id as any);
                  setExpandedId(null);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider transition ${
                  activeCategory === cat.id 
                    ? "bg-accent-blue text-white shadow-sm"
                    : isDarkMode
                      ? "bg-slate-800 text-slate-400 hover:bg-slate-750 hover:text-slate-200"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Emergency Helper Hotlines Widget */}
          <div className={`p-5 rounded-2xl border space-y-4 ${
            isDarkMode ? "bg-slate-855/35 border-slate-850" : "bg-sky-50/40 border-sky-100/60"
          }`}>
            <h4 className="text-xs font-black uppercase text-primary-navy tracking-tight flex items-center gap-1.5">
              <Phone size={13} className="text-amber-500" /> Kontak Pelayanan Darurat
            </h4>
            <div className="space-y-2 text-[11px] font-semibold text-slate-500">
              <div className="flex items-center justify-between">
                <span>Call Center Disnaker:</span>
                <strong className={isDarkMode ? "text-slate-200" : "text-slate-800"}>0233-281-XXX</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>WhatsApp Pengaduan K3:</span>
                <strong className={isDarkMode ? "text-slate-200 text-xs" : "text-slate-800 text-xs"}>+62 821-2345-XXXX</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Waktu Layanan Sipil:</span>
                <strong className="text-accent-blue">Senin-Jumat 08:00 - 15:30 WIB</strong>
              </div>
            </div>

            {onNavigateTab && (
              <div className="pt-2 border-t border-dashed border-gray-200/50 flex flex-wrap gap-2">
                <button
                  id="nav-to-ak-btn"
                  onClick={() => onNavigateTab("seeker")}
                  className="px-3 py-1.5 rounded-lg bg-accent-blue/10 hover:bg-accent-blue/15 text-accent-blue text-[10px] font-bold flex items-center gap-1 transition"
                >
                  <FileCheck size={11} /> Buat AK1 Sekarang
                </button>
                <button
                  id="nav-to-advocacy-btn"
                  onClick={() => onNavigateTab("advocacy")}
                  className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/15 text-red-600 text-[10px] font-bold flex items-center gap-1 transition"
                >
                  <ShieldCheck size={11} /> Laporkan Masalah K3
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Accordion Lists */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="space-y-3">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-10 space-y-2">
                <p className="text-sm font-bold text-gray-400">Tidak ada pertanyaan yang sesuai dengan kata kunci Anda.</p>
                <button 
                  onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
                  className="text-xs text-accent-blue font-bold underline hover:text-indigo-600"
                >
                  Reset Pencarian
                </button>
              </div>
            ) : (
              filteredFAQs.map((faq) => {
                const isExpanded = expandedId === faq.id;
                return (
                  <div 
                    key={faq.id}
                    className={`rounded-2xl border transition-all overflow-hidden ${
                      isExpanded 
                        ? isDarkMode 
                          ? "bg-slate-855 border-accent-blue/50" 
                          : "bg-blue-50/30 border-accent-blue/30 shadow-xs"
                        : isDarkMode
                          ? "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                          : "bg-slate-50/50 border-slate-100 hover:border-slate-200/80"
                    }`}
                  >
                    {/* Header Trigger */}
                    <button
                      id={`faq-trigger-${faq.id}`}
                      onClick={() => toggleAccordion(faq.id)}
                      className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 select-none focus:outline-none cursor-pointer"
                    >
                      <span className="text-xs md:text-sm font-extrabold text-slate-800 leading-tight">
                        <span className={`inline-block mr-2 px-1.5 py-0.5 text-[8px] font-black rounded uppercase tracking-wider ${
                          faq.category === "ak1" 
                            ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300" 
                            : faq.category === "complaint" 
                              ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                              : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                        }`}>
                          {faq.category === "ak1" ? "AK1" : faq.category === "complaint" ? "Aduan" : "Umum / AI"}
                        </span>
                        <span className={isDarkMode ? "text-slate-100" : "text-primary-navy"}>
                          {faq.question}
                        </span>
                      </span>
                      <span className={`text-slate-400 shrink-0 p-1 rounded-full ${isDarkMode ? "bg-slate-805" : "bg-white border"}`}>
                        {isExpanded ? <ChevronUp size={14} className="text-accent-blue" /> : <ChevronDown size={14} />}
                      </span>
                    </button>

                    {/* Expandable Panel */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          id={`faq-panel-${faq.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <div className={`px-5 pb-5 pt-1 text-xs font-semibold leading-relaxed ${
                            isDarkMode ? "text-slate-350" : "text-slate-650"
                          }`}>
                            <p>{faq.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            )}
          </div>

          {/* Bottom Dynamic Interactive Form: Ask Custom Question */}
          <div className={`mt-6 p-5 rounded-2xl border ${
            isDarkMode ? "bg-slate-855/40 border-slate-800" : "bg-slate-50/50 border-slate-100"
          }`}>
            <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-wider mb-2.5">
              Belum Menemukan Jawaban Anda? Kirim Masukan Pengguna
            </h4>
            <form onSubmit={handleFeedbackSubmit} className="flex gap-2">
              <input
                id="faq-user-feedback-input"
                type="text"
                placeholder="Tulis pesan atau pertanyaan singkat Anda di sini..."
                value={feedbackInput}
                onChange={(e) => setFeedbackInput(e.target.value)}
                className={`flex-1 text-xs px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-1 focus:ring-accent-blue ${
                  isDarkMode 
                    ? "bg-slate-900 border-slate-700 text-white placeholder-slate-500" 
                    : "bg-white border-slate-200 text-slate-800 placeholder-slate-400"
                }`}
              />
              <button
                id="faq-feedback-submit-btn"
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-accent-blue text-white text-xs font-bold hover:bg-opacity-90 flex items-center gap-1 transition shrink-0 cursor-pointer"
              >
                <Send size={11} /> <span>Kirim</span>
              </button>
            </form>
            
            <AnimatePresence>
              {feedbackSuccess && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] text-emerald-500 font-bold mt-2 flex items-center gap-1.5"
                >
                  <MessageSquare size={10} /> Pertanyaan Anda berhasil diserahkan ke Dinas Komunikasi Majalengka! Terima kasih atas feedback Anda.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
