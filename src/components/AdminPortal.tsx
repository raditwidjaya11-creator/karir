import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Building2, 
  Briefcase, 
  ShieldCheck, 
  Users, 
  FileText, 
  Plus, 
  Check, 
  X, 
  AlertTriangle, 
  Trash2, 
  FileWarning, 
  Calendar, 
  Search, 
  BookOpen, 
  ArrowRight, 
  Map, 
  RefreshCw, 
  TrendingUp, 
  Grid, 
  Sliders, 
  Lock, 
  Activity, 
  UserPlus, 
  Eye, 
  BellRing,
  MessageSquare,
  Sparkles,
  Copy,
  Send,
  Megaphone,
  Smartphone
} from "lucide-react";
import DisnakerChatHub from "./DisnakerChatHub";
import { 
  MOCK_JOBS, 
  MOCK_COMPANIES, 
  MOCK_COMPLAINTS, 
  MOCK_TRAININGS, 
  MAJALENGKA_SUBDISTRICTS 
} from "../data/mockData";
import { JobVacancy, CompanyProfile, ComplaintTicket, TrainingProgram, Ak1Application } from "../types";

// Seed active mock AK1 application queue
const INITIAL_AK1_APPLICATIONS: Ak1Application[] = [
  {
    id: "ak1_901",
    nik: "3210120205980003",
    fullName: "Radit Widjaya",
    birthPlaceDate: "Majalengka, 12-05-1998",
    gender: "Laki-laki",
    education: "SMK Teknik Mesin",
    major: "Teknik Pemesinan Bubut",
    address: "Jl. Pemuda No. 12, Kelurahan Cicurug",
    subdistrict: "Majalengka",
    village: "Cicurug",
    photoUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
    status: "Diajukan"
  },
  {
    id: "ak1_902",
    nik: "3210150912950001",
    fullName: "Indra Lesmana",
    birthPlaceDate: "Kadipaten, 15-09-1995",
    gender: "Laki-laki",
    education: "S1 Sistem Informasi",
    major: "Teknologi Enterprise",
    address: "Blok Selasa Rt 03 Rw 01, Desa Heuleut",
    subdistrict: "Kadipaten",
    village: "Heuleut",
    photoUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
    status: "Diajukan"
  },
  {
    id: "ak1_903",
    nik: "3210082403990002",
    fullName: "Siti Rahmawati",
    birthPlaceDate: "Jatiwangi, 24-03-1999",
    gender: "Perempuan",
    education: "SMA IPA",
    major: "Ilmu Pengetahuan Alam",
    address: "Gang Dahlia No 4, Jatisura",
    subdistrict: "Jatiwangi",
    village: "Jatisura",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    status: "Aktif",
    cardNum: "32.10.2026.00234",
    issuedDate: "2026-05-10",
    expiryDate: "2028-05-10"
  },
  {
    id: "ak1_904",
    nik: "3210114812010005",
    fullName: "Dina Mariana",
    birthPlaceDate: "Ligung, 18-12-2001",
    gender: "Perempuan",
    education: "SMK Tatabusana",
    major: "Desain Mode & Menjahit",
    address: "Blok Manis No 10, Desa Ligung Lor",
    subdistrict: "Ligung",
    village: "Ligung Lor",
    photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    status: "Diajukan"
  }
];

// Mock Emergency Alarm Signals for K3
interface PanicAlert {
  id: string;
  companyName: string;
  subdistrict: string;
  incidentType: string;
  timestamp: string;
  reporterPhone: string;
  status: "Aktif" | "Mitigasi" | "Selesai";
  riskLevel: "CRITICAL" | "HIGH" | "MEDIUM";
  note?: string;
}

const INITIAL_PANIC_ALERTS: PanicAlert[] = [
  {
    id: "pnc_001",
    companyName: "PT Shoetown Ligung Indonesia",
    subdistrict: "Ligung",
    incidentType: "Kebakaran Generator Listrik Utama (Gedung B)",
    timestamp: "2026-06-06 17:45 WIB",
    reporterPhone: "0812-3456-7890",
    status: "Aktif",
    riskLevel: "CRITICAL",
    note: "Alat pemadam kebakaran portabel telah dikerahkan, menunggu pemadam dakar terdekat dinas Damkar Majalengka."
  },
  {
    id: "pnc_002",
    companyName: "PT Kaldu Sari Nabati Dawuan",
    subdistrict: "Dawuan",
    incidentType: "Kebocoran Pipa Uap Air Boiler Tekanan Tinggi",
    timestamp: "2026-06-06 14:12 WIB",
    reporterPhone: "0877-6543-2109",
    status: "Mitigasi",
    riskLevel: "HIGH",
    note: "Tekanan uap berhasil diisolasi oleh tim internal K3. Tim inspeksi Disnaker meluncur ke lokasi untuk penyelidikan resmi."
  },
  {
    id: "pnc_003",
    companyName: "PT Gistex Garment Indonesia",
    subdistrict: "Kasokandel",
    incidentType: "Korsleting Listrik Panel Konveksi Lantai 1",
    timestamp: "2026-05-30 09:30 WIB",
    reporterPhone: "0852-9876-5432",
    status: "Selesai",
    riskLevel: "MEDIUM",
    note: "Telah selesai diperiksa, ganti kabel standar SNI selesai dilakukan dan disahkan aman oleh PLN Majalengka."
  }
];

export interface CompanyRegistrationRequest {
  id: string;
  companyName: string;
  nib: string;
  sector: string;
  representativeName: string;
  email: string;
  submissionDate: string;
  status: "Pending" | "Disetujui" | "Ditolak";
  documentUrl: string;
}

export const INITIAL_COMPANY_REGISTRATIONS: CompanyRegistrationRequest[] = [
  {
    id: "reg_001",
    companyName: "PT Wings Food Kertajati",
    nib: "9120301129302",
    sector: "F&B Manufaktur",
    representativeName: "Budi Santoso",
    email: "budi.santoso@wingscorp-kertajati.co.id",
    submissionDate: "2026-06-05",
    status: "Pending",
    documentUrl: "akta_pendirian_dan_oss.pdf"
  },
  {
    id: "reg_002",
    companyName: "PT Kertajati Autoparts",
    nib: "8120400183741",
    sector: "Manufaktur Komponen Otomotif",
    representativeName: "Diana Lestari",
    email: "diana.lestari@kertajati-autoparts.com",
    submissionDate: "2026-06-06",
    status: "Pending",
    documentUrl: "nib_oss_autocomp_kertajati.pdf"
  },
  {
    id: "reg_003",
    companyName: "CV Majalengka Keramik Mandiri",
    nib: "7120300192837",
    sector: "Kreatif & Industri Tanah Liat",
    representativeName: "Ahmad Jalaludin",
    email: "ahmad.j@majalengkaceramic.co.id",
    submissionDate: "2026-06-04",
    status: "Pending",
    documentUrl: "ijin_mikro_terbuka.pdf"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" }
  }
};

export default function AdminPortal() {
  const [adminTab, setAdminTab] = useState<"ak1" | "jobs" | "complaints" | "blk" | "panic" | "villagedata" | "chat" | "ai_assistant" | "notifications">("ak1");
  const [companyRegistrations, setCompanyRegistrations] = useState<CompanyRegistrationRequest[]>(INITIAL_COMPANY_REGISTRATIONS);
  
  // Localized state for admin interactions
  const [ak1Apps, setAk1Apps] = useState<Ak1Application[]>(INITIAL_AK1_APPLICATIONS);
  const [jobs, setJobs] = useState<JobVacancy[]>(MOCK_JOBS);
  const [companies, setCompanies] = useState<CompanyProfile[]>(MOCK_COMPANIES);
  const [complaints, setComplaints] = useState<ComplaintTicket[]>(MOCK_COMPLAINTS);
  const [trainings, setTrainings] = useState<TrainingProgram[]>(MOCK_TRAININGS);
  const [panicAlerts, setPanicAlerts] = useState<PanicAlert[]>(INITIAL_PANIC_ALERTS);
  const [villageStats, setVillageStats] = useState<typeof MAJALENGKA_SUBDISTRICTS>(MAJALENGKA_SUBDISTRICTS);

  // Search filter query states
  const [searchQuery, setSearchQuery] = useState("");
  const [alertMsg, setAlertMsg] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);

  // Form states for creating new training class
  const [newClassTitle, setNewClassTitle] = useState("");
  const [newClassDuration, setNewClassDuration] = useState("80 Jam Pelajaran");
  const [newClassStartDate, setNewClassStartDate] = useState("2026-08-01");
  const [newClassQuota, setNewClassQuota] = useState(25);
  const [newClassInstructor, setNewClassInstructor] = useState("");
  const [newClassDesc, setNewClassDesc] = useState("");
  const [isAddingClass, setIsAddingClass] = useState(false);

  // Form states for creating a corporate vacancy
  const [newJobTitle, setNewJobTitle] = useState("");
  const [newJobCompany, setNewJobCompany] = useState(MOCK_COMPANIES[0].name);
  const [newJobType, setNewJobType] = useState<"Full-Time" | "Kontrak" | "Magang" | "Massal">("Full-Time");
  const [newJobSalary, setNewJobSalary] = useState("Rp 2.500.000 - Rp 3.200.000");
  const [newJobSector, setNewJobSector] = useState("Manufaktur");
  const [newJobLocation, setNewJobLocation] = useState("Ligung");
  const [isAddingJob, setIsAddingJob] = useState(false);

  // AI Response Assistant states
  const [selectedAsstType, setSelectedAsstType] = useState<"complaint" | "company">("complaint");
  const [selectedAsstId, setSelectedAsstId] = useState<string>("");
  const [asstDrafts, setAsstDrafts] = useState<{ label: string; text: string }[]>([]);
  const [isAsstLoading, setIsAsstLoading] = useState(false);
  const [copiedDraftIdx, setCopiedDraftIdx] = useState<number | null>(null);

  // Bulk Notification Panel states
  const [notiSegment, setNotiSegment] = useState<string>("pencaker_all");
  const [notiChannel, setNotiChannel] = useState<"WhatsApp" | "Push Notification">("WhatsApp");
  const [broadcastTitle, setBroadcastTitle] = useState("");
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [isPolishingNoti, setIsPolishingNoti] = useState(false);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastProgress, setBroadcastProgress] = useState(0);
  const [broadcastTargetCount, setBroadcastTargetCount] = useState(0);

  const [broadcastHistory, setBroadcastHistory] = useState<any[]>([
    {
      id: "hist_001",
      title: "Sosialisasi Kelas Pelatihan Las Listrik & Bubut Baru di BLK",
      message: "Sampurasun ku sadayana! Dibuka pendaftaran kelas pelatihan vokasi baru khusus keahlian Las Listrik Presisi dan Pemesinan Bubut CNC di BLK Dinas Ketenagakerjaan Kabupaten Majalengka. Gratis biaya pelatihan, modul, seragam, dan uang saku harian. Kuota terbatas hanya 20 orang per angkatan, segera daftarkan diri Anda!",
      segment: "Semua Pencari Kerja Aktif (Pencaker)",
      channel: "WhatsApp",
      date: "2026-06-02 14:15",
      reachedCount: 142,
      status: "Berhasil"
    },
    {
      id: "hist_002",
      title: "Pengingat Laporan Kepatuhan Penyerapan Tenaga Kerja Lokal",
      message: "Kepada Yth. Pimpinan HRD Mitra Industri Majalengka. Mengingatkan kembali kepatuhan pengisian instrumen pelaporan triwulan penyerapan tenaga kerja lokal minimal 80% sesuai Peraturan Daerah No 4 Tahun 2021. Mohon mengisi sebelum tanggal 10 Juni 2026.",
      segment: "Semua Perusahaan Terdaftar (Mitra Industri)",
      channel: "WhatsApp",
      reachedCount: 42,
      status: "Berhasil",
      date: "2026-06-04 09:30"
    }
  ]);

  const getSegmentDetails = (segCode: string) => {
    switch (segCode) {
      case "pencaker_all":
        return { name: "Semua Pencari Kerja Aktif (Pencaker)", count: ak1Apps.length + 115 };
      case "ak1_pending":
        return { name: "Pengaju Kartu AK1 (Pending Verifikasi)", count: ak1Apps.filter(a => a.status === "Diajukan").length };
      case "blk_alumni":
        return { name: "Pendaftar & Alumni BLK Vokasi", count: 185 };
      case "companies_all":
        return { name: "Semua Perusahaan Terdaftar (Mitra Industri)", count: companies.length };
      case "companies_active":
        return { name: "Mitra Industri dengan Lowongan Aktif", count: new Set(jobs.map(j => j.companyName)).size };
      case "pendaftaran_pending":
        return { name: "Pendaftar Industri Baru (Pending)", count: companyRegistrations.filter(r => r.status === "Pending").length };
      default:
        return { name: "Tidak Diketahui", count: 0 };
    }
  };

  const handleOptimizeNotification = async () => {
    if (!broadcastMessage.trim()) {
      triggerAlert("error", "Tuliskan isi pesan kasar terlebih dahulu di kotak teks");
      return;
    }
    setIsPolishingNoti(true);
    try {
      const response = await fetch("/api/gemini/polish-blast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: broadcastTitle,
          message: broadcastMessage,
          segment: getSegmentDetails(notiSegment).name,
          channel: notiChannel
        })
      });
      if (!response.ok) throw new Error("Gagal memoles pesan menggunakan AI");
      const data = await response.json();
      if (data.polishedTitle) setBroadcastTitle(data.polishedTitle);
      if (data.polishedMessage) setBroadcastMessage(data.polishedMessage);
      triggerAlert("success", "Pesan Anda berhasil dipoles & dirapikan oleh AI Gemini!");
    } catch (err: any) {
      console.error(err);
      triggerAlert("error", err.message || "Gagal menghubungi AI");
    } finally {
      setIsPolishingNoti(false);
    }
  };

  const handleSendBroadcast = () => {
    if (!broadcastTitle.trim() || !broadcastMessage.trim()) {
      triggerAlert("error", "Judul dan isi pesan tidak boleh kosong!");
      return;
    }

    const { name: segmentName, count: targetCount } = getSegmentDetails(notiSegment);
    setBroadcastTargetCount(targetCount);
    setIsBroadcasting(true);
    setBroadcastProgress(0);

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 12;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        
        const now = new Date();
        const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
        
        const newLog = {
          id: `hist_${Date.now()}`,
          title: broadcastTitle,
          message: broadcastMessage,
          segment: segmentName,
          channel: notiChannel,
          date: dateStr,
          reachedCount: targetCount,
          status: "Berhasil"
        };

        setBroadcastHistory(prev => [newLog, ...prev]);
        setIsBroadcasting(false);
        setBroadcastTitle("");
        setBroadcastMessage("");
        triggerAlert("success", `Notifikasi massal berhasil dipulih & dikirim ke ${targetCount} penerima via ${notiChannel}!`);
      } else {
        setBroadcastProgress(currentProgress);
      }
    }, 200);
  };

  // Initialize selectedId when type or list changes
  React.useEffect(() => {
    if (selectedAsstType === "complaint") {
      if (complaints.length > 0) {
        setSelectedAsstId(complaints[0].id);
      }
    } else {
      if (companyRegistrations.length > 0) {
        setSelectedAsstId(companyRegistrations[0].id);
      }
    }
    setAsstDrafts([]);
    setCopiedDraftIdx(null);
  }, [selectedAsstType]);

  const handleGenerateAsstDraftsObj = async () => {
    const targetItem = selectedAsstType === "complaint"
      ? complaints.find(c => c.id === selectedAsstId)
      : companyRegistrations.find(r => r.id === selectedAsstId);

    if (!targetItem) {
      setAlertMsg({ type: "error", text: "Silakan pilih tiket/berkas terlebih dahulu" });
      return;
    }

    setIsAsstLoading(true);
    setAsstDrafts([]);
    setCopiedDraftIdx(null);
    try {
      const response = await fetch("/api/gemini/asst-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: selectedAsstType,
          payload: targetItem
        })
      });
      if (!response.ok) throw new Error("Gagal memperoleh draf balasan AI");
      const data = await response.json();
      if (data.drafts) {
        setAsstDrafts(data.drafts);
      } else {
        setAlertMsg({ type: "error", text: "Format draf dari AI tidak didukung" });
      }
    } catch (err: any) {
      console.error(err);
      setAlertMsg({ type: "error", text: err.message || "Koneksi ke Gemini AI terganggu" });
    } finally {
      setIsAsstLoading(false);
    }
  };

  const handleSimulateSend = (targetIdx: number, textBody: string) => {
    const targetItem = selectedAsstType === "complaint"
      ? complaints.find(c => c.id === selectedAsstId)
      : companyRegistrations.find(r => r.id === selectedAsstId);

    if (!targetItem) return;

    if (selectedAsstType === "company") {
      setCompanyRegistrations(prev => prev.map(r => r.id === targetItem.id ? { ...r, status: "Disetujui" } : r));
      
      const alreadyExists = companies.some(c => c.nib === targetItem.nib);
      if (!alreadyExists) {
        const newCoProfile = {
          id: `co_${targetItem.id}`,
          name: targetItem.companyName,
          logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=200&auto=format&fit=crop",
          nib: targetItem.nib,
          npwp: "09.321.432.1-439.000",
          address: `Kawasan Sinergi Industri, Kecamatan ${targetItem.sector.includes("Kertajati") ? "Kertajati" : "Ligung"}, Kabupaten Majalengka`,
          subdistrict: targetItem.sector.includes("Kertajati") ? "Kertajati" : "Ligung",
          coordinate: { lat: -6.7, lng: 108.2 },
          employeeCount: 450,
          sector: targetItem.sector,
          website: "https://mitra-kemitraan.majalengka.go.id",
          csrRating: 4.5,
          rating: 4.4,
          localWorkforcePercent: 90
        };
        setCompanies(prev => [newCoProfile, ...prev]);
      }

      setAlertMsg({
        type: "success",
        text: `Sukses! Email persetujuan rekrutmen formal dikirimkan ke Sdr/i. ${targetItem.representativeName} (${targetItem.email}). Akun ${targetItem.companyName} terverifikasi aktif.`
      });
    } else {
      setComplaints(prev => prev.map(c => c.id === targetItem.id ? { ...c, status: "Diverifikasi", mediationSchedule: "Agenda mediasi dijadwalkan oleh dinas" } : c));
      setAlertMsg({
        type: "success",
        text: `Sukses! Draf surat panggilan mediasi dikirimkan kepada pelapor ${targetItem.reporterName}. Status aduan dinaikkan ke 'Diverifikasi'!`
      });
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const triggerAlert = (type: "success" | "error" | "info", text: string) => {
    setAlertMsg({ type, text });
    setTimeout(() => {
      setAlertMsg(null);
    }, 4000);
  };

  // 1. Digital AK1 Functions
  const handleApproveAK1 = (appId: string) => {
    const randomAK1Num = `32.10.2026.${Math.floor(100000 + Math.random() * 900000)}`;
    const today = new Date().toISOString().split("T")[0];
    const expiryY = new Date();
    expiryY.setFullYear(expiryY.getFullYear() + 2);
    const expiry = expiryY.toISOString().split("T")[0];

    setAk1Apps(prev => prev.map(a => {
      if (a.id === appId) {
        return {
          ...a,
          status: "Aktif",
          cardNum: randomAK1Num,
          issuedDate: today,
          expiryDate: expiry
        };
      }
      return a;
    }));
    triggerAlert("success", "Permohonan Kartu Kuning AK1 berhasil disahkan! Nomor seri kartu dicetak & didaftarkan otomatis ke sistem pusat.");
  };

  const handleRejectAK1 = (appId: string) => {
    setAk1Apps(prev => prev.map(a => {
      if (a.id === appId) {
        return { ...a, status: "Draft" };
      }
      return a;
    }));
    triggerAlert("info", "Lampiran AK1 ditolak. Pengaju diberi tahu melalui notifikasi email agar mengunggah dokumen baru.");
  };

  // 2. Jobs and Company controls
  const handleToggleRebanaVIP = (jobId: string) => {
    setJobs(prev => prev.map(j => {
      if (j.id === jobId) {
        const newValue = !j.isKertajatiRebana;
        triggerAlert("success", `Status Kertajati Rebana untuk Loker "${j.title}" diubah menjadi ${newValue ? "AKTIF" : "NONAKTIF"}.`);
        return { ...j, isKertajatiRebana: newValue };
      }
      return j;
    }));
  };

  const handleDeleteJob = (jobId: string) => {
    setJobs(prev => prev.filter(j => j.id !== jobId));
    triggerAlert("error", "Iklan lowongan kerja mencurigakan / kedaluwarsa berhasil diturunkan (Takedown).");
  };

  const handleBanCompany = (coId: string, companyName: string) => {
    setCompanies(prev => prev.map(c => {
      if (c.id === coId) {
        // Toggle Local Hiring Badge or CSR score to simulate auditing status
        const isBanned = c.localWorkforcePercent <= 50;
        const newPercent = isBanned ? 85 : 45; // simulate role switch
        return { ...c, localWorkforcePercent: newPercent };
      }
      return c;
    }));
    triggerAlert("info", `Audit Kepatuhan PT ${companyName} selesai diperbarui!`);
  };

  const handleAddNewJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobTitle) {
      triggerAlert("error", "Mohon isi judul posisi lowongan kerja!");
      return;
    }
    
    const randomId = `job_gen_${Math.floor(100+Math.random()*900)}`;
    const matchingCompany = companies.find(c => c.name === newJobCompany) || companies[0];

    const generatedJob: JobVacancy = {
      id: randomId,
      companyId: matchingCompany.id,
      companyName: matchingCompany.name,
      companyLogo: matchingCompany.logo,
      title: newJobTitle,
      location: `Kecamatan ${newJobLocation}`,
      salaryRange: newJobSalary,
      jobType: newJobType,
      experience: "Lulusan Baru / 1 Tahun Pengalaman",
      education: "SMA/SMK Sederajat atau D3/S1",
      requirements: ["Memiliki Integritas Kerja", "KTP Kabupaten Majalengka diutamakan"],
      responsibilities: ["Mendukung operasional bisnis", "Menerapkan standar kerja K3 nasional"],
      postedAt: new Date().toISOString().split("T")[0],
      sector: newJobSector as any,
      isKertajatiRebana: true,
      rating: 4.5,
      applicationsCount: 0
    };

    setJobs([generatedJob, ...jobs]);
    setNewJobTitle("");
    setIsAddingJob(false);
    triggerAlert("success", `Berhasil memposting Lowongan Resmi Disnaker: ${generatedJob.title}!`);
  };

  // 3. Complaints Dispute operations
  const handleUpdateComplaintStatus = (ticketId: string, newStatus: ComplaintTicket["status"]) => {
    setComplaints(prev => prev.map(c => {
      if (c.id === ticketId) {
        let updateSched = c.mediationSchedule;
        if (newStatus === "Mediasi") {
          updateSched = `2026-06-25 09:30 WIB di Ruang Mediasi Disnaker Majalengka / Zoom`;
        } else if (newStatus === "Selesai") {
          updateSched = `Kasus selesai terpecahkan via mufakat kesepakatan Tripartit resmi.`;
        }
        return {
          ...c,
          status: newStatus,
          mediationSchedule: updateSched
        };
      }
      return c;
    }));
    triggerAlert("success", `Status aduan tiket berhasil diubah menjadi: ${newStatus}`);
  };

  // 4. BLK Training class creation
  const handleAddNewClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassTitle || !newClassInstructor) {
      triggerAlert("error", "Judul kelas dan instruktur utama wajib diisi!");
      return;
    }

    const newClass: TrainingProgram = {
      id: `train_gen_${Math.floor(100+Math.random()*900)}`,
      title: newClassTitle,
      duration: newClassDuration,
      startDate: newClassStartDate,
      quota: Number(newClassQuota),
      registeredCount: 0,
      instructor: newClassInstructor,
      syllabus: ["Dasar pengenalan teori komprehensif", "Studi kasus langsung di Lab Vokasi", "Sertifikasi uji kompetensi BNSP"],
      isSertifikasi: true,
      videoLessons: [],
      description: newClassDesc || "Kelas sertifikasi terapan unggulan yang diselenggarakan penuh oleh Balai Latihan Kerja Disnaker Majalengka."
    };

    setTrainings([...trainings, newClass]);
    setNewClassTitle("");
    setNewClassInstructor("");
    setNewClassDesc("");
    setIsAddingClass(false);
    triggerAlert("success", `Kelas Vokasi BLK Baru berhasil dibuka: "${newClass.title}"!`);
  };

  const handleIncreaseQuota = (trainId: string) => {
    setTrainings(prev => prev.map(t => {
      if (t.id === trainId) {
        triggerAlert("success", `Kuota kelas "${t.title}" ditingkatkan menjadi ${t.quota + 5} siswa.`);
        return { ...t, quota: t.quota + 5 };
      }
      return t;
    }));
  };

  // 5. Panic Button Emergencies mitigations
  const handleResolvePanicStatus = (panicId: string, updateTo: "Mitigasi" | "Selesai") => {
    setPanicAlerts(prev => prev.map(p => {
      if (p.id === panicId) {
        return { 
          ...p, 
          status: updateTo,
          note: updateTo === "Mitigasi" 
            ? "Pihak pengawas Disnaker dalam komunikasi intensif penanganan bersama unit damkar medis." 
            : "Emergency teratasi. Laporan kejadian kecelakaan K3 diarsipkan resmi."
        };
      }
      return p;
    }));
    triggerAlert("info", `Alarm panic diupdate ke status: ${updateTo}`);
  };

  // 6. Village statistics simulation sync
  const handleGlobalVillageDataSync = () => {
    // Simulate updating counts from rural operators
    setVillageStats(prev => prev.map(s => {
      const addedRandom = Math.floor(Math.random() * 12) - 5; // tiny change
      return {
        ...s,
        unemploymentCount: Math.max(10, s.unemploymentCount + addedRandom),
        workforceCount: s.workforceCount + Math.floor(Math.random() * 15)
      };
    }));
    triggerAlert("success", "Sinkronisasi Sukses! Mendapatkan data pengangguran terpadu secara live dari 26 Kecamatan & 330 operator Desa se-Kabupaten Majalengka.");
  };

  // Filter systems basic logic
  const filteredAK1 = ak1Apps.filter(a => 
    a.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.nik.includes(searchQuery) ||
    a.subdistrict.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredJobs = jobs.filter(j => 
    j.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    j.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredComplaints = complaints.filter(c => 
    c.reporterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activePanicCount = panicAlerts.filter(p => p.status === "Aktif").length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Alert Ribbon Banner */}
      {alertMsg && (
        <div className={`fixed top-24 right-6 z-50 rounded-2xl p-4 shadow-xl border w-96 flex items-start gap-3 transition-all transform animate-slideIn ${
          alertMsg.type === "success" 
            ? "bg-emerald-50 border-emerald-300 text-emerald-900" 
            : alertMsg.type === "error" 
            ? "bg-red-50 border-red-300 text-red-900" 
            : "bg-blue-50 border-blue-300 text-blue-900"
        }`}>
          <div className="mt-0.5">
            {alertMsg.type === "success" ? <ShieldCheck size={20} className="text-emerald-600" /> : <AlertTriangle size={20} className="text-red-500" />}
          </div>
          <div className="flex-1">
            <h5 className="font-extrabold text-xs uppercase tracking-wider">Pemberitahuan Sistem Admin</h5>
            <p className="text-[11px] font-semibold mt-1 leading-relaxed">{alertMsg.text}</p>
          </div>
        </div>
      )}

      {/* Admin Title Board */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-gradient-to-r from-[#1A365D] via-[#1E40AF] to-indigo-900 rounded-[32px] p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-yellow-400 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
              OTORITAS DISNAKER
            </span>
            <div className="flex items-center gap-1.5 text-yellow-300 font-extrabold text-[11px]">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping"></span>
              <span>Dinas Online: Sutisna, S.Kom</span>
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-none font-sans">
            Portal Admin Command Center
          </h1>
          <p className="text-xs text-blue-100 max-w-xl font-medium leading-relaxed">
            Pusat pengesahan Kartu Kuning AK1, pengawasan lowongan terakreditasi, mediasi sengketa tripartit buruh, serta monitoring sinyal emergency K3 pabrik Rebana Majalengka.
          </p>
        </div>

        {/* Global Stats Widgets inside Title board */}
        <div className="flex flex-wrap gap-2 md:self-end">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-2 text-center border border-white/10 min-w-[90px] cursor-pointer"
          >
            <p className="text-[9px] font-bold text-blue-200 uppercase">AK1 Antrean</p>
            <p className="text-xl font-black text-yellow-300 font-mono">
              {ak1Apps.filter(a => a.status === "Diajukan").length}
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.18, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-2 text-center border border-white/10 min-w-[90px] cursor-pointer"
          >
            <p className="text-[9px] font-bold text-blue-200 uppercase">Aduan Aktif</p>
            <p className="text-xl font-black text-[#F43F5E] font-mono">
              {complaints.filter(c => c.status !== "Selesai").length}
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.26, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-2 text-center border border-white/10 min-w-[90px] relative cursor-pointer"
          >
            {activePanicCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white rounded-full text-[8px] font-extrabold w-4 h-4 flex items-center justify-center animate-bounce">
                {activePanicCount}
              </span>
            )}
            <p className="text-[9px] font-bold text-blue-200 uppercase">Panic Fire</p>
            <p className="text-xl font-black text-red-400 font-mono">
              {activePanicCount}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Internal Navigation Tabs */}
      <div className="border-b border-gray-250 pb-2 flex flex-wrap gap-1 md:gap-2">
        {[
          { id: "ak1", label: "Antrean AK1 Digital", icon: <FileText size={14} />, badge: ak1Apps.filter(a => a.status === "Diajukan").length },
          { id: "jobs", label: "Moderasi Loker & Industri", icon: <Briefcase size={14} /> },
          { id: "complaints", label: "Mediasi Ketenagakerjaan", icon: <FileWarning size={14} />, badge: complaints.filter(c => c.status !== "Selesai").length },
          { id: "blk", label: "Kelola Kelas BLK Vokasi", icon: <BookOpen size={14} /> },
          { id: "panic", label: "Hazard Panic Alarm", icon: <BellRing size={14} />, badge: activePanicCount, badgeColor: "bg-red-500" },
          { id: "villagedata", label: "Sinkron Kelurahan", icon: <Map size={14} /> },
          { id: "chat", label: "Hub Chat & AI Co-Pilot", icon: <MessageSquare size={14} />, badgeColor: "bg-emerald-500" },
          { id: "ai_assistant", label: "AI Response Assistant", icon: <Sparkles size={14} className="text-violet-500" />, badgeColor: "bg-violet-600" },
          { id: "notifications", label: "Siaran Massal & Blast", icon: <Megaphone size={14} className="text-emerald-500" />, badgeColor: "bg-emerald-650" }
        ].map(t => (
          <button
            key={t.id}
            id={`admin-tab-btn-${t.id}`}
            onClick={() => {
              setAdminTab(t.id as any);
              setSearchQuery("");
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition ${
              adminTab === t.id 
                ? "bg-accent-blue text-white shadow-md shadow-blue-500/10" 
                : "bg-white hover:bg-slate-100 text-slate-705 border border-slate-200"
            }`}
          >
            {t.icon}
            <span>{t.label}</span>
            {t.badge !== undefined && t.badge > 0 && (
              <span className={`px-1.5 py-0.5 rounded-full text-[9px] text-white font-bold ${t.badgeColor || "bg-yellow-500 text-slate-900"}`}>
                {t.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Shared Search Utility Bar */}
      {adminTab !== "panic" && adminTab !== "villagedata" && adminTab !== "chat" && adminTab !== "ai_assistant" && adminTab !== "notifications" && (
        <div className="flex bg-white rounded-2xl border border-blue-100 p-3 items-center gap-2 shadow-sm">
          <Search size={16} className="text-gray-400" />
          <input 
            type="text" 
            placeholder={`Cari antrean admin (${adminTab === "ak1" ? "Nama Pengaju, NIK" : adminTab === "jobs" ? "Judul Loker, Perusahaan" : "Nama Pelapor, Nama Perusahaan"})...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs outline-none text-slate-800"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")} 
              className="text-[10px] text-gray-400 hover:text-gray-700 uppercase font-black"
            >
              Reset
            </button>
          )}
        </div>
      )}

      {/* TAB CONTENT: 1. AK1 Verification Queue */}
      {adminTab === "ak1" && (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <span>Verifikasi Dokumen Kartu AK1 (Kartu Kuning Digital)</span>
              </h3>
              <p className="text-xs text-gray-500 font-semibold">Tugas Operator: Memeriksa kesesuaian data NIK kependudukan, lalu menerbitkan kartu resmi ber-barcode.</p>
            </div>
            <div className="text-xs font-bold text-gray-405 shrink-0">
              Menampilkan {filteredAK1.length} Data Pemohon
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {filteredAK1.map((app) => (
              <motion.div 
                variants={cardVariants}
                key={app.id} 
                className="bg-white rounded-3xl border border-blue-105 p-6 shadow-sm flex flex-col md:flex-row gap-5 relative overflow-hidden"
              >
                {/* Visual indicator ribbon */}
                <div className={`absolute top-0 left-0 w-1.5 h-full ${
                  app.status === "Aktif" ? "bg-emerald-500" : "bg-yellow-400 animate-pulse"
                }`}></div>

                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <img src={app.photoUrl} alt={app.fullName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>

                <div className="space-y-2 flex-1 text-xs">
                  <div className="flex flex-wrap items-center gap-2 justify-between">
                    <h4 className="text-sm font-black text-slate-900">{app.fullName}</h4>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                      app.status === "Aktif" 
                        ? "bg-emerald-100 text-emerald-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {app.status === "Aktif" ? "Disahkan (Aktif)" : "Verifikasi Pending"}
                    </span>
                  </div>

                  <p className="font-mono text-[11px] text-gray-400">NIK: {app.nik} • {app.birthPlaceDate}</p>
                  
                  <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div>
                      <p className="text-[9px] text-gray-400 uppercase font-black">Pendidikan Terakhir</p>
                      <p className="font-bold text-slate-800 truncate" title={app.education}>{app.education}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-400 uppercase font-black">Jurusan / Bidang Ahli</p>
                      <p className="font-bold text-slate-800 truncate" title={app.major}>{app.major}</p>
                    </div>
                  </div>

                  <p className="text-[11px] text-gray-500">
                    <strong>Wilayah:</strong> Kec. {app.subdistrict}, Desa {app.village}
                  </p>

                  {app.status === "Aktif" && app.cardNum && (
                    <div className="pt-2 border-t border-dashed border-gray-200 text-[11px] space-y-1 text-emerald-950 font-semibold bg-emerald-50/50 p-2 rounded-lg">
                      <p>✨ <strong>Nomor AK1:</strong> <span className="font-mono text-xs text-emerald-800 font-bold">{app.cardNum}</span></p>
                      <p>🗓️ <strong>Berlaku:</strong> {app.issuedDate} s/d {app.expiryDate}</p>
                    </div>
                  )}

                  {app.status === "Diajukan" && (
                    <div className="flex gap-2 pt-3">
                      <button
                        onClick={() => handleApproveAK1(app.id)}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-2 px-3 font-black uppercase tracking-wider text-[10px] transition flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Check size={12} />
                        Sahkan Dokumen
                      </button>
                      <button
                        onClick={() => handleRejectAK1(app.id)}
                        className="bg-slate-100 hover:bg-red-50 hover:text-red-600 border border-slate-200 text-slate-700 rounded-xl py-2 px-3 font-black uppercase tracking-wider text-[10px] transition cursor-pointer"
                      >
                        Tolak Lampiran
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* TAB CONTENT: 2. Moderasi Loker & Industri */}
      {adminTab === "jobs" && (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-black text-[#1A365D]">Validitas Perusahaan & Listing Loker Aktif</h3>
              <p className="text-xs text-gray-500 font-semibold">Tugas Operator: Memastikan tidak ada lowongan penipuan (Scam) dan mendukung program local hiring Rebana.</p>
            </div>
            <button
              onClick={() => setIsAddingJob(!isAddingJob)}
              className="bg-[#1A365D] hover:bg-blue-800 text-white rounded-xl px-4 py-2 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition self-start cursor-pointer"
            >
              <Plus size={14} />
              <span>Tambah Loker Resmi</span>
            </button>
          </div>

          {/* Expanded Job Posting Form */}
          {isAddingJob && (
            <form onSubmit={handleAddNewJob} className="bg-gradient-to-br from-[#1A365D]/5 to-indigo-50 border border-blue-150 rounded-3xl p-6 space-y-4 text-xs font-semibold">
              <h4 className="font-black text-sm text-[#1A365D]">Form Tambah Lowongan Mandiri Disnaker (Bypass Panel)</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-gray-500">Judul Posisi Pekerjaan</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Mill Operator Junior"
                    value={newJobTitle}
                    onChange={(e) => setNewJobTitle(e.target.value)}
                    className="w-full bg-white border border-blue-100 rounded-xl p-2.5 outline-none text-gray-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-gray-500">Korporasi Pemberi Kerja</label>
                  <select
                    value={newJobCompany}
                    onChange={(e) => setNewJobCompany(e.target.value)}
                    className="w-full bg-white border border-blue-100 rounded-xl p-2.5 outline-none text-gray-800"
                  >
                    {companies.map((c, i) => (
                      <option key={i} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-gray-500">Tipe Kontrak</label>
                  <select
                    value={newJobType}
                    onChange={(e) => setNewJobType(e.target.value as any)}
                    className="w-full bg-white border border-blue-100 rounded-xl p-2.5 text-gray-800"
                  >
                    <option value="Full-Time">Full-Time (Tetap)</option>
                    <option value="Kontrak">Kontrak</option>
                    <option value="Magang">Magang Kerja</option>
                    <option value="Massal">Perekrutan Massal</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-gray-500">Kisaran Gaji Pokok</label>
                  <input
                    type="text"
                    required
                    value={newJobSalary}
                    onChange={(e) => setNewJobSalary(e.target.value)}
                    className="w-full bg-white border border-blue-100 rounded-xl p-2.5 text-gray-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-gray-500">Sektor Pekerjaan</label>
                  <select
                    value={newJobSector}
                    onChange={(e) => setNewJobSector(e.target.value)}
                    className="w-full bg-white border border-blue-100 rounded-xl p-2.5 text-gray-800"
                  >
                    <option value="Manufaktur">Manufaktur / Pabrik</option>
                    <option value="Logistik & Transportasi">Logistik & Gudang</option>
                    <option value="Kuliner">Kuliner & Cafe</option>
                    <option value="Pertanian">Pertanian & Agribisnis</option>
                    <option value="Kreatif">Industri Kerajinan</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-gray-500">Kecamatan Penempatan</label>
                  <select
                    value={newJobLocation}
                    onChange={(e) => setNewJobLocation(e.target.value)}
                    className="w-full bg-white border border-blue-100 rounded-xl p-2.5 text-gray-800"
                  >
                    <option value="Ligung">Ligung</option>
                    <option value="Kertajati">Kertajati Area</option>
                    <option value="Dawuan">Dawuan</option>
                    <option value="Jatiwangi">Jatiwangi</option>
                    <option value="Kasokandel">Kasokandel</option>
                    <option value="Majalengka">Majalengka Kota</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 pt-2 justify-end">
                <button
                  type="button"
                  onClick={() => setIsAddingJob(false)}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-xl uppercase font-black tracking-wider text-[10px] transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl uppercase font-black tracking-wider text-[10px] transition cursor-pointer"
                >
                  Sahkan & Publikasikan Loker
                </button>
              </div>
            </form>
          )}

          {/* Job listings moderated table */}
          <div className="bg-white rounded-3xl border border-blue-105 overflow-hidden shadow-sm">
            <div className="p-5 border-b border-gray-100 bg-slate-50/50">
              <h4 className="text-xs font-black uppercase text-slate-700">Daftar Loker Aktif di Server Majalengka</h4>
            </div>

            <div className="overflow-x-auto text-xs">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-150 text-left bg-slate-50 font-black text-gray-400 uppercase text-[10px] tracking-wider">
                    <th className="p-4">Pemberi Kerja / Loker</th>
                    <th className="p-4">Sektor & Gaji</th>
                    <th className="p-4">Kawasan Rebana</th>
                    <th className="p-4">Pelamar Masuk</th>
                    <th className="p-4 text-right">Tindakan Moderasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredJobs.map((j) => (
                    <tr key={j.id} className="hover:bg-slate-50/50 transition">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={j.companyLogo} className="w-8 h-8 rounded-lg object-cover" />
                          <div>
                            <p className="font-extrabold text-slate-900">{j.title}</p>
                            <p className="text-[11px] text-gray-500 font-bold">{j.companyName} • <span className="italic text-[#1E40AF]">{j.location}</span></p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-black text-slate-700">{j.sector}</span>
                        <p className="font-semibold text-gray-400 text-[10px]">{j.salaryRange}</p>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleToggleRebanaVIP(j.id)}
                          className={`px-3 py-1.5 rounded-xl font-bold uppercase tracking-wider text-[9px] transition ${
                            j.isKertajatiRebana 
                              ? "bg-indigo-100 text-[#1E40AF] hover:bg-slate-200" 
                              : "bg-slate-100 text-gray-500 hover:bg-indigo-50"
                          }`}
                        >
                          {j.isKertajatiRebana ? "⭐ Rebana VIP" : "Luar Kawasan"}
                        </button>
                      </td>
                      <td className="p-4 font-bold text-slate-800">
                        👨‍💻 {j.applicationsCount} Lowongan Kerja
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteJob(j.id)}
                          className="p-2 rounded-xl bg-slate-50 hover:bg-red-50 text-gray-400 hover:text-red-600 border border-slate-200/60 transition cursor-pointer"
                          title="Takedown Loker Ini"
                        >
                          <Trash2 size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Companies Akreditasi Panel */}
          <div className="bg-white rounded-3xl border border-blue-105 p-6 shadow-sm space-y-4">
            <h4 className="text-sm font-black text-slate-900">Program Audit Kepatuhan Kerja (Lokal Hiring & CSR K3)</h4>
            <p className="text-xs text-gray-505 font-medium leading-relaxed">
              Disnaker berhak melakukan rating audit mandiri pada perusahaan penjamin mutu. Perusahaan dengan serapan warga Kabupaten Majalengka di bawah 80% diberikan peringatan khusus.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {companies.map((co) => (
                <motion.div 
                  variants={cardVariants}
                  key={co.id} 
                  className="border border-slate-150 rounded-2xl p-4 flex items-center justify-between gap-4 bg-white"
                >
                  <div className="flex items-center gap-3 overflow-hidden text-xs">
                    <img src={co.logo} className="w-10 h-10 rounded-xl object-cover border" />
                    <div>
                      <h5 className="font-black text-slate-900 truncate max-w-[200px]">{co.name}</h5>
                      <p className="text-[10px] text-gray-400 font-mono">NIB: {co.nib}</p>
                      <p className="text-[10px] font-bold text-emerald-700 mt-0.5">
                        Lokal Hiring: <span className={co.localWorkforcePercent < 80 ? "text-amber-600" : "text-emerald-700"}>{co.localWorkforcePercent}% Warga Majalengka</span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBanCompany(co.id, co.name)}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition shrink-0 ${
                      co.localWorkforcePercent < 80
                        ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                        : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                    }`}
                  >
                    {co.localWorkforcePercent < 80 ? "⚠️ Beri Sanksi Audit" : "✅ Akreditasi Prima"}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB CONTENT: 3. Mediasi Sengketa Ketenagakerjaan */}
      {adminTab === "complaints" && (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-black text-slate-900">Arsip Pengaduan & Jadwal Tripartit</h3>
              <p className="text-xs text-gray-500 font-semibold font-sans">Buruh industri dapat mengajukan keluhan jika terjadi kecelakaan K3, PHK sepihak, atau penipuan loker.</p>
            </div>
            <p className="text-xs font-bold text-emerald-600 shrink-0 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">
              Mitigasi Konflik Sukses: 45 Kasus Selesai
            </p>
          </div>

          <div className="space-y-4">
            {filteredComplaints.length === 0 ? (
              <div className="bg-slate-50 border border-slate-200 text-center py-10 rounded-2xl text-xs text-gray-500 font-semibold font-sans">
                Tidak ada tiket pengaduan buruh yang cocok dengan filter pencarian.
              </div>
            ) : (
              filteredComplaints.map((ticket) => (
                <motion.div 
                  variants={cardVariants}
                  key={ticket.id} 
                  className="bg-white rounded-3xl border border-blue-105 p-6 shadow-sm space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3 text-xs">
                    <div>
                      <span className="font-mono text-gray-430">{ticket.trackingNumber}</span>
                      <h4 className="text-sm font-black text-[#1A365D] mt-0.5">{ticket.category} • di {ticket.companyName}</h4>
                    </div>
                    <span className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider ${
                      ticket.status === "Selesai" 
                        ? "bg-emerald-100 text-emerald-800" 
                        : ticket.status === "Mediasi" 
                        ? "bg-indigo-100 text-indigo-800" 
                        : ticket.status === "Diverifikasi" 
                        ? "bg-blue-100 text-blue-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      Status: {ticket.status}
                    </span>
                  </div>

                  <div className="text-xs space-y-2">
                    <p className="font-semibold text-gray-540 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100 italic">
                      &quot;{ticket.description}&quot;
                    </p>
                    <p className="text-slate-700">
                      <strong>Pelapor:</strong> {ticket.reporterName} (NIK: <span className="font-mono text-[11px] font-bold">{ticket.reporterNik}</span>) • Tanggal Masuk: {ticket.createdAt}
                    </p>
                    
                    {ticket.mediationSchedule && (
                      <div className="bg-yellow-50 border border-yellow-250 rounded-xl p-3 text-[11px] text-yellow-950 font-semibold space-y-1">
                        <p className="flex items-center gap-1">🗓️ <strong>Agenda Mediasi / Resolusi:</strong></p>
                        <p className="font-bold text-[#1a365d]">{ticket.mediationSchedule}</p>
                      </div>
                    )}
                  </div>

                  {/* Actions buttons for updating complaints */}
                  <div className="flex flex-wrap gap-2 pt-2 text-xs">
                    <span className="text-[10px] font-black uppercase text-gray-400 self-center">Perbarui Sengketa:</span>
                    <button
                      onClick={() => handleUpdateComplaintStatus(ticket.id, "Diverifikasi")}
                      className="bg-blue-50 text-blue-800 hover:bg-blue-100 rounded-xl px-3 py-1.5 font-bold transition cursor-pointer"
                    >
                      Diverifikasi
                    </button>
                    <button
                      onClick={() => handleUpdateComplaintStatus(ticket.id, "Mediasi")}
                      className="bg-indigo-50 text-indigo-800 hover:bg-indigo-100 rounded-xl px-3 py-1.5 font-bold transition cursor-pointer"
                    >
                      Jadwalkan Mediasi
                    </button>
                    <button
                      onClick={() => handleUpdateComplaintStatus(ticket.id, "Selesai")}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-4.5 py-1.5 font-black transition cursor-pointer flex items-center gap-1"
                    >
                      <Check size={11} /> Tandai Selesai (Damai)
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      )}

      {/* TAB CONTENT: 4. Kelola Kelas BLK Vokasi */}
      {adminTab === "blk" && (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-black text-slate-900">Manajemen Kelas Balai Latihan Kerja (BLK)</h3>
              <p className="text-xs text-gray-500 font-semibold font-sans">Atur alokasi, edit instruktur penanggung jawab, serta tambahkan kelas-kelas industri baru.</p>
            </div>
            <button
              onClick={() => setIsAddingClass(!isAddingClass)}
              className="bg-[#1A365D] hover:bg-blue-800 text-white rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition cursor-pointer"
            >
              <Plus size={14} />
              <span>Buka Kelas Baru</span>
            </button>
          </div>

          {/* New Training class form */}
          {isAddingClass && (
            <form onSubmit={handleAddNewClass} className="bg-gradient-to-br from-indigo-50 to-emerald-50/50 border border-indigo-200 rounded-3xl p-6 space-y-4 text-xs font-semibold shadow-inner">
              <h4 className="font-extrabold text-sm text-[#1A365D]">Penerbitan Proposal Program Sertifikasi Vokasi BLK</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-gray-500">Nama Bidang Pelatihan</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Pemrograman CNC Bubut & Otomasi Tingkat Lanjut"
                    value={newClassTitle}
                    onChange={(e) => setNewClassTitle(e.target.value)}
                    className="w-full bg-white border border-indigo-100 rounded-xl p-2.5 outline-none font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-gray-500">Nama Instruktur Utama & Gelar</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Ir. Herman Wahyudi, M.T."
                    value={newClassInstructor}
                    onChange={(e) => setNewClassInstructor(e.target.value)}
                    className="w-full bg-white border border-indigo-100 rounded-xl p-2.5 outline-none font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-gray-500">Durasi Pembelajaran (Jam)</label>
                  <input
                    type="text"
                    placeholder="Contoh: 120 Jam Pelajaran (24 Hari)"
                    value={newClassDuration}
                    onChange={(e) => setNewClassDuration(e.target.value)}
                    className="w-full bg-white border border-indigo-100 rounded-xl p-2.5 text-gray-800 font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-gray-500">Tanggal Mulai Kelas</label>
                  <input
                    type="date"
                    value={newClassStartDate}
                    onChange={(e) => setNewClassStartDate(e.target.value)}
                    className="w-full bg-white border border-indigo-100 rounded-xl p-2.5 text-gray-800 font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-gray-500">Kuota Awal Siswa</label>
                  <input
                    type="number"
                    value={newClassQuota}
                    onChange={(e) => setNewClassQuota(Number(e.target.value))}
                    className="w-full bg-white border border-indigo-100 rounded-xl p-2.5 text-gray-800 font-bold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-gray-500">Draf Deskripsi Silabus & Relevansi Industri</label>
                <textarea
                  placeholder="Ceritakan latar belakang kompetensi kelulusan..."
                  value={newClassDesc}
                  onChange={(e) => setNewClassDesc(e.target.value)}
                  className="w-full bg-white border border-indigo-100 rounded-xl p-2.5 min-h-[80px]"
                />
              </div>

              <div className="flex gap-2 pt-2 justify-end">
                <button
                  type="button"
                  onClick={() => setIsAddingClass(false)}
                  className="bg-slate-200 text-slate-705 px-4 py-2 rounded-xl uppercase font-black tracking-wider text-[10px] transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl uppercase font-black tracking-wider text-[10px] transition cursor-pointer"
                >
                  Buka Kelas BLK Resmi
                </button>
              </div>
            </form>
          )}

          {/* Active Training modules list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {trainings.map((t) => (
              <motion.div 
                variants={cardVariants}
                key={t.id} 
                className="bg-white rounded-3xl border border-blue-105 p-6 shadow-sm space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <span className="bg-indigo-50 text-indigo-700 text-[9px] font-black tracking-widest px-2 py-0.5 rounded-full uppercase">
                      Kompetensi {t.isSertifikasi ? "BNSP ACCREDITED" : "Kelas Umum"}
                    </span>
                    <h4 className="text-base font-black text-slate-900 leading-tight">{t.title}</h4>
                  </div>
                </div>

                <p className="text-gray-500 font-semibold leading-relaxed line-clamp-3">
                  {t.description}
                </p>

                <div className="grid grid-cols-2 gap-3 bg-indigo-50/50 p-3 rounded-2xl border border-indigo-100/50">
                  <div>
                    <p className="text-[9px] font-black uppercase text-gray-400">Instruktur Utama</p>
                    <p className="font-extrabold text-[#1A365D] truncate">{t.instructor}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase text-gray-400">Jadwal Kelas</p>
                    <p className="font-bold text-slate-700">{t.startDate}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <div>
                    <span>Kapasitas Penuh siswa: </span>
                    <strong className="font-bold text-slate-900">{t.registeredCount} / {t.quota} Pendaftar</strong>
                  </div>
                  <button
                    onClick={() => handleIncreaseQuota(t.id)}
                    className="text-accent-blue hover:underline uppercase font-black text-[10px] flex items-center gap-1 cursor-pointer"
                  >
                    Tambah Kuota (+5)
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* TAB CONTENT: 5. Hazard Panic Alarm Monitoring */}
      {adminTab === "panic" && (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <div className="border border-red-200 bg-red-50/60 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1 flex-1 relative z-10 text-xs">
              <div className="flex items-center gap-2 text-red-600 font-black">
                <Activity size={18} className="animate-pulse text-red-600" />
                <span className="uppercase tracking-widest text-[10px]">MONITORING REALTIME DARURAT K3</span>
              </div>
              <h3 className="text-base font-black text-red-950 font-sans">Anti-Sanksi & Pencegahan Kecelakaan Kerja</h3>
              <p className="text-red-900 font-semibold leading-relaxed">
                Tembusan laporan kecelakaan, kebocoran gas, atau korsleting kebakaran sirkuler di seluruh kawasan pabrik Kertajati, Ligung dan Dawuan.
              </p>
            </div>
            <div className="bg-red-600 text-white p-3 md:p-4 rounded-3xl text-center shrink-0 min-w-[124px] shadow-lg shadow-red-500/20">
              <span className="text-[9px] font-black uppercase tracking-widest">Sinyal Aktif Merah</span>
              <p className="text-3xl font-black font-mono animate-bounce">{panicAlerts.filter(p => p.status === "Aktif").length}</p>
            </div>
          </div>

          <div className="space-y-4 text-xs font-semibold">
            {panicAlerts.map((p) => (
              <motion.div 
                variants={cardVariants}
                key={p.id} 
                className={`bg-white rounded-3xl border p-6 shadow-sm space-y-4 relative overflow-hidden transition-all ${
                  p.status === "Aktif" 
                    ? "border-red-300 ring-2 ring-red-100" 
                    : "border-slate-200"
                }`}
              >
                {/* Visual Danger Indicator circle in background */}
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-10 ${
                  p.riskLevel === "CRITICAL" ? "bg-red-600" : "bg-yellow-400"
                }`}></div>

                {/* Left indicator ribbon */}
                <div className={`absolute top-0 left-0 w-2 h-full ${
                  p.status === "Aktif" ? "bg-red-600 animate-pulse" : p.status === "Mitigasi" ? "bg-yellow-400" : "bg-emerald-500"
                }`}></div>

                <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
                  <div className="space-y-1 text-xs">
                    <span className={`px-2.5 py-0.5 rounded text-[9px] font-black inline-block uppercase text-white ${
                      p.riskLevel === "CRITICAL" ? "bg-red-700" : p.riskLevel === "HIGH" ? "bg-amber-600" : "bg-slate-500"
                    }`}>
                      🚨{p.riskLevel} Hazard
                    </span>
                    <h4 className="text-base font-black text-slate-900 font-sans leading-none">{p.incidentType}</h4>
                    <p className="font-bold text-gray-500 mt-1">Perusahaan: <span className="text-indigo-900 font-black">{p.companyName}</span> ({p.subdistrict}) • Dilaporkan: {p.timestamp}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-gray-400">Status:</span>
                    <span className={`px-2 py-0.5 rounded font-black uppercase ${
                      p.status === "Aktif" 
                        ? "bg-red-100 text-red-600 animate-pulse" 
                        : p.status === "Mitigasi" 
                        ? "bg-yellow-100 text-yellow-800" 
                        : "bg-emerald-100 text-emerald-800"
                    }`}>
                      {p.status}
                    </span>
                  </div>
                </div>

                {p.note && (
                  <p className="text-[11px] leading-relaxed italic bg-slate-50 border border-slate-150 p-3 rounded-2xl text-slate-700 shadow-inner">
                    ⚡ <strong>Update Lapangan:</strong> {p.note}
                  </p>
                )}

                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-[11px]">
                  <p>Kontak Darurat: <strong className="font-mono">{p.reporterPhone}</strong></p>
                  
                  {p.status === "Aktif" && (
                    <div className="flex gap-2 text-[10px]">
                      <button
                        onClick={() => handleResolvePanicStatus(p.id, "Mitigasi")}
                        className="bg-yellow-500 hover:bg-yellow-600 text-slate-950 font-black uppercase tracking-wider rounded-xl px-3 py-2 transition cursor-pointer"
                      >
                        Sinyal Mitigasi Aktif
                      </button>
                      <button
                        onClick={() => handleResolvePanicStatus(p.id, "Selesai")}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-wider rounded-xl px-4.5 py-2 transition cursor-pointer"
                      >
                        Tandai Isu Selesai
                      </button>
                    </div>
                  )}

                  {p.status === "Mitigasi" && (
                    <button
                      onClick={() => handleResolvePanicStatus(p.id, "Selesai")}
                      className="bg-emerald-105 hover:bg-emerald-200 border border-emerald-300 text-emerald-800 font-bold uppercase tracking-wider rounded-xl px-4 py-2 transition cursor-pointer"
                    >
                      Bereskan Isu & Tutup File
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* TAB CONTENT: 6. Sinkronisasi Data Desa Terpadu */}
      {adminTab === "villagedata" && (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <div className="bg-white rounded-3xl border border-blue-105 p-6 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-base font-black text-[#1A365D]">Statistik Angkatan Kerja & Tingkat Pengangguran Wilayah</h3>
                <p className="text-xs text-gray-430 font-semibold leading-relaxed">
                  Data disinkronisasikan langsung oleh operator dari 330 kaur kesra desa & kelurahan se-Kabupaten Majalengka secara real-time.
                </p>
              </div>

              <button
                onClick={handleGlobalVillageDataSync}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-wider text-xs px-5 py-3 rounded-2xl flex items-center gap-1.5 transition shrink-0 cursor-pointer shadow-md"
              >
                <RefreshCw size={14} className="animate-spin" />
                <span>Simulasikan Tarik Data Desa Live</span>
              </button>
            </div>

            {/* Quick charts bar graphs */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-4">
              <h4 className="text-xs font-black uppercase text-[#1A365D]">Top 4 Wilayah Fokus Penyerapan Disnaker</h4>
              
              <div className="space-y-4">
                {villageStats.slice(0, 4).map((sub) => {
                  const percentUnemployed = Math.round((sub.unemploymentCount / sub.workforceCount) * 100);
                  return (
                    <div key={sub.id} className="space-y-1 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-800">
                        <span>Kecamatan {sub.name}</span>
                        <span>{sub.unemploymentCount.toLocaleString("id-ID")} Menganggur (Dari {sub.workforceCount.toLocaleString("id-ID")} Jiwa — ±{percentUnemployed}%)</span>
                      </div>
                      
                      <div className="w-full bg-slate-200 rounded-full h-3.5 overflow-hidden flex">
                        {/* Employed bar */}
                        <div 
                          style={{ width: `${100 - percentUnemployed}%` }} 
                          className="bg-emerald-500 h-full hover:opacity-90 transition-all cursor-pointer"
                          title="Bekerja / Produktif"
                        ></div>
                        {/* Unemployed bar */}
                        <div 
                          style={{ width: `${percentUnemployed}%` }} 
                          className="bg-[#F43F5E] h-full hover:opacity-90 transition-all cursor-pointer"
                          title="Fokus Penyerapan Kerja"
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-4 items-center text-[10px] font-black uppercase tracking-wider text-gray-500 pt-1">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-emerald-500 rounded-full inline-block"></span> Angkatan Kerja Bekerja</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-[#F43F5E] rounded-full inline-block"></span> Pengangguran Butuh Disalurkan</span>
              </div>
            </div>

            {/* Comprehensive details list */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              {villageStats.map((sub) => (
                <motion.div 
                  variants={cardVariants}
                  key={sub.id} 
                  className="border border-slate-200 rounded-2xl p-4 space-y-2 bg-white hover:bg-slate-50/50 transition duration-150"
                >
                  <h5 className="font-extrabold text-slate-900 border-b pb-1.5">{sub.name}</h5>
                  <div className="space-y-1 text-[11px] font-semibold text-slate-700">
                    <p className="flex justify-between"><span>Jumlah Pengangguran:</span> <strong className="text-red-650 font-black">{sub.unemploymentCount.toLocaleString("id-ID")} orang</strong></p>
                    <p className="flex justify-between"><span>Penggagas Lulusan Baru:</span> <strong className="text-blue-900 font-extrabold">{sub.graduatesCount.toLocaleString("id-ID")} orang</strong></p>
                    <p className="flex justify-between"><span>Perusahaan Terdaftar:</span> <strong className="text-slate-800">{sub.companiesCount} Pabrik</strong></p>
                    <p className="flex justify-between"><span>Total Tiket Perselisihan:</span> <strong className="text-orange-500">{sub.complaintsCount} Kasus</strong></p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {adminTab === "chat" && (
        <div className="space-y-4 animate-fadeIn">
          <div className="bg-[#1A365D] text-white rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-600 text-white font-mono font-bold text-[8px] px-2 py-0.5 rounded uppercase tracking-wider block">Co-Pilot Mode</span>
                <h3 className="font-sans text-sm font-black uppercase tracking-wider leading-none">
                  Sistem Dukungan Chat Dinas & AI Asisten
                </h3>
              </div>
              <p className="text-xs text-blue-200 mt-2 leading-relaxed max-w-2xl">
                Sebagai Admin Disnaker Kabupaten Majalengka, Anda dapat memfasilitasi komunikasi langsung dengan Pencari Kerja (Pencaker) dan Mitra Industri secara realtime. Gunakan rekomendasi balasan cepat yang disiapkan secara otomatis oleh teknologi kecerdasan buatan Gemini.
              </p>
            </div>
            <div className="shrink-0 flex items-center bg-white/10 rounded-2xl p-3 border border-white/10 font-mono text-[10px] gap-2">
              <span className="bg-emerald-500 w-2.5 h-2.5 rounded-full animate-ping"></span>
              <span>Layanan Terkoneksi Lancar</span>
            </div>
          </div>
          <DisnakerChatHub userRole="Admin" />
        </div>
      )}

      {adminTab === "ai_assistant" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header Jumbotron */}
          <div className="bg-gradient-to-r from-violet-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl border border-violet-800/20">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="bg-violet-600 text-white font-mono font-bold text-[9px] px-2.5 py-1 rounded-full uppercase tracking-widest animate-pulse flex items-center gap-1">
                  <Sparkles size={10} /> Gemini Pro Co-Pilot
                </span>
                <h3 className="font-sans text-base md:text-lg font-black uppercase tracking-wider leading-none mt-0.5">
                  AI Response Assistant & Draft Penjawab Dinas
                </h3>
              </div>
              <p className="text-xs text-violet-200 leading-relaxed max-w-3xl">
                Alat bantu perumusan jawaban cerdas terintegrasi regulasi. Hasilkan draf surat kepatuhan, panggilan musyawarah tripartit/bipartit resmi, atau email penyambutan persetujuan mitra industri NIB OSS secara otomatis dengan kekuatan AI Gemini.
              </p>
            </div>
            <div className="shrink-0 flex items-center bg-white/5 rounded-2xl p-4 border border-white/10 font-mono text-[10px] gap-2.5 shadow-inner">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
              </div>
              <span>Sinergi Regulasi RI Aktif</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LEFT COLUMN: SOURCE DATA SELECTOR (5 COLS) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-3xl border border-blue-105 p-5 shadow-sm space-y-4">
                <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                  1. Pilih Jenis Arsip Masuk
                </h4>

                {/* Type Switcher Selector */}
                <div className="grid grid-cols-2 gap-1 bg-slate-50 p-1 rounded-xl border">
                  <button
                    onClick={() => {
                      setSelectedAsstType("complaint");
                    }}
                    className={`py-2 px-3 rounded-lg text-xs font-black uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5 ${
                      selectedAsstType === "complaint"
                        ? "bg-violet-600 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-200/50"
                    }`}
                  >
                    ⚠️ Aduan Buruh ({complaints.length})
                  </button>
                  <button
                    onClick={() => {
                      setSelectedAsstType("company");
                    }}
                    className={`py-2 px-3 rounded-lg text-xs font-black uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5 ${
                      selectedAsstType === "company"
                        ? "bg-violet-600 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-200/50"
                    }`}
                  >
                    🏢 Registrasi Mitra ({companyRegistrations.length})
                  </button>
                </div>

                {/* Sublist */}
                <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
                  {selectedAsstType === "complaint" ? (
                    complaints.map((ticket) => {
                      const isSelected = selectedAsstId === ticket.id;
                      const statusStyle = 
                        ticket.status === "Selesai" 
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                          : ticket.status === "Mediasi" 
                          ? "bg-indigo-50 text-indigo-700 border-indigo-100" 
                          : "bg-blue-50 text-blue-700 border-blue-100";
                      
                      return (
                        <div
                          key={ticket.id}
                          onClick={() => setSelectedAsstId(ticket.id)}
                          className={`p-3.5 rounded-2xl border text-xs cursor-pointer transition flex flex-col gap-2 ${
                            isSelected
                              ? "bg-violet-50/70 border-violet-500 shadow-sm"
                              : "bg-white border-slate-150 hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <span className="font-mono text-[10px] text-slate-400 font-extrabold">{ticket.trackingNumber}</span>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider border ${statusStyle}`}>
                              {ticket.status}
                            </span>
                          </div>
                          <div>
                            <h5 className="font-extrabold text-slate-800 leading-tight">
                              {ticket.category} • {ticket.companyName}
                            </h5>
                            <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">
                              &quot;{ticket.description}&quot;
                            </p>
                          </div>
                          <p className="text-[10px] text-slate-400 font-semibold mt-1">
                            Oleh: <strong className="text-slate-700">{ticket.reporterName}</strong> ({ticket.createdAt})
                          </p>
                        </div>
                      );
                    })
                  ) : (
                    companyRegistrations.map((reg) => {
                      const isSelected = selectedAsstId === reg.id;
                      const statusStyle = 
                        reg.status === "Disetujui" 
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                          : reg.status === "Ditolak" 
                          ? "bg-red-50 text-red-700 border-red-100" 
                          : "bg-yellow-50 text-yellow-700 border-yellow-100";

                      return (
                        <div
                          key={reg.id}
                          onClick={() => setSelectedAsstId(reg.id)}
                          className={`p-3.5 rounded-2xl border text-xs cursor-pointer transition flex flex-col gap-2 ${
                            isSelected
                              ? "bg-violet-50/70 border-violet-500 shadow-sm"
                              : "bg-white border-slate-150 hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1 flex-wrap">
                            <span className="font-mono text-[10px] text-slate-400 font-black">NIB: {reg.nib}</span>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border tracking-wider ${statusStyle}`}>
                              {reg.status}
                            </span>
                          </div>
                          <div>
                            <h5 className="font-extrabold text-slate-800 leading-tight">
                              {reg.companyName}
                            </h5>
                            <span className="text-[9px] bg-indigo-50 border border-indigo-150 rounded px-1.5 py-0.5 font-bold text-indigo-800 mt-1 inline-block">
                              Sektor: {reg.sector}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] mt-1.5 border-t border-slate-50 pt-1.5">
                            <span className="font-semibold text-gray-500">Rep: {reg.representativeName}</span>
                            <span className="text-gray-400 font-mono">{reg.submissionDate}</span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: ACTION AND GENERATION AREA (7 COLS) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Selected Details Inspection Card */}
              <div className="bg-white rounded-3xl border border-blue-105 p-6 shadow-sm space-y-4">
                <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                    2. Detail Pemeriksaan Berkas Terpilih
                  </h4>
                  <span className="text-[10px] shrink-0 font-bold bg-violet-50 text-violet-800 border border-violet-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Fase Verifikasi
                  </span>
                </div>

                {/* Dynamic selected item render */}
                {selectedAsstId ? (
                  (() => {
                    const activeItem = selectedAsstType === "complaint"
                      ? complaints.find(c => c.id === selectedAsstId)
                      : companyRegistrations.find(r => r.id === selectedAsstId);

                    if (!activeItem) {
                      return <p className="text-xs text-gray-400 italic">Terjadi hambatan memuat data terpilih.</p>;
                    }

                    const isComplaint = selectedAsstType === "complaint";

                    return (
                      <div className="space-y-4 text-xs">
                        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-semibold text-slate-700">
                            <div>
                              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Entitas Subjek</p>
                              <p className="font-black text-slate-900 text-sm mt-0.5">
                                {isComplaint ? (activeItem as any).companyName : (activeItem as any).companyName}
                              </p>
                            </div>
                            <div>
                              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                                {isComplaint ? "Nama Pelapor (Warga)" : "Nama Humas / Pemohon"}
                              </p>
                              <p className="font-black text-slate-900 text-sm mt-0.5">
                                {isComplaint ? (activeItem as any).reporterName : (activeItem as any).representativeName}
                              </p>
                            </div>
                            <div>
                              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                                {isComplaint ? "NIK Kependudukan" : "NIB Bidang Usaha"}
                              </p>
                              <p className="font-mono text-[11px] font-extrabold text-slate-800 mt-0.5">
                                {isComplaint ? (activeItem as any).reporterNik : (activeItem as any).nib}
                              </p>
                            </div>
                            <div>
                              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                                {isComplaint ? "Jenis Perselisihan" : "Sektor Industri"}
                              </p>
                              <p className="font-bold text-indigo-700 mt-0.5">
                                {isComplaint ? (activeItem as any).category : (activeItem as any).sector}
                              </p>
                            </div>
                          </div>

                          {/* Long Content / Description */}
                          <div className="border-t border-slate-150 pt-3 mt-1">
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                              {isComplaint ? "Isi Aduan Ketenagakerjaan" : "Keterangan Registrasi & Kontak Hubungan"}
                            </p>
                            <p className="text-slate-700 leading-relaxed italic mt-1 bg-white p-3 rounded-xl border border-slate-205">
                              {isComplaint 
                                ? `"${(activeItem as any).description}"` 
                                : `Mengajukkan pembukaan akun industri dan pelaporan berkas OSS melalui lampiran dokumen ${(activeItem as any).documentUrl}. Alamat email yang dicatatkan adalah ${(activeItem as any).email}.`}
                            </p>
                          </div>
                        </div>

                        {/* Generate triggers */}
                        <div className="pt-2 flex flex-col md:flex-row gap-3">
                          <button
                            onClick={handleGenerateAsstDraftsObj}
                            disabled={isAsstLoading}
                            className={`flex-1 py-3 px-5 rounded-xl text-xs font-black uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2 text-white ${
                              isAsstLoading 
                                ? "bg-violet-400 cursor-not-allowed" 
                                : "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                            }`}
                          >
                            {isAsstLoading ? (
                              <>
                                <RefreshCw size={13} className="animate-spin" />
                                Menghubungi Gemini AI...
                              </>
                            ) : (
                              <>
                                <Sparkles size={13} className="animate-pulse" />
                                ✨ Formulasikan Draf Balasan AI Kementrian
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  <div className="text-xs text-gray-400 italic py-8 text-center bg-slate-50 border border-dashed rounded-2xl">
                    Silakan klik salah satu tiket aduan buruh atau pengajuan registrasi di kolom sebelah kiri untuk memproses draf balasan dinas.
                  </div>
                )}
              </div>

              {/* Suggestions Draft Result Panel */}
              {isAsstLoading && (
                <div className="bg-white rounded-3xl border border-blue-105 p-6 shadow-sm space-y-4 animate-pulse">
                  <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                  <div className="space-y-3">
                    <div className="h-28 bg-slate-100 rounded-2xl"></div>
                    <div className="h-10 bg-slate-50 rounded-xl"></div>
                  </div>
                </div>
              )}

              {asstDrafts.length > 0 && !isAsstLoading && (
                <div className="space-y-4 animate-fadeIn">
                  <h4 className="text-xs font-black uppercase text-violet-900 tracking-wider flex items-center gap-1.5 pl-1">
                    <Sparkles size={12} className="text-violet-650" /> Gemini Memformulasikan 3 Opsi Respon Terbaik:
                  </h4>

                  <div className="space-y-4">
                    {asstDrafts.map((draft, idx) => (
                      <div key={idx} className="bg-white rounded-3xl border border-violet-100 p-5 shadow-sm space-y-3 hover:shadow transition duration-150">
                        <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                          <span className="font-extrabold text-xs text-violet-850 block">{draft.label}</span>
                          <span className="text-[8px] bg-violet-50 text-violet-750 font-bold px-2 py-0.5 rounded-full uppercase font-mono">
                            Opsi {idx + 1}
                          </span>
                        </div>

                        <textarea
                          readOnly
                          value={draft.text}
                          rows={11}
                          className="w-full text-xs font-mono p-3 bg-slate-50 text-slate-850 rounded-xl border border-slate-150 outline-none leading-relaxed focus:bg-white focus:border-violet-300 transition"
                        />

                        <div className="flex gap-2 justify-end pt-1">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(draft.text);
                              setCopiedDraftIdx(idx);
                              setTimeout(() => setCopiedDraftIdx(null), 3000);
                            }}
                            className="bg-slate-50 hover:bg-slate-100/80 border text-slate-800 font-extrabold text-[10px] uppercase tracking-wider py-2 px-3 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                          >
                            {copiedDraftIdx === idx ? (
                              <span className="text-emerald-700 font-black">✓ Tersalin ke Clipboard</span>
                            ) : (
                              <>
                                <Copy size={11} /> Salin Draf
                              </>
                            )}
                          </button>
                          
                          <button
                            onClick={() => handleSimulateSend(idx, draft.text)}
                            className="bg-violet-600 hover:bg-violet-700 text-white font-black text-[10px] uppercase tracking-wider py-2 px-4 rounded-xl transition flex items-center gap-1.5 shadow"
                          >
                            <Send size={11} /> Kirim & Proses Tiket
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {adminTab === "notifications" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header Jumbotron */}
          <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl border border-emerald-800/20">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="bg-emerald-600 text-white font-mono font-bold text-[9px] px-2.5 py-1 rounded-full uppercase tracking-widest animate-pulse flex items-center gap-1">
                  <Megaphone size={10} /> SIARAN MASSAL GATEWAY
                </span>
                <h3 className="font-sans text-base md:text-lg font-black uppercase tracking-wider leading-none mt-0.5">
                  Pusat Siaran Massal & Notifikasi Rakyat Majalengka
                </h3>
              </div>
              <p className="text-xs text-emerald-100 leading-relaxed max-w-3xl">
                Layanan komunikasi publik satu arah terintegrasi. Kirimkan pesan sosialisasi pembukaan lowongan industri, pemanggilan verifikasi kartu AK1, pengumuman BLK, dan imbauan darurat K3 secara massal melalui WhatsApp Blast maupun Push Notification ponsel pintar secara seketika.
              </p>
            </div>
            <div className="shrink-0 flex items-center bg-white/5 rounded-2xl p-4 border border-white/10 font-mono text-[10px] gap-2.5 shadow-inner">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </div>
              <span>Status Server: GATEWAY ONLINE</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LEFT CONTAINER - CONTROL FORM (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-3xl border border-blue-105 p-6 shadow-sm space-y-5">
                <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                    Sistem Form Notifikasi Massal
                  </h4>
                  <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Langkah Pengiriman
                  </span>
                </div>

                {/* Segment Selector Row */}
                <div className="space-y-2.5">
                  <label className="text-[11px] font-black uppercase text-slate-550 block">1. Pilih Target Segmen Penerima ({getSegmentDetails(notiSegment).count} Penerima Terpilih)</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[
                      { code: "pencaker_all", desc: "Semua Pencari Kerja (Pencaker)" },
                      { code: "ak1_pending", desc: "Antrean AK1 (Pending Verifikasi)" },
                      { code: "blk_alumni", desc: "Alumni & Siswa BLK Vokasi" },
                      { code: "companies_all", desc: "Semua Mitra Industri (Pabrik)" },
                      { code: "companies_active", desc: "Mitra Industri dengan Loker Aktif" },
                      { code: "pendaftaran_pending", desc: "Registrasi Perusahaan Baru (Pending)" }
                    ].map(s => {
                      const details = getSegmentDetails(s.code);
                      const isSelected = notiSegment === s.code;
                      return (
                        <button
                          key={s.code}
                          type="button"
                          onClick={() => setNotiSegment(s.code)}
                          className={`p-3 text-left rounded-xl border text-xs transition duration-150 flex flex-col justify-between gap-1.5 cursor-pointer ${
                            isSelected
                              ? "bg-emerald-50/75 border-emerald-500 text-emerald-950 focus:ring-1 focus:ring-emerald-400"
                              : "bg-slate-50 hover:bg-slate-100/50 border-slate-200 text-slate-700"
                          }`}
                        >
                          <span className="font-extrabold leading-tight">{s.desc}</span>
                          <span className="text-[10px] font-mono font-black text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-md self-start">
                            {details.count} Pengguna
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Notification Channel Row */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-slate-550 block">2. Pilih Saluran Pengiriman</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setNotiChannel("WhatsApp")}
                      className={`p-3.5 rounded-xl border text-xs font-black uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 ${
                        notiChannel === "WhatsApp"
                          ? "bg-emerald-600 text-white border-emerald-600 shadow"
                          : "bg-white hover:bg-slate-50 text-slate-650 border-slate-205"
                      }`}
                    >
                      <span className="text-[14px]">💬</span> WhatsApp Blast
                    </button>
                    <button
                      type="button"
                      onClick={() => setNotiChannel("Push Notification")}
                      className={`p-3.5 rounded-xl border text-xs font-black uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 ${
                        notiChannel === "Push Notification"
                          ? "bg-blue-600 text-white border-blue-600 shadow"
                          : "bg-white hover:bg-slate-50 text-slate-650 border-slate-205"
                      }`}
                    >
                      <Smartphone size={14} /> Android / iOS Push
                    </button>
                  </div>
                </div>

                {/* Form Inputs */}
                <div className="space-y-3 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black uppercase text-slate-550 block">3. Judul Notifikasi / Subjek Pesan</label>
                    <input
                      type="text"
                      value={broadcastTitle}
                      onChange={(e) => setBroadcastTitle(e.target.value)}
                      placeholder="Masukkan judul pesan siaran, misal: Pendaftaran Kelas BLK Mandiri Dibuka"
                      className="w-full p-3 border border-slate-200 rounded-xl text-xs font-semibold focus:border-emerald-500 focus:outline-none transition bg-slate-50 focus:bg-white text-slate-800"
                    />
                  </div>

                  <div className="space-y-1.5 relative">
                    <div className="flex justify-between items-center">
                      <label className="text-[11px] font-black uppercase text-slate-550">4. Isi Pesan Siaran (Mendukung Teks Polos & Simbol Kemerdekaan)</label>
                      <span className="text-[10px] font-mono text-slate-400">{broadcastMessage.length} Karakter</span>
                    </div>
                    <textarea
                      value={broadcastMessage}
                      onChange={(e) => setBroadcastMessage(e.target.value)}
                      placeholder="Tuliskan berita, anjuran, atau notifikasi resmi Anda kepada kaur kelurahan, warga, atau HRD perusahaan..."
                      rows={6}
                      className="w-full p-3 border border-slate-200 rounded-xl text-xs font-medium focus:border-emerald-500 focus:outline-none transition bg-slate-50 focus:bg-white text-slate-800 leading-relaxed"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={handleOptimizeNotification}
                    disabled={isPolishingNoti || !broadcastMessage.trim()}
                    className={`flex-1 py-3 px-5 rounded-xl text-xs font-black uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2 border ${
                      isPolishingNoti
                        ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                        : "bg-white hover:bg-slate-50 text-violet-800 border-violet-200"
                    }`}
                  >
                    {isPolishingNoti ? (
                      <>
                        <RefreshCw size={11} className="animate-spin text-violet-500" />
                        Sedang Mengoreksi dengan Gemini...
                      </>
                    ) : (
                      <>
                        <Sparkles size={11} className="text-violet-600 animate-pulse" />
                        ✨ Optimalkan Teks dengan AI Gemini
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleSendBroadcast}
                    disabled={isBroadcasting || !broadcastTitle.trim() || !broadcastMessage.trim()}
                    className={`flex-1 py-3 px-5 rounded-xl text-xs font-black uppercase tracking-wider transition text-white shadow-md flex items-center justify-center gap-2 ${
                      isBroadcasting
                        ? "bg-slate-400 cursor-not-allowed"
                        : notiChannel === "WhatsApp"
                        ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/10"
                        : "bg-blue-600 hover:bg-blue-700 shadow-blue-500/10"
                    }`}
                  >
                    {isBroadcasting ? (
                      <>
                        <RefreshCw size={11} className="animate-spin" />
                        Mengirim ({broadcastProgress}%)
                      </>
                    ) : (
                      <>
                        <Send size={11} />
                        Kirim Siaran Massal ({getSegmentDetails(notiSegment).count} Target)
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT CONTAINER - DEVICE PREVIEW & STATUS METRICS (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Dynamic device frame mock preview */}
              <div className="bg-slate-900 rounded-3xl p-4 border border-slate-800 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-4 bg-slate-155 flex items-center justify-center">
                  <div className="w-20 h-3.5 bg-slate-950 rounded-b-xl z-20 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-slate-800 rounded-full"></span>
                  </div>
                </div>

                <div className="relative text-white font-sans rounded-2xl overflow-hidden mt-2 bg-slate-950 border border-slate-800 flex flex-col h-[400px]">
                  {/* Lock device top status line */}
                  <div className="bg-slate-955 px-4 py-1.5 flex items-center justify-between text-[9px] font-mono text-slate-400 select-none border-b border-slate-900">
                    <span className="font-extrabold text-[8px] tracking-wider">INDONESIA-GW</span>
                    <span className="font-bold">19:09 WIB</span>
                  </div>

                  {/* Progressive Simulation Broadcast Progress Tracker Overlay */}
                  {isBroadcasting && (
                    <div className="absolute inset-0 bg-slate-950/95 z-30 flex flex-col items-center justify-center p-6 space-y-4 animate-fadeIn">
                      <div className="bg-emerald-500/10 p-4 rounded-full border border-emerald-500/20 animate-pulse">
                        <Megaphone size={28} className="text-emerald-500" />
                      </div>
                      <div className="text-center space-y-1">
                        <h5 className="text-xs font-black uppercase tracking-wider text-emerald-400">SISTEM INTEGRASI SIARAN AKTIF</h5>
                        <p className="text-[10px] text-gray-400">Sedang mengirimkan siaran masal ke nomor seluler & token perangkat...</p>
                      </div>

                      {/* Percentage block */}
                      <p className="text-2xl font-black font-mono text-white leading-none">{broadcastProgress}%</p>
                      <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
                        <div
                          className="bg-emerald-500 h-full transition-all duration-150 rounded-full"
                          style={{ width: `${broadcastProgress}%` }}
                        ></div>
                      </div>

                      {/* Fast-flowing mock raw server outputs for depth and real system-feel */}
                      <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 font-mono text-[8px] text-emerald-400 overflow-hidden h-[90px] space-y-1 flex flex-col justify-end">
                        <p className="border-b border-slate-800 pb-1 text-slate-500">MOCK DISPATCH CONSOLE LOGS:</p>
                        {broadcastProgress < 30 && <p className="animate-pulse">Initializing API Gateway Client... Success</p>}
                        {broadcastProgress >= 30 && broadcastProgress < 60 && (
                          <>
                            <p className="text-slate-500">Connected to Majalengka SMS-COM-API</p>
                            <p>Queue index batch #1 [size=50] dispatched</p>
                          </>
                        )}
                        {broadcastProgress >= 60 && broadcastProgress < 100 && (
                          <>
                            <p className="text-slate-500">Injecting WhatsApp templates with user context</p>
                            <p>Queue index batch #2 [size=75] dispatched</p>
                            <span className="text-yellow-500 text-[7px]">Verification bypass [OK]</span>
                          </>
                        )}
                        {broadcastProgress === 100 && (
                          <>
                            <p className="text-blue-400">Batch delivery audit matched. Successfully verified.</p>
                            <p className="text-emerald-300 font-bold border-t border-emerald-900 mt-1">Done! Broadcast completed: {broadcastTargetCount} sent.</p>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Render preview when no broadcasting is underway */}
                  <div className="flex-1 overflow-y-auto flex flex-col bg-[#0b141a]/95">
                    {notiChannel === "WhatsApp" ? (
                      <div className="flex flex-col h-full bg-[#0b141a] bg-[radial-gradient(#1c2c35_1px,transparent_1px)] [background-size:16px_16px]">
                        {/* Mock WA Room bar */}
                        <div className="bg-[#1f2c34] p-2.5 flex items-center gap-2 border-b border-[#2c3941]">
                          <span className="text-[12px] text-slate-300 select-none">←</span>
                          <div className="w-6 h-6 rounded-full bg-emerald-600 font-sans font-black text-[9px] flex items-center justify-center text-white">DK</div>
                          <div className="flex-1">
                            <h6 className="text-[10px] font-black leading-tight">Disnaker Kab. Majalengka</h6>
                            <span className="text-[8px] text-emerald-405 font-bold block">Akun Resmi Dinas • Online</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-bold tracking-widest select-none">⋮</span>
                        </div>

                        {/* Speech bubble section */}
                        <div className="p-4 flex-1 flex flex-col justify-end">
                          <div className="max-w-[85%] self-start bg-[#128c7e]/15 border border-[#128c7e]/30 rounded-2xl p-3 text-xs text-slate-100 shadow space-y-1.5">
                            {broadcastTitle && (
                              <h5 className="font-extrabold text-[11px] text-emerald-400 tracking-wide leading-snug border-b border-emerald-900/40 pb-1 uppercase">
                                {broadcastTitle}
                              </h5>
                            )}
                            <p className="text-[10px] text-slate-200 leading-relaxed whitespace-pre-wrap">
                              {broadcastMessage || "Tuliskan isi pesan siaran di samping kiri untuk melihat visualisasi pratinjau pesan WhatsApp secara instan..."}
                            </p>
                            <div className="flex items-center justify-end gap-1 text-[8px] text-slate-400 mt-1 select-none">
                              <span>19:09 PM</span>
                              <span className="text-[#34b7f1] font-bold">✓✓</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-5 flex-1 flex flex-col justify-start space-y-4">
                        <div className="text-center py-2 text-[10px] text-slate-500 font-semibold border-b border-slate-900">
                          Pratinjau Layar Kunci Telepon Seluler
                        </div>

                        {/* Mock Widget Clock on lockscreen */}
                        <div className="text-center py-2 leading-none">
                          <p className="text-3xl font-light tracking-wide text-slate-200">19:09</p>
                          <p className="text-[9px] text-slate-500 uppercase font-bold tracking-wider0 mt-1">Sabtu, 6 Juni 2526</p>
                        </div>

                        {/* Push Notification Card */}
                        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 shadow-lg flex gap-3 animate-fadeIn">
                          <div className="w-7 h-7 shrink-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center font-sans font-black text-[9px] text-white">
                            DK
                          </div>
                          <div className="flex-1 text-xs space-y-1 min-w-0">
                            <div className="flex justify-between items-center text-slate-400 select-none">
                              <span className="font-black uppercase text-[8px] tracking-wider text-blue-400">Disnaker Majalengka</span>
                              <span className="text-[8px] font-mono">Baru saja</span>
                            </div>
                            <h6 className="font-black text-slate-100 truncate text-[11px] leading-tight">
                              {broadcastTitle || "Pengumuman Resmi Dinas"}
                            </h6>
                            <p className="text-[10px] text-slate-350 leading-relaxed line-clamp-3">
                              {broadcastMessage || "Ketik pesan publik Anda untuk meninjau penampakan notifikasi di ponsel umum..."}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Targets demographic information card */}
              <div className="bg-white rounded-3xl border border-blue-105 p-5 shadow-sm space-y-3">
                <h5 className="text-[11px] font-black uppercase text-slate-400 tracking-wider">
                  Target & Layanan Demografis
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                  Sistem siaran terintegrasi ini diproteksi oleh regulasi UU ITE Indonesia No. 11 Tahun 2008 Pasal 28. Segala informasi yang disiarkan dijamin bebas dari unsur penipuan, penawaran komersial ilegal, atau berita hoaks.
                </p>
              </div>
            </div>
          </div>

          {/* HISTORY ROW LOGS SECTION */}
          <div className="bg-white rounded-3xl border border-blue-105 p-6 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-3">
              <div className="space-y-1">
                <h4 className="text-sm font-black text-slate-800 uppercase tracking-wide">
                  Riwayat Siaran Massal & Notifikasi Dinas Terbaru
                </h4>
                <p className="text-xs text-gray-550">
                  Berikut draf dan sejarah pengiriman informasi massal resmi yang telah terdistribusi melalui gateway Disnaker.
                </p>
              </div>

              {/* Mini Search box within history */}
              <div className="flex items-center bg-slate-50 border border-slate-205 rounded-xl px-3 py-2 text-xs min-w-[240px] max-w-[320px]">
                <Search size={13} className="text-slate-400 shrink-0 mr-1.5" />
                <input
                  type="text"
                  placeholder="Cari kata kunci riwayat siaran..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-slate-800 outline-none w-full font-semibold text-[11px]"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              {broadcastHistory.filter(h => 
                h.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                h.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                h.segment.toLowerCase().includes(searchQuery.toLowerCase())
              ).length === 0 ? (
                <div className="text-center py-8 text-xs text-gray-400 italic">
                  Tidak ditemukan riwayat siaran massal yang cocok dengan pencarian kata kunci Anda.
                </div>
              ) : (
                <table className="w-full text-left text-xs text-slate-705 border-collapse">
                  <thead>
                    <tr className="border-b border-slate-150 bg-slate-50 font-black text-slate-500 uppercase tracking-wider text-[10px]">
                      <th className="py-2.5 px-3">Tanggal Blast</th>
                      <th className="py-2.5 px-3">Channel</th>
                      <th className="py-2.5 px-3">Target Segmen / Penerima</th>
                      <th className="py-2.5 px-3">Subjek & Isi Informasi</th>
                      <th className="py-2.5 px-3 text-right">Jumlah Penerima</th>
                      <th className="py-2.5 px-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold">
                    {broadcastHistory
                      .filter(h => 
                        h.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        h.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        h.segment.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((log) => (
                        <tr key={log.id} className="hover:bg-slate-50/50 transition">
                          <td className="py-3 px-3 font-mono text-[10px] text-slate-400 whitespace-nowrap">{log.date}</td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase text-white ${
                              log.channel === "WhatsApp" ? "bg-[#128c7e]" : "bg-blue-600"
                            }`}>
                              {log.channel}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-slate-800 text-[11px] leading-tight max-w-[180px] truncate">{log.segment}</td>
                          <td className="py-3 px-3 max-w-[320px]">
                            <h6 className="font-extrabold text-slate-900 text-[11px]">{log.title}</h6>
                            <p className="text-[10px] text-slate-500 line-clamp-2 mt-0.5 leading-relaxed italic">
                              &quot;{log.message}&quot;
                            </p>
                          </td>
                          <td className="py-3 px-3 text-right font-mono font-bold text-slate-900 text-[11px]">{log.reachedCount.toLocaleString("id-ID")} orang</td>
                          <td className="py-3 px-3 text-center">
                            <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-100 px-2 py-0.5 rounded-full font-bold">
                              {log.status} (100%)
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
