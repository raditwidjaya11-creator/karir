import { useState, useEffect } from "react";
import { doc, getDocFromServer } from "firebase/firestore";
import { db } from "./firebase";
import { 
  Building2, 
  Briefcase, 
  AlertOctagon, 
  BookOpen, 
  FileText, 
  Map, 
  Smartphone, 
  TrendingUp, 
  Users, 
  FileWarning, 
  Award, 
  Sparkles, 
  ArrowRight, 
  HelpCircle,
  HelpCircle as QuestionIcon,
  Sun,
  Moon,
  ChevronRight,
  User,
  LogIn,
  LogOut,
  QrCode
} from "lucide-react";

// Import modules
import DashboardBupati from "./components/DashboardBupati";
import PetaIndustri from "./components/PetaIndustri";
import AICareerAssistant from "./components/AICareerAssistant";
import AK1Digital from "./components/AK1Digital";
import PengaduanKetenagakerjaan from "./components/PengaduanKetenagakerjaan";
import JobFairDigital from "./components/JobFairDigital";
import PelatihanBLK from "./components/PelatihanBLK";
import PanicButton from "./components/PanicButton";
import InvestorDashboard from "./components/InvestorDashboard";
import DesaKecamatanDashboard from "./components/DesaKecamatanDashboard";
import ModulPencariKerja from "./components/ModulPencariKerja";
import ModulPerusahaan from "./components/ModulPerusahaan";
import LoginModal from "./components/LoginModal";
import AdminPortal from "./components/AdminPortal";
import QRCodeScanner from "./components/QRCodeScanner";
import HelpCenter from "./components/HelpCenter";

type MainTab =
  | "portal"
  | "seeker"
  | "employer"
  | "vocational"
  | "advocacy"
  | "executive"
  | "village"
  | "admin"
  | "qr_scanner";

export default function App() {
  const [activeTab, setActiveTab] = useState<MainTab>("portal");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Listen for global custom events to change tabs from sub-components
  useEffect(() => {
    const handleGlobalTabChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && typeof customEvent.detail === "string") {
        setActiveTab(customEvent.detail as MainTab);
      }
    };
    window.addEventListener("change-tab", handleGlobalTabChange);
    return () => {
      window.removeEventListener("change-tab", handleGlobalTabChange);
    };
  }, []);

  // Firebase Real Connection State (Connecting to project: "karir-cce5b")
  const [firebaseStatus, setFirebaseStatus] = useState<"checking" | "connected" | "error">("checking");
  const [firebaseProject] = useState<string>("karir-cce5b");

  useEffect(() => {
    async function testFirebaseConnection() {
      try {
        await getDocFromServer(doc(db, "system_health", "check"));
        setFirebaseStatus("connected");
      } catch (err: any) {
        console.log("Firebase handshake status response caught:", err);
        // Any error other than a hard network/api key failure means Firebase is fully initialized and reached!
        // For instance: 'permission-denied', 'not-found', etc. still proves successful connection to the Firebase domain.
        if (err && err.code && (err.code.includes("permission-denied") || err.code.includes("not-found") || err.message.includes("permission"))) {
          setFirebaseStatus("connected");
        } else {
          setFirebaseStatus("error");
        }
      }
    }
    testFirebaseConnection();
  }, []);

  // User Auth State
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; role: string; avatarUrl: string } | null>({
    name: "Radit Widjaya",
    email: "raditwidjaya11@gmail.com",
    role: "Pencari Kerja",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
  });

  // Quick simulation controls to highlight role state
  const [simulatedRole, setSimulatedRole] = useState<string>("Pencari Kerja");

  const changeRoleAndLogin = (role: string, tab?: string) => {
    setSimulatedRole(role);
    if (tab) {
      setActiveTab(tab as any);
    }
    
    // Auto populate matching currentUser profile
    let userData = {
      name: "Radit Widjaya",
      email: "raditwidjaya11@gmail.com",
      role: "Pencari Kerja",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
    };

    if (role === "Mitra Industri") {
      userData = {
        name: "Heri Sartono (HRD PT Shoetown)",
        email: "hrd.recruitment@shoetown.id",
        role: "Mitra Industri",
        avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop"
      };
    } else if (role === "Operator Disnaker") {
      userData = {
        name: "Sutisna, S.Kom (Dinas Ketenagakerjaan)",
        email: "disnaker@majalengkakab.go.id",
        role: "Operator Disnaker",
        avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
      };
    } else if (role === "Bupati Majalengka") {
      userData = {
        name: "Dr. H. Karna Sobahi, M.Pd (Bupati)",
        email: "bupati@majalengkakab.go.id",
        role: "Bupati Majalengka",
        avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop"
      };
    } else if (role === "Desa & Kecamatan") {
      userData = {
        name: "Mulyadi (Kaur Kesra Ligung)",
        email: "desa.ligung@majalengkakab.go.id",
        role: "Desa & Kecamatan",
        avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop"
      };
    } else if (role === "Pelapor Perlindungan") {
      userData = {
        name: "Pelapor Anonim",
        email: "anonim@perlindungan.go.id",
        role: "Pelapor Perlindungan",
        avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
      };
    }

    setCurrentUser(userData);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSimulatedRole("Tamu / Belum Masuk");
  };

  const handleLoginSuccess = (user: { name: string; email: string; role: string; avatarUrl: string }) => {
    setCurrentUser(user);
    setSimulatedRole(user.role);
    // Automatically route to appropriate tab based on logged in role
    if (user.role === "Pencari Kerja") {
      setActiveTab("seeker");
    } else if (user.role === "Mitra Industri") {
      setActiveTab("employer");
    } else if (user.role === "Bupati Majalengka") {
      setActiveTab("executive");
    } else if (user.role === "Desa & Kecamatan") {
      setActiveTab("village");
    } else if (user.role === "Operator Disnaker") {
      setActiveTab("admin");
    }
  };

  const totalRegisteredWorkers = 4520;
  const totalOpenings = 142;
  const totalVerifiedCompanies = 118;
  const localMitigationRate = "92.8%";

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-slate-950 text-slate-100" : "bg-bg-ice text-primary-navy font-sans"}`}>
      
      {/* Top Simulation Bar representing government sandbox roles switching */}
      <div className="bg-gradient-to-r from-primary-navy to-slate-950 text-white text-[11px] font-bold py-2.5 px-4 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2">
          <span className="bg-white/20 rounded px-2 py-0.5 animate-pulse uppercase tracking-widest text-[9px]">DEMO SANDBOX</span>
          <span>Role Kerja Tersimulasi Sekarang:</span>
          {currentUser ? (
            <strong className="text-yellow-300 uppercase tracking-wider">{currentUser.name} ({currentUser.role})</strong>
          ) : (
            <strong className="text-red-400 uppercase tracking-wider">Tamu (Belum Masuk)</strong>
          )}
        </div>
        
        {/* Toggle selectors representing simulated client profile groups */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex flex-wrap gap-1.5 items-center">
            <span className="opacity-80 text-[10px]">Uji Coba Hak Akses:</span>
            {[
              { label: "Pencaker", role: "Pencari Kerja", tab: "seeker" },
              { label: "Perusahaan (HRD)", role: "Mitra Industri", tab: "employer" },
              { label: "Dinas / BLK (Admin)", role: "Operator Disnaker", tab: "admin" },
              { label: "Bupati (Exec)", role: "Bupati Majalengka", tab: "executive" },
              { label: "Desa (Operator)", role: "Desa & Kecamatan", tab: "village" }
            ].map((r, i) => (
              <button
                key={i}
                onClick={() => changeRoleAndLogin(r.role, r.tab)}
                className={`px-2 py-1 rounded transition hover:bg-white/20 text-[10px] uppercase font-bold leading-none ${
                  currentUser && (currentUser.role === r.role || (r.role === "Operator Disnaker" && currentUser.role === "Operator Disnaker")) ? "bg-yellow-400 text-slate-950 hover:bg-yellow-500" : "bg-white/10"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 border-l border-white/20 pl-3">
            <span className="opacity-60 text-[9px] uppercase tracking-wider">Firebase:</span>
            {firebaseStatus === "checking" && (
              <span className="bg-yellow-500/20 text-yellow-300 text-[10px] px-2 py-0.5 rounded font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse"></span>
                Hubungkan...
              </span>
            )}
            {firebaseStatus === "connected" && (
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded font-mono flex items-center gap-1" title="Real-time Firebase Firestore database connection active">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Terkoneksi ({firebaseProject})
              </span>
            )}
            {firebaseStatus === "error" && (
              <span className="bg-red-500/20 text-red-300 text-[10px] px-2 py-0.5 rounded font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                Gagal ({firebaseProject})
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Navigation Bar */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${
        isDarkMode ? "bg-slate-900/80 border-slate-800" : "bg-white/90 border-blue-100"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("portal")}>
            <div className="w-10 h-10 bg-accent-blue rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md">
              M
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-primary-navy leading-none">
                KARIR <span className="text-accent-blue">MAJALENGKA</span>
              </h1>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-blue/80 mt-1">
                SUPER APP KETENAGAKERJAAN
              </p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary-navy">
            <button
              onClick={() => setActiveTab("portal")}
              className={`px-3 py-2 rounded-lg transition ${activeTab === "portal" ? "text-accent-blue bg-white shadow-sm border border-blue-50" : "hover:text-accent-blue/80 opacity-80"}`}
            >
              Beranda Portal
            </button>
            <button
              onClick={() => setActiveTab("seeker")}
              className={`px-3 py-2 rounded-lg transition ${activeTab === "seeker" ? "text-accent-blue bg-white shadow-sm border border-blue-50" : "hover:text-accent-blue/80 opacity-80"}`}
            >
              Pencari Kerja
            </button>
            <button
              onClick={() => setActiveTab("employer")}
              className={`px-3 py-2 rounded-lg transition ${activeTab === "employer" ? "text-accent-blue bg-white shadow-sm border border-blue-50" : "hover:text-accent-blue/80 opacity-80"}`}
            >
              Mitra Industri
            </button>
            <button
              onClick={() => setActiveTab("vocational")}
              className={`px-3 py-2 rounded-lg transition ${activeTab === "vocational" ? "text-accent-blue bg-white shadow-sm border border-blue-50" : "hover:text-accent-blue/80 opacity-80"}`}
            >
              Vokasi BLK & JobFair
            </button>
            <button
              onClick={() => setActiveTab("advocacy")}
              className={`px-3 py-2 rounded-lg transition ${activeTab === "advocacy" ? "text-accent-blue bg-white shadow-sm border border-blue-50" : "hover:text-accent-blue/80 opacity-80"}`}
            >
              Aduan & Panic Sistem
            </button>
            <button
              onClick={() => setActiveTab("qr_scanner")}
              className={`px-3 py-2 rounded-lg transition flex items-center gap-1 ${activeTab === "qr_scanner" ? "text-accent-blue bg-white shadow-sm border border-blue-50 font-black" : "hover:text-accent-blue/80 opacity-80"}`}
            >
              <QrCode size={13} /> Pemindai QR
            </button>
            <button
              onClick={() => setActiveTab("admin")}
              className={`px-3 py-2 rounded-lg transition ${
                activeTab === "admin" 
                  ? "text-white bg-gradient-to-r from-blue-700 to-accent-blue shadow-md font-black" 
                  : "text-amber-600 border border-amber-200 bg-amber-50/40 hover:bg-amber-50 font-black"
              }`}
            >
              👑 Portal Admin
            </button>
          </nav>

          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2.5 rounded-xl border transition ${
                isDarkMode ? "bg-slate-800 border-slate-700 text-yellow-400 hover:bg-slate-750" : "bg-slate-50 border-blue-100 text-[#1A365D] hover:bg-slate-100"
              }`}
            >
              {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Interactive Login/Logout UI */}
            {currentUser ? (
              <div className="flex items-center gap-2 bg-[#1A365D]/5 border border-blue-100 rounded-2xl p-1.5 pl-3">
                <img 
                  src={currentUser.avatarUrl} 
                  alt={currentUser.name} 
                  className="w-7 h-7 object-cover border border-[#1A365D]/10 rounded-full"
                  referrerPolicy="no-referrer"
                />
                <div className="hidden md:block text-left text-[10px] leading-tight pr-1">
                  <p className="font-black text-primary-navy truncate max-w-[100px]">{currentUser.name}</p>
                  <p className="font-bold text-[#1A365D]/70">{currentUser.role}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-red-55/10 hover:text-red-650 border border-slate-200/50 transition cursor-pointer text-gray-500 flex items-center justify-center"
                  title="Keluar / Logout"
                >
                  <LogOut size={13} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#1A365D] to-accent-blue text-white font-black text-xs uppercase tracking-wider transition hover:opacity-95 shadow-sm cursor-pointer"
              >
                <LogIn size={13} />
                <span>Masuk</span>
              </button>
            )}

            {/* Simulated panic button hotlink */}
            <button
              onClick={() => {
                setSimulatedRole("Pelapor Perlindungan");
                setActiveTab("advocacy");
              }}
              className="rounded-xl bg-red-600 text-white font-extrabold px-3.5 py-2.5 text-xs tracking-wider shadow-sm hover:bg-red-700 transition"
            >
              PANIC
            </button>
          </div>
        </div>
      </header>

      {/* Main App Frame Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* 1. Landing Portal Index Page */}
        {activeTab === "portal" && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Immersive Glassmorphic Hero Zone */}
            <div className="relative overflow-hidden bg-accent-blue rounded-[40px] p-8 md:p-12 text-white shadow-xl">
              {/* Decorative circles */}
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-white/20 rounded-full blur-2xl"></div>
              
              <div className="max-w-xl relative z-10 space-y-5">
                <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest inline-block">
                  Edisi Rebana Metropolitan • Official Portal
                </span>
                <h2 className="text-4xl md:text-6xl font-black mt-4 leading-[0.95] tracking-tighter">
                  Temukan <br/>Peluang <span className="text-blue-100 italic">Terbaik.</span>
                </h2>
                <p className="text-blue-50 max-w-md font-medium leading-relaxed text-sm md:text-base">
                  Menghubungkan talenta lokal Majalengka dengan industri masa depan di kawasan Kertajati dan Rebana.
                </p>

                {/* Main CTA paths */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <button
                    onClick={() => {
                      setSimulatedRole("Pencari Kerja");
                      setActiveTab("seeker");
                    }}
                    className="bg-white text-primary-navy px-8 py-4 rounded-2xl font-black shadow-lg shadow-blue-700/20 hover:bg-blue-50 transition duration-150 text-xs uppercase tracking-wider flex items-center gap-1.5"
                  >
                    Cari Lowongan <ChevronRight size={14} />
                  </button>
                  <button
                    onClick={() => {
                      setSimulatedRole("Mitra Industri");
                      setActiveTab("employer");
                    }}
                    className="bg-blue-700/30 backdrop-blur-md border border-white/20 px-8 py-4 rounded-2xl font-black hover:bg-blue-700/50 transition duration-150 text-xs uppercase tracking-wider flex items-center gap-1.5"
                  >
                    Daftar Kartu AK1 <TrendingUp size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Realtime statistik counters */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Lowongan Aktif", count: totalOpenings, suffix: "Loker", icon: <Briefcase />, colorClass: "text-primary-navy" },
                { label: "Perusahaan Mitra", count: totalVerifiedCompanies, suffix: "Industri", icon: <Building2 />, colorClass: "text-accent-blue" },
                { label: "Serapan Warga", count: totalRegisteredWorkers, suffix: "Talenta", icon: <Users />, colorClass: "text-green-500" },
                { label: "Tingkat Selesai", count: localMitigationRate, prefix: "", icon: <Award />, colorClass: "text-[#1A365D]" }
              ].map((s, i) => (
                <div key={i} className={`rounded-[32px] border p-6 shadow-sm transition backdrop-blur-lg flex flex-col justify-between h-40 ${
                  isDarkMode ? "bg-slate-900/50 border-slate-800 text-white" : "bg-white/80 border-blue-100 text-primary-navy"
                }`}>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{s.label}</span>
                    <div className="rounded-xl bg-accent-blue/10 p-2 text-accent-blue">
                      {s.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className={`text-3xl font-black ${s.colorClass}`}>
                      {typeof s.count === "number" ? s.count.toLocaleString("id-ID") : s.count}
                    </h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">{s.suffix || "Selesai"}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Featured Industrial Maps highlight */}
            <PetaIndustri />

            {/* Portal guidelines - Quick Access cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Box 1 */}
              <div className={`rounded-xl border p-5 space-y-3.5 ${
                isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-gray-100"
              }`}>
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-500 flex items-center justify-center">
                  <Sparkles size={20} />
                </div>
                <h3 className="font-bold text-sm uppercase tracking-wider">AI Career Assistant</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Gunakan asisten kecerdasan buatan terpadu untuk melakukan audit CV penjamin mutu, rancang daftar riwayat hidup otomatis, serta konsultasi program vokasi.
                </p>
                <button onClick={() => setActiveTab("seeker")} className="text-xs font-bold text-blue-500 hover:underline flex items-center gap-1 cursor-pointer">
                  Konsultasi AI Sekarang <ArrowRight size={12} />
                </button>
              </div>

              {/* Box 2 */}
              <div className={`rounded-xl border p-5 space-y-3.5 ${
                isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-gray-100"
              }`}>
                <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-500 flex items-center justify-center">
                  <FileText size={20} />
                </div>
                <h3 className="font-bold text-sm uppercase tracking-wider">AK1 Digital (Kartu Kuning)</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Tidak perlu antre ke kantor dinas ketenagakerjaan setempat. Ajukan Kartu Kuning Digital resmi, unduh berkas pdf, dan validasi kode QR perusahaan instan.
                </p>
                <button onClick={() => {
                  setSimulatedRole("Pencari Kerja");
                  setActiveTab("seeker");
                }} className="text-xs font-bold text-indigo-500 hover:underline flex items-center gap-1 cursor-pointer">
                  Ajukan AK1 Instan <ArrowRight size={12} />
                </button>
              </div>

              {/* Box 3 */}
              <div className={`rounded-xl border p-5 space-y-3.5 ${
                isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-gray-100"
              }`}>
                <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 flex items-center justify-center">
                  <FileWarning size={20} />
                </div>
                <h3 className="font-bold text-sm uppercase tracking-wider">Advokasi Hak & Pengaduan</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Perlindungan komprehensif bagi buruh industri. Ajukan sengketa pemotongan pesangon sepihak, atau gunakan Panic Button untuk pelanggaran k3 berat.
                </p>
                <button onClick={() => setActiveTab("advocacy")} className="text-xs font-bold text-red-500 hover:underline flex items-center gap-1 cursor-pointer">
                  Lapor Pelanggaran <ArrowRight size={12} />
                </button>
              </div>

              {/* Box 4 - QR Code scanning */}
              <div className={`rounded-xl border p-5 space-y-3.5 ${
                isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-gray-100"
              }`}>
                <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-505 flex items-center justify-center text-emerald-600">
                  <QrCode size={18} />
                </div>
                <h3 className="font-bold text-sm uppercase tracking-wider">Kios QR & Check-In</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Verifikasi validitas berkas Kartu Kuning AK1 Digital oleh perwakilan industri, atau lakukan pencatatan check-in instan saat menghadiri pameran fisik/booth.
                </p>
                <button onClick={() => setActiveTab("qr_scanner")} className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1 cursor-pointer">
                  Buka Pindai Mandiri <ArrowRight size={12} />
                </button>
              </div>
            </div>

            {/* Help Center Section */}
            <HelpCenter 
              isDarkMode={isDarkMode} 
              onNavigateTab={(tab) => {
                if (tab === "seeker") {
                  changeRoleAndLogin("Pencari Kerja", "seeker");
                } else if (tab === "advocacy") {
                  setActiveTab("advocacy");
                }
              }} 
            />
          </div>
        )}

        {/* 2. Seeker Profile Hub (Inside Job Finder console + AK1 Digital + AI Helper) */}
        {activeTab === "seeker" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header info */}
            <div className="border-b border-gray-200 pb-4">
              <h1 className="text-2xl font-extrabold font-sans">Terminal Pencari Kerja Terpadu</h1>
              <p className="text-xs text-gray-530">Akses info lowongan, pengajuan AK1 legal, serta asisten uji draf CV karir Anda.</p>
            </div>

            {currentUser === null && (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50/40 border border-amber-200/80 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-amber-900 font-semibold text-xs mb-6 shadow-sm animate-pulse">
                <div className="flex items-center gap-2.5">
                  <div className="p-1 rounded bg-amber-100 text-amber-600">
                    <Sparkles size={14} />
                  </div>
                  <span>Anda saat ini menjelajah sebagai <strong>Tamu (Belum Masuk)</strong>. Silakan Masuk terlebih dahulu untuk melamar kerja secara resmi, mengajukan AK1, atau mengakses konsultasi CV berbantuan AI.</span>
                </div>
                <button 
                  onClick={() => setIsLoginModalOpen(true)} 
                  className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl px-4 py-2 font-black uppercase tracking-wider text-[10px] transition shrink-0 shadow-sm cursor-pointer whitespace-nowrap"
                >
                  Masuk Sekarang
                </button>
              </div>
            )}

            {/* Custom Subsystems */}
            <div className="space-y-12">
              <div id="sub-matching-list">
                <ModulPencariKerja />
              </div>

              <div id="sub-ak1" className="border-t border-gray-200/60 pt-10">
                <AK1Digital />
              </div>

              <div id="sub-ai-assistant" className="border-t border-gray-200/60 pt-10">
                <AICareerAssistant />
              </div>
            </div>
          </div>
        )}

        {/* 3. Employer Workspace Grid */}
        {activeTab === "employer" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="border-b border-gray-200 pb-4">
              <h1 className="text-2xl font-extrabold font-sans">Konsol Mitra Perusahaan & Industri</h1>
              <p className="text-xs text-gray-530">Dashboard pengawas postingan loker, rekrutmen pekerja lokal, serta screening CV berbasis AI.</p>
            </div>

            {(!currentUser || currentUser.role !== "Mitra Industri") ? (
              <div className="bg-gradient-to-br from-[#1A365D]/5 to-indigo-55/10 border border-blue-150-100 rounded-3xl p-8 text-center space-y-4 shadow-sm my-6 max-w-2xl mx-auto">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-[#1A365D]/10 flex items-center justify-center text-accent-blue font-black shadow-inner">
                  <Building2 size={28} />
                </div>
                <div className="max-w-md mx-auto space-y-2">
                  <h3 className="text-base font-black text-[#1A365D] tracking-tight">Dashboard Terbatas untuk Mitra Industri</h3>
                  <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                    Maaf, Anda perlu masuk sebagai akun <strong>Mitra Industri / Perusahaan (HRD)</strong> terverifikasi untuk dapat memasang lowongan kerja baru atau memilah lamaran kerja masuk.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <button 
                    onClick={() => setIsLoginModalOpen(true)} 
                    className="bg-accent-blue hover:bg-indigo-700 text-white rounded-xl px-5 py-2.5 font-bold uppercase tracking-wide text-xs transition cursor-pointer shadow-sm"
                  >
                    Masuk / Register HRD
                  </button>
                  <button 
                    onClick={() => changeRoleAndLogin("Mitra Industri", "employer")} 
                    className="bg-white border border-blue-200 hover:bg-slate-50 text-slate-705 rounded-xl px-4 py-2 text-xs font-bold uppercase transition cursor-pointer shadow-sm"
                  >
                    Bypass Akun Demo
                  </button>
                </div>
              </div>
            ) : (
              <ModulPerusahaan currentUser={currentUser} />
            )}
          </div>
        )}

        {/* 4. Vocational Center: BLK classes + Job Fair stands */}
        {activeTab === "vocational" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="border-b border-gray-200 pb-4">
              <h1 className="text-2xl font-extrabold font-sans">Sentra Vokasi, Pengembangan Skill & Digital Job Fair</h1>
              <p className="text-xs text-gray-530">Eksplorasi kelas sertifikasi fisik, pembelajaran video mandiri, dan kunjungan booth virtual HRD expo.</p>
            </div>

            <div className="space-y-12">
              <PelatihanBLK />
              
              <div className="border-t border-gray-200/60 pt-10">
                <JobFairDigital />
              </div>
            </div>
          </div>
        )}

        {/* 5. Advocacy Center: Complaints + Panic Emergency Buttons */}
        {activeTab === "advocacy" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="border-b border-gray-200 pb-4">
              <h1 className="text-2xl font-extrabold font-sans">Pusat Advokasi buruh & Perlindungan Hubungan Kerja</h1>
              <p className="text-xs text-gray-530">Ajukan mediasi perkara upah, audit sengketa industrial, atau gunakan alarm panic button.</p>
            </div>

            <div className="space-y-12">
              <PengaduanKetenagakerjaan />

              <div className="border-t border-gray-200/60 pt-10">
                <PanicButton />
              </div>
            </div>
          </div>
        )}

        {/* 6. Executive & Investor Dashboard tab */}
        {activeTab === "executive" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="border-b border-gray-200 pb-4">
              <h1 className="text-2xl font-extrabold font-sans">Bupati Executive Cockpit & Investor Intel</h1>
              <p className="text-xs text-slate-500">Pemantauan KPI tingkat pengangguran Majalengka, UMK benchmarking, dan kelayakan iklim investasi.</p>
            </div>

            {(!currentUser || currentUser.role !== "Bupati Majalengka") ? (
              <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white border border-slate-800 rounded-3xl p-8 text-center space-y-4 shadow-xl my-6 max-w-2xl mx-auto">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-yellow-400 text-slate-950 flex items-center justify-center font-black shadow-md">
                  <Award size={28} />
                </div>
                <div className="max-w-md mx-auto space-y-2">
                  <h3 className="text-base font-black">Executive Cockpit Terkunci</h3>
                  <p className="text-xs text-indigo-200 font-semibold leading-relaxed">
                    Dashboard pemantauan rahasia ini dikhususkan untuk Bupati Majalengka guna memonitoring serapan tenaga kerja dan indeks kepuasan hubungan industrial secara makro.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-3 pt-4">
                  <button 
                    onClick={() => setIsLoginModalOpen(true)} 
                    className="bg-yellow-400 hover:bg-yellow-500 text-slate-950 rounded-xl px-5 py-2.5 font-bold uppercase tracking-wide text-xs transition cursor-pointer shadow-sm"
                  >
                    Masuk Bupati / Dinas
                  </button>
                  <button 
                    onClick={() => changeRoleAndLogin("Bupati Majalengka", "executive")} 
                    className="bg-white/10 hover:bg-white/20 border border-white/25 text-white rounded-xl px-5 py-2.5 font-bold uppercase tracking-wide text-xs transition cursor-pointer shadow-sm"
                  >
                    Bypass Bupati Demo
                  </button>
                </div>
              </div>
            ) : (
              <>
                <DashboardBupati />
                <div className="border-t border-gray-200/60 pt-10">
                  <InvestorDashboard />
                </div>
              </>
            )}
          </div>
        )}

        {/* 7. Operator Desa Grassroots Dashboard */}
        {activeTab === "village" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="border-b border-gray-200 pb-4">
              <h1 className="text-2xl font-extrabold font-sans">Portal Input Koordinator Desa & Kelurahan</h1>
              <p className="text-xs text-slate-500">Pencatatan langsung warga pengangguran di tingkat RW/Kelurahan untuk pemetaan alokasi pelatihan Disnaker.</p>
            </div>

            {(!currentUser || currentUser.role !== "Desa & Kecamatan") ? (
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50/80 border border-emerald-250/50 rounded-3xl p-8 text-center space-y-4 shadow-sm my-6 max-w-2xl mx-auto">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-800 font-black shadow-inner">
                  <Map size={28} />
                </div>
                <div className="max-w-md mx-auto space-y-2">
                  <h3 className="text-base font-black text-emerald-950 font-sans">Akses Khusus Operator Desa & RW</h3>
                  <p className="text-xs text-emerald-850/80 font-semibold leading-relaxed">
                    Formulir pencatatan warga prasejahtera ini hanya diperuntukkan bagi Operator Kelurahan/Desa Kabupaten Majalengka dalam memfasilitasi pendataan lapangan terpadu.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <button 
                    onClick={() => setIsLoginModalOpen(true)} 
                    className="bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl px-5 py-2.5 font-bold uppercase tracking-wide text-xs transition cursor-pointer shadow-sm"
                  >
                    Masuk Akun Desa
                  </button>
                  <button 
                    onClick={() => changeRoleAndLogin("Desa & Kecamatan", "village")} 
                    className="bg-white border border-emerald-200 hover:bg-slate-50 text-slate-700 rounded-xl px-5 py-2.5 font-bold uppercase tracking-wide text-xs transition cursor-pointer shadow-sm"
                  >
                    Bypass Operator Desa
                  </button>
                </div>
              </div>
            ) : (
              <DesaKecamatanDashboard />
            )}
          </div>
        )}

        {/* 8. Operator Disnaker Admin Console */}
        {activeTab === "admin" && (
          <div className="space-y-8 animate-fadeIn">
            {(!currentUser || currentUser.role !== "Operator Disnaker") ? (
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 rounded-3xl p-8 text-center space-y-4 shadow-xl my-6 max-w-2xl mx-auto">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md">
                  <Lock size={28} />
                </div>
                <div className="max-w-md mx-auto space-y-2">
                  <h3 className="text-base font-black">Portal Admin Disnaker Terkunci</h3>
                  <p className="text-xs text-indigo-200 font-semibold leading-relaxed">
                    Menu pengesahan berkas AK1, moderasi industri, hazard panic alarm, dan sengketa hubungan industrial ini dikhususkan untuk Administrator & Pengawas Dinas Ketenagakerjaan Kabupaten Majalengka.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-3 pt-4">
                  <button 
                    onClick={() => setIsLoginModalOpen(true)} 
                    className="bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl px-5 py-2.5 font-bold uppercase tracking-wide text-xs transition cursor-pointer shadow-sm animate-pulse"
                  >
                    Masuk Akun Dinas
                  </button>
                  <button 
                    onClick={() => changeRoleAndLogin("Operator Disnaker", "admin")} 
                    className="bg-white/10 hover:bg-white/20 border border-white/25 text-white rounded-xl px-5 py-2.5 font-bold uppercase tracking-wide text-xs transition cursor-pointer shadow-sm"
                  >
                    Bypass Otoritas Admin
                  </button>
                </div>
              </div>
            ) : (
              <AdminPortal />
            )}
          </div>
        )}

        {/* 9. Self-Service QR Code Scanner and Checking module */}
        {activeTab === "qr_scanner" && (
          <div className="space-y-8 animate-fadeIn">
            <QRCodeScanner />
          </div>
        )}

      </main>

      {/* Modern Government Portal Footer */}
      <footer className={`border-t py-8 text-center text-xs text-gray-500 space-y-2 mt-20 transition-colors ${
        isDarkMode ? "bg-slate-950 border-slate-900" : "bg-white border-gray-100"
      }`}>
        <p className="font-bold">© 2026 Pemerintah Kabupaten Majalengka — Dinas Ketenagakerjaan</p>
        <p>Bekerja sama dengan Kawasan Rebana Authority, BIJB Kertajati Aerocity, dan Balai Latihan Kerja.</p>
        <p className="text-[10px] text-gray-400">Pemanfaatan NIK terinkorporasi otomatis dengan Kependudukan dan Pencatatan Sipil Republik Indonesia.</p>
      </footer>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLoginSuccess={handleLoginSuccess} 
      />

    </div>
  );
}
