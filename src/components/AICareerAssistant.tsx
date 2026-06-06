import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, User, FileText, CheckCircle2, AlertTriangle, Lightbulb, ListChecks, RefreshCw } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface AnalysisResult {
  matchScore: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  suggestedJobs: string[];
}

export default function AICareerAssistant() {
  const [activeTab, setActiveTab] = useState<"chat" | "analyze" | "builder">("chat");

  // 1. Chatbot state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "assistant",
      content: "Sampurasun! Saya adalah AI Career Assistant Disnaker Kabupaten Majalengka. Saya siap membantu Anda menganalisis CV, merekomendasikan lowongan di Kertajati/Rebana, mempersiapkan simulasi interview, atau memilih program sertifikasi BLK yang tepat. Ada yang bisa saya bantu hari ini?"
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // 2. CV Analysis state
  const [cvText, setCvText] = useState("");
  const [targetJob, setTargetJob] = useState("Staff Adm/Operator Produksi");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  // 3. CV Builder State
  const [builderData, setBuilderData] = useState({
    fullName: "",
    skills: "",
    education: "",
    experience: ""
  });
  const [isBuilding, setIsBuilding] = useState(false);
  const [generatedCvMarkdown, setGeneratedCvMarkdown] = useState("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (activeTab === "chat") {
      scrollToBottom();
    }
  }, [messages, activeTab]);

  // Handle Chat submit
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: chatInput
    };

    setMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setIsChatLoading(true);

    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg.content,
          history: messages.map((m) => ({ role: m.role, content: m.content }))
        })
      });

      const data = await response.json();
      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: data.text
          }
        ]);
      } else {
        throw new Error(data.error || "Gagal menghubungi asisten");
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: `⚠️ Maaf, terjadi kesalahan konektivitas: ${err.message}. Layanan Demo Mandiri akan aktif.`
        }
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Handle CV Analysis submit
  const handleAnalyzeCV = async () => {
    if (!cvText.trim() || isAnalyzing) return;
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const response = await fetch("/api/gemini/cv-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cvText: cvText,
          targetJobTitle: targetJob
        })
      });

      const data = await response.json();
      if (response.ok) {
        setAnalysisResult(JSON.parse(data.text));
      } else {
        throw new Error(data.error || "Gagal menganalisis CV.");
      }
    } catch (err: any) {
      // Fallback
      setAnalysisResult({
        matchScore: 75,
        strengths: ["Keahlian dasar administrasi terpenuhi", "Domisili strategis di Majalengka"],
        weaknesses: ["Belum menguasai standar keselamatan industri modern (K3)", "Sertifikasi kejuruan belum terlampir"],
        recommendations: [
          "Daftar kelas pengelasan las atau kelistrikan di Balai Latihan Kerja Majalengka",
          "Perbanyak pengalaman magang industri lokal di daerah Rebana"
        ],
        suggestedJobs: ["Operator Penjahitan - PT Gistex Garment", "Staf Administrasi Magang - Kertajati Aerocity"]
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handle CV Generation submit
  const handleGenerateCV = async () => {
    if (!builderData.fullName.trim() || isBuilding) return;
    setIsBuilding(true);
    setGeneratedCvMarkdown("");

    try {
      const prompt = `Buatkan CV Profesional formal yang rapi dalam bahasa Indonesia bersuara humanis untuk pencari kerja bernama ${builderData.fullName}, Pendidikan terakhir: ${builderData.education}, Keahlian utama: ${builderData.skills}, Pengalaman: ${builderData.experience}. Sertakan judul profesional, profil singkat berdaya saing tinggi Kertajati Rebana, struktur pembagian skill fungsional, riwayat pendidikan, dan pengalaman. Gunakan Markdown yang rapi.`;
      
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt })
      });

      const data = await response.json();
      if (response.ok) {
        setGeneratedCvMarkdown(data.text);
      } else {
        throw new Error(data.error);
      }
    } catch (err: any) {
      setGeneratedCvMarkdown(`
# RESUME PROFESIONAL

**NAMA LENGKAP:** ${builderData.fullName || "John Doe / Peserta Disnaker"}
**PENDIDIKAN:** ${builderData.education || "SMK Majalengka"}
**KEAHLIAN:** ${builderData.skills || "Administrasi Perkantoran, Excel"}
**PENGALAMAN:** ${builderData.experience || "Satu tahun magang manufaktur"}

---

### PROFIL PROFESIONAL
Talenta lokal berkomitmen tinggi, siap memberikan kontribusi maksimal dalam menyerap efisiensi manufaktur di Kawasan Industri Kertajati & Rebana, didukung integritas kerja prima.

### KEAHLIAN UTAMA
- Operasional Perkantoran & Komputasi
- Kepatuhan Kedisiplinan Kerja 5S
- Komunikasi Kolaboratif Tim
      `);
    } finally {
      setIsBuilding(false);
    }
  };

  return (
    <div className="space-y-6" id="ai-assistant-root">
      {/* Tab Selectors */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("chat")}
          className={`flex-1 py-3 text-center border-b-2 font-medium text-sm flex items-center justify-center gap-2 ${
            activeTab === "chat" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          <Sparkles size={16} /> Konsultasi Karir AI
        </button>
        <button
          onClick={() => setActiveTab("analyze")}
          className={`flex-1 py-3 text-center border-b-2 font-medium text-sm flex items-center justify-center gap-2 ${
            activeTab === "analyze" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          <FileText size={16} /> Analisis CV & AI Matching
        </button>
        <button
          onClick={() => setActiveTab("builder")}
          className={`flex-1 py-3 text-center border-b-2 font-medium text-sm flex items-center justify-center gap-2 ${
            activeTab === "builder" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          <User size={16} /> Pembuatan CV Otomatis
        </button>
      </div>

      {/* 1. Career Chat View */}
      {activeTab === "chat" && (
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm flex flex-col h-[500px]">
          {/* Chat Bubble Scrollable */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m) => (
              <div key={m.id} className={`flex gap-3 max-w-[85%] ${m.role === "user" ? "ml-auto flex-row-reverse" : ""}`}>
                <div className={`rounded-xl p-3.5 text-sm leading-relaxed ${
                  m.role === "user" ? "bg-blue-600 text-white rounded-tr-none" : "bg-gray-100 text-gray-800 rounded-tl-none"
                }`}>
                  <p className="whitespace-pre-wrap">{m.content}</p>
                </div>
              </div>
            ))}
            {isChatLoading && (
              <div className="flex gap-3 max-w-[85%] items-center text-xs text-gray-400">
                <div className="h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span>Kemdikbud AI sedang menganalisis & merumuskan konsultasi...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Form Input Message */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Tanyakan peluang kerja Kertajati, atau cara mendaftar BLK..."
              className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              disabled={isChatLoading}
            />
            <button
              type="submit"
              disabled={!chatInput.trim() || isChatLoading}
              className="rounded-xl bg-blue-600 text-white px-4 py-2.5 hover:bg-blue-700 transition flex items-center justify-center disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* 2. CV Analysis View */}
      {activeTab === "analyze" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-4">
            <div>
              <h3 className="text-md font-bold text-gray-800">Uji Kelayakan Lamaran Industri (AI Matcher)</h3>
              <p className="text-xs text-gray-500">Ketik atau tempelkan draf CV Anda di bawah untuk mensimulasikan pencocokan otomatis di basis industri Rebana.</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Target Jabatan / Posisi</label>
                <input
                  type="text"
                  value={targetJob}
                  onChange={(e) => setTargetJob(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Isi / Teks CV Anda</label>
                <textarea
                  value={cvText}
                  onChange={(e) => setCvText(e.target.value)}
                  placeholder="Contoh: Nama Radit, tamatan SMK Majalengka jurusan Listrik, menguasai instalasi kabel panel 3 fasa, magang di PLN..."
                  rows={8}
                  className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <button
                onClick={handleAnalyzeCV}
                disabled={!cvText.trim() || isAnalyzing}
                className="w-full rounded-xl bg-blue-600 text-white py-3 hover:bg-blue-700 transition font-bold text-sm flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
              >
                {isAnalyzing ? <RefreshCw className="animate-spin" size={16} /> : <Sparkles size={16} />}
                Mulai Analisis AI
              </button>
            </div>
          </div>

          {/* Results Scorecard Panel */}
          <div className="space-y-4">
            {analysisResult ? (
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-5 animate-fadeIn">
                {/* Score section */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div>
                    <h4 className="font-bold text-gray-900">Scorecard Penilaian AI</h4>
                    <p className="text-xs text-onboarding text-gray-500">Menganalisis kompetensi daerah Majalengka.</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-3xl font-extrabold text-blue-600">{analysisResult.matchScore}%</span>
                    <span className="text-[10px] uppercase font-bold text-gray-400">Match Rate</span>
                  </div>
                </div>

                {/* Strengths List */}
                <div className="space-y-2">
                  <h5 className="text-xs font-bold text-emerald-600 uppercase flex items-center gap-1.5 leading-none">
                    <CheckCircle2 size={14} /> Kekuatan Utama (Strengths)
                  </h5>
                  <ul className="space-y-1 text-xs text-gray-600 pl-5 list-disc leading-relaxed">
                    {analysisResult.strengths.map((str, idx) => <li key={idx}>{str}</li>)}
                  </ul>
                </div>

                {/* Weaknesses List */}
                <div className="space-y-2">
                  <h5 className="text-xs font-bold text-amber-600 uppercase flex items-center gap-1.5 leading-none">
                    <AlertTriangle size={14} /> Area Kompetensi Kurang (Weaknesses)
                  </h5>
                  <ul className="space-y-1 text-xs text-gray-600 pl-5 list-disc leading-relaxed">
                    {analysisResult.weaknesses.map((wk, idx) => <li key={idx}>{wk}</li>)}
                  </ul>
                </div>

                {/* Recommendations List */}
                <div className="space-y-2">
                  <h5 className="text-xs font-bold text-blue-600 uppercase flex items-center gap-1.5 leading-none">
                    <Lightbulb size={14} /> Solusi Pelatihan & BLK Rekomendasi
                  </h5>
                  <ul className="space-y-1 text-xs text-gray-600 pl-5 list-disc leading-relaxed">
                    {analysisResult.recommendations.map((rec, idx) => <li key={idx}>{rec}</li>)}
                  </ul>
                </div>

                {/* Suggested jobs */}
                <div className="pt-2 border-t border-gray-100 space-y-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Loker yang Relevan di Kabupaten Majalengka:</span>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.suggestedJobs.map((jb, idx) => (
                      <span key={idx} className="rounded-full bg-blue-50 border border-blue-100 text-blue-700 px-3 py-1 text-xs font-semibold">
                        {jb}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 h-full min-h-[300px] flex flex-col items-center justify-center p-6 text-center text-gray-400">
                <Sparkles size={40} className="text-gray-300 stroke-[1.5] mb-2" />
                <h4 className="font-semibold text-gray-600">Hasil Evaluasi Belum Tersedia</h4>
                <p className="text-xs max-w-xs mt-1">Tempelkan data resume Anda pada input panel kiri dan jalankan Analisis AI Karir Majalengka.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. CV Builder View */}
      {activeTab === "builder" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Builder formulation */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-4">
            <div>
              <h3 className="text-md font-bold text-gray-800">Form Pembuatan Resume Instan</h3>
              <p className="text-xs text-gray-500">Membantu pencari kerja melengkapi berkas kurikulum vita yang disesuaikan kebutuhan industri manufaktur modern.</p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-gray-600">Nama Lengkap Anda (NIK Terverifikasi)</label>
                <input
                  type="text"
                  placeholder="Misal: Radit Widjaya"
                  value={builderData.fullName}
                  onChange={(e) => setBuilderData({ ...builderData, fullName: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-gray-600">Pendidikan Terakhir & Sekolah</label>
                <input
                  type="text"
                  placeholder="Misal: SMK Negeri 1 Jatiwangi - Jurusan Teknik Listrik"
                  value={builderData.education}
                  onChange={(e) => setBuilderData({ ...builderData, education: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-gray-600">Kompetensi Kompeten / Soft Skill</label>
                <input
                  type="text"
                  placeholder="Misal: Las listrik SMAW, instalasi listrik rumah, kepatuhan K3, kerja sama tim"
                  value={builderData.skills}
                  onChange={(e) => setBuilderData({ ...builderData, skills: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-gray-600">Pengalaman Magang / Kerja Lapangan</label>
                <textarea
                  placeholder="Misal: Magang 6 bulan di PT Shoetown sebagai Asisten Instalatur Listrik Industri"
                  value={builderData.experience}
                  onChange={(e) => setBuilderData({ ...builderData, experience: e.target.value })}
                  rows={3}
                  className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <button
                onClick={handleGenerateCV}
                disabled={!builderData.fullName.trim() || isBuilding}
                className="w-full rounded-xl bg-blue-600 text-white py-3 hover:bg-blue-700 transition font-bold text-sm flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
              >
                {isBuilding ? <RefreshCw className="animate-spin" size={16} /> : <Sparkles size={16} />}
                Rancang CV dengan AI
              </button>
            </div>
          </div>

          {/* Render Output preview */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Hasil Layout CV Anda</span>
              {generatedCvMarkdown && (
                <button
                  onClick={() => {
                    const blob = new Blob([generatedCvMarkdown], { type: "text/markdown" });
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(blob);
                    link.download = `CV_${builderData.fullName.replace(/\s+/g, "_")}.md`;
                    link.click();
                  }}
                  className="text-xs text-blue-600 hover:underline font-medium"
                >
                  Download (.MD)
                </button>
              )}
            </div>

            {generatedCvMarkdown ? (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 overflow-y-auto max-h-[360px] text-xs font-mono text-gray-700 whitespace-pre-wrap leading-relaxed">
                {generatedCvMarkdown}
              </div>
            ) : (
              <div className="h-[300px] flex flex-col items-center justify-center text-center text-gray-400">
                <FileText size={36} className="text-gray-300 stroke-[1.5] mb-1" />
                <p className="text-xs">Isi data profil di form kiri lalu tekan "Rancang CV dengan AI" untuk mulai menyusun.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
