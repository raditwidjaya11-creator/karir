import React, { useState } from "react";
import { MOCK_JOBS } from "../data/mockData";
import { JobVacancy } from "../types";
import { 
  Search, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Eye, 
  CheckCircle, 
  ClipboardList, 
  Filter, 
  AlertTriangle, 
  Upload, 
  Send, 
  FileText, 
  ShieldCheck, 
  Info,
  Sparkles,
  Image as ImageIcon,
  MessageSquare
} from "lucide-react";
import DisnakerChatHub from "./DisnakerChatHub";

export default function ModulPencariKerja() {
  const [jobs, setJobs] = useState<JobVacancy[]>(MOCK_JOBS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState<string>("All");
  const [selectedJob, setSelectedJob] = useState<JobVacancy | null>(MOCK_JOBS[0]);

  // Seeker's application histories list state
  const [history, setHistory] = useState<any[]>([
    { id: "applied_01", jobTitle: "Junior Quality Assurance Staff", companyName: "PT Kaldu Sari Nabati", date: "2026-06-02", status: "Shortlist", interview: "Wawancara Kompetensi Teknis: 12 Juni 2026, 09:00 WIB" }
  ]);

  const [hasAppliedList, setHasAppliedList] = useState<Record<string, boolean>>({});

  // Tab State inside the lower panel
  const [activeTab, setActiveTab] = useState<"riwayat" | "lapor" | "status" | "chat">("riwayat");

  // State for Lapor Aduan
  const [aduanCompany, setAduanCompany] = useState("");
  const [aduanCategory, setAduanCategory] = useState("Lowongan Palsu (Hati-hati Penipuan Uang)");
  const [aduanDescription, setAduanDescription] = useState("");
  const [aduanPhoto, setAduanPhoto] = useState<string | null>(null);

  // Complaints list state
  const [complaints, setComplaints] = useState<any[]>([
    {
      id: "ADU-4912",
      companyName: "PT Cosmic Indo Textile",
      category: "Penahanan Ijazah Asli",
      date: "2026-06-03",
      status: "DIPROSES",
      description: "Mewajibkan penahanan ijazah asli kelulusan SMA selama kontrak berjalan dan denda penalti Rp5.000.0000.",
      photo: null
    }
  ]);

  // AI-Powered Smart Filter states
  const [userSkills, setUserSkills] = useState("Operator Mesin, Ketelitian Tinggi, K3");
  const [userBio, setUserBio] = useState("Saya memiliki pengalaman magang di industri garmen Majalengka dan siap bekerja shift.");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [uploadedFileName, setUploadedFileName] = useState("");

  const processUploadedFile = (file: File) => {
    setUploadedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      try {
        const parsed = JSON.parse(text);
        if (parsed.skills) {
          setUserSkills(Array.isArray(parsed.skills) ? parsed.skills.join(", ") : String(parsed.skills));
        }
        if (parsed.bio || parsed.experience) {
          setUserBio(parsed.bio || parsed.experience);
        }
      } catch {
        setUserBio(text.slice(0, 300));
        const foundSkills: string[] = [];
        const lowerText = text.toLowerCase();
        if (lowerText.includes("excel") || lowerText.includes("office") || lowerText.includes("admin")) foundSkills.push("Administration", "MS Excel");
        if (lowerText.includes("las") || lowerText.includes("mesin") || lowerText.includes("operator") || lowerText.includes("k3")) foundSkills.push("Operator Mesin", "K3 Umum");
        if (lowerText.includes("masak") || lowerText.includes("resep") || lowerText.includes("f&b") || lowerText.includes("kuliner")) foundSkills.push("F&B Cooking", "Sanitasi Pangan");
        if (lowerText.includes("desain") || lowerText.includes("gambar") || lowerText.includes("figma") || lowerText.includes("art") || lowerText.includes("kreatif") || lowerText.includes("creative")) foundSkills.push("Graphic Design", "3D Modeling");
        if (lowerText.includes("gudang") || lowerText.includes("cargo") || lowerText.includes("logistik") || lowerText.includes("forklift")) foundSkills.push("Warehouse Management", "SIO Forklift");
        if (foundSkills.length > 0) {
          setUserSkills(foundSkills.join(", "));
        }
      }
    };
    reader.readAsText(file);
  };

  const handleAiFilterQuery = async () => {
    if (!userSkills.trim() && !userBio.trim()) return;
    setIsAnalyzing(true);
    setAnalysisResult(null);
    try {
      const res = await fetch("/api/gemini/suggest-category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: userSkills, bio: userBio }),
      });
      const data = await res.json();
      if (res.ok) {
        setAnalysisResult(data);
      } else {
        console.error("Analysis failed:", data.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleApply = (jobId: string, jobTitle: string, companyName: string) => {
    setHasAppliedList((prev) => ({ ...prev, [jobId]: true }));
    const newHistory = {
      id: `applied_${Date.now()}`,
      jobTitle,
      companyName,
      date: new Date().toISOString().split("T")[0],
      status: "Screening",
      interview: "Berkas sedang di-screening otomatis oleh kecerdasan buatan"
    };
    setHistory([newHistory, ...history]);
  };

  const handleLaporAduan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aduanCompany.trim() || !aduanDescription.trim()) return;

    const newComplaint = {
      id: `ADU-${Math.floor(1000 + Math.random() * 9000)}`,
      companyName: aduanCompany,
      category: aduanCategory,
      date: new Date().toISOString().split("T")[0],
      status: "TERKIRIM",
      description: aduanDescription,
      photo: aduanPhoto
    };

    setComplaints([newComplaint, ...complaints]);
    
    // Clear form states
    setAduanCompany("");
    setAduanDescription("");
    setAduanPhoto(null);

    // Switch tab to the status tracker
    setActiveTab("status");
  };

  // Filter mechanics
  const filteredJobs = jobs.filter((jb) => {
    const matchesSearch = jb.title.toLowerCase().includes(searchQuery.toLowerCase()) || jb.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = selectedSector === "All" || jb.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  return (
    <div className="space-y-6" id="seeker-pencaker-root">
      {/* Banner / Overview Card in the current design */}
      <div className="rounded-[32px] border border-blue-100 bg-white/60 p-6 shadow-sm backdrop-blur-lg">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <span className="rounded-full bg-blue-100 text-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-widest">
              PORTAL PENCARI KERJA MAJALENGKA (PETA REBANA)
            </span>
            <h2 className="text-xl font-black text-primary-navy font-sans tracking-tight mt-3">Cari Kerja & Lapor Pelanggaran Industri</h2>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed font-semibold">
              Temukan ribuan lowongan industri manufaktur, logistik, kuliner, dan kreatif di kawasan Rebana Majalengka secara akurat dan aman terverifikasi Disnaker.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left panel: Search parameters & Jobs lists (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* 🔮 AI-Powered Smart Filter Panel */}
          <div className="rounded-[32px] border border-violet-100 bg-gradient-to-br from-violet-50/50 to-indigo-50/20 p-6 shadow-sm border-l-4 border-l-violet-500">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-violet-100 p-2 text-violet-700 animate-pulse">
                <Sparkles size={20} />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-sm text-primary-navy">AI-Powered Smart Filter</h3>
                <p className="text-xs font-semibold text-gray-500">
                  Unggah profil / daftar kompetensi Anda untuk mencocokkan sektor industri Majalengka secara cerdas menggunakan kecerdasan buatan.
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-black uppercase text-violet-800 tracking-wider mb-1">
                    Keahlian / Keterampilan Anda
                  </label>
                  <input
                    type="text"
                    value={userSkills}
                    onChange={(e) => setUserSkills(e.target.value)}
                    placeholder="Misal: Operator mesin, K3, Microsoft Excel, menjahit sepatu, F&B"
                    className="w-full text-xs rounded-xl border border-violet-100 p-2.5 bg-white font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-400 placeholder:text-gray-405"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-violet-800 tracking-wider mb-1">
                    Bio / Pengalaman Singkat
                  </label>
                  <textarea
                    rows={2}
                    value={userBio}
                    onChange={(e) => setUserBio(e.target.value)}
                    placeholder="Tulis ringkasan pengalaman kerja Anda di sini..."
                    className="w-full text-xs rounded-xl border border-violet-100 p-2.5 bg-white font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-400 placeholder:text-gray-405 resize-none"
                  />
                </div>
              </div>

              <div className="space-y-3 flex flex-col justify-between">
                <div>
                  <span className="block text-[10px] font-black uppercase text-violet-800 tracking-wider mb-1">
                    Atau Unggah Resume / File Profil (.txt, .json)
                  </span>
                  
                  <div
                    className="border-2 border-dashed border-violet-200 hover:border-violet-400 rounded-xl p-4 text-center cursor-pointer bg-white transition flex flex-col items-center justify-center h-[96px]"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const file = e.dataTransfer.files?.[0];
                      if (file) {
                        processUploadedFile(file);
                      }
                    }}
                    onClick={() => document.getElementById("profile-skill-upload")?.click()}
                  >
                    <input
                      type="file"
                      id="profile-skill-upload"
                      accept=".txt,.json"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          processUploadedFile(file);
                        }
                      }}
                    />
                    
                    {uploadedFileName ? (
                      <div className="flex items-center gap-1.5 justify-center text-emerald-800 font-bold text-xs">
                        <FileText size={18} className="text-emerald-600" />
                        <span className="truncate max-w-[150px]">{uploadedFileName}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setUploadedFileName("");
                            setUserSkills("");
                            setUserBio("");
                          }}
                          className="text-red-500 hover:text-red-700 ml-1 font-black"
                          title="Hapus"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload size={16} className="text-violet-500 mb-1" />
                        <p className="font-bold text-[10px] text-violet-900">Seret atau klik untuk unggah file profil</p>
                        <p className="text-[9px] text-gray-400">Mendukung format text (.txt) atau resume (.json)</p>
                      </>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleAiFilterQuery}
                  disabled={isAnalyzing}
                  className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-black text-xs uppercase tracking-wider transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  {isAnalyzing ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Menganalisis Kompetensi...
                    </>
                  ) : (
                    <>
                      <Sparkles size={14} />
                      Saring Kategori Berbasis AI
                    </>
                  )}
                </button>
              </div>
            </div>

            {analysisResult && (
              <div className="mt-4 border-t border-violet-100 pt-4 space-y-3 animate-fadeIn">
                <div className="bg-white rounded-2xl p-4 border border-violet-100 shadow-inner space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-violet-100 text-violet-800 border border-violet-200 px-3 py-1 text-[10px] font-black uppercase tracking-wider">
                        Sektor Direkomendasikan: {analysisResult.suggestedSector}
                      </span>
                      <span className="text-[10px] font-extrabold text-violet-600">
                        Keyakinan AI: {analysisResult.analysisScore}%
                      </span>
                    </div>
                    
                    <button
                      onClick={() => {
                        setSelectedSector(analysisResult.suggestedSector);
                        document.getElementById("jobs-filter-anchor")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="rounded-xl px-4 py-2 bg-violet-700 hover:bg-violet-800 text-white text-[11px] font-black tracking-wide uppercase transition shadow-sm cursor-pointer"
                    >
                      Terapkan Filter Sektor Ini
                    </button>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed font-semibold">
                    {analysisResult.explanation}
                  </p>

                  {analysisResult.keySkillsIdentified && analysisResult.keySkillsIdentified.length > 0 && (
                    <div className="pt-1.5 space-y-1">
                      <span className="text-[9px] font-black text-violet-800 uppercase tracking-wider block">Keahlian Utama Terdeteksi:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {analysisResult.keySkillsIdentified.map((s: string, idx: number) => (
                          <span key={idx} className="rounded-lg bg-slate-100 border border-slate-200/80 text-primary-navy px-2 py-0.5 text-[10px] font-semibold">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {analysisResult.alternativeSectors && analysisResult.alternativeSectors.length > 0 && (
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-semibold mt-2 pt-2 border-t border-slate-100">
                      <span>Sektor Alternatif:</span>
                      <div className="flex gap-1.5 flex-wrap">
                        {analysisResult.alternativeSectors.map((alt: string, idx: number) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setSelectedSector(alt);
                              document.getElementById("jobs-filter-anchor")?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="text-violet-700 hover:underline font-bold"
                          >
                            {alt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div id="jobs-filter-anchor" className="rounded-[32px] border border-blue-100 bg-white p-4 shadow-sm flex flex-wrap gap-3 items-center justify-between">
            {/* Search Input bar */}
            <div className="flex-1 flex items-center gap-2 bg-slate-50 border border-blue-100 rounded-xl px-3 py-2.5 max-w-sm">
              <Search className="text-gray-400" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari Operator, Admin, PT Shoetown..."
                className="w-full text-xs outline-none bg-transparent font-semibold text-gray-800"
              />
            </div>

            {/* Filter by sector */}
            <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
              <Filter className="text-accent-blue" size={14} />
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="rounded-xl border border-blue-100 px-3 py-2 bg-white font-semibold text-gray-800"
              >
                <option value="All">Semua Sektor Industri</option>
                <option value="Manufaktur">Manufaktur</option>
                <option value="Logistik & Transportasi">Logistik</option>
                <option value="Kuliner">F&B / Kuliner</option>
                <option value="Kreatif">Kreatif</option>
              </select>
            </div>
          </div>

          {/* List layout */}
          <div className="space-y-3">
            {filteredJobs.length === 0 ? (
              <div className="rounded-[32px] border-2 border-dashed border-blue-100 bg-white p-12 text-center text-gray-400">
                <Search size={40} className="text-gray-300 mx-auto mb-2" />
                <h4 className="font-black text-primary-navy">Lowongan Tidak Ditemukan</h4>
                <p className="text-xs font-semibold">Coba ubah kata kunci pencarian atau bersihkan filter sektor Anda.</p>
              </div>
            ) : (
              filteredJobs.map((jb) => {
                const applied = hasAppliedList[jb.id];
                const isSelected = selectedJob?.id === jb.id;

                return (
                  <div
                    key={jb.id}
                    onClick={() => setSelectedJob(jb)}
                    className={`rounded-[32px] border p-5 text-left cursor-pointer transition-all bg-white hover:shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                      isSelected ? "border-accent-blue ring-4 ring-accent-blue/10" : "border-blue-100"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <img src={jb.companyLogo} alt={jb.companyName} className="h-12 w-12 rounded-2xl object-cover border border-blue-50" />
                      <div className="space-y-1">
                        <h4 className="font-black text-xs text-primary-navy leading-tight md:text-sm">{jb.title}</h4>
                        <p className="text-[11px] font-bold text-gray-500">
                          {jb.companyName} • <span className="text-accent-blue">{jb.location}</span>
                        </p>

                        <div className="flex flex-wrap gap-2 text-[10px] pt-1 font-semibold text-gray-450">
                          <span className="flex items-center gap-0.5"><Briefcase size={10} /> {jb.jobType}</span>
                          <span className="flex items-center gap-0.5"><DollarSign size={10} className="text-emerald-600" /> {jb.salaryRange}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-auto">
                      {jb.isKertajatiRebana && (
                        <span className="rounded-full bg-blue-50 text-[#1A365D] border border-blue-100 px-3 py-1 text-[9px] font-black uppercase tracking-wider">
                          Kertajati Rebana
                        </span>
                      )}

                      {!applied ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApply(jb.id, jb.title, jb.companyName);
                          }}
                          className="rounded-xl bg-[#1A365D] hover:bg-[#1A365D]/90 text-white font-black py-2 px-4 text-xs tracking-wide transition shadow-sm"
                        >
                          Lamar
                        </button>
                      ) : (
                        <span className="rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100 font-black py-2 px-3.5 text-xs flex items-center gap-1 shadow-sm">
                          <CheckCircle size={12} /> Dilamar
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right side: Active Job details View & Interactive multi-tabs (1 Col) */}
        <div className="space-y-4">
          {/* Active Job Details Description Card */}
          {selectedJob ? (
            <div className="rounded-[32px] border border-blue-100 bg-white p-6 shadow-sm space-y-4 animate-fadeIn">
              <div className="flex items-start gap-3 border-b border-blue-50 pb-4">
                <img src={selectedJob.companyLogo} alt={selectedJob.companyName} className="h-11 w-11 rounded-2xl object-cover border border-blue-50" />
                <div>
                  <h4 className="font-black text-[9px] leading-none text-gray-400 uppercase tracking-widest">{selectedJob.companyName}</h4>
                  <h3 className="font-extrabold text-sm text-primary-navy mt-1.5 leading-normal md:text-[15px]">{selectedJob.title}</h3>
                </div>
              </div>

              {/* Requirements & Responsibilities list */}
              <div className="space-y-4 text-xs text-gray-700">
                <div className="space-y-1.5">
                  <p className="font-black text-primary-navy uppercase tracking-wider text-[10px]">Uraian Pekerjaan (Responsibilities):</p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-500 font-semibold leading-relaxed">
                    {selectedJob.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                </div>

                <div className="space-y-1.5 pt-2">
                  <p className="font-black text-primary-navy uppercase tracking-wider text-[10px]">Persyaratan Utama (Requirements):</p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-500 font-semibold leading-relaxed">
                    {selectedJob.requirements.map((req, i) => <li key={i}>{req}</li>)}
                  </ul>
                </div>
              </div>

              {/* Red-flag direct complaint button inside Seeker view! */}
              <button
                onClick={() => {
                  setAduanCompany(selectedJob.companyName);
                  setAduanCategory("Lowongan Palsu / Penipuan Biaya Masuk");
                  setActiveTab("lapor");
                }}
                className="w-full mt-4 py-3 px-4 bg-red-55/10 hover:bg-red-50 border border-red-200 text-red-700 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition"
              >
                <AlertTriangle size={14} className="text-red-500 animate-pulse" />
                Lapor Pelanggaran Perusahaan Ini
              </button>
            </div>
          ) : (
            <div className="h-[210px] rounded-[32px] border border-dashed border-blue-100 bg-white/40 flex flex-col items-center justify-center text-center text-gray-400">
              <Eye size={36} className="text-gray-300 mb-1" />
              <p className="text-xs font-semibold">Klik salah satu lowongan untuk melihat uraian detail.</p>
            </div>
          )}

          {/* Dynamic Interactive tabs: Applications vs Report complaints vs Track reports */}
          <div className="rounded-[32px] border border-blue-100 bg-white p-6 shadow-sm space-y-4">
            {/* Elegant Tab Selector with high-contrast text and solid focus indicator */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 bg-slate-50 p-1.5 rounded-2xl border border-blue-50/50">
              <button
                onClick={() => setActiveTab("riwayat")}
                className={`text-[10px] font-black uppercase tracking-wider py-2 px-1 rounded-xl transition ${
                  activeTab === "riwayat"
                    ? "bg-[#1A365D] text-white shadow-sm"
                    : "text-gray-450 hover:bg-slate-100"
                }`}
              >
                Surat Lamaran
              </button>
              <button
                onClick={() => setActiveTab("lapor")}
                className={`text-[10px] font-black uppercase tracking-wider py-2 px-1 rounded-xl transition ${
                  activeTab === "lapor"
                    ? "bg-red-600 text-white shadow-sm animate-pulse"
                    : "text-gray-450 hover:bg-slate-100"
                }`}
              >
                Lapor Aduan
              </button>
              <button
                onClick={() => setActiveTab("status")}
                className={`text-[10px] font-black uppercase tracking-wider py-2 px-1 rounded-xl transition relative ${
                  activeTab === "status"
                    ? "bg-[#1A365D] text-white shadow-sm"
                    : "text-gray-450 hover:bg-slate-100"
                }`}
              >
                Status Aduan
              </button>
              <button
                onClick={() => setActiveTab("chat")}
                className={`text-[10px] font-black uppercase tracking-wider py-2 px-1 rounded-xl transition ${
                  activeTab === "chat"
                    ? "bg-emerald-600 text-white shadow-sm font-black text-xs"
                    : "text-emerald-650 font-black hover:bg-emerald-50/50"
                }`}
              >
                🗨️ Chat Dinas AI
              </button>
            </div>

            {/* Tab 1 content: Riwayat Lamaran */}
            {activeTab === "riwayat" && (
              <div className="space-y-3 animate-fadeIn">
                <h4 className="text-[10px] font-black text-gray-450 uppercase tracking-widest flex items-center gap-1.5 leading-none">
                  <ClipboardList size={14} className="text-accent-blue" /> LAMARAN TERIKUT ({history.length})
                </h4>

                <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                  {history.map((his, idx) => {
                    const statusColor = 
                      his.status === "Shortlist" ? "bg-amber-50 text-amber-700 border-amber-200" :
                      his.status === "Passed" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                      "bg-blue-50 text-primary-navy border-blue-200";

                    return (
                      <div key={idx} className="rounded-2xl border border-blue-50 p-4 bg-white space-y-2 text-xs hover:border-blue-105 transition shadow-sm">
                        <div className="flex items-center justify-between">
                          <h5 className="font-extrabold text-primary-navy truncate leading-tight max-w-[155px]">{his.jobTitle}</h5>
                          <span className={`rounded-full px-2.5 py-0.5 text-[8px] font-black uppercase tracking-wider border ${statusColor}`}>
                            {his.status}
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-450 font-bold">{his.companyName} • Applied: {his.date}</p>
                        <div className="bg-slate-50 rounded-lg p-2.5 border border-blue-50/50 text-[10px] font-medium text-gray-600 leading-relaxed">
                          <strong className="text-primary-navy">Update HRD:</strong> {his.interview}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 2 content: Lapor Aduan Form with interactive upload */}
            {activeTab === "lapor" && (
              <form onSubmit={handleLaporAduan} className="space-y-4 animate-fadeIn text-xs">
                <div className="border-b border-red-100 pb-2">
                  <span className="text-[9px] font-black text-red-500 uppercase tracking-wider">PORTAL PELINDUNGAN PEKERJA</span>
                  <h4 className="font-black text-primary-navy text-sm mt-1">Form Pengaduan Khusus Pelanggaran Industri</h4>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-650 uppercase tracking-wider text-[10px]">
                    Nama Perusahaan Terlapor
                  </label>
                  <input
                    type="text"
                    required
                    value={aduanCompany}
                    onChange={(e) => setAduanCompany(e.target.value)}
                    placeholder="Contoh: PT Fiktif Jaya Majalengka"
                    className="w-full rounded-xl border border-blue-100 p-2.5 bg-white font-semibold text-gray-800 focus:outline-none focus:border-red-500 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-650 uppercase tracking-wider text-[10px]">
                    Kategori Pelanggaran Kerja
                  </label>
                  <select
                    value={aduanCategory}
                    onChange={(e) => setAduanCategory(e.target.value)}
                    className="w-full rounded-xl border border-blue-100 p-2.5 bg-white font-semibold text-gray-800 focus:outline-none text-xs"
                  >
                    <option>Lowongan Palsu / Penipuan Biaya Pendaftaran</option>
                    <option>Penahanan Ijazah / Dokumen Asli</option>
                    <option>Jam Kerja Melebihi Batas / Lembur Tidak Dibayar</option>
                    <option>Gaji di Bawah UMK Majalengka</option>
                    <option>Perselisihan PHK Sepihak</option>
                    <option>Lainnya</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-650 uppercase tracking-wider text-[10px]">
                    Kronologi / Keterangan Kejadian
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={aduanDescription}
                    onChange={(e) => setAduanDescription(e.target.value)}
                    placeholder="Tuliskan secara jelas kecurangan, tuntutan uang, atau perjanjian paksa yang terjadi..."
                    className="w-full rounded-xl border border-blue-100 p-2.5 bg-white font-semibold text-gray-800 focus:outline-none focus:border-red-500 text-xs"
                  />
                </div>

                {/* Upload Bukti Foto (Required screenshot/evidence file upload per client-side request) */}
                <div className="space-y-1">
                  <label className="font-bold text-gray-650 uppercase tracking-wider text-[10px]">
                    Upload Foto Bukti Pendukung (Opsional, JPG/PNG)
                  </label>
                  
                  <div
                    className={`border-2 border-dashed rounded-xl p-3 text-center cursor-pointer transition ${
                      aduanPhoto ? "border-emerald-300 bg-emerald-50/10" : "border-red-200 bg-red-50/5 hover:border-red-400"
                    }`}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const file = e.dataTransfer.files?.[0];
                      if (file && file.type.startsWith("image/")) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          setAduanPhoto(event.target?.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    onClick={() => {
                      document.getElementById("aduan-evidence-input")?.click();
                    }}
                  >
                    <input
                      type="file"
                      id="aduan-evidence-input"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            setAduanPhoto(event.target?.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />

                    {aduanPhoto ? (
                      <div className="flex items-center justify-center gap-2">
                        <img 
                          src={aduanPhoto} 
                          alt="Bukti Aduan" 
                          className="w-10 h-10 object-cover rounded border border-emerald-300"
                          referrerPolicy="no-referrer"
                        />
                        <div className="text-left">
                          <p className="font-bold text-emerald-800 text-[10px]">Bukti Terlampir</p>
                          <p className="text-[9px] text-gray-400">Klik untuk mengganti gambar</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-1">
                        <ImageIcon className="text-red-500 mb-0.5" size={20} />
                        <p className="font-bold text-[10px] text-primary-navy">Seret atau Klik untuk Upload Bukti Foto</p>
                        <p className="text-[8px] text-gray-400 leading-none">Misal: kuintansi, chat penipuan, dsb</p>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs tracking-wider uppercase transition shadow flex items-center justify-center gap-1.5"
                >
                  <Send size={12} /> Kirim Aduan Resmi
                </button>
              </form>
            )}

            {/* Tab 3: Complaints status logging tracker lists */}
            {activeTab === "status" && (
              <div className="space-y-3 animate-fadeIn">
                <div className="border-b border-blue-50 pb-2">
                  <span className="text-[9px] font-black text-primary-navy uppercase tracking-wider">PROTEKSI TENAGA KERJA AKTIF</span>
                  <p className="text-xs font-semibold text-gray-500">Pelacakan Real-time Pengaduan Terdaftar Di Dinas Kerja</p>
                </div>

                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                  {complaints.length === 0 ? (
                    <div className="text-center py-6 text-gray-400">
                      <ShieldCheck size={28} className="text-emerald-500 mx-auto mb-1 opacity-60" />
                      <p className="text-xs font-semibold">Tidak ada aduan aktif. Lingkungan kerja kondusif!</p>
                    </div>
                  ) : (
                    complaints.map((c, index) => {
                      const tagColor = 
                        c.status === "TERKIRIM" ? "bg-blue-100 text-blue-800 border-blue-200" :
                        c.status === "DIPROSES" ? "bg-amber-100 text-amber-800 border-amber-200" :
                        "bg-emerald-100 text-emerald-800 border-emerald-200";

                      return (
                        <div key={index} className="rounded-2xl border border-blue-50 p-4 bg-white space-y-2.5 text-xs shadow-sm">
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="font-mono text-[8px] text-gray-400 font-extrabold">{c.id} • {c.date}</span>
                              <h5 className="font-extrabold text-primary-navy truncate leading-snug mt-0.5">{c.companyName}</h5>
                            </div>
                            <span className={`rounded-full px-2 py-0.5 text-[8px] font-black tracking-wider border ${tagColor}`}>
                              {c.status}
                            </span>
                          </div>

                          <p className="text-[10px] text-gray-650 font-bold bg-slate-50 rounded-xl p-2.5 border border-slate-100/50 leading-relaxed italic">
                            "{c.description}"
                          </p>

                          {c.photo && (
                            <div className="flex items-center gap-1.5 border-t border-slate-50 pt-2 text-[10px] font-semibold text-gray-500">
                              <ImageIcon size={12} className="text-accent-blue" />
                              <span>Foto bukti pendukung terlampir</span>
                            </div>
                          )}

                          <div className="flex items-center gap-1.5 text-[9px] text-red-700 font-extrabold bg-red-50/50 rounded-lg p-2 border border-red-50">
                            <Info size={10} className="text-red-500 animate-pulse shrink-0" />
                            <span>Penyidik Disnaker sedang melakukan klarifikasi ke perusahaan terlapor.</span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {activeTab === "chat" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="border-b border-blue-50 pb-2">
                  <span className="text-[9px] font-black text-emerald-800 uppercase tracking-wider block">Konsultasi Live Chat Dinas</span>
                  <p className="text-xs font-semibold text-gray-500">Berkonsultasi langsung secara interaktif dengan Admin Dinas Ketenagakerjaan</p>
                </div>
                <DisnakerChatHub userRole="Pencari Kerja" currentUserName="Radit Widjaya" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
