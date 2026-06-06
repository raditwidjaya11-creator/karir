import React, { useState } from "react";
import { 
  X, 
  LogIn, 
  Mail, 
  Lock, 
  User, 
  ShieldCheck, 
  Briefcase, 
  Building2, 
  Award, 
  MapPin, 
  Sparkles,
  Info,
  Eye,
  EyeOff
} from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; email: string; role: string; avatarUrl: string }) => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [selectedRole, setSelectedRole] = useState<string>("Pencari Kerja");
  
  // Login Inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Register Inputs
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regGender, setRegGender] = useState("Laki-laki");
  const [regNik, setRegNik] = useState("");
  const [regCompany, setRegCompany] = useState("");
  const [regNis, setRegNis] = useState("");
  
  // Custom Mitra Industri states for comprehensive registration
  const [regIndustryNib, setRegIndustryNib] = useState("");
  const [regIndustrySector, setRegIndustrySector] = useState("Manufaktur");
  const [regIndustrySubdistrict, setRegIndustrySubdistrict] = useState("Ligung");
  const [regIndustryPhone, setRegIndustryPhone] = useState("");
  const [regIndustryWorkersTarget, setRegIndustryWorkersTarget] = useState("85");
  
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  // Set pre-filled credentials for quick sandbox trials
  const handleQuickLogin = (role: string) => {
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    setTimeout(() => {
      setIsLoading(false);
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
      }

      setSuccessMsg(`Berhasil masuk sebagai ${userData.name}!`);
      setTimeout(() => {
        onLoginSuccess(userData);
        onClose();
      }, 800);
    }, 600);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    setTimeout(() => {
      setIsLoading(false);
      if (activeTab === "login") {
        // Validate mock login
        if (email.trim() === "" || password.trim() === "") {
          setErrorMsg("Silakan lengkapi data alamat email dan kata sandi Anda.");
          return;
        }

        const formattedRole = selectedRole === "Pencari Kerja" ? "Pencari Kerja" : 
                             selectedRole === "Mitra Industri" ? "Mitra Industri" : 
                             selectedRole === "Bupati" ? "Bupati Majalengka" : "Desa & Kecamatan";

        const nameFromEmail = email.split("@")[0];
        const capitalizedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

        const userData = {
          name: capitalizedName || "Pengguna Baru",
          email: email,
          role: formattedRole,
          avatarUrl: `https://api.dicebear.com/7.x/adventurer/svg?seed=${nameFromEmail}`
        };

        setSuccessMsg("Selamat Datang Kembali! Otentikasi Berhasil.");
        setTimeout(() => {
          onLoginSuccess(userData);
          onClose();
        }, 800);
      } else {
        // Validate Register
        if (selectedRole === "Mitra Industri") {
          if (!regName || !regEmail || !regPassword || !regCompany || !regIndustryNib) {
            setErrorMsg("Kolom nama HRD, Email, Sandi, Nama Perusahaan, dan NIB wajib diisi.");
            return;
          }
        } else {
          if (!regName || !regEmail || !regPassword) {
            setErrorMsg("Semua kolom registrasi bertanda bintang wajib diisi.");
            return;
          }
        }

        const formattedRole = selectedRole === "Pencari Kerja" ? "Pencari Kerja" : "Mitra Industri";

        const userData = {
          name: formattedRole === "Mitra Industri" ? `${regName} (${regCompany})` : regName,
          email: regEmail,
          role: formattedRole,
          avatarUrl: formattedRole === "Mitra Industri"
            ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop"
            : `https://api.dicebear.com/7.x/adventurer/svg?seed=${regName.replace(/\s+/g, '')}`,
          companyName: regCompany,
          nib: regIndustryNib,
          sector: regIndustrySector,
          subdistrict: regIndustrySubdistrict,
          phone: regIndustryPhone,
          workersTarget: regIndustryWorkersTarget
        };

        setSuccessMsg("Pendaftaran Mitra Industri Berhasil! Wilayah terintegrasi.");
        setTimeout(() => {
          onLoginSuccess(userData);
          onClose();
        }, 1000);
      }
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl overflow-hidden rounded-[32px] border border-blue-105 bg-white shadow-2xl transition-all">
        
        {/* Top Header Motif decoration */}
        <div className="bg-gradient-to-r from-[#1A365D] to-accent-blue py-6 px-8 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
          >
            <X size={16} />
          </button>
          
          <div className="flex items-center gap-2">
            <span className="bg-yellow-400 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
              Disnaker Kabupaten Majalengka
            </span>
          </div>
          <h2 className="text-xl font-black mt-2 tracking-tight">
            Akses Layanan Satu Pintu Karir Majalengka
          </h2>
          <p className="text-xs text-blue-100 font-semibold mt-1">
            Gunakan akun Disnaker atau pilih profil Demo untuk evaluasi fungsional super app.
          </p>
        </div>

        {/* Form area */}
        <div className="p-8 space-y-6 max-h-[82vh] overflow-y-auto">
          
          {/* Success/Error displays */}
          {successMsg && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-4 text-xs font-bold animate-pulse text-center">
              🎉 {successMsg}
            </div>
          )}
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 text-xs font-bold text-center">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Quick Sandbox Logins Section (Recommended for Dev Testing) */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50/20 p-5 rounded-2xl border border-blue-100 space-y-3">
            <h4 className="text-[10px] font-black text-primary-navy uppercase tracking-widest flex items-center gap-1.5 leading-none">
              <Sparkles size={13} className="text-amber-500 animate-spin" /> Mulai Cepat (Quick Sandbox Entry)
            </h4>
            <p className="text-[11px] font-semibold text-gray-500 leading-normal">
              Pilih salah satu dari 5 akun simulasi otoritas di bawah untuk login instan dengan hak akses penuh:
            </p>

            <div className="flex flex-wrap gap-1.5">
              {[
                { name: "Pencaker (Radit)", icon: <Briefcase size={10} />, role: "Pencari Kerja" },
                { name: "Mitra Industri (HRD)", icon: <Building2 size={10} />, role: "Mitra Industri" },
                { name: "Dinas / BLK", icon: <ShieldCheck size={10} />, role: "Operator Disnaker" },
                { name: "Bupati Cockpit", icon: <Award size={10} />, role: "Bupati Majalengka" },
                { name: "Desa Ligung", icon: <MapPin size={10} />, role: "Desa & Kecamatan" }
              ].map((b, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickLogin(b.role)}
                  className="flex items-center gap-1 bg-white hover:bg-blue-100 hover:border-blue-300 border border-blue-150 rounded-xl px-2.5 py-1.5 text-[10px] font-black text-slate-700 transition shadow-sm cursor-pointer"
                >
                  {b.icon}
                  <span>{b.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setActiveTab("login");
                  setErrorMsg("");
                }}
                className={`pb-2.5 text-xs font-black uppercase tracking-wider relative ${
                  activeTab === "login" 
                    ? "text-[#1A365D] before:absolute before:bottom-0 before:left-0 before:right-0 before:h-1 before:bg-accent-blue before:rounded"
                    : "text-gray-400 hover:text-gray-650"
                }`}
              >
                Masuk Akun
              </button>
              <button
                onClick={() => {
                  setActiveTab("register");
                  setErrorMsg("");
                }}
                className={`pb-2.5 text-xs font-black uppercase tracking-wider relative ${
                  activeTab === "register"
                    ? "text-[#1A365D] before:absolute before:bottom-0 before:left-0 before:right-0 before:h-1 before:bg-accent-blue before:rounded"
                    : "text-gray-400 hover:text-gray-650"
                }`}
              >
                Pendaftaran Baru
              </button>
            </div>

            {/* Role dropdown indicator */}
            {activeTab === "login" && (
              <div className="flex items-center gap-1.5 bg-slate-100 rounded-xl px-2.5 py-1 text-[10px] font-bold text-gray-750">
                <span>Akses Sebagai: </span>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="bg-transparent font-black text-accent-blue focus:outline-none cursor-pointer"
                >
                  <option value="Pencari Kerja">Pencari Kerja</option>
                  <option value="Mitra Industri">Mitra Industri (HRD)</option>
                  <option value="Bupati">Bupati Majalengka</option>
                  <option value="Desa">Operator Desa</option>
                </select>
              </div>
            )}
          </div>

          {/* Core Interactive Credentials Form */}
          <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-semibold">
            
            {activeTab === "register" && (
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-500 tracking-wider">
                  Pilih Kategori Pendaftaran
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRole("Pencari Kerja");
                      setErrorMsg("");
                    }}
                    className={`flex flex-col items-center gap-2 p-3.5 rounded-2xl border text-center transition cursor-pointer ${
                      selectedRole === "Pencari Kerja"
                        ? "border-[#1A365D] bg-indigo-50/40 text-[#1A365D]"
                        : "border-slate-150 bg-white hover:bg-slate-50 text-slate-400"
                    }`}
                  >
                    <Briefcase size={20} className={selectedRole === "Pencari Kerja" ? "text-accent-blue animate-pulse" : "text-gray-400"} />
                    <span className="text-[11px] font-black uppercase tracking-wider block">Pencari Kerja</span>
                    <span className="text-[9px] text-gray-400 font-semibold block leading-tight">Buat AK1 & Lamar Loker</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRole("Mitra Industri");
                      setErrorMsg("");
                    }}
                    className={`flex flex-col items-center gap-2 p-3.5 rounded-2xl border text-center transition cursor-pointer ${
                      selectedRole === "Mitra Industri"
                        ? "border-[#1A365D] bg-indigo-50/40 text-[#1A365D]"
                        : "border-slate-150 bg-white hover:bg-slate-50 text-slate-400"
                    }`}
                  >
                    <Building2 size={20} className={selectedRole === "Mitra Industri" ? "text-accent-blue animate-pulse" : "text-gray-400"} />
                    <span className="text-[11px] font-black uppercase tracking-wider block text-indigo-950">Mitra Industri</span>
                    <span className="text-[9px] text-gray-400 font-semibold block leading-tight">Buka Lowongan & Rekrut</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === "login" ? (
              // Login form fields
              <>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-500 tracking-wider">
                    Alamat Email Terdaftar
                  </label>
                  <div className="flex items-center gap-2 border border-blue-100 bg-slate-50/50 rounded-xl px-3 py-2.5">
                    <Mail size={14} className="text-gray-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Contoh: raditwidjaya11@gmail.com"
                      className="w-full bg-transparent outline-none text-gray-800"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider text-gray-500">
                    <label>Kata Sandi</label>
                    <a href="#reset" className="text-accent-blue hover:underline lowercase font-bold">Lupa kata sandi?</a>
                  </div>
                  <div className="flex items-center justify-between border border-blue-100 bg-slate-50/50 rounded-xl px-3 py-2.5">
                    <div className="flex items-center gap-2 flex-1">
                      <Lock size={14} className="text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Masukkan sandi rahasia Anda"
                        className="w-full bg-transparent outline-none text-gray-800"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600 focus:outline-none ml-2 cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>
              </>
            ) : selectedRole === "Mitra Industri" ? (
              // Specific detailed company registration for Mitra Industri
              <>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-500 tracking-wider">
                    Nama Lengkap Perwakilan HRD *
                  </label>
                  <div className="flex items-center gap-2 border border-blue-100 bg-slate-50/50 rounded-xl px-3 py-2.5">
                    <User size={14} className="text-gray-400" />
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Masukkan nama lengkap Anda selaku representasi HRD"
                      className="w-full bg-transparent outline-none text-gray-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-wider">
                      Nama Perusahaan Resmi (CV/PT) *
                    </label>
                    <div className="flex items-center gap-2 border border-blue-100 bg-slate-50/50 rounded-xl px-3 py-2.5">
                      <Building2 size={14} className="text-gray-400" />
                      <input
                        type="text"
                        required
                        value={regCompany}
                        onChange={(e) => setRegCompany(e.target.value)}
                        placeholder="Contoh: PT Shoetown Ligung"
                        className="w-full bg-transparent outline-none text-gray-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-wider">
                      Nomor Induk Berusaha (NIB) *
                    </label>
                    <div className="flex items-center gap-2 border border-blue-100 bg-slate-50/50 rounded-xl px-3 py-2.5">
                      <ShieldCheck size={14} className="text-gray-400" />
                      <input
                        type="text"
                        required
                        maxLength={13}
                        value={regIndustryNib}
                        onChange={(e) => setRegIndustryNib(e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder="13 Digit No NIB Perusahaan"
                        className="w-full bg-transparent outline-none text-gray-800 font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-wider">
                      Alamat Email HRD Resmi *
                    </label>
                    <div className="flex items-center gap-2 border border-blue-100 bg-slate-50/50 rounded-xl px-3 py-2.5">
                      <Mail size={14} className="text-gray-400" />
                      <input
                        type="email"
                        required
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="Contoh: hrd@company.co.id"
                        className="w-full bg-transparent outline-none text-gray-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-wider">
                      No. WhatsApp / Kontak HRD *
                    </label>
                    <div className="flex items-center gap-2 border border-blue-100 bg-slate-50/50 rounded-xl px-3 py-2.5">
                      <span className="text-[11px] font-semibold text-gray-400 font-mono">+62</span>
                      <input
                        type="text"
                        required
                        value={regIndustryPhone}
                        onChange={(e) => setRegIndustryPhone(e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder="8123456789"
                        className="w-full bg-transparent outline-none text-gray-800 font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-wider">
                      Sektor Bisnis Utama
                    </label>
                    <select
                      value={regIndustrySector}
                      onChange={(e) => setRegIndustrySector(e.target.value)}
                      className="w-full rounded-xl border border-blue-100 bg-slate-50/50 p-2.5 text-gray-800 font-semibold cursor-pointer"
                    >
                      <option value="Manufaktur">Manufaktur (Tekstil, Sepatu, Garmen)</option>
                      <option value="Logistik & Transportasi">Logistik & Kargo (BIJB)</option>
                      <option value="Kuliner / F&B">Kuliner / Food & Beverage</option>
                      <option value="Teknologi & TI">Teknologi & Jasa TI</option>
                      <option value="Kreatif">Kreatif, Kerajinan, & Wisata</option>
                      <option value="Pertanian & Perkebunan">Pertanian & Hasil Bumi</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-wider font-sans">
                      Lokasi Kantor/Pabrik (Kecamatan)
                    </label>
                    <select
                      value={regIndustrySubdistrict}
                      onChange={(e) => setRegIndustrySubdistrict(e.target.value)}
                      className="w-full rounded-xl border border-blue-100 bg-slate-50/50 p-2.5 text-gray-800 font-semibold cursor-pointer"
                    >
                      <option value="Ligung">Kecamatan Ligung</option>
                      <option value="Kertajati">Kecamatan Kertajati (Aerocity)</option>
                      <option value="Jatiwangi">Kecamatan Jatiwangi</option>
                      <option value="Dawuan">Kecamatan Dawuan</option>
                      <option value="Kasokandel">Kecamatan Kasokandel</option>
                      <option value="Sumberjaya">Kecamatan Sumberjaya</option>
                      <option value="Majalengka">Kecamatan Majalengka Kota</option>
                      <option value="Kadipaten">Kecamatan Kadipaten</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-black uppercase text-gray-500 tracking-wider leading-none mb-1">
                    <span>Komitmen Serapan Tenaga Kerja Lokal Majalengka *</span>
                    <span className="text-[#1A365D] font-extrabold text-xs">{regIndustryWorkersTarget}%</span>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-blue-50/50">
                    <input
                      type="range"
                      min="50"
                      max="100"
                      step="5"
                      value={regIndustryWorkersTarget}
                      onChange={(e) => setRegIndustryWorkersTarget(e.target.value)}
                      className="w-full accent-[#1A365D] bg-slate-200 rounded-lg appearance-none h-1.5 cursor-pointer"
                    />
                    <span className="text-[9px] font-extrabold text-slate-400 tracking-wide uppercase shrink-0">Min 50%</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-500 tracking-wider">
                    Kata Sandi Akun HRD *
                  </label>
                  <div className="flex items-center gap-2 border border-blue-100 bg-slate-50/50 rounded-xl px-3 py-2.5">
                    <Lock size={14} className="text-gray-400" />
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Masukkan sandi rahasia untuk konsol perusahan"
                      className="w-full bg-transparent outline-none text-gray-800"
                    />
                  </div>
                </div>
              </>
            ) : (
              // Registration form fields for Pencari Kerja
              <>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-500 tracking-wider">
                    Nama Lengkap Sesuai KTP *
                  </label>
                  <div className="flex items-center gap-2 border border-blue-100 bg-slate-50/50 rounded-xl px-3 py-2.5">
                    <User size={14} className="text-gray-400" />
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Masukkan nama lengkap Anda"
                      className="w-full bg-transparent outline-none text-gray-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-wider">
                      Alamat Email Aktif *
                    </label>
                    <div className="flex items-center gap-2 border border-blue-100 bg-slate-50/50 rounded-xl px-3 py-2.5">
                      <Mail size={14} className="text-gray-400" />
                      <input
                        type="email"
                        required
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="Contoh: user@gmail.com"
                        className="w-full bg-transparent outline-none text-gray-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-wider">
                      Nomor Induk Kependudukan (NIK Pemkab)
                    </label>
                    <div className="flex items-center gap-2 border border-blue-100 bg-slate-50/50 rounded-xl px-3 py-2.5">
                      <ShieldCheck size={14} className="text-gray-400" />
                      <input
                        type="text"
                        maxLength={16}
                        value={regNik}
                        onChange={(e) => setRegNik(e.target.value)}
                        placeholder="3210..."
                        className="w-full bg-transparent outline-none text-gray-800 font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-wider">
                      Kata Sandi Baru *
                    </label>
                    <div className="flex items-center gap-2 border border-blue-100 bg-slate-50/50 rounded-xl px-3 py-2.5">
                      <Lock size={14} className="text-gray-400" />
                      <input
                        type="password"
                        required
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="Min 6 karakter rahasia"
                        className="w-full bg-transparent outline-none text-gray-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-wider">
                      Jenis Kelamin
                    </label>
                    <select
                      value={regGender}
                      onChange={(e) => setRegGender(e.target.value)}
                      className="w-full rounded-xl border border-blue-100 bg-slate-50/50 p-2.5 text-gray-800"
                    >
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 bg-gradient-to-r from-[#1A365D] to-accent-blue text-white rounded-xl font-black text-xs uppercase tracking-wider shadow-md hover:opacity-95 transition flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Memproses Verifikasi...
                </>
              ) : (
                <>
                  <LogIn size={15} />
                  {activeTab === "login" ? "Masuk ke Sistem" : "Selesaikan Pendaftaran"}
                </>
              )}
            </button>
          </form>

          {/* Bottom notices */}
          <div className="flex items-start gap-2 bg-blue-50/60 rounded-xl p-3 border border-blue-100/50 text-[10px] text-gray-600 font-semibold leading-relaxed">
            <Info size={14} className="text-accent-blue shrink-0 mt-0.5" />
            <span>
              Seluruh data autentikasi dilindungi dengan enkripsi hash 256-bit dan diawasi langsung oleh Disnaker Kabupaten Majalengka demi menjamin kenyamanan & keamanan relasi industrial Anda.
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
