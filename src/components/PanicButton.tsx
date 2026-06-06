import React, { useState } from "react";
import { ShieldAlert, MapPin, Camera, AlertOctagon, HelpCircle, CornerDownRight } from "lucide-react";

export default function PanicButton() {
  const [isChecked, setIsChecked] = useState(false);
  const [reportText, setReportText] = useState("");
  const [coordinates, setCoordinates] = useState<string | null>(null);
  const [photoCaptured, setPhotoCaptured] = useState(false);
  const [ticketNumber, setTicketNumber] = useState<string | null>(null);

  const handleFetchGPS = () => {
    // Generate realistic Majalengka coordinate simulation
    setCoordinates("-6.742201, 108.201402 (Kecamatan Dawuan Area)");
  };

  const handleCapturePhoto = () => {
    setPhotoCaptured(true);
  };

  const handleSubmitEmergency = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportText.trim()) return;

    // Generate immediate emergency ticket
    const num = `EMERGENCY-MJ-${Math.floor(1000 + Math.random() * 8999)}`;
    setTicketNumber(num);
  };

  const handleReset = () => {
    setReportText("");
    setCoordinates(null);
    setPhotoCaptured(false);
    setTicketNumber(null);
    setIsChecked(false);
  };

  return (
    <div className="space-y-6" id="panic-button-root">
      {/* Alert Warning Panel */}
      <div className="rounded-2xl bg-gradient-to-r from-red-700 via-red-600 to-amber-700 p-6 text-white shadow-lg space-y-3">
        <div className="flex items-center gap-2.5">
          <ShieldAlert size={28} className="animate-pulse text-white/95" />
          <h2 className="text-xl md:text-2xl font-bold font-sans">SISTEM PANIC BUTTON ADVOKASI SENGKETA</h2>
        </div>
        <p className="text-red-100 text-xs md:text-sm leading-relaxed">
          Gunakan tombol darurat ini untuk melaporkan kecelakaan kerja fatal, pemerasan upah ilegal, intimidasi bersenjata di lingkungan kerja, atau pelanggaran berat ketenagakerjaan daerah Majalengka secara real-time. Laporan ini langsung tercatat di ruang penindakan hukum Kepolisian & Satpol PP bersama Disnaker Majalengka.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side: Panic Trigger Form */}
        <div className="rounded-2xl border border-red-100 bg-red-50/10 p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <AlertOctagon className="text-red-600 animate-bounce" size={22} />
            <h3 className="font-bold text-red-900 text-sm">Form Laporan Pelanggaran Mendesak</h3>
          </div>

          {!ticketNumber ? (
            <form onSubmit={handleSubmitEmergency} className="space-y-4 text-xs">
              <div className="space-y-2">
                <label className="font-semibold text-gray-700">Rincian Kejadian Darurat</label>
                <textarea
                  value={reportText}
                  onChange={(e) => setReportText(e.target.value)}
                  placeholder="Ceritakan penindasan/kejadian maut saat ini secara ringkas..."
                  rows={4}
                  className="w-full rounded-xl border border-red-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white shadow-inner"
                  required
                />
              </div>

              {/* GPS Actions mapping */}
              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={handleFetchGPS}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white border border-red-200 hover:border-red-500 text-red-600 font-bold rounded-lg text-[11px] transition"
                >
                  <MapPin size={14} /> Ambil Lokasi GPS Terkini
                </button>

                <button
                  type="button"
                  onClick={handleCapturePhoto}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white border border-red-200 hover:border-red-500 text-red-600 font-bold rounded-lg text-[11px] transition"
                >
                  <Camera size={14} /> Ambil Bukti Foto Kejadian
                </button>
              </div>

              {/* Show attachments status */}
              {(coordinates || photoCaptured) && (
                <div className="bg-red-50 border border-red-100 rounded-xl p-3 space-y-1 text-red-800">
                  {coordinates && <p className="flex items-center gap-1"><CornerDownRight size={12} /> GPS Terkunci: <strong className="font-mono">{coordinates}</strong></p>}
                  {photoCaptured && <p className="flex items-center gap-1"><CornerDownRight size={12} /> Bukti visual: <strong>Lampiran_Foto_Darurat.png (TERLAMPIR)</strong></p>}
                </div>
              )}

              {/* Checkbox acknowledgment */}
              <label className="flex items-start gap-2.5 cursor-pointer text-gray-600 font-medium">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  className="mt-0.5 rounded border-red-300 focus:ring-red-500"
                />
                <span>Saya menyatakan bersumpah bahwa laporan ini adalah fakta kebenaran demi hukum, bukan fitnah maupun laporan bohong.</span>
              </label>

              <button
                type="submit"
                disabled={!isChecked || !reportText.trim()}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-extrabold py-3.5 rounded-xl text-xs tracking-wider transition shadow-md disabled:opacity-50"
              >
                KIRIM ADUAN GULAT DARURAT
              </button>
            </form>
          ) : (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 space-y-4 text-center animate-scaleUp">
              <ShieldAlert size={44} className="text-emerald-600 mx-auto animate-pulse" />
              <div className="space-y-1">
                <h4 className="font-extrabold text-emerald-900 text-md">Laporan Darurat Berhasil Terkirim!</h4>
                <p className="text-xs text-emerald-800 font-semibold">Nomor Tiket Darurat: {ticketNumber}</p>
              </div>
              <p className="text-xs text-emerald-700 leading-relaxed">
                Satuan Tugas Pengawasan Khusus Hubungan Industrial Disnaker Majalengka sedang mengontak tim penegak hukum terdekat dengan koordinat GPS Anda untuk melakukan panggilan inspeksi darurat masal.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 font-bold text-xs"
              >
                Mengerti & Reset
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Informational guidelines */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-4 text-xs text-gray-600 leading-relaxed">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5 leading-none mb-2">
            <HelpCircle size={14} className="text-blue-500" /> Informasi Alur Panic Button
          </h4>
          <p>
            Alat Panic Button ini adalah program prioritas Pemkab Majalengka dalam menjunjung tinggi keadilan di kawasan industri Kertajati & Rebana demi mencapai iklim usaha yang bermartabat dan ramah kesejahteraan pekerja.
          </p>

          <div className="space-y-3.5 border-t border-gray-100 pt-3.5">
            <div className="flex gap-3">
              <span className="flex h-5 w-5 rounded-full bg-blue-100 text-blue-700 font-bold items-center justify-center text-[10px]">1</span>
              <div>
                <p className="font-bold text-gray-900">Perlindungan Saksi Korban</p>
                <p className="text-[11px] text-gray-500">Identitas pribadi dan berkas NIK Anda akan terlindung di bawah payung hukum keprotokolan perlindungan pelapor Disnaker.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="flex h-5 w-5 rounded-full bg-blue-100 text-blue-700 font-bold items-center justify-center text-[10px]">2</span>
              <div>
                <p className="font-bold text-gray-900">Penyitaan & Sidak mendadak</p>
                <p className="text-[11px] text-gray-500">Bukti koordinat GPS dan foto yang Anda unggah membantu mempercepat otorisasi penyitaan aset/sidik lokasi sanksi.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="flex h-5 w-5 rounded-full bg-blue-100 text-blue-700 font-bold items-center justify-center text-[10px]">3</span>
              <div>
                <p className="font-bold text-gray-900">Sanksi Pencabutan Izin Korporasi</p>
                <p className="text-[11px] text-gray-500">Sengketa berat yang diabaikan perusahaan akan berujung pembekuan NIB (Nomor Induk Berusaha) secara nasional.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
