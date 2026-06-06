import { MAJALENGKA_SUBDISTRICTS } from "../data/mockData";
import { TrendingUp, Award, Building, BarChart3, PieChart, Users2 } from "lucide-react";

export default function InvestorDashboard() {
  const totalWorkforce = MAJALENGKA_SUBDISTRICTS.reduce((acc, curr) => acc + curr.workforceCount, 0);
  const totalUnemployed = MAJALENGKA_SUBDISTRICTS.reduce((acc, curr) => acc + curr.unemploymentCount, 0);
  const totalGraduates = MAJALENGKA_SUBDISTRICTS.reduce((acc, curr) => acc + curr.graduatesCount, 0);

  // Hardcoded Majalengka macro indices for awesome investment justification
  const localUmpComparison = [
    { name: "Majalengka (Rebana)", wage: "Rp 2.250.000", costOfLiving: "Sangat Rendah", appeal: "Tertinggi untuk Padat Karya" },
    { name: "Cirebon Kota", wage: "Rp 2.450.000", costOfLiving: "Sedang", appeal: "Kawasan Jasa" },
    { name: "Karawang", wage: "Rp 5.250.000", costOfLiving: "Sangat Tinggi", appeal: "Titik Jenuh Industri" },
    { name: "Bekasi Kota", wage: "Rp 5.150.000", costOfLiving: "Sangat Tinggi", appeal: "Titik Jenuh Logistik" }
  ];

  return (
    <div className="space-y-6" id="investor-dashboard-root">
      {/* Upper banner info */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-700 to-cyan-700 p-6 text-white shadow-md">
        <h2 className="text-xl font-bold font-sans">Investor Market Intel & Talent Hub</h2>
        <p className="text-blue-100 text-xs mt-1">
          Pusat Kajian Statistik Angkatan Kerja, Komparasi Upah Regional (UMK), Demografi Keahlian Vokasional, dan Kemudahan Ekspansi Bisnis Terpadu di Kabupaten Majalengka.
        </p>
      </div>

      {/* Numerical Demographics highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase">Cadangan Tenaga Kerja Siap Pakai</p>
            <h3 className="text-2xl font-black text-blue-600 mt-1">{(totalUnemployed * 1.5).toLocaleString("id-ID")} Jiwa</h3>
            <span className="text-[10px] text-gray-400">Pencaker terdidik & terlatih BLK</span>
          </div>
          <Users2 className="text-blue-200" size={32} />
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase">Lulusan SMK & S1 Baru per Tahun</p>
            <h3 className="text-2xl font-black text-amber-600 mt-1">{totalGraduates.toLocaleString("id-ID")} Orang</h3>
            <span className="text-[10px] text-gray-400">Sumber daya muda usia produktif</span>
          </div>
          <Award className="text-amber-200" size={32} />
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase">Lelang Lahan Industri Rebana</p>
            <h3 className="text-2xl font-black text-emerald-600 mt-1">Ready v4.0</h3>
            <span className="text-[10px] text-gray-400">Dukungan infrastruktur gas & PLTS</span>
          </div>
          <Building className="text-emerald-200" size={32} />
        </div>
      </div>

      {/* Regional wage benchmarking comparison (UMK COMP) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-4">
          <div>
            <h3 className="text-md font-bold text-gray-800 flex items-center gap-1.5">
              <TrendingUp size={16} className="text-blue-500" /> Analisis Keunggulan Upah Minimum (UMK 2026)
            </h3>
            <p className="text-xs text-gray-500">Memperlihatkan efisiensi upah Majalengka mendukung industri manufaktur padat karya dibanding daerah satelit Jabodetabek.</p>
          </div>

          <div className="space-y-3">
            {localUmpComparison.map((r, i) => {
              const isLocal = r.name.includes("Majalengka");
              return (
                <div key={i} className={`rounded-xl border p-3 flex flex-wrap items-center justify-between gap-2 transition ${
                  isLocal ? "border-blue-300 bg-blue-50/20 ring-1 ring-blue-400/10" : "border-gray-100 bg-gray-50/50"
                }`}>
                  <div>
                    <h4 className="font-bold text-xs text-gray-800">{r.name}</h4>
                    <p className="text-[10px] text-gray-450 mt-0.5">Biaya Hidup: {r.costOfLiving}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-sm text-gray-900 block">{r.wage}</span>
                    <span className={`text-[9px] font-bold uppercase ${isLocal ? "text-blue-600" : "text-gray-400"}`}>{r.appeal}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Talent pool vocational skills demography */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-4">
          <div>
            <h3 className="text-md font-bold text-gray-800 flex items-center gap-1.5">
              <BarChart3 size={16} className="text-blue-500" /> Distribusi Kompetensi Vokasional (Talent Pool)
            </h3>
            <p className="text-xs text-gray-500">Persentase sebaran peminatan kejuruan lulusan asal Majalengka.</p>
          </div>

          {/* Graphical custom SVG horizontal breakdown */}
          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <div className="flex justify-between font-semibold text-gray-700">
                <span>Teknik Mesin & Otomasi Manufaktur</span>
                <span>42%</span>
              </div>
              <div className="w-full bg-gray-150 h-2.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "42%" }}></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-semibold text-gray-700">
                <span>Logistik, Gudang & Hub Udara</span>
                <span>28%</span>
              </div>
              <div className="w-full bg-gray-150 h-2.5 rounded-full overflow-hidden">
                <div className="bg-cyan-500 h-2.5 rounded-full" style={{ width: "28%" }}></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-semibold text-gray-700">
                <span>Teknologi Informasi & Administrasi</span>
                <span>18%</span>
              </div>
              <div className="w-full bg-gray-150 h-2.5 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: "18%" }}></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-semibold text-gray-700">
                <span>Seni Kerajinan Terracotta & F&B</span>
                <span>12%</span>
              </div>
              <div className="w-full bg-gray-150 h-2.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "12%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
