import React, { useState } from "react";
import { MOCK_COMPLAINTS } from "../data/mockData";
import { ComplaintTicket } from "../types";
import { FileWarning, Send, MessageSquare, ShieldCheck, HelpCircle, ArrowRight } from "lucide-react";

export default function PengaduanKetenagakerjaan() {
  const [complaints, setComplaints] = useState<ComplaintTicket[]>(MOCK_COMPLAINTS);
  const [activeComplaint, setActiveComplaint] = useState<ComplaintTicket | null>(MOCK_COMPLAINTS[0]);

  // Submit states
  const [category, setCategory] = useState<ComplaintTicket["category"]>("Gaji Tidak Dibayar");
  const [companyName, setCompanyName] = useState("");
  const [reporterName, setReporterName] = useState("Radit Widjaya");
  const [description, setDescription] = useState("");

  // Chat simulator state
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<any[]>([
    { id: 1, sender: "Mediator Disnaker", text: "Selamat pagi rekan-rekan. Mediasi persidangan sengketa ketenagakerjaan resmi dibuka. Pihak Pelapor silakan sampaikan rincian klaim pesangon.", time: "10:02" },
    { id: 2, sender: "Perwakilan HRD PT Global", text: "Selamat pagi pak Mediator. Pihak perusahaan sebetulnya bersedia namun kami memohon keringanan termin pembayaran sebanyak 3 kali angsuran.", time: "10:04" }
  ]);

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !description.trim()) return;

    const newTicket: ComplaintTicket = {
      id: `ticket_${Date.now()}`,
      trackingNumber: `DISNAKER-COMP-${Math.floor(100 + Math.random() * 899)}-2026`,
      category,
      reporterName,
      reporterNik: "3210121508980004", // Dummy seeker NIK
      companyName,
      description,
      createdAt: new Date().toISOString().split("T")[0],
      status: "Masuk"
    };

    setComplaints([newTicket, ...complaints]);
    setActiveComplaint(newTicket);
    setCompanyName("");
    setDescription("");
  };

  const handleSendMockMediationMsg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { id: Date.now(), sender: "Radit Widjaya (Pelapor)", text: chatInput, time: "10:06" };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");

    // Simulate instant response from mediator as automatic agent
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "Mediator Disnaker",
          text: "Terima kasih responnya pelapor. Bagaimana dari perwakilan perusahaan? Apakah ada tanggapan mengenai keberatan cicilan pesangon tersebut?",
          time: "10:07"
        }
      ]);
    }, 1200);
  };

  return (
    <div className="space-y-6" id="pengaduan-view">
      {/* Upper informational bar */}
      <div className="rounded-[40px] bg-gradient-to-tr from-[#1A365D] via-red-600 to-amber-600 p-8 text-white shadow-lg flex items-center justify-between">
        <div className="space-y-1">
          <span className="rounded-full bg-white/20 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-widest">
            PORTAL ADVOKASI DISNAKER
          </span>
          <h2 className="text-2xl font-black font-sans mt-3">Layanan Pengaduan & Hubungan Industrial</h2>
          <p className="text-red-100 text-xs mt-1.5 font-semibold">
            Laporkan masalah ketenagakerjaan, upah di bawah UMK, pemotongan sepihak, atau perselisihan perusahaan secara damai terverifikasi hukum.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Submit New & Ticket lists */}
        <div className="space-y-4 lg:col-span-1">
          {/* Submit form */}
          <div className="rounded-[32px] border border-blue-100 bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-[10px] font-black text-primary-navy uppercase tracking-[0.2em] flex items-center gap-1.5 leading-none">
              <FileWarning size={14} className="text-red-500" /> Buat Pengaduan Baru
            </h3>

            <form onSubmit={handleSubmitComplaint} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-gray-650 uppercase tracking-wider text-[10px]">Kategori Pelanggaran</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full rounded-xl border border-blue-100 p-2.5 bg-white text-gray-800"
                >
                  <option>Gaji Tidak Dibayar</option>
                  <option>BPJS Tidak Aktif</option>
                  <option>PHK Sepihak</option>
                  <option>Kecelakaan Kerja</option>
                  <option>Diskriminasi</option>
                  <option>Pelecehan Kerja</option>
                  <option>Penipuan Lowongan</option>
                  <option>Perselisihan Hubungan Industrial</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-650 uppercase tracking-wider text-[10px]">Nama Perusahaan Terlapor</label>
                <input
                  type="text"
                  placeholder="Misal: PT Aneka Garment Ligung"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full rounded-xl border border-blue-100 p-2.5 text-sm focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-650 uppercase tracking-wider text-[10px]">Kronologi Singkat Kejadian</label>
                <textarea
                  placeholder="Jelaskan secara jelas duduk perkara perselisihan..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full rounded-xl border border-blue-100 p-2.5 text-sm focus:outline-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                id="complaint-submit"
                className="w-full rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold py-3 text-xs transition shadow-md"
              >
                Kirim Pengaduan & Ambil Tiket
              </button>
            </form>
          </div>

          {/* List of active Tickets */}
          <div className="rounded-[32px] border border-blue-100 bg-white p-6 shadow-sm space-y-4">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">
              Daftar Tiket Pengaduan Anda
            </h4>

            <div className="space-y-2.5 max-h-[250px] overflow-y-auto pr-1">
              {complaints.map((c) => {
                const isActive = activeComplaint?.id === c.id;
                const statusColors = 
                  c.status === "Masuk" ? "bg-gray-100 text-gray-700" :
                  c.status === "Mediasi" ? "bg-amber-50 text-amber-700 border-amber-200" :
                  c.status === "Selesai" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                  "bg-blue-50 text-blue-700 border-blue-200";

                return (
                  <div
                    key={c.id}
                    onClick={() => setActiveComplaint(c)}
                    className={`p-4 rounded-2xl border text-left cursor-pointer transition ${
                      isActive ? "border-red-500 bg-red-50/20" : "border-blue-50 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-gray-400">{c.trackingNumber}</span>
                      <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider ${statusColors}`}>
                        {c.status}
                      </span>
                    </div>
                    <h5 className="font-bold text-xs text-primary-navy mt-1 truncate">{c.companyName}</h5>
                    <p className="text-[10px] text-gray-450 mt-1 truncate">{c.category}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Columns: Active Ticket Details & Mediation Chamber Simulation (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          {activeComplaint ? (
            <div className="space-y-4 animate-fadeIn">
              {/* Ticket Summary */}
              <div className="rounded-[32px] border border-blue-100 bg-white p-6 shadow-sm space-y-4">
                <div className="flex items-start justify-between border-b border-blue-50 pb-3">
                  <div>
                    <span className="text-[9px] font-black tracking-wider text-gray-450 uppercase">DETAIL ADUAN AKTIF • {activeComplaint.trackingNumber}</span>
                    <h4 className="text-lg font-black text-primary-navy mt-1">Perselisihan: {activeComplaint.companyName}</h4>
                  </div>
                  <span className="rounded-xl bg-red-50 text-red-700 border border-red-100 px-3.5 py-1.5 text-xs font-black">
                    {activeComplaint.category}
                  </span>
                </div>

                <div className="text-xs space-y-2">
                  <p className="text-gray-600 italic font-semibold leading-relaxed">
                    " {activeComplaint.description} "
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-[11px] text-gray-500 border-t border-gray-50 pt-2 font-bold">
                    <span>Pelapor: <strong className="text-primary-navy">{activeComplaint.reporterName}</strong></span>
                    <span>Tgl Pengajuan: <strong className="text-primary-navy">{activeComplaint.createdAt}</strong></span>
                  </div>
                </div>
              </div>

              {/* Online Mediation simulated room (Only if status is "Mediasi") */}
              {activeComplaint.status === "Mediasi" ? (
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-3">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></div>
                      <h4 className="font-bold text-gray-800 text-xs uppercase tracking-widest">Ruang Sidang Mediasasi Online</h4>
                    </div>
                    <span className="text-[11px] text-gray-400">Jadwal: {activeComplaint.mediationSchedule}</span>
                  </div>

                  {/* Chat logs feed */}
                  <div className="h-44 overflow-y-auto bg-gray-50 rounded-xl p-3 space-y-3.5 border border-gray-200/50">
                    {chatMessages.map((msg) => {
                      const isMe = msg.sender.includes("Pelapor");
                      return (
                        <div key={msg.id} className={`flex flex-col ${isMe ? "items-end text-right" : "items-start"}`}>
                          <span className="text-[10px] font-bold text-gray-400">{msg.sender}</span>
                          <div className={`mt-1 p-2 rounded-lg text-xs leading-relaxed max-w-[85%] ${
                            isMe ? "bg-blue-600 text-white rounded-tr-none" : "bg-white border border-gray-200 text-gray-800 rounded-tl-none"
                          }`}>
                            <p>{msg.text}</p>
                          </div>
                          <span className="text-[9px] text-gray-400 mt-0.5">{msg.time}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Messaging input block */}
                  <form onSubmit={handleSendMockMediationMsg} className="flex gap-2 text-xs">
                    <input
                      type="text"
                      placeholder="Masukkan pernyataan argumentasi tertulis Anda..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      className="flex-1 rounded-xl border border-gray-200 p-2.5 outline-none bg-gray-50 focus:bg-white"
                    />
                    <button
                      type="submit"
                      className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 font-bold flex items-center justify-center.5 gap-1 shadow-sm"
                    >
                      <Send size={14} /> Send
                    </button>
                  </form>
                </div>
              ) : (
                <div className="rounded-2xl border border-gray-50 bg-gray-50 p-6 flex flex-col items-center justify-center text-center text-gray-400">
                  <ShieldCheck size={36} className="text-gray-300 stroke-[1.5] mb-2" />
                  <h4 className="font-semibold text-gray-600">Menunggu Tahap Mediasi</h4>
                  <p className="text-xs max-w-xs mt-1">
                    Tiket pengaduan Anda saat ini berada dalam posisi <strong>{activeComplaint.status}</strong>. Sidang Mediasi Digital akan dijadwalkan setelah dokumen bukti perkara lolos verifikasi berkas oleh Disnaker.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="h-[300px] rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center text-center text-gray-400">
              <MessageSquare size={44} className="text-gray-300 mb-1" />
              <p className="text-xs">Pilih salah satu tiket di sebelah kiri untuk melihat rincian progres advokasi Disnaker.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
