import React, { useState } from "react";
import { MOCK_JOB_FAIR } from "../data/mockData";
import { Calendar, MapPin, Building, Users, Play, MessageSquare, Award, QrCode } from "lucide-react";

export default function JobFairDigital() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [selectedStand, setSelectedStand] = useState<any>(MOCK_JOB_FAIR.stands[0]);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<any[]>([
    { id: 1, sender: "Recruiter PT Shoetown", text: "Halo! Selamat bergabung di booth PT Shoetown. Silakan tanyakan perihal program pengembangan karir atau jenjang kesejahteraan kami.", time: "11:21" }
  ]);

  const handleRegisterEvent = () => {
    setIsRegistered(true);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { id: Date.now(), sender: "Radit Widjaya (Peserta)", text: chatInput, time: "11:24" };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");

    // Recruiter automatic immediate reply simulator
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "Recruiter PT Shoetown",
          text: "Untuk posisi Operator Produksi, proses rekrutmen akan memakan waktu kurang lebih 3 hari kerja sejak pengumpulan CV digital Anda melalui modul Pencari Kerja di aplikasi ini. Silakan lampirkan sertifikat pendukung ya!",
          time: "11:25"
        }
      ]);
    }, 1200);
  };

  return (
    <div className="space-y-6" id="job-fair-root">
      {/* Event Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-700 p-6 text-white shadow-md">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white/10 blur-2xl"></div>
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="rounded bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
              ONLINE VIRTUAL EXPO
            </span>
            <h2 className="text-xl md:text-2xl font-bold font-sans">{MOCK_JOB_FAIR.title}</h2>
            <div className="flex flex-wrap gap-4 text-xs text-blue-50 mt-1">
              <span className="flex items-center gap-1"><Calendar size={12} /> {MOCK_JOB_FAIR.date}</span>
              <span className="flex items-center gap-1"><MapPin size={12} /> {MOCK_JOB_FAIR.location}</span>
            </div>
          </div>

          {!isRegistered ? (
            <button
              onClick={handleRegisterEvent}
              id="register-jf"
              className="rounded-xl bg-white hover:bg-sky-50 text-blue-600 font-bold px-5 py-2.5 text-xs tracking-wider transition shadow-lg shrink-0"
            >
              Daftar Event Online
            </button>
          ) : (
            <span className="rounded-xl bg-emerald-500/80 px-4 py-2.5 text-xs font-bold flex items-center gap-1.5 shadow-md">
              <Award size={14} /> Terdaftar Resmi (E-Badge Aktif)
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Columns: Showcase Virtual Booths / Stands (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h3 className="text-md font-bold text-gray-800 flex items-center gap-1.5">
                <Building size={16} className="text-blue-500" /> Lorong Virtual Korporasi (Virtual Stands)
              </h3>
              <span className="text-xs text-gray-400 font-semibold">{MOCK_JOB_FAIR.stands.length} Industri Unggulan</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_JOB_FAIR.stands.map((st, idx) => {
                const isSelected = selectedStand?.companyName === st.companyName;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedStand(st)}
                    className={`rounded-2xl border p-4 text-left cursor-pointer transition-all flex flex-col justify-between h-48 bg-white hover:shadow-md ${
                      isSelected ? "border-blue-500 ring-2 ring-blue-500/20" : "border-gray-200/70"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <img src={st.logo} alt={st.companyName} className="h-10 w-10 rounded-lg object-cover bg-gray-50 border border-gray-200" />
                      <div>
                        <h4 className="font-bold text-xs truncate max-w-[150px] leading-tight text-gray-800">{st.companyName}</h4>
                        <p className="text-[10px] text-gray-450 mt-1 flex items-center gap-1">
                          <span className={`h-2 w-2 rounded-full ${st.isOnline ? "bg-emerald-500 animate-ping" : "bg-gray-300"}`}></span>
                          {st.isOnline ? "HRD Stand Online" : "Booth Offline Stand"}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] text-gray-500">Recruiter: <strong>{st.hrName}</strong></p>
                      <button className="w-full rounded-lg bg-gray-50 border border-gray-200 hover:border-blue-300 py-2 text-[11px] font-bold text-blue-600 flex items-center justify-center gap-1">
                        <Play size={10} /> Eksplor Booth Virtual
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Current stand promotional video & presentation */}
          {selectedStand && (
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h4 className="font-bold text-xs text-gray-400 uppercase tracking-wider">Video Profil Coroporate • {selectedStand.companyName}</h4>
                <span className="rounded bg-blue-50 text-blue-600 font-bold px-2.5 py-0.5 text-[10px] uppercase">
                  Active Promo Stream
                </span>
              </div>

              {/* simulated direct video feed */}
              <div className="relative aspect-video rounded-xl bg-slate-900 overflow-hidden border border-gray-200 flex items-center justify-center">
                <video src={selectedStand.videoUrl} autoPlay loop muted controls className="w-full h-full object-cover"></video>
                <div className="absolute top-3 left-3 bg-black/60 rounded-md py-1 px-2 text-[9px] text-white font-mono tracking-widest uppercase">
                  SIMULASI PREVIEW PROMO
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: HR Live Chat & Participant E-Badge Certification (1 Col) */}
        <div className="space-y-4">
          {/* Virtual HR Live text box */}
          {selectedStand && (
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-3">
              <div className="border-b border-gray-100 pb-2 flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tanya Jawab HR ({selectedStand.companyName})</span>
                <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-semibold"><span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Online</span>
              </div>

              {/* Chat window */}
              <div className="h-44 bg-gray-50 rounded-xl p-3 overflow-y-auto space-y-3.5 border border-gray-200/50">
                {chatMessages.map((m) => {
                  const isMe = m.sender.includes("Peserta");
                  return (
                    <div key={m.id} className={`flex flex-col ${isMe ? "items-end text-right" : "items-start"}`}>
                      <span className="text-[9px] text-gray-400 font-bold">{m.sender}</span>
                      <div className={`mt-0.5 p-2 rounded-lg text-xs leading-normal max-w-[85%] ${
                        isMe ? "bg-blue-600 text-white rounded-tr-none" : "bg-white border border-gray-250 text-gray-800 rounded-tl-none"
                      }`}>
                        {m.text}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chat submission */}
              <form onSubmit={handleSendChat} className="flex gap-1.5 text-xs">
                <input
                  type="text"
                  placeholder="Ketik pertanyaan untuk HRD..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 rounded-lg border border-gray-200 p-2 outline-none"
                />
                <button type="submit" className="rounded-lg bg-blue-600 text-white px-3 font-semibold hover:bg-blue-700">
                  Kirim
                </button>
              </form>
            </div>
          )}

          {/* Attendee digital E-badge card */}
          {isRegistered ? (
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-4 text-center animate-scaleUp">
              <span className="text-[10px] font-mono text-gray-400 uppercase font-bold tracking-widest block">Kartu Pendatang / E-Badge</span>
              <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-sky-100 border border-indigo-100 flex flex-col items-center">
                <div className="bg-white p-2 rounded-lg border border-indigo-200 shadow-sm">
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=VERIFIED-ATTENDEE-Radit-JobFair2026`} alt="Attendee QR" className="h-[120px] w-[120px]" />
                </div>
                <h4 className="text-xs font-bold text-gray-900 uppercase mt-3">RADIT WIDJAYA</h4>
                <p className="text-[10px] font-mono font-bold text-indigo-700">PASSPORT-ID: MJ-JF-941</p>
                <span className="mt-3 inline-block rounded bg-indigo-700 text-white px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-wider">
                  GOLDEN TICKET EXPO
                </span>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-250 p-6 text-center text-gray-400 bg-gray-50 min-h-[160px] flex flex-col items-center justify-center">
              <QrCode size={34} className="text-gray-300 mb-1" />
              <p className="text-xs">Daftarkan diri Anda untuk menyusun E-Badge QR khusus peserta guna validasi stand fisik.</p>
            </div>
          )}

          {/* QR Scanner Shortcut widget */}
          <div className="rounded-2xl border border-blue-50 bg-emerald-50/15 p-4 space-y-2.5">
            <h4 className="text-[10px] font-black text-slate-950 uppercase tracking-wider flex items-center gap-1.5 leading-none">
              <QrCode size={13} className="text-emerald-600 animate-pulse" /> Check-In Mandiri Kios
            </h4>
            <p className="text-[10px] text-gray-500 font-semibold leading-relaxed">
              Sedang berdiri di depan Kios Mandiri atau di booth pameran fisik? Buka scanner untuk check-in kehadiran instan.
            </p>
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent("change-tab", { detail: "qr_scanner" }));
              }}
              className="w-full py-2 bg-[#1A365D] hover:bg-[#1A365D]/90 text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition shadow flex items-center justify-center gap-1.5 cursor-pointer"
            >
              Buka Pemindai QR
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
