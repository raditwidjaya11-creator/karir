import { useState } from "react";
import { MOCK_TRAININGS } from "../data/mockData";
import { TrainingProgram } from "../types";
import { Award, BookOpen, GraduationCap, Play, CheckCircle2, ShieldAlert, Award as CertificationIcon } from "lucide-react";

export default function PelatihanBLK() {
  const [trainings, setTrainings] = useState<TrainingProgram[]>(MOCK_TRAININGS);
  const [selectedTraining, setSelectedTraining] = useState<TrainingProgram>(MOCK_TRAININGS[0]);
  const [activeVideo, setActiveVideo] = useState<any>(MOCK_TRAININGS[0].videoLessons[0]);
  const [enrollments, setEnrollments] = useState<Record<string, "NotEnrolled" | "Enrolled" | "Passed">>({});

  // Mini Quiz simulator states
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleEnroll = (trainId: string) => {
    setEnrollments((prev) => ({ ...prev, [trainId]: "Enrolled" }));
    setQuizSubmitted(false);
    setAnswers({});
  };

  const handleQuizSubmit = (trainId: string) => {
    // 2 hardcoded simple question simulation
    let score = 0;
    if (answers[1] === "correct") score += 50;
    if (answers[2] === "correct") score += 50;

    setQuizScore(score);
    setQuizSubmitted(true);

    if (score >= 100) {
      setEnrollments((prev) => ({ ...prev, [trainId]: "Passed" }));
    }
  };

  const handleDownloadCertificate = (trainTitle: string) => {
    // Open print window layout or trigger simulated download
    window.print();
  };

  const currentEnrollmentStatus = enrollments[selectedTraining.id] || "NotEnrolled";

  return (
    <div className="space-y-6" id="pelatihan-blk-root">
      {/* Overview Block */}
      <div className="rounded-2xl border border-gray-100 bg-white/80 p-5 shadow-sm backdrop-blur-md">
        <h2 className="text-xl font-bold text-gray-900 font-sans">E-Learning & Balai Latihan Kerja (BLK) Majalengka</h2>
        <p className="text-sm text-gray-500 mt-1">
          Tingkatkan standar keahlian Anda melalui program kepelatihan vokasional bersertifikat resmi Disnaker Pemkab Majalengka dan BNSP.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Course catalogs (1 Col) */}
        <div className="lg:col-span-1 space-y-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest flex items-center gap-1.5 leading-none">
              <GraduationCap size={15} className="text-blue-500" /> Katalog Pelatihan BLK Aktif
            </h3>

            <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
              {trainings.map((train) => {
                const isSelected = selectedTraining.id === train.id;
                const status = enrollments[train.id] || "NotEnrolled";

                return (
                  <div
                    key={train.id}
                    onClick={() => {
                      setSelectedTraining(train);
                      setActiveVideo(train.videoLessons[0]);
                      setQuizSubmitted(false);
                      setAnswers({});
                    }}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition ${
                      isSelected ? "border-blue-500 bg-blue-50/20" : "border-gray-200/70 bg-white hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-gray-400 font-bold uppercase">{train.duration}</span>
                      {status === "Enrolled" && <span className="rounded bg-blue-100 px-2 py-0.5 text-[8px] font-bold text-blue-700 uppercase">Belajar</span>}
                      {status === "Passed" && <span className="rounded bg-emerald-100 px-2 py-0.5 text-[8px] font-bold text-emerald-700 uppercase">Lulus</span>}
                    </div>
                    <h4 className="font-bold text-xs text-gray-900 mt-1.5 leading-tight">{train.title}</h4>
                    <p className="text-[10px] text-gray-400 mt-1 truncate">Pengajar: {train.instructor}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: E-Learning player / syllabus / testing (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-start justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-bold text-md text-gray-900">{selectedTraining.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{selectedTraining.description}</p>
              </div>

              {currentEnrollmentStatus === "NotEnrolled" ? (
                <button
                  onClick={() => handleEnroll(selectedTraining.id)}
                  className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 text-xs tracking-wide transition shadow-sm shrink-0"
                >
                  Daftar Pelatihan
                </button>
              ) : (
                <span className="rounded bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-1 text-xs font-bold shrink-0">
                  {currentEnrollmentStatus === "Enrolled" ? "Mengikuti Kelas" : "Selesai & Lulus"}
                </span>
              )}
            </div>

            {/* Video Player (Only when Enrolled or Completed) */}
            {currentEnrollmentStatus !== "NotEnrolled" ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Simulated Player and Screen */}
                <div className="md:col-span-2 space-y-3">
                  <div className="relative aspect-video rounded-xl bg-slate-900 border border-gray-200 flex items-center justify-center overflow-hidden">
                    <video src={activeVideo?.url} controls autoPlay loop muted className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-black/60 rounded px-2 py-0.5 text-[8px] font-mono text-white tracking-wider uppercase">
                      SEDANG DIPUTAR: {activeVideo?.title}
                    </div>
                  </div>
                  <h5 className="font-bold text-xs text-gray-800">{activeVideo?.title} ({activeVideo?.duration})</h5>
                </div>

                {/* Playlist lessons list */}
                <div className="md:col-span-1 rounded-xl bg-gray-50 p-3 border border-gray-100 space-y-2">
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Video Pembelajaran</span>
                  <div className="space-y-1.5 max-h-[140px] overflow-y-auto">
                    {selectedTraining.videoLessons.map((v) => (
                      <div
                        key={v.id}
                        onClick={() => setActiveVideo(v)}
                        className={`p-2 rounded-lg text-left cursor-pointer transition ${
                          activeVideo?.id === v.id ? "bg-white border border-blue-300 font-semibold" : "hover:bg-gray-100 border border-transparent"
                        }`}
                      >
                        <p className="text-[11px] text-gray-800 truncate leading-tight flex items-center gap-1">
                          <Play size={10} className="text-blue-500" /> {v.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50/50 p-8 text-center text-gray-400">
                <BookOpen size={36} className="text-gray-300 stroke-[1.5] mb-1.5 mx-auto" />
                <h4 className="font-bold text-gray-650 text-sm">Akses Video Terkuci</h4>
                <p className="text-xs max-w-sm mt-1 mx-auto">Untuk memulai menonton video pembelajaran dan mengunduh sertifikasi kompetensi industri, silakan tekan tombol "Daftar Pelatihan" di atas.</p>
              </div>
            )}

            {/* Syllabus breakdown */}
            <div className="space-y-2 border-t border-gray-100 pt-3">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Kurikulum Pembelajaran:</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {selectedTraining.syllabus.map((syl, i) => (
                  <div key={i} className="flex gap-2 items-start text-xs text-gray-600">
                    <CheckCircle2 size={13} className="text-blue-500 shrink-0 mt-0.5" />
                    <span>{syl}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quiz panel & Credential distribution (Only when Enrolled or Completed) */}
          {currentEnrollmentStatus !== "NotEnrolled" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Mini Quiz testing panel */}
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-3 text-xs">
                <div className="border-b border-gray-100 pb-2 flex items-center justify-between">
                  <h4 className="font-bold text-gray-800">Ujian Teori Singkat (Quiz)</h4>
                  <span className="text-[10px] text-amber-600 font-bold uppercase">Syarat Kelulusan</span>
                </div>

                {!quizSubmitted ? (
                  <div className="space-y-4">
                    {/* Q1 */}
                    <div className="space-y-1.5">
                      <p className="font-semibold text-gray-700">1. Apa langkah pertama penanganan keselamatan kerja listrik di area industri?</p>
                      <div className="space-y-1 pl-2">
                        <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-600">
                          <input type="radio" name="q1" value="wrong" onChange={() => setAnswers({ ...answers, 1: "wrong" })} /> Menyiram air secara masal
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-600">
                          <input type="radio" name="q1" value="correct" onChange={() => setAnswers({ ...answers, 1: "correct" })} /> Mematikan sirkuit pemutus daya (MCB utama)
                        </label>
                      </div>
                    </div>

                    {/* Q2 */}
                    <div className="space-y-1.5">
                      <p className="font-semibold text-gray-700">2. Mengapa kebersihan area produksi berpola 5S sangat ditekankan pabrik modern?</p>
                      <div className="space-y-1 pl-2">
                        <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-600">
                          <input type="radio" name="q2" value="correct" onChange={() => setAnswers({ ...answers, 2: "correct" })} /> Mengurangi kerugian material serta menekan angka kecelakaan kerja
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-600">
                          <input type="radio" name="q2" value="wrong" onChange={() => setAnswers({ ...answers, 2: "wrong" })} /> Supaya dinilai ganteng oleh pembeli asing
                        </label>
                      </div>
                    </div>

                    <button
                      onClick={() => handleQuizSubmit(selectedTraining.id)}
                      disabled={!answers[1] || !answers[2]}
                      className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold py-2.5 text-white shadow-sm disabled:opacity-50"
                    >
                      Kirim Jawaban Ujian
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3.5 text-center py-4">
                    {quizScore >= 100 ? (
                      <div className="space-y-1 flex flex-col items-center">
                        <CheckCircle2 size={36} className="text-emerald-500 mb-1" />
                        <h5 className="font-bold text-gray-900 text-sm">Selamat! Nilai Anda: {quizScore}/100</h5>
                        <p className="text-gray-500 text-[11px]">Anda dinyatakan LULUS sertifikasi lokal BLK secara istimewa.</p>
                      </div>
                    ) : (
                      <div className="space-y-1.5 flex flex-col items-center">
                        <ShieldAlert size={36} className="text-red-500 mb-1" />
                        <h5 className="font-bold text-gray-900 text-sm">Ujian Gagal! Nilai: {quizScore}/100</h5>
                        <p className="text-gray-500 text-[11px]">Anda membutuhkan nilai 100 untuk lulus kelas ini.</p>
                        <button
                          onClick={() => setQuizSubmitted(false)}
                          className="rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 font-bold mt-1"
                        >
                          Coba Lagi
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Certificate printable generator component layout */}
              {currentEnrollmentStatus === "Passed" ? (
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/20 p-5 shadow-sm space-y-4 animate-scaleUp text-center">
                  <CertificationIcon size={34} className="text-emerald-600 mx-auto" />
                  <div className="space-y-1">
                    <h4 className="font-bold text-gray-900 text-sm">Sertifikat Kelulusan Terbit</h4>
                    <p className="text-[10px] text-gray-500 leading-normal">Kredensial kelulusan digital atas nama Radit Widjaya telah terikat dengan QR Code Disnaker.</p>
                  </div>

                  {/* Certified badge template */}
                  <div className="border border-emerald-200/50 bg-white rounded-xl p-3 flex items-center justify-between">
                    <div className="text-left">
                      <span className="text-[8px] font-mono text-gray-450 uppercase font-bold tracking-widest block">VALIDATION ID</span>
                      <strong className="text-[10px] text-gray-800 font-mono">BLK-MJ-2026-GTAW91</strong>
                    </div>
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=CERTIFIED-WELDING-RADIT`} alt="Certified QR" className="h-[44px] w-[44px]" />
                  </div>

                  <button
                    onClick={() => handleDownloadCertificate(selectedTraining.title)}
                    className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 text-xs flex items-center justify-center gap-1.5 shadow"
                  >
                    Cetak Sertifikat Kelulusan
                  </button>
                </div>
              ) : (
                <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-6 text-center text-gray-400 h-full flex flex-col items-center justify-center">
                  <Award size={34} className="text-gray-300 stroke-[1.5] mb-1.5" />
                  <h5 className="font-semibold text-gray-600 text-xs">E-Sertifikat Terkunci</h5>
                  <p className="text-[10px] max-w-xs mt-1">Sertifikat berstandar BNSP akan terbit secara dinamis pasca Anda melesaikan seluruh rentetan video dan lulus Ujian Teori Teori Singkat.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
