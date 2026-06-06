import { useState } from "react";
import { MOCK_COMPANIES, MOCK_JOBS } from "../data/mockData";
import { MapPin, Building2, Briefcase, Percent, ExternalLink, Globe } from "lucide-react";

type ZoneId = "kertajati" | "ligung" | "dawuan" | "jatiwangi" | "kasokandel";

interface IndustrialZone {
  id: ZoneId;
  name: string;
  description: string;
  color: string;
  highlightColor: string;
  totalCompanies: number;
  unemploymentDensity: string;
}

export default function PetaIndustri() {
  const [selectedZone, setSelectedZone] = useState<ZoneId>("kertajati");

  const zones: IndustrialZone[] = [
    { id: "kertajati", name: "Kawasan Rebana - Kertajati Aerocity", description: "Pusat aviasi, logistik udara internasional, dan pergudangan modern berikat di sekitar BIJB.", color: "fill-blue-500/20 stroke-blue-500", highlightColor: "bg-blue-600 text-white", totalCompanies: 8, unemploymentDensity: "Rendah" },
    { id: "ligung", name: "Zona Industri Ligung", description: "Kawasan padat karya manufaktur alas kaki kelas ekspor dan perakitan tekstil skala raksasa.", color: "fill-amber-500/20 stroke-amber-500", highlightColor: "bg-amber-600 text-white", totalCompanies: 15, unemploymentDensity: "Tinggi" },
    { id: "dawuan", name: "Dawuan-Kadipaten Industrial Ring", description: "Sentra manufaktur makanan olahan (F&B), bahan kimia organik, dan pergudangan logistik darat.", color: "fill-emerald-500/20 stroke-emerald-500", highlightColor: "bg-emerald-600 text-white", totalCompanies: 12, unemploymentDensity: "Sedang" },
    { id: "jatiwangi", name: "Terracotta Jatiwangi Cultural District", description: "Pusat industri kreatif keramik, genteng hias, dan pariwisata heritage tanah liat.", color: "fill-indigo-500/20 stroke-indigo-500", highlightColor: "bg-indigo-600 text-white", totalCompanies: 4, unemploymentDensity: "Sedang" },
    { id: "kasokandel", name: "Kasokandel Garment Belt", description: "Sentra konveksi, pintal benang ekspor, dan pemukiman pekerja ramah lingkungan.", color: "fill-pink-500/20 stroke-pink-500", highlightColor: "bg-pink-600 text-white", totalCompanies: 9, unemploymentDensity: "Rendah" },
  ];

  const activeZone = zones.find((z) => z.id === selectedZone) || zones[0];

  // Filtering local companies situated in the selected subdistrict/area zone
  const getSubdistrictMatches = (zoneId: ZoneId): string[] => {
    switch (zoneId) {
      case "kertajati": return ["Kertajati"];
      case "ligung": return ["Ligung"];
      case "dawuan": return ["Dawuan", "Kadipaten"];
      case "jatiwangi": return ["Jatiwangi"];
      case "kasokandel": return ["Kasokandel"];
      default: return [];
    }
  };

  const matches = getSubdistrictMatches(selectedZone);
  const matchedCompanies = MOCK_COMPANIES.filter((co) => matches.includes(co.subdistrict));

  return (
    <div className="space-y-6" id="peta-industri-view">
      {/* Overview Card */}
      <div className="rounded-[32px] border border-blue-100 bg-white/60 p-6 shadow-sm backdrop-blur-lg">
        <h2 className="text-xl font-black text-primary-navy font-sans tracking-tight">Peta Digital Kawasan Industri Kertajati & Rebana</h2>
        <p className="text-sm text-gray-500 mt-1.5 leading-relaxed font-semibold">
          Investigasi sebaran investasi, klaster komoditas manufaktur, serapan tenaga kerja lokal Majalengka, dan ketersediaan lowongan aktif.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* SVG Interactive Map (Left Panel - 3 Cols) */}
        <div className="lg:col-span-3 rounded-[32px] border border-blue-100 bg-white p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-blue">Peta Interaktif Kabupaten Majalengka</span>
            <div className="flex gap-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] text-accent-blue font-bold">
                <span className="h-2 w-2 rounded-full bg-accent-blue animate-pulse"></span> Kertajati BIJB Airport
              </span>
            </div>
          </div>

          {/* Premium Vector Stylized Map representation of Majalengka Industrial regions */}
          <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-bg-ice to-blue-100/30 rounded-2xl overflow-hidden border border-blue-150 flex items-center justify-center">
            {/* Compass rose */}
            <div className="absolute top-4 left-4 text-[10px] text-gray-400 font-mono">
              GPS REF: MAJALENGKA REGENCY, REBANA TRIANGLE
            </div>

            {/* Stylized SVG Landmass with hotspots */}
            <svg viewBox="0 0 500 400" className="w-full h-full max-h-[340px] drop-shadow-md select-none">
              {/* Outer boundary representation */}
              <path
                d="M 50,200 C 100,100 200,50 300,80 C 400,100 450,180 430,240 C 410,310 380,360 300,380 C 200,400 120,380 80,320 Z"
                className="fill-slate-100 stroke-slate-300 stroke-2"
              />

              {/* Zone Highlight: Kertajati */}
              <path
                id="map-kertajati"
                onClick={() => setSelectedZone("kertajati")}
                d="M 120,100 Q 180,60 250,90 Q 230,150 180,160 Q 140,140 120,100 Z"
                className={`transition-all cursor-pointer ${
                  selectedZone === "kertajati" ? "fill-blue-500/45 stroke-blue-600 stroke-3" : "fill-blue-500/10 stroke-blue-500/50 hover:fill-blue-500/25"
                }`}
              />
              <text x="180" y="110" className="text-[12px] font-black fill-primary-navy pointer-events-none">KERTAJATI AEROCITY</text>

              {/* Zone Highlight: Ligung */}
              <path
                id="map-ligung"
                onClick={() => setSelectedZone("ligung")}
                d="M 250,90 Q 320,80 370,130 Q 330,180 270,170 Q 230,150 250,90 Z"
                className={`transition-all cursor-pointer ${
                  selectedZone === "ligung" ? "fill-amber-500/45 stroke-amber-600 stroke-3" : "fill-amber-500/10 stroke-amber-500/50 hover:fill-amber-500/25"
                }`}
              />
              <text x="290" y="130" className="text-[12px] font-black fill-amber-800 pointer-events-none">LIGUNG ZONE</text>

              {/* Zone Highlight: Dawuan */}
              <path
                id="map-dawuan"
                onClick={() => setSelectedZone("dawuan")}
                d="M 100,180 Q 170,165 200,200 Q 170,260 120,240 Q 80,210 100,180 Z"
                className={`transition-all cursor-pointer ${
                  selectedZone === "dawuan" ? "fill-emerald-500/45 stroke-emerald-600 stroke-3" : "fill-emerald-500/10 stroke-emerald-500/50 hover:fill-emerald-500/25"
                }`}
              />
              <text x="120" y="210" className="text-[11px] font-black fill-emerald-800 pointer-events-none">DAWUAN & KDP</text>

              {/* Zone Highlight: Kasokandel */}
              <path
                id="map-kasokandel"
                onClick={() => setSelectedZone("kasokandel")}
                d="M 210,185 Q 260,175 300,210 Q 280,270 210,250 Q 190,210 210,185 Z"
                className={`transition-all cursor-pointer ${
                  selectedZone === "kasokandel" ? "fill-pink-500/45 stroke-pink-600 stroke-3" : "fill-pink-500/10 stroke-pink-500/50 hover:fill-pink-500/25"
                }`}
              />
              <text x="220" y="225" className="text-[11px] font-black fill-pink-800 pointer-events-none">KASOKANDEL</text>

              {/* Zone Highlight: Jatiwangi */}
              <path
                id="map-jatiwangi"
                onClick={() => setSelectedZone("jatiwangi")}
                d="M 300,210 Q 370,180 410,220 Q 380,300 310,280 Q 280,250 300,210 Z"
                className={`transition-all cursor-pointer ${
                  selectedZone === "jatiwangi" ? "fill-indigo-500/45 stroke-indigo-600 stroke-3" : "fill-indigo-500/10 stroke-indigo-500/50 hover:fill-indigo-500/25"
                }`}
              />
              <text x="320" y="245" className="text-[11px] font-black fill-indigo-800 pointer-events-none">JATIWANGI CLAY</text>
            </svg>

            {/* Hint Overlay */}
            <div className="absolute bottom-3 right-4 bg-white/95 rounded-lg border border-blue-100 p-2.5 shadow-sm text-[10px] space-y-1 backdrop-blur font-bold text-primary-navy">
              <p className="text-gray-700">KLIK WILAYAH PETA UTK MEMILIH ZONA</p>
              <div className="flex gap-2 font-black mt-1">
                <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 bg-accent-blue rounded-full"></span> Kertajati</span>
                <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 bg-amber-500 rounded-full"></span> Ligung</span>
              </div>
            </div>
          </div>
        </div>

        {/* Industrial Information & Corporate Spotlights (Right panel - 2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-[32px] border border-blue-100 bg-white p-6 shadow-sm space-y-4">
            {/* Active zone label */}
            <div className="space-y-1">
              <span className="rounded bg-indigo-50 px-2 py-1 text-[10px] font-black text-indigo-700 tracking-wider">TERPILIH</span>
              <h3 className="text-md font-black text-primary-navy mt-1.5">{activeZone.name}</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-semibold">{activeZone.description}</p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="rounded-xl bg-gray-50 p-3 border border-gray-100">
                <span className="text-[10px] text-gray-500 uppercase font-black block tracking-wider">Urgensi Tenaga Kerja</span>
                <span className="text-sm font-black text-red-600">{activeZone.unemploymentDensity}</span>
              </div>
              <div className="rounded-xl bg-gray-50 p-3 border border-gray-100">
                <span className="text-[10px] text-gray-500 uppercase font-black block tracking-wider">Proyeksi Investasi</span>
                <span className="text-sm font-black text-primary-navy">Kawasan Rebana v4.0</span>
              </div>
            </div>
          </div>

          {/* Companies in this area */}
          <div className="rounded-[32px] border border-blue-100 bg-white p-6 shadow-sm space-y-4">
            <h4 className="text-[10px] font-black text-primary-navy uppercase tracking-[0.2em] flex items-center gap-1.5">
              <Building2 size={12} /> Korporasi Besar ({matchedCompanies.length})
            </h4>

            {matchedCompanies.length === 0 ? (
              <p className="text-xs text-gray-400 italic">Tidak ada profil korporasi sampel terdaftar dalam zona ini.</p>
            ) : (
              <div className="space-y-3">
                {matchedCompanies.map((co) => {
                  const jobMatches = MOCK_JOBS.filter((j) => j.companyId === co.id);
                  return (
                    <div key={co.id} className="rounded-xl border border-gray-200/60 p-3 hover:border-blue-300 transition-all space-y-3 bg-white">
                      <div className="flex items-center gap-3">
                        <img src={co.logo} alt={co.name} className="h-10 w-10 rounded-lg object-cover bg-gray-100 border border-gray-200" />
                        <div className="min-w-0 flex-1">
                          <h5 className="text-xs font-bold text-gray-900 truncate leading-tight">{co.name}</h5>
                          <p className="text-[10px] text-gray-400 truncate">{co.sector} • NIB: {co.nib}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[10px] pt-1">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Percent size={12} className="text-blue-500" />
                          <span>Pekerja Lokal: <strong className="text-gray-900">{co.localWorkforcePercent}%</strong></span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Briefcase size={12} className="text-emerald-500" />
                          <span>Loker Aktif: <strong className="text-gray-900">{jobMatches.length}</strong></span>
                        </div>
                      </div>

                      {/* CSR & Ratings */}
                      <div className="flex items-center justify-between text-[10px] text-gray-500 border-t border-gray-100 pt-2">
                        <span>Peringkat CSR: <strong className="text-indigo-600">{co.csrRating} / 5.0</strong></span>
                        <a
                          href={co.website}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-blue-500 hover:underline"
                        >
                          <Globe size={10} /> Web
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
