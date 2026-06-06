import { useState } from "react";
import { MAJALENGKA_SUBDISTRICTS } from "../data/mockData";
import { ArrowUpRight, TrendingDown, Users, Briefcase, FileWarning, MapPin, Download, Star } from "lucide-react";

export default function DashboardBupati() {
  const [selectedSubdistrict, setSelectedSubdistrict] = useState<string | null>(null);

  // Aggregated KPIs
  const totalWorkforce = MAJALENGKA_SUBDISTRICTS.reduce((acc, curr) => acc + curr.workforceCount, 0);
  const totalUnemployed = MAJALENGKA_SUBDISTRICTS.reduce((acc, curr) => acc + curr.unemploymentCount, 0);
  const unemploymentRate = ((totalUnemployed / totalWorkforce) * 100).toFixed(2);
  const totalCompanies = MAJALENGKA_SUBDISTRICTS.reduce((acc, curr) => acc + curr.companiesCount, 0);
  const totalComplaints = MAJALENGKA_SUBDISTRICTS.reduce((acc, curr) => acc + curr.complaintsCount, 0);

  // Sorting Subdistricts by Unemployment count to highlight high density areas
  const sortedSubdistricts = [...MAJALENGKA_SUBDISTRICTS].sort((a, b) => b.unemploymentCount - a.unemploymentCount);

  // Export metadata to CSV simulator
  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Kecamatan,Angkatan Kerja,Pencari Kerja Aktif,Perusahaan Terdaftar,Aduan Ketenagakerjaan\n";
    MAJALENGKA_SUBDISTRICTS.forEach((sub) => {
      csvContent += `"${sub.name}",${sub.workforceCount},${sub.unemploymentCount},${sub.companiesCount},${sub.complaintsCount}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Laporan_Executive_Bupati_Majalengka_2026.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6" id="bupati-dashboard-view">
      {/* Header section with Bupati Banner */}
      <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-tr from-[#1A365D] via-blue-700 to-accent-blue p-6 md:p-8 text-white shadow-lg">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
        <div className="relative z-10 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
                PRESIDENTIAL EXECUTIVE PORTAL
              </span>
              <h1 className="mt-2 text-2xl md:text-3xl font-bold font-sans">Dashboard Bupati Majalengka</h1>
              <p className="text-blue-105 text-sm md:text-md mt-1 opacity-95">
                Sistem Pemantauan Terpadu Penyerapan Tenaga Kerja & Statistik Ketahanan Ekonomi Daerah Real-Time.
              </p>
            </div>
            <button
              onClick={handleExportCSV}
              id="ex-bupati-csv"
              className="flex items-center gap-2 rounded-xl bg-white text-blue-700 hover:bg-blue-50 transition px-4 py-2 text-sm font-medium shadow-md"
            >
              <Download size={16} />
              Export Laporan (CSV)
            </button>
          </div>
        </div>
      </div>

      {/* Main Executive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="rounded-[32px] border border-blue-100 bg-white p-6 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Angkatan Kerja</p>
            <h3 className="text-2xl font-bold text-gray-900 font-sans">{totalWorkforce.toLocaleString("id-ID")}</h3>
            <span className="inline-flex items-center text-xs text-emerald-600 font-medium">
              <ArrowUpRight size={12} className="mr-0.5" /> +2.4% Thn-ke-Thn
            </span>
          </div>
          <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
            <Users size={24} />
          </div>
        </div>

        {/* KPI 2 */}
        <div className="rounded-[32px] border border-blue-100 bg-white p-6 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Pencari Kerja Aktif</p>
            <h3 className="text-2xl font-bold text-gray-900 font-sans">{totalUnemployed.toLocaleString("id-ID")}</h3>
            <span className="inline-flex items-center text-xs text-amber-600 font-medium">
              100% Terpetakan NIK
            </span>
          </div>
          <div className="rounded-xl bg-amber-100 p-3 text-amber-600">
            <Briefcase size={24} />
          </div>
        </div>

        {/* KPI 3 */}
        <div className="rounded-[32px] border border-blue-100 bg-white p-6 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Tingkat Pengangguran</p>
            <h3 className="text-2xl font-bold text-gray-900 font-sans">{unemploymentRate}%</h3>
            <span className="inline-flex items-center text-xs text-emerald-600 font-medium">
              <TrendingDown size={12} className="mr-0.5" /> Turun 0.85% thn ini
            </span>
          </div>
          <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600">
            <Star size={24} />
          </div>
        </div>

        {/* KPI 4 */}
        <div className="rounded-[32px] border border-blue-100 bg-white p-6 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Aduan Masuk (Disnaker)</p>
            <h3 className="text-2xl font-bold text-red-600 font-sans">{totalComplaints} Aduan</h3>
            <span className="inline-flex items-center text-xs text-emerald-600 font-medium font-sans">
              92.8% Tingkat Solusi
            </span>
          </div>
          <div className="rounded-xl bg-red-100 p-3 text-red-600">
            <FileWarning size={24} />
          </div>
        </div>
      </div>

      {/* Visual Charts & Subdistrict analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Unemployment Chart (Custom Premium SVG inside React) */}
        <div className="lg:col-span-2 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-md font-semibold text-gray-800">Distribusi Pencari Kerja per Kecamatan</h3>
              <p className="text-xs text-gray-500">Menganalisis kantong kepadatan angkatan kerja untuk distribusi program BLK.</p>
            </div>
            <span className="rounded-md bg-blue-50 text-blue-700 px-2 py-1 text-xs font-medium">
              Data Valid Pendopo Bupati
            </span>
          </div>

          {/* SVG Bar Chart with Responsive Fit */}
          <div className="relative w-full h-64 bg-gray-50 rounded-xl p-4 flex flex-col justify-end">
            <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none">
              <div className="border-b border-gray-200/50 w-full h-0"></div>
              <div className="border-b border-gray-200/50 w-full h-0"></div>
              <div className="border-b border-gray-200/50 w-full h-0"></div>
              <div className="border-b border-gray-200 w-full h-0"></div>
            </div>

            <div className="relative z-10 flex items-end justify-between h-48 px-2">
              {MAJALENGKA_SUBDISTRICTS.map((sub) => {
                const maxVal = Math.max(...MAJALENGKA_SUBDISTRICTS.map(s => s.unemploymentCount));
                const percentHeight = ((sub.unemploymentCount / maxVal) * 100) * 0.85; // cap at 85% for layout
                return (
                  <div
                    key={sub.id}
                    className="flex flex-col items-center group relative cursor-pointer"
                    style={{ width: `${100 / MAJALENGKA_SUBDISTRICTS.length}%` }}
                    onClick={() => setSelectedSubdistrict(sub.id)}
                  >
                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-[10px] rounded px-2 py-1 z-30 whitespace-nowrap shadow-lg">
                      {sub.name}: <span className="font-bold">{sub.unemploymentCount} Jiwa</span>
                    </div>

                    <div
                      style={{ height: `${percentHeight}%` }}
                      className={`w-4/5 rounded-t-md transition-all duration-300 ${
                        selectedSubdistrict === sub.id
                          ? "bg-gradient-to-t from-blue-700 to-cyan-500 shadow-md"
                          : "bg-gradient-to-t from-blue-400 to-indigo-300 group-hover:from-blue-500 group-hover:to-cyan-400"
                      }`}
                    ></div>
                    <span className="text-[9px] text-gray-500 mt-2 rotate-12 origin-left truncate max-w-[40px] block">
                      {sub.name.split(" ")[0]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="text-[10px] text-gray-400 text-center">
            *Arahkan kursor / klik pada bar untuk memfilter detail Kecamatan di papan statistik kanan.
          </p>
        </div>

        {/* Subdistrict Heatmap Matrix / Interactive Selector */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-4">
          <div>
            <h3 className="text-md font-semibold text-gray-800">Fokus Program Kecamatan</h3>
            <p className="text-xs text-gray-500">Nilai indeks urgensi penyaluran lapangan kerja baru.</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {MAJALENGKA_SUBDISTRICTS.map((sub) => {
              const uRate = sub.unemploymentCount;
              const severityColor = 
                uRate > 2000 
                  ? "bg-red-50 border-red-200 text-red-900" 
                  : uRate > 1400 
                  ? "bg-amber-50 border-amber-200 text-amber-900" 
                  : "bg-emerald-50 border-emerald-200 text-emerald-900";

              return (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubdistrict(sub.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${severityColor} ${
                    selectedSubdistrict === sub.id ? "ring-2 ring-indigo-600 scale-95 font-semibold" : "opacity-90 hover:opacity-100"
                  }`}
                >
                  <p className="text-[11px] uppercase tracking-wider opacity-70">Kecamatan</p>
                  <h4 className="text-xs font-bold truncate leading-tight mt-0.5">{sub.name.split(" ")[0]}</h4>
                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <span>Pencaker:</span>
                    <span className="font-extrabold">{sub.unemploymentCount}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Subdistrict Strategic Analysis */}
      {selectedSubdistrict && (() => {
        const sub = MAJALENGKA_SUBDISTRICTS.find(s => s.id === selectedSubdistrict);
        if (!sub) return null;
        return (
          <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-5 space-y-4 animate-fadeIn">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-600 p-2.5 text-white shadow-sm">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Analisis Wilayah: {sub.name}</h4>
                  <p className="text-xs text-gray-500">Rekomendasi Pemetaan Tenaga Kerja Kertajati-Rebana.</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedSubdistrict(null)}
                className="text-xs text-gray-400 hover:text-gray-600 font-medium"
              >
                Clear Filter
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
              <div className="bg-white rounded-xl p-4 border border-blue-100/50">
                <p className="text-xs text-gray-500">Angkatan Kerja</p>
                <h5 className="text-lg font-bold text-gray-900 mt-1">{sub.workforceCount.toLocaleString("id-ID")}</h5>
                <p className="text-[10px] text-gray-400 mt-2">Warga siap produktif</p>
              </div>

              <div className="bg-white rounded-xl p-4 border border-blue-100/50">
                <p className="text-xs text-gray-500">Menunggu Penempatan</p>
                <h5 className="text-lg font-bold text-amber-600 mt-1">{sub.unemploymentCount.toLocaleString("id-ID")}</h5>
                <p className="text-[10px] text-amber-500 mt-2">Daftar pencaker aktif</p>
              </div>

              <div className="bg-white rounded-xl p-4 border border-blue-100/50">
                <p className="text-xs text-gray-500">Korporasi Terdaftar</p>
                <h5 className="text-lg font-bold text-blue-700 mt-1">{sub.companiesCount} Industri</h5>
                <p className="text-[10px] text-gray-400 mt-2">Penyerap CSR & Tenaga Lokal</p>
              </div>

              <div className="bg-white rounded-xl p-4 border border-blue-100/50">
                <p className="text-xs text-gray-500">Rekomendasi Kebijakan Bupati</p>
                <div className="mt-1">
                  <span className="inline-block rounded bg-indigo-100 px-2 py-0.5 text-[10px] font-semibold text-indigo-700">
                    {sub.unemploymentCount > 1500 
                      ? "BUKA JOBS EXPO MASAL" 
                      : sub.companiesCount < 10 
                      ? "INSENTIF PAJAK MANUFAKTUR" 
                      : "PENGUATAN SERTIFIKASI BLK"}
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 mt-2">Prioritas program Disnaker</p>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
