import React, { useState, useRef, useEffect } from "react";
import { 
  QrCode, 
  Camera, 
  CheckCircle2, 
  XCircle, 
  UploadCloud, 
  AlertCircle, 
  Calendar, 
  Building2, 
  Smartphone, 
  Sparkles, 
  RefreshCw, 
  FileCheck2,
  ListFilter,
  User,
  MapPin,
  Clock,
  Volume2,
  VolumeX,
  Plus
} from "lucide-react";

interface ScanLog {
  id: string;
  timestamp: string;
  type: "AK1" | "JOB_FAIR" | "BOOTH";
  title: string;
  subtitle: string;
  status: "success" | "warning" | "error";
  details: string;
}

export default function QRCodeScanner() {
  const [activeMode, setActiveMode] = useState<"camera" | "upload">("camera");
  const [isScanning, setIsScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState<any | null>(null);
  const [hasSound, setHasSound] = useState(true);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [scanHistory, setScanHistory] = useState<ScanLog[]>([
    {
      id: "log_1",
      timestamp: "18:25:01",
      type: "JOB_FAIR",
      title: "Kertajati Job Fair 2026",
      subtitle: "Check-in Kios Utama",
      status: "success",
      details: "Kehadiran fisik terkonfirmasi. Nomor Antrean: #KF-0412"
    },
    {
      id: "log_2",
      timestamp: "18:10:44",
      type: "AK1",
      title: "Kartu AK1 - Radit Widjaya",
      subtitle: "Verifikasi Disnaker",
      status: "success",
      details: "NIK: 3210121508980004 • Jurusan: Listrik • Status: AKTIF"
    }
  ]);

  const [dragActive, setDragActive] = useState(false);
  const [analyzingFile, setAnalyzingFile] = useState(false);

  // References
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Synthesize a clean mechanical sci-fi success beep
  const playSuccessBeep = () => {
    if (!hasSound) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      // Double beep
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(880, ctx.currentTime); // A5 note
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(1320, ctx.currentTime); // E6 note (harmonized fifth)

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.15);
      osc2.stop(ctx.currentTime + 0.15);
    } catch (e) {
      console.warn("Audio Context blocked or unsupported:", e);
    }
  };

  // Synthesize an error buzz
  const playErrorBuzz = () => {
    if (!hasSound) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(150, ctx.currentTime); 
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {
      console.warn("Audio Context blocked:", e);
    }
  };

  // Turn on actual webcam with sandbox fallback
  const startRealWebcam = async () => {
    setCameraError(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment", width: { ideal: 640 }, height: { ideal: 480 } }
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsCameraActive(true);
        }
      } else {
        throw new Error("Webcan API not supported in this frame environment.");
      }
    } catch (err: any) {
      console.warn("Could not access camera, falling back to simulator:", err);
      setCameraError("Izin kamera ditolak atau tidak didukung di window ini. Menggunakan Modul Simulator Kios Ketenagakerjaan.");
      setIsCameraActive(false);
    }
  };

  const stopRealWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  useEffect(() => {
    if (activeMode === "camera") {
      startRealWebcam();
    } else {
      stopRealWebcam();
    }
    return () => {
      stopRealWebcam();
    };
  }, [activeMode]);

  // Preset triggers for simulation
  const PRESETS = [
    {
      id: "preset_ak1_radit",
      label: "Kios: Validasi AK1 Radit Widjaya",
      icon: <User size={13} />,
      qrcode: "VERIFIED-AK1-Radit-3210121508980004",
      type: "AK1",
      data: {
        fullname: "Radit Widjaya",
        nik: "3210121508980004",
        education: "SMK (Sederajat)",
        major: "Teknik Instalasi Tenaga Listrik",
        subdistrict: "Jatiwangi",
        status: "AKTIF / VALID",
        issuedDate: "06 Juni 2026",
        expiryDate: "06 Juni 2028"
      }
    },
    {
      id: "preset_ak1_siti",
      label: "Kios: Validasi AK1 Siti Nurjanah",
      icon: <User size={13} />,
      qrcode: "VERIFIED-AK1-Siti-3210145210990001",
      type: "AK1",
      data: {
        fullname: "Siti Nurjanah",
        nik: "3210145210990001",
        education: "SMK Tatabusana",
        major: "Garmen & Tata Busana",
        subdistrict: "Ligung",
        status: "AKTIF / VALID",
        issuedDate: "02 Mei 2026",
        expiryDate: "02 Mei 2028"
      }
    },
    {
      id: "preset_jf_kertajati",
      label: "Kios: Check-In Kertajati Job Fair",
      icon: <Calendar size={13} />,
      qrcode: "JOB-FAIR-CHECKIN-KERTAJATI-2026",
      type: "JOB_FAIR",
      data: {
        eventName: "Majalengka Kertajati Aero-Job Fair 2026",
        location: "BIJB Airport Hall Utama, Kertajati",
        date: "08-10 Juni 2026",
        badgeTier: "VIP PASS EXPO",
        attendanceCode: "MJ-JF-KF-0412"
      }
    },
    {
      id: "preset_jf_jatiwangi",
      label: "Kios: Check-In Jatiwangi Expo",
      icon: <Calendar size={13} />,
      qrcode: "JOB-FAIR-CHECKIN-JATIWANGI-2026",
      type: "JOB_FAIR",
      data: {
        eventName: "Jatiwangi Industrial Heritage Expo 2026",
        location: "Kawasan Alun-alun Jatiwangi, Majalengka",
        date: "25 Juni 2026",
        badgeTier: "UMUM PASS",
        attendanceCode: "MJ-JF-JW-9912"
      }
    },
    {
      id: "preset_booth_shoetown",
      label: "Kios Booth: PT Shoetown Ligung",
      icon: <Building2 size={13} />,
      qrcode: "BOOTH-PT-SHOETOWN",
      type: "BOOTH",
      data: {
        companyName: "PT Shoetown Ligung Indonesia",
        sector: "Manufaktur Alas Kaki Ekspor",
        location: "Ligung, Majalengka",
        availableOpenings: "3 Posisi Aktif",
        recruiterOffline: "Siska Wardani (HR Supervisor)"
      }
    },
    {
      id: "preset_fake_qr",
      label: "Kios: Scan QR Tidak Terdaftar",
      icon: <AlertCircle size={13} />,
      qrcode: "FAKE-EXPIRED-CODE-9992",
      type: "ERROR",
      data: {
        errorReason: "Token kedaluwarsa atau tandatangan digital Pemkab tidak sah."
      }
    }
  ];

  // Perform Simulated Scanning
  const handleSimulateScan = (preset: any) => {
    setIsScanning(true);
    setScannedResult(null);

    // Simulate scanning delay
    setTimeout(() => {
      setIsScanning(false);
      const now = new Date();
      const timeStr = now.toTimeString().split(" ")[0];

      if (preset.type === "ERROR") {
        playErrorBuzz();
        const failPayload = {
          type: "ERROR",
          title: "Gagal Memvalidasi QR",
          reason: preset.data.errorReason,
          rawCode: preset.qrcode
        };
        setScannedResult(failPayload);

        // Add to history
        const newLog: ScanLog = {
          id: `log_${Date.now()}`,
          timestamp: timeStr,
          type: "JOB_FAIR",
          title: "Validasi Gagal",
          subtitle: "Token Tidak Terdaftar",
          status: "error",
          details: preset.data.errorReason
        };
        setScanHistory(prev => [newLog, ...prev]);
      } else {
        playSuccessBeep();
        setScannedResult({
          type: preset.type,
          rawCode: preset.qrcode,
          ...preset.data
        });

        // Add to persistent logs
        let newLog: ScanLog;
        if (preset.type === "AK1") {
          newLog = {
            id: `log_${Date.now()}`,
            timestamp: timeStr,
            type: "AK1",
            title: `AK1: ${preset.data.fullname}`,
            subtitle: "Berhasil Diverifikasi",
            status: "success",
            details: `NIK: ${preset.data.nik} • Kec. ${preset.data.subdistrict} • ${preset.data.status}`
          };
        } else if (preset.type === "JOB_FAIR") {
          newLog = {
            id: `log_${Date.now()}`,
            timestamp: timeStr,
            type: "JOB_FAIR",
            title: preset.data.eventName,
            subtitle: "Check-in Berhasil",
            status: "success",
            details: `Kios Check-In • Tiket: ${preset.data.attendanceCode} (${preset.data.badgeTier})`
          };
        } else {
          newLog = {
            id: `log_${Date.now()}`,
            timestamp: timeStr,
            type: "BOOTH",
            title: preset.data.companyName,
            subtitle: "Kunjungan Booth",
            status: "success",
            details: `Booth check-in selesai • Kontak: ${preset.data.recruiterOffline}`
          };
        }

        setScanHistory(prev => [newLog, ...prev]);
      }
    }, 1500);
  };

  // Drag and drop scanning simulator
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processUploadedFile(e.target.files[0]);
    }
  };

  const processUploadedFile = (file: File) => {
    setAnalyzingFile(true);
    setScannedResult(null);

    // Dynamic heuristic scan simulator based on file name or type
    setTimeout(() => {
      setAnalyzingFile(false);
      const nameLower = file.name.toLowerCase();

      let matchedPreset = PRESETS[0]; // default to Radit's AK1
      if (nameLower.includes("job") || nameLower.includes("fair") || nameLower.includes("kiosk")) {
        matchedPreset = PRESETS[2]; // Job Fair Kertajati
      } else if (nameLower.includes("shoetown") || nameLower.includes("booth")) {
        matchedPreset = PRESETS[4]; // PT Shoetown
      } else if (nameLower.includes("palsu") || nameLower.includes("fake") || nameLower.includes("error")) {
        matchedPreset = PRESETS[5]; // Fake QR
      }

      handleSimulateScan(matchedPreset);
    }, 1200);
  };

  return (
    <div className="space-y-6" id="qr-scanner-module-root">
      {/* Banner / Overview Header */}
      <div className="rounded-[32px] border border-blue-100 bg-gradient-to-r from-slate-900 via-[#1A365D] to-indigo-900 p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 h-32 w-32 bg-white/5 rounded-full blur-xl"></div>
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2 max-w-xl">
            <span className="bg-blue-500/25 border border-blue-400/30 rounded-full px-3 py-1 text-[10px] uppercase font-black tracking-widest text-sky-400 inline-flex items-center gap-1.5 shadow-sm">
              <QrCode size={12} className="animate-pulse" /> TERINTEGRASI KIOS REBANA
            </span>
            <h2 className="text-xl md:text-2xl font-black font-sans tracking-tight">
              Sistem Pemindai QR & Check-In Mandiri
            </h2>
            <p className="text-xs text-sky-100/80 font-medium leading-relaxed">
              Scan QR Code pada Kios Pameran Fisik untuk kehadiran instan, verifikasi keakuratan Kartu Kuning AK1 Digital oleh HRD Perusahaan, atau drop berkas di booth booth virtual.
            </p>
          </div>
          <button 
            onClick={() => setHasSound(!hasSound)} 
            className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition text-white flex items-center justify-center border border-white/10 cursor-pointer"
            title={hasSound ? "Nonaktifkan Suara Beep" : "Aktifkan Suara Beep"}
          >
            {hasSound ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Scanner Viewport Console (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          <div className="rounded-[32px] border border-blue-50 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-black text-slate-900 flex items-center gap-2 text-sm uppercase tracking-wider">
                <Camera size={16} className="text-blue-600" />
                Viewport Scanner Kios
              </h3>
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveMode("camera")}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition cursor-pointer ${
                    activeMode === "camera" 
                      ? "bg-slate-900 text-white shadow-sm" 
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Kamera Aktif
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMode("upload")}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition cursor-pointer ${
                    activeMode === "upload" 
                      ? "bg-slate-900 text-white shadow-sm" 
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Upload Gambar
                </button>
              </div>
            </div>

            {activeMode === "camera" ? (
              <div className="space-y-4">
                {/* Simulated/Real Video Frame viewport container */}
                <div className="relative aspect-video rounded-3xl bg-slate-950 overflow-hidden border-2 border-slate-900 flex flex-col items-center justify-center text-slate-300">
                  
                  {isCameraActive ? (
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline 
                      className="w-full h-full object-cover opacity-90 scale-x-[-1]"
                    />
                  ) : (
                    /* High fidelity UI Simulation graphic placeholder when camera fallback is on */
                    <div className="absolute inset-0 bg-radial-gradient-tech flex flex-col items-center justify-center p-6 text-center space-y-3">
                      <div className="relative">
                        <QrCode size={48} className="text-blue-500 animate-pulse" />
                        <span className="absolute -top-1 -right-1 h-3 w-3 bg-emerald-500 rounded-full animate-ping"></span>
                      </div>
                      <span className="text-[10px] font-mono bg-blue-900/40 text-blue-400 px-3 py-1 rounded-full border border-blue-800/40 font-bold uppercase tracking-widest">
                        FEED STREAM SIMULATOR
                      </span>
                      <p className="text-[11px] text-slate-450 max-w-sm font-semibold">
                        Kamera web internal disimulasikan. Silakan pilih salah satu tombol <strong className="text-white">Preset Kios</strong> di bawah untuk mensimulasikan pemindaian fisik.
                      </p>
                    </div>
                  )}

                  {/* Tech Scanning Reticle Overlay */}
                  <div className="absolute inset-0 pointer-events-none border-[16px] border-black/40 flex items-center justify-center">
                    {/* Glowing Reticle frame */}
                    <div className="relative w-44 h-44 md:w-56 md:h-56 border-2 border-white/25 rounded-2xl flex items-center justify-center">
                      {/* Laser Bar animation */}
                      <div className="absolute w-full h-[3px] bg-red-500 shadow-[0_0_12px_#ef4444] rounded animate-laserTopBottom"></div>
                      
                      {/* Corner bracket highlighters */}
                      <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-blue-500 rounded-tl-lg"></div>
                      <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-blue-500 rounded-tr-lg"></div>
                      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-blue-500 rounded-bl-lg"></div>
                      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-blue-500 rounded-br-lg"></div>

                      {isScanning && (
                        <div className="absolute inset-0 bg-blue-600/10 backdrop-blur-[1px] rounded-2xl flex items-center justify-center">
                          <div className="text-center font-bold text-xs uppercase tracking-wider text-blue-400">
                            <RefreshCw className="animate-spin mx-auto mb-1 text-blue-400" size={18} />
                            Membaca Token...
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Indicator info text in viewport bottom bar */}
                  <div className="absolute bottom-3 left-4 right-4 bg-black/60 backdrop-blur-md rounded-xl p-2.5 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span className="flex items-center gap-1.5"><Smartphone size={10} className="text-blue-500" /> RES: 720P HD</span>
                    {cameraError ? (
                      <span className="text-yellow-400 font-bold max-w-[200px] truncate">{cameraError}</span>
                    ) : (
                      <span className="text-emerald-400 animate-pulse font-bold uppercase tracking-wider flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span> Live Decoder Active
                      </span>
                    )}
                  </div>
                </div>

                {/* Simulated Preset Triggers for Kiosks */}
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase text-gray-500 tracking-wider block">
                    Simulasikan pemindaian dengan klik salah satu opsi kios ini:
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => handleSimulateScan(preset)}
                        disabled={isScanning}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-blue-100 hover:border-blue-300 hover:bg-slate-50 transition text-left cursor-pointer disabled:opacity-50 text-xs"
                      >
                        <div className="h-8 w-8 rounded-lg bg-blue-100/50 text-[#1A365D] flex items-center justify-center shrink-0">
                          {preset.icon}
                        </div>
                        <div className="truncate flex-1">
                          <p className="font-extrabold text-slate-800 truncate">{preset.label}</p>
                          <p className="text-[9px] text-[#1A365D] font-bold font-mono tracking-wider truncate">{preset.qrcode}</p>
                        </div>
                        <span className="text-[9px] px-2 py-0.5 rounded-md font-bold bg-slate-100 text-slate-500 tracking-wider">
                          MUTASI
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Drag-and-drop Image Area per Guidelines */
              <div className="space-y-4">
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById("qr-file-selector")?.click()}
                  className={`border-3 border-dashed rounded-[24px] p-8 text-center cursor-pointer transition flex flex-col items-center justify-center space-y-3 min-h-[220px] ${
                    dragActive 
                      ? "border-blue-500 bg-blue-50/20" 
                      : "border-blue-100 bg-slate-50 hover:bg-blue-50/10 hover:border-blue-300"
                  }`}
                >
                  <input
                    type="file"
                    id="qr-file-selector"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />

                  {analyzingFile ? (
                    <div className="space-y-2 text-center">
                      <RefreshCw className="animate-spin text-blue-600 mx-auto" size={32} />
                      <p className="text-xs font-black text-slate-700">Menganalisis matriks piksel QR Code...</p>
                    </div>
                  ) : (
                    <>
                      <div className="p-4 rounded-full bg-blue-100/60 text-[#1A365D]">
                        <UploadCloud size={32} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-black text-slate-700">Seret dan Lepas File QR di Sini</p>
                        <p className="text-[10px] text-gray-500">Atau klik untuk menelusuri dari perangkat lokal</p>
                      </div>
                      <span className="text-[9px] bg-slate-200 text-slate-600 font-bold px-2 py-0.5 rounded">
                        Mendukung JPG, PNG, WEBP maks. 4MB
                      </span>
                    </>
                  )}
                </div>

                <div className="p-3.5 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-start gap-2 text-[11px] text-blue-800">
                  <AlertCircle size={14} className="shrink-0 mt-0.5" />
                  <p className="font-semibold leading-relaxed">
                    Sistem akan secara instan mengenali format nama file atau struktur data QR Code gambar yang Anda unggah untuk menentukan jenis validasi yang sesuai (Kios, AK1, atau Booth).
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Validation Results Receipt & Session History (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          
          {/* 1. Interactive Instant Verification Receipt */}
          <div className="rounded-[32px] border border-blue-100 bg-white p-6 shadow-sm space-y-4">
            <h3 className="font-black text-slate-900 text-sm uppercase tracking-wider border-b border-gray-100 pb-3 flex items-center gap-1.5">
              <FileCheck2 size={16} className="text-emerald-500" />
              Hasil Validasi Dokumen
            </h3>

            {isScanning ? (
              <div className="p-8 text-center space-y-3">
                <div className="inline-block relative">
                  <div className="h-10 w-10 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
                </div>
                <p className="text-xs font-black text-slate-600">Sedang mendekripsi data dan memvalidasi ke server Disnaker...</p>
              </div>
            ) : scannedResult ? (
              <div className="animate-scaleUp space-y-4">
                {scannedResult.type === "AK1" && (
                  /* Verified AK1 Card details receipt format */
                  <div className="border border-emerald-200 bg-gradient-to-tr from-emerald-50/30 to-white rounded-2xl p-4.5 space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-black text-[9px] uppercase tracking-wider">
                        AK1 TERVERIFIKASI RESMI
                      </span>
                      <CheckCircle2 className="text-emerald-600" size={20} />
                    </div>

                    <div className="space-y-2 border-y border-dashed border-emerald-150 py-3">
                      <div className="grid grid-cols-3 text-[10px] items-center">
                        <span className="font-bold text-gray-400">Pencari Kerja</span>
                        <span className="col-span-2 font-black text-slate-800 text-xs">
                          {scannedResult.fullname}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 text-[10px] items-center">
                        <span className="font-bold text-gray-400">NIK Dukcapil</span>
                        <span className="col-span-2 font-mono text-slate-700 font-extrabold text-[11px]">
                          {scannedResult.nik}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 text-[10px] items-center">
                        <span className="font-bold text-gray-400">Pendidikan</span>
                        <span className="col-span-2 font-semibold text-slate-700">
                          {scannedResult.education} • {scannedResult.major}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 text-[10px] items-center">
                        <span className="font-bold text-gray-400">Kecamatan</span>
                        <span className="col-span-2 font-semibold text-slate-700">
                          Kec. {scannedResult.subdistrict}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 text-[10px] items-center">
                        <span className="font-bold text-gray-400">Masa Berlaku</span>
                        <span className="col-span-2 text-indigo-950 font-bold">
                          {scannedResult.issuedDate} s.d {scannedResult.expiryDate}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-1.5 items-center justify-center text-[10px] font-bold text-emerald-700">
                      <Sparkles size={11} />
                      Kartu kuning ini sah dan tercatat aktif untuk rekrutmen.
                    </div>
                  </div>
                )}

                {scannedResult.type === "JOB_FAIR" && (
                  /* Job fair kiosk check-in receipt */
                  <div className="border border-blue-200 bg-gradient-to-tr from-blue-50/20 to-white rounded-2xl p-4.5 space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-black text-[9px] uppercase tracking-wider">
                        CHECK-IN JOB FAIR BERHASIL
                      </span>
                      <CheckCircle2 className="text-blue-600" size={20} />
                    </div>

                    <div className="space-y-2 border-y border-dashed border-blue-150 py-3">
                      <div className="text-center pb-2">
                        <h4 className="font-black text-slate-900 text-xs leading-snug">{scannedResult.eventName}</h4>
                        <p className="text-[10px] text-gray-400 font-semibold mt-1">{scannedResult.location}</p>
                      </div>

                      <div className="grid grid-cols-3 text-[10px] pt-1">
                        <span className="font-bold text-gray-400">Nomor Antrean</span>
                        <span className="col-span-2 font-mono font-black text-indigo-950">{scannedResult.attendanceCode}</span>
                      </div>
                      <div className="grid grid-cols-3 text-[10px]">
                        <span className="font-bold text-gray-400">Kategori Tiket</span>
                        <span className="col-span-2 font-black text-violet-750 uppercase tracking-wide text-[9px]">{scannedResult.badgeTier}</span>
                      </div>
                      <div className="grid grid-cols-3 text-[10px]">
                        <span className="font-bold text-gray-400">Waktu Register</span>
                        <span className="col-span-2 text-slate-600 font-semibold">Terekam Instan pada Kios</span>
                      </div>
                    </div>

                    <p className="text-[10px] text-center text-gray-500 font-semibold">
                      Tunjukkan tanda terima digital ini kepada petugas di pintu masuk pameran fisik untuk mencetak Badge VIP Anda.
                    </p>
                  </div>
                )}

                {scannedResult.type === "BOOTH" && (
                  /* Verified Booth Stand check-in receipt */
                  <div className="border border-indigo-200 bg-gradient-to-tr from-indigo-50/20 to-white rounded-2xl p-4.5 space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded font-black text-[9px] uppercase tracking-wider">
                        CHECK-IN BOOTH BERHASIL
                      </span>
                      <CheckCircle2 className="text-indigo-600" size={20} />
                    </div>

                    <div className="space-y-2 border-y border-dashed border-indigo-150 py-3">
                      <div className="text-center pb-2">
                        <h4 className="font-black text-slate-950 text-xs">{scannedResult.companyName}</h4>
                        <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Sektor: {scannedResult.sector}</p>
                      </div>

                      <div className="grid grid-cols-3 text-[10px] pt-1">
                        <span className="font-bold text-gray-400">Posisi Dibuka</span>
                        <span className="col-span-2 font-black text-indigo-800">{scannedResult.availableOpenings}</span>
                      </div>
                      <div className="grid grid-cols-3 text-[10px]">
                        <span className="font-bold text-gray-400">HRD Stand</span>
                        <span className="col-span-2 font-bold text-slate-700">{scannedResult.recruiterOffline}</span>
                      </div>
                    </div>

                    <div className="bg-indigo-50 p-2.5 rounded-xl border border-indigo-100 flex flex-col gap-1 text-center">
                      <p className="text-[10px] font-bold text-indigo-950">Tertarik melamar langsung?</p>
                      <button 
                        onClick={() => alert(`Berhasil mengirimkan CV Digital & AK1 Anda ke database PT Shoetown Ligung!`)}
                        className="py-1 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[9px] font-black uppercase tracking-wider block transition"
                      >
                        Drop CV Digital Seketika
                      </button>
                    </div>
                  </div>
                )}

                {scannedResult.type === "ERROR" && (
                  /* Decrypted Error */
                  <div className="border border-rose-200 bg-rose-50/10 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-rose-100 text-rose-800 rounded font-black text-[9px] uppercase tracking-wider">
                        KODE TIDAK SAH
                      </span>
                      <XCircle className="text-rose-600" size={20} />
                    </div>
                    <p className="text-xs text-rose-900 font-semibold leading-relaxed">
                      {scannedResult.reason}
                    </p>
                    <div className="p-2 border border-rose-100 rounded-lg text-[10px] font-mono text-gray-450 bg-white">
                      Raw Data: {scannedResult.rawCode}
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setScannedResult(null)}
                  className="w-full mt-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold py-2 text-xs transition uppercase tracking-wider cursor-pointer text-center block"
                >
                  Selesai & Pemindaian Baru
                </button>
              </div>
            ) : (
              <div className="py-12 text-center text-gray-400 space-y-2">
                <QrCode size={38} className="mx-auto text-gray-300 stroke-[1.5]" />
                <p className="text-xs font-semibold leading-relaxed max-w-[200px] mx-auto">
                  Silakan arahkan kamera Anda atau pilih salah satu preset di samping untuk memverifikasi dokumen.
                </p>
              </div>
            )}
          </div>

          {/* 2. Interactive Roll history index of check-ins */}
          <div className="rounded-[32px] border border-blue-50 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-black text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
                <Clock size={14} className="text-indigo-600" />
                Histori Kehadiran & Validasi
              </h3>
              <span className="text-[10px] font-bold bg-slate-100 text-[#1A365D] tracking-wide px-2 py-0.5 rounded-lg">
                ⏱ {scanHistory.length} Record
              </span>
            </div>

            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {scanHistory.map((log) => (
                <div 
                  key={log.id} 
                  className={`p-3 rounded-xl border text-[11px] leading-normal flex items-start justify-between gap-2.5 transition duration-150 ${
                    log.status === "error" 
                      ? "border-rose-100 bg-rose-50/10" 
                      : log.status === "warning"
                      ? "border-amber-100 bg-amber-50/10"
                      : "border-slate-100 hover:border-slate-205 bg-white"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-bold text-gray-400 font-mono">
                        [{log.timestamp}]
                      </span>
                      <span className="font-extrabold text-slate-800">
                        {log.title}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium">
                      {log.subtitle} • <span className="font-sans text-gray-400 leading-none">{log.details}</span>
                    </p>
                  </div>
                  <span className={`shrink-0 h-2 w-2 rounded-full mt-1.5 ${
                    log.status === "error" 
                      ? "bg-rose-500" 
                      : log.status === "warning"
                      ? "bg-amber-400"
                      : "bg-emerald-500"
                  }`}></span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                if (window.confirm("Apakah Anda yakin ingin mengatur ulang riwayat pemindaian?")) {
                  setScanHistory([]);
                }
              }}
              className="text-[9px] font-black text-rose-600 hover:text-rose-750 uppercase tracking-widest block text-center mx-auto hover:underline cursor-pointer"
            >
              Hapus Riwayat Histori
            </button>
          </div>

          {/* Guidelines info layout */}
          <div className="bg-slate-50 border border-blue-50/60 rounded-2xl p-4 space-y-1.5">
            <span className="text-[9px] font-bold text-[#1A365D] tracking-wider uppercase block">
              💡 ALUR VALIDASI KARTU KUNING HRD PERUSAHAAN:
            </span>
            <p className="text-[10px] text-gray-500 leading-relaxed font-semibold">
              Kios mandiri di Dinas Tenaga Kerja Majalengka memancarkan QR khusus setiap 10 menit. Peserta yang hadir secara fisik dapat memindai QR dinas di portal ini untuk menyegel status kehadirannya, ataupun sebaliknya HRD dapat memindai Kartu Kuning fisik pelamar kerja guna melihat kecocokan NIK Dukcapil secara seketika.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
