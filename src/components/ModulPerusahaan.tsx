import React, { useState } from "react";
import { MOCK_JOBS } from "../data/mockData";
import { JobVacancy } from "../types";
import { PlusCircle, Users, Check, X, Download, TrendingUp, Cpu, MessageSquare } from "lucide-react";
import DisnakerChatHub from "./DisnakerChatHub";

interface ModulPerusahaanProps {
  currentUser?: { 
    name: string; 
    email: string; 
    role: string; 
    avatarUrl: string; 
    companyName?: string;
    nib?: string;
    sector?: string;
    subdistrict?: string;
    phone?: string;
    workersTarget?: string;
  } | null;
}

export default function ModulPerusahaan({ currentUser }: ModulPerusahaanProps) {
  const [subTab, setSubTab] = useState<"dashboard" | "chat">("dashboard");
  const [vacancies, setVacancies] = useState<JobVacancy[]>(MOCK_JOBS);
  const [graduations, setGraduations] = useState<any[]>([
    { id: 1, name: "Siti Nurjanah", jobTitle: "Operator Produksi Sepatu Ekspor", score: 92, education: "SMK Tatabusana", domicile: "Ligung, Majalengka" },
    { id: 2, name: "Budi Santoso", jobTitle: "Junior Quality Assurance Staff", score: 64, education: "SMK Kimia Industri", domicile: "Sumberjaya, Majalengka" },
    { id: 3, name: "Ahmad Dani", jobTitle: "Warehouse Air Cargo Operator", score: 88, education: "SMK Logistik", domicile: "Kertajati, Majalengka" }
  ]);

  // Extract logged in company's profile details 
  const companyName = currentUser?.companyName || "PT Shoetown Ligung Indonesia";
  const companyLogo = currentUser?.avatarUrl && currentUser.avatarUrl.startsWith("http") 
    ? currentUser.avatarUrl 
    : "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=200&auto=format&fit=crop";
  const subdistrict = currentUser?.subdistrict || "Ligung";
  const sector = currentUser?.sector || "Manufaktur";
  const nib = currentUser?.nib || "32.10.2026.00192";
  const workersTarget = currentUser?.workersTarget || "82.4";

  // Form states to add new vacancy
  const [newTitle, setNewTitle] = useState("");
  const [newSector, setNewSector] = useState<any>("Manufaktur");
  const [newSalary, setNewSalary] = useState("Rp 2.450.000");
  const [newEducation, setNewEducation] = useState("SMA / SMK Sederajat");

  const handlePostVacancy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newJob: JobVacancy = {
      id: `job_${Date.now()}`,
      companyId: `co_${companyName.toLowerCase().replace(/[^a-z0-9]/g, "_")}`,
      companyName: companyName,
      companyLogo: companyLogo,
      title: newTitle,
      location: `Kecamatan ${subdistrict}`,
      salaryRange: newSalary,
      jobType: "Full-Time",
      experience: "Lulusan Baru",
      education: newEducation,
      requirements: ["Memiliki kedisiplinan kerja tinggi", "Sehat jasmani rohani", "Pecinta manufaktur"],
      responsibilities: ["Memenuhi standar kuota pengerjaan harian tim"],
      postedAt: new Date().toISOString().split("T")[0],
      sector: newSector,
      isKertajatiRebana: true,
      rating: 4.5,
      applicationsCount: 0
    };

    setVacancies([newJob, ...vacancies]);
    setNewTitle("");
  };

  const handleApproveApplicant = (id: number) => {
    setGraduations((prev) => prev.filter((g) => g.id !== id));
  };

  const handleExportRecruitmentCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Sektor,Pekerja Lokal,Tenaga Kerja Luar Daerah,Rasio Serapan Lokal (%)\n";
    csvContent += "Alas Kaki,12000,2500,82\n";
    csvContent += "Food & Beverage,3200,1000,78\n";
    csvContent += "Garment & Tekstil,2800,300,89\n";

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = "Laporan_Ketenagakerjaan_Manufaktur_Ligung_2026.csv";
    link.click();
  };

  return (
    <div className="space-y-6" id="recruiter-company-root">
      {/* Overview Block with export */}
      <div className="rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50/50 to-white p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src={companyLogo} 
              className="w-12 h-12 rounded-2xl object-cover border border-blue-200 shadow-sm" 
              alt={companyName} 
              referrerPolicy="no-referrer" 
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-slate-900 font-sans">{companyName}</h2>
                <span className="bg-[#1E40AF] text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">Mitra Terakreditasi Jawa Barat</span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Bussiness Console • NIB: <span className="font-mono font-bold text-slate-700">{nib}</span> • Sektor: {sector} • Wilayah: Kec. {subdistrict}</p>
            </div>
          </div>
          <button
            onClick={handleExportRecruitmentCSV}
            className="flex items-center gap-1.5 rounded-xl bg-[#1A365D] hover:bg-blue-800 text-white font-black px-4 py-2.5 text-xs shadow-md transition cursor-pointer"
          >
            <Download size={14} /> Download Rekap Tenaga Kerja (CSV)
          </button>
        </div>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl w-fit border border-blue-50/50">
        <button
          onClick={() => setSubTab("dashboard")}
          className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer ${
            subTab === "dashboard"
              ? "bg-[#1A365D]" + " text-white shadow"
              : "text-slate-600 hover:bg-slate-200/50"
          }`}
        >
          📋 Loker & Pelamar
        </button>
        <button
          onClick={() => setSubTab("chat")}
          className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 relative ${
            subTab === "chat"
              ? "bg-emerald-600 text-white shadow"
              : "text-emerald-700 hover:bg-emerald-50/50"
          }`}
        >
          🗨️ Live Chat Dinas
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        </button>
      </div>

      {subTab === "dashboard" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side: Active posts list and add new vacancy form */}
          <div className="lg:col-span-1 space-y-4">
            {/* Post vacancy form */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-4 text-xs font-medium">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5 leading-none">
                <PlusCircle size={15} className="text-blue-500" /> Pasang Lowongan Industri Baru
              </h3>

              <form onSubmit={handlePostVacancy} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-gray-650 font-semibold">Nama Jabatan Pekerjaan</label>
                  <input
                    type="text"
                    placeholder="Contoh: Operator Penjahit Presisi"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 p-2.5 text-sm focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-650 font-semibold">Sektor Manufaktur</label>
                  <select
                    value={newSector}
                    onChange={(e) => setNewSector(e.target.value as any)}
                    className="w-full rounded-xl border border-gray-200 p-2.5 font-medium bg-white"
                  >
                    <option value="Manufaktur">Manufaktur</option>
                    <option value="Logistik & Transportasi">Logistik</option>
                    <option value="Kuliner">Kuliner / F&B</option>
                    <option value="Kreatif">Kreatif</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-gray-650 font-semibold">Gaji Pokok yang Ditawarkan</label>
                  <input
                    type="text"
                    placeholder="Rp 2.450.000"
                    value={newSalary}
                    onChange={(e) => setNewSalary(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 p-2.5 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-650 font-semibold">Syarat Pendidikan</label>
                  <input
                    type="text"
                    placeholder="SMA / SMK Sederajat"
                    value={newEducation}
                    onChange={(e) => setNewEducation(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 p-2.5 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  id="post-vacancy-submit"
                  className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 text-xs transition shadow-md"
                >
                  Pasang Vacancy Loker
                </button>
              </form>
            </div>

            {/* Corporate hiring metrics */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-4">
              <div>
                <h4 className="font-bold text-gray-800 text-xs uppercase tracking-widest flex items-center gap-1.5"><TrendingUp size={14} /> Rasio Kepatuhan Tenaga Lokal</h4>
                <p className="text-[11px] text-gray-400 mt-1">Sesuai Perda Kabupaten Majalengka wajib mengutamakan warga domisili lokal.</p>
              </div>

              <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                <div>
                  <span className="text-2xl font-black text-indigo-700">82.4%</span>
                  <span className="text-[10px] text-gray-400 block font-semibold uppercase">Serapan Lokal</span>
                </div>
                <span className="rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 border border-emerald-100">
                  PATRIOT INDUSTRI
                </span>
              </div>
            </div>
          </div>

          {/* Right side: Candidate lists with automated AI Screening match scores (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-3.5">
              <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest flex items-center gap-1.5 leading-none pb-2 border-b border-gray-100">
                <Users size={16} className="text-blue-500" /> Dokumen Masuk & Hasil Screening AI Rekomendasi ({graduations.length})
              </h3>

              {graduations.length === 0 ? (
                <p className="text-xs text-gray-400 italic py-6 text-center">Seluruh pendaftar di saringan antrean Anda telah selesai ditampung/screening.</p>
              ) : (
                <div className="space-y-3">
                  {graduations.map((g) => {
                    const severityStyle = 
                      g.score >= 85 
                        ? "bg-emerald-50 text-emerald-700 font-bold border-emerald-100" 
                        : g.score >= 70 
                        ? "bg-amber-50 text-amber-700 border-amber-100" 
                        : "bg-red-50 text-red-700 border-red-100";

                    return (
                      <div key={g.id} className="rounded-xl border border-gray-200/60 p-4 transition hover:border-indigo-300 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1.5 text-xs">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-extrabold text-gray-900 leading-tight md:text-sm">{g.name}</h4>
                            <span className="rounded bg-gray-100 px-2 py-0.5 text-[9px] font-bold text-gray-500 font-sans">
                              {g.domicile}
                            </span>
                          </div>
                          <p className="text-gray-450 text-[11px]">Memohon posisi: <strong className="text-indigo-600">{g.jobTitle}</strong></p>
                          <p className="text-[10px] text-gray-400">Pendidikan: {g.education}</p>
                        </div>

                        <div className="flex items-center gap-3.5 self-end md:self-auto">
                          {/* Matching Score badging */}
                          <div className={`rounded-xl px-3 py-1.5 border text-center flex flex-col ${severityStyle}`}>
                            <span className="text-xs font-black flex items-center gap-0.5"><Cpu size={10} /> {g.score}%</span>
                            <span className="text-[7px] uppercase font-bold tracking-wider">AI Score</span>
                          </div>

                          {/* Fast Actions approval */}
                          <div className="flex gap-1.5">
                            <button
                              onClick={() => handleApproveApplicant(g.id)}
                              className="rounded-lg bg-emerald-600 hover:bg-emerald-700 p-2 text-white shadow-sm"
                              title="Loloskan Berkas"
                            >
                              <Check size={14} />
                            </button>
                            <button
                              onClick={() => handleApproveApplicant(g.id)}
                              className="rounded-lg bg-red-600 hover:bg-red-700 p-2 text-white shadow-sm"
                              title="Tolak Lamaran"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-fadeIn">
          <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-5 flex items-center justify-between">
            <div>
              <h3 className="font-black text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5 leading-none">
                💬 Konsultasi Dinas Ketenagakerjaan
              </h3>
              <p className="text-xs text-gray-500 mt-2">
                Hubungi Admin Dinas Ketenagakerjaan Majalengka secara real-time untuk koordinasi rekrutmen massal, bimbingan verifikasi akun industri, atau kuota kepatuhan tenaga loker.
              </p>
            </div>
            <span className="hidden sm:inline-block bg-emerald-600 text-white font-mono font-bold text-[9px] px-2.5 py-1 rounded-full animate-pulse uppercase tracking-wider">SALURAN MITRA</span>
          </div>
          <DisnakerChatHub userRole="Mitra Industri" currentUserName={companyName} />
        </div>
      )}
    </div>
  );
}
