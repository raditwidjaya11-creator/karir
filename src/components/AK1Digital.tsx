import React, { useState } from "react";
import { FileText, CheckCircle2, Download, QrCode, ClipboardList, HelpCircle, User, Image as ImageIcon } from "lucide-react";

export default function AK1Digital() {
  const [formData, setFormData] = useState({
    nik: "3210121508980004",
    fullName: "Radit Widjaya",
    birthPlaceDate: "Majalengka, 15 Agustus 1998",
    gender: "Laki-laki",
    education: "SMK (Sederajat)",
    major: "Teknik Instalasi Tenaga Listrik",
    subdistrict: "Jatiwangi",
    village: "Leles"
  });

  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [applicationStatus, setApplicationStatus] = useState<"Draft" | "Diajukan" | "Aktif">("Draft");
  const [issuedCard, setIssuedCard] = useState<any>(null);

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setApplicationStatus("Diajukan");

    // Simulating instant government verification for awesome UX
    setTimeout(() => {
      setApplicationStatus("Aktif");
      setIssuedCard({
        cardNumber: "AK1/3210/2026/06941",
        issuedDate: "06 Juni 2026",
        expiryDate: "06 Juni 2028 (2 Tahun)",
        qrcode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=VERIFIED-AK1-Radit-3210121508980004`
      });
    }, 1800);
  };

  const handleDownloadPDF = () => {
  const element = document.getElementById("ak1-card");

  html2pdf()
    .from(element)
    .set({
      margin: 0,
      filename: `AK1-${formData.nik}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: {
        scale: 3,
        useCORS: true
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "landscape"
      }
    })
    .save();
};

  return (
    <div className="space-y-6" id="ak1-digital-root">
      {/* Overview Block */}
      <div className="rounded-[32px] border border-blue-100 bg-white/60 p-6 shadow-sm backdrop-blur-lg">
        <h2 className="text-xl font-black text-primary-navy font-sans tracking-tight">Kartu Kuning Digital Pemkab Majalengka (AK1 Digital)</h2>
        <p className="text-sm text-gray-500 mt-1.5 leading-relaxed font-semibold">
          Pengajuan Kartu Tanda Pencari Kerja secara online. Praktis, terintegrasi otomatis dengan NIK Dinas Kependudukan dan Catatan Sipil, serta siap cetak langsung.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side: Application Form */}
        <div className="rounded-[32px] border border-blue-100 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-blue-50 pb-3">
            <ClipboardList className="text-accent-blue" size={20} />
            <h3 className="font-black text-primary-navy tracking-tight">Form Pengajuan AK1 Online</h3>
          </div>

          <form onSubmit={handleSubmitApplication} className="space-y-3.5 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-gray-650 uppercase tracking-wider text-[10px]">Nomor Induk Kependudukan (NIK)</label>
                <input
                  type="text"
                  maxLength={16}
                  value={formData.nik}
                  onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                  className="w-full rounded-xl border border-blue-100 p-2.5 bg-gray-50 text-gray-700 font-mono text-xs focus:outline-none"
                  disabled={applicationStatus !== "Draft"}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-650 uppercase tracking-wider text-[10px]">Nama Lengkap (Sesuai KTP)</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full rounded-xl border border-blue-100 p-2.5 text-xs focus:outline-none bg-white text-gray-800"
                  disabled={applicationStatus !== "Draft"}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-gray-650 uppercase tracking-wider text-[10px]">Tempat, Tanggal Lahir</label>
                <input
                  type="text"
                  value={formData.birthPlaceDate}
                  onChange={(e) => setFormData({ ...formData, birthPlaceDate: e.target.value })}
                  className="w-full rounded-xl border border-blue-100 p-2.5 text-xs focus:outline-none bg-white text-gray-800"
                  disabled={applicationStatus !== "Draft"}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-650 uppercase tracking-wider text-[10px]">Jenis Kelamin</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full rounded-xl border border-blue-100 p-2.5 text-xs focus:outline-none bg-white text-gray-800"
                  disabled={applicationStatus !== "Draft"}
                >
                  <option>Laki-laki</option>
                  <option>Perempuan</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-gray-650 uppercase tracking-wider text-[10px]">Pendidikan Terakhir</label>
                <select
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  className="w-full rounded-xl border border-blue-100 p-2.5 text-xs focus:outline-none bg-white text-gray-800"
                  disabled={applicationStatus !== "Draft"}
                >
                  <option>SD (Sederajat)</option>
                  <option>SMP (Sederajat)</option>
                  <option>SMA / SMK (Sederajat)</option>
                  <option>D3 (Diploma)</option>
                  <option>D4 / S1 (Sarjana)</option>
                  <option>S2 / S3</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-650 uppercase tracking-wider text-[10px]">Jurusan Spesifik</label>
                <input
                  type="text"
                  placeholder="Contoh: Teknik Mesin / IPS"
                  value={formData.major}
                  onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                  className="w-full rounded-xl border border-blue-100 p-2.5 text-xs focus:outline-none bg-white text-gray-800"
                  disabled={applicationStatus !== "Draft"}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-gray-650 uppercase tracking-wider text-[10px]">Kecamatan (Domisili Majalengka)</label>
                <input
                  type="text"
                  value={formData.subdistrict}
                  onChange={(e) => setFormData({ ...formData, subdistrict: e.target.value })}
                  className="w-full rounded-xl border border-blue-100 p-2.5 text-xs focus:outline-none bg-white text-gray-800"
                  disabled={applicationStatus !== "Draft"}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-650 uppercase tracking-wider text-[10px]">Kelurahan / Desa</label>
                <input
                  type="text"
                  value={formData.village}
                  onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  className="w-full rounded-xl border border-blue-100 p-2.5 text-xs focus:outline-none bg-white text-gray-800"
                  disabled={applicationStatus !== "Draft"}
                  required
                />
              </div>
            </div>

            {/* Foto Profil Upload Box per guidelines */}
            <div className="space-y-1">
              <label className="font-bold text-gray-650 uppercase tracking-wider text-[10px]">
                Pas Foto Formal (Wajib, Format JPG/PNG)
              </label>
              
              <div 
                className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition ${
                  photoUrl ? "border-emerald-300 bg-emerald-50/10" : "border-blue-100 hover:border-accent-blue bg-slate-50"
                }`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (applicationStatus !== "Draft") return;
                  const file = e.dataTransfer.files?.[0];
                  if (file && file.type.startsWith("image/")) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      setPhotoUrl(event.target?.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                onClick={() => {
                  if (applicationStatus === "Draft") {
                    document.getElementById("photo-upload-input")?.click();
                  }
                }}
              >
                <input
                  type="file"
                  id="photo-upload-input"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        setPhotoUrl(event.target?.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  disabled={applicationStatus !== "Draft"}
                />
                
                {photoUrl ? (
                  <div className="flex items-center justify-center gap-3">
                    <img 
                      src={photoUrl} 
                      alt="Pratinjau Foto" 
                      className="w-12 h-16 object-cover rounded-md border border-emerald-300 shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                    <div className="text-left">
                      <p className="font-black text-emerald-800 text-xs">Pas Foto Terunggah</p>
                      <p className="text-[10px] text-gray-400">Klik atau seret gambar lain untuk mengganti</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-2">
                    <ImageIcon className="text-accent-blue mb-1" size={24} />
                    <p className="font-bold text-xs text-primary-navy">Seret & Lepas atau Klik untuk Upload Pas Foto</p>
                    <p className="text-[9px] text-gray-400 mt-1">Saran aspek rasio 3x4, maks. ukuran file 2MB</p>
                  </div>
                )}
              </div>
            </div>

            {applicationStatus === "Draft" && (
              <button
                type="submit"
                id="ak1-submit"
                className="w-full rounded-xl bg-[#1A365D] hover:bg-[#1A365D]/90 text-white font-black py-3 text-sm transition shadow-md flex items-center justify-center gap-1.5"
              >
                Kirim Pengajuan AK1
              </button>
            )}

            {applicationStatus === "Diajukan" && (
              <div className="bg-blue-50 text-blue-800 border border-blue-200 p-3.5 rounded-xl flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="font-semibold">Menghubungkan ke server Dinas Dukcapil Majalengka untuk verifikasi data...</p>
              </div>
            )}

            {applicationStatus === "Aktif" && (
              <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 p-3.5 rounded-xl flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                <p className="font-semibold">Pengajuan Berhasil Diverifikasi! Kartu AK1 Anda telah terbit di panel kanan.</p>
              </div>
            )}
          </form>
        </div>

        {/* Right Side: Issued Card Preview */}
        <div className="space-y-4">
          {issuedCard ? (
            <div className="space-y-4 animate-scaleUp">
              {/* Premium AK1 Card Layout */}
              <div
                id="ak1-card"
                className="relative overflow-hidden rounded-2xl border-4 border-[#1A365D] bg-gradient-to-tr from-yellow-50 via-white to-blue-50/20 p-6 shadow-xl aspect-[1.58/1] flex flex-col justify-between"
              >
                {/* Official Card Header */}
                <div className="flex items-start justify-between border-b-2 border-[#1A365D] pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#1A365D] p-1.5 rounded-md text-white font-black text-[9px] uppercase leading-none">
                      PEMKAB
                    </div>
                    <div className="leading-none">
                      <h4 className="text-[11px] font-black text-primary-navy uppercase tracking-tight">PEMERINTAH KABUPATEN MAJALENGKA</h4>
                      <p className="text-[8px] font-bold text-gray-500 uppercase tracking-wide mt-0.5">DINAS KETENAGAKERJAAN & KOPERASI</p>
                    </div>
                  </div>
                  <span className="rounded bg-emerald-100 px-2 py-0.5 text-[9px] font-black text-emerald-800 uppercase tracking-wider">
                    VERIFIED / ELEKTRONIK
                  </span>
                </div>

                {/* Sub-header card category */}
                <div className="text-center mt-2">
                  <h5 className="text-[11px] font-black text-primary-navy tracking-wider">KARTU TANDA PENCARI KERJA (A.K. / I)</h5>
                  <p className="text-[9px] font-mono text-gray-500 font-semibold">{issuedCard.cardNumber}</p>
                </div>

                {/* Card Details Body */}
                <div className="grid grid-cols-4 gap-3 items-center mt-3 flex-1">
                  {/* Photo Placeholder */}
                  <div className="col-span-1 rounded-lg border border-blue-200 aspect-[3/4] bg-slate-50 flex items-center justify-center text-gray-400 p-0.5 overflow-hidden shadow-inner w-full h-full">
                    {photoUrl ? (
                      <img 
                        src={photoUrl} 
                        alt="Foto Profil" 
                        className="w-full h-full object-cover rounded" 
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-400 text-center">
                        <User className="stroke-[1.5] text-gray-400" size={24} />
                        <span className="text-[7px] text-center mt-1 font-bold leading-none">PAS FOTO</span>
                      </div>
                    )}
                  </div>

                  {/* Fields */}
                  <div className="col-span-2 space-y-1 text-[10px] text-primary-navy font-semibold">
                    <p className="truncate"><strong>NIK:</strong> <span className="font-mono text-gray-700">{formData.nik}</span></p>
                    <p className="truncate"><strong>Nama:</strong> {formData.fullName}</p>
                    <p className="truncate"><strong>TTL:</strong> {formData.birthPlaceDate.split(",")[0]}</p>
                    <p className="truncate"><strong>Pendidikan:</strong> {formData.education} • {formData.major}</p>
                    <p className="truncate"><strong>Alamat:</strong> {formData.village}, {formData.subdistrict}</p>
                  </div>

                  {/* QR Validation Code */}
                  <div className="col-span-1 flex flex-col items-center">
                    <div className="bg-white p-1 rounded-lg border border-blue-100">
                      <img src={issuedCard.qrcode} alt="QR Code" className="h-14 w-14" />
                    </div>
                    <span className="text-[7px] text-gray-400 text-center font-bold uppercase mt-1 leading-none">SCAN VALIDASI</span>
                  </div>
                </div>

                {/* Bottom Bar with validation info */}
                <div className="border-t border-gray-200 pt-2 flex items-center justify-between text-[9px] text-gray-500 mt-2 font-bold">
                  <span>Tanggal Terbit: <strong className="text-primary-navy">{issuedCard.issuedDate}</strong></span>
                  <span>Masa Berlaku: <strong className="text-[#1A365D]">{issuedCard.expiryDate}</strong></span>
                </div>
              </div>

              {/* Action Suite */}
              <div className="flex gap-3">
                <button
                  onClick={handleDownloadPDF}
                  className="flex-1 py-3 bg-[#1A365D] hover:bg-[#1A365D]/90 text-white font-black rounded-xl text-xs flex items-center justify-center gap-1.5 shadow cursor-pointer"
                >
                  <Download size={14} /> Cetak Kartu (PDF)
                </button>
                <button
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent("change-tab", { detail: "qr_scanner" }));
                  }}
                  className="flex-1 py-3 bg-emerald-650 hover:bg-emerald-700 bg-emerald-600 text-white font-black rounded-xl text-xs flex items-center justify-center gap-1.5 shadow cursor-pointer"
                >
                  <QrCode size={14} /> Pindai Kios QR
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-[32px] border-2 border-dashed border-blue-100 bg-white/40 aspect-[1.58/1] flex flex-col items-center justify-center p-6 text-center text-gray-400">
              <FileText size={44} className="text-gray-300 stroke-[1.5] mb-2" />
              <h4 className="font-black text-primary-navy">Kartu Kuning Digital Belum Diterbitkan</h4>
              <p className="text-xs max-w-xs mt-1 font-semibold leading-relaxed">Silakan isi formulir di sebelah kiri (termasuk upload pas foto formal) dan tekan kirim untuk menerbitkan Kartu AK1 Digital Anda secara gratis.</p>
            </div>
          )}

          {/* Education / Guidance Box */}
          <div className="rounded-[32px] border border-blue-100 bg-white p-6 shadow-sm space-y-3">
            <h4 className="text-[10px] font-black text-primary-navy uppercase tracking-[0.2em] flex items-center gap-1.5">
              <HelpCircle className="text-accent-blue" size={14} /> Apa itu Kartu Kuning (AK1)?
            </h4>
            <div className="text-xs text-gray-600 space-y-2 leading-relaxed font-medium">
              <p>
                Kartu AK1 adalah bukti resmi pendaftaran pencari kerja di Indonesia yang diatur oleh <strong>Kementerian Ketenagakerjaan</strong> melalui Pemerintah Kabupaten.
              </p>
              <ul className="list-disc pl-5 space-y-1 font-semibold">
                <li>Mempermudah pemetaan industri menyerap tenaga kerja lokal.</li>
                <li>Menjadi persyaratan mutlak mendaftar di banyak BUMN & pabrik besar Rebana.</li>
                <li>Validitas QR Code di atas dapat dipindai oleh HRD Perusahaan untuk verifikasi instan.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

