import React, { useState } from "react";
import { MAJALENGKA_SUBDISTRICTS } from "../data/mockData";
import { ShieldCheck, UserPlus, ClipboardList, TrendingUp } from "lucide-react";

export default function DesaKecamatanDashboard() {
  const [selectedKec, setSelectedKec] = useState(MAJALENGKA_SUBDISTRICTS[0].id);

  // Queue simulation of direct village registration of out of work citizens
  const [unemployedList, setUnemployedList] = useState<any[]>([
    { id: 1, name: "Cecep Supriatna", nik: "3210121102940003", village: "Leles", status: "Terdaftar BLK" },
    { id: 2, name: "Kokom Komariah", nik: "3210084501990001", village: "Jatisura", status: "Mencari Kerja" }
  ]);
  const [newName, setNewName] = useState("");
  const [newNik, setNewNik] = useState("");
  const [newVillage, setNewVillage] = useState("");

  const handleRegisterVillager = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newNik.trim()) return;

    const newCitizen = {
      id: Date.now(),
      name: newName,
      nik: newNik,
      village: newVillage || "Pusat Desa",
      status: "Mencari Kerja"
    };

    setUnemployedList([...unemployedList, newCitizen]);
    setNewName("");
    setNewNik("");
    setNewVillage("");
  };

  const activeKecData = MAJALENGKA_SUBDISTRICTS.find((k) => k.id === selectedKec) || MAJALENGKA_SUBDISTRICTS[0];

  return (
    <div className="space-y-6" id="desa-kecamatan-root">
      {/* Upper header guidance info */}
      <div className="rounded-2xl bg-gradient-to-r from-teal-700 to-emerald-700 p-6 text-white shadow-md">
        <h2 className="text-xl font-bold font-sans">Dashboard Operator Desa & Kecamatan</h2>
        <p className="text-emerald-100 text-xs mt-1">
          Pantau statistika ketenagakerjaan langsung dari koordinasi tingkat RT/RW dan Kelurahan daerah Kabupaten Majalengka.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Subdistrict Selector and stats card (1 Col) */}
        <div className="lg:col-span-1 space-y-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Pilih Wilayah Kerja Anda</label>
              <select
                value={selectedKec}
                onChange={(e) => setSelectedKec(e.target.value)}
                className="w-full rounded-xl border border-gray-200 p-2.5 text-sm bg-white text-gray-800"
              >
                {MAJALENGKA_SUBDISTRICTS.map((k) => (
                  <option key={k.id} value={k.id}>{k.name}</option>
                ))}
              </select>
            </div>

            {/* Micro details metrics */}
            <div className="space-y-3.5 border-t border-gray-100 pt-3.5 text-xs">
              <div className="flex justify-between py-1 border-b border-gray-50 text-gray-600">
                <span>Warga Menganggur:</span>
                <strong className="text-red-650 text-sm font-sans font-black">{activeKecData.unemploymentCount} Jiwa</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50 text-gray-600">
                <span>Angkatan Produktif:</span>
                <strong className="text-gray-900 font-sans font-extrabold">{activeKecData.workforceCount}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50 text-gray-600">
                <span>Aduan Ketenagakerjaan:</span>
                <strong className="text-amber-600 font-sans font-extrabold">{activeKecData.complaintsCount} Kasus</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Right side columns: Grassroots direct enrollment tool and list of registered people (2 Cols) */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Form to submit unmapped jobseekers from rural villages */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-extrabold text-teal-700 uppercase tracking-wider flex items-center gap-1.5 leading-none">
              <UserPlus size={15} /> Input Warga Menganggur Desa
            </h3>

            <form onSubmit={handleRegisterVillager} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-gray-600">Nama Lengkap Warga</label>
                <input
                  type="text"
                  placeholder="Contoh: Cecep Supriatna"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 p-2.5 text-sm focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-gray-600">NIK (16 Digit)</label>
                <input
                  type="text"
                  maxLength={16}
                  placeholder="Contoh: 32101..."
                  value={newNik}
                  onChange={(e) => setNewNik(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 p-2.5 text-sm font-mono focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-gray-600">Nama Dusun / Kelurahan Desa</label>
                <input
                  type="text"
                  placeholder="Contoh: Leles / Jatisura"
                  value={newVillage}
                  onChange={(e) => setNewVillage(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 p-2.5 text-sm focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                id="villager-submit"
                className="w-full rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 text-xs transition"
              >
                Daunkan Nama Warga
              </button>
            </form>
          </div>

          {/* List panel */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-3">
            <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">
              Antrean Penempatan Desa Terpilih ({unemployedList.length})
            </h4>

            <div className="space-y-2 max-h-[210px] overflow-y-auto">
              {unemployedList.map((citizen) => (
                <div key={citizen.id} className="rounded-xl border border-gray-200 p-3 bg-white space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-gray-900 leading-tight">{citizen.name}</h5>
                    <span className="rounded bg-teal-50 text-teal-700 border border-teal-100 px-1.5 py-0.5 text-[8px] font-bold uppercase">
                      {citizen.status}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500 font-mono">NIK: {citizen.nik}</p>
                  <p className="text-[10px] text-gray-600">Dusun: <strong>{citizen.village}</strong></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
