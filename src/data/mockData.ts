import { JobVacancy, CompanyProfile, ComplaintTicket, TrainingProgram, JobFairEvent, SubdistrictStats } from "../types";

// 26 Kecamatan in Kabupaten Majalengka (selected sample with localized realism)
export const MAJALENGKA_SUBDISTRICTS: SubdistrictStats[] = [
  { id: "kec_kertajati", name: "Kertajati (Aerocity Area)", unemploymentCount: 1420, workforceCount: 16800, graduatesCount: 1200, companiesCount: 22, complaintsCount: 14 },
  { id: "kec_ligung", name: "Ligung (Shoe & Garment Hub)", unemploymentCount: 1850, workforceCount: 22400, graduatesCount: 950, companiesCount: 28, complaintsCount: 32 },
  { id: "kec_jatiwangi", name: "Jatiwangi (Terracotta & Creative)", unemploymentCount: 2100, workforceCount: 28500, graduatesCount: 1800, companiesCount: 35, complaintsCount: 18 },
  { id: "kec_dawuan", name: "Dawuan", unemploymentCount: 1100, workforceCount: 19800, graduatesCount: 1400, companiesCount: 19, complaintsCount: 8 },
  { id: "kec_majalengka", name: "Majalengka Kota (Pusat Pemerintahan)", unemploymentCount: 950, workforceCount: 24200, graduatesCount: 2800, companiesCount: 15, complaintsCount: 5 },
  { id: "kec_kadipaten", name: "Kadipaten", unemploymentCount: 1300, workforceCount: 18400, graduatesCount: 1100, companiesCount: 12, complaintsCount: 11 },
  { id: "kec_sumberjaya", name: "Sumberjaya", unemploymentCount: 1450, workforceCount: 21000, graduatesCount: 1300, companiesCount: 24, complaintsCount: 21 },
  { id: "kec_kasokandel", name: "Kasokandel", unemploymentCount: 1200, workforceCount: 17500, graduatesCount: 1050, companiesCount: 20, complaintsCount: 15 },
  { id: "kec_argapura", name: "Argapura (Agrowisata Terasering)", unemploymentCount: 800, workforceCount: 12400, graduatesCount: 600, companiesCount: 4, complaintsCount: 1 },
  { id: "kec_cikijing", name: "Cikijing", unemploymentCount: 1600, workforceCount: 23200, graduatesCount: 1500, companiesCount: 18, complaintsCount: 9 },
];

export const MOCK_COMPANIES: CompanyProfile[] = [
  {
    id: "co_shoetown",
    name: "PT Shoetown Ligung Indonesia",
    logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=200&auto=format&fit=crop",
    nib: "9120101562913",
    npwp: "01.234.567.8-439.001",
    address: "Jl. Raya Ligung No. 45, Kecamatan Ligung, Kabupaten Majalengka, Jawa Barat",
    subdistrict: "Ligung",
    coordinate: { lat: -6.7118, lng: 108.2325 },
    employeeCount: 14500,
    sector: "Manufaktur Alas Kaki",
    website: "https://shoetown-hr.id",
    csrRating: 4.8,
    rating: 4.6,
    localWorkforcePercent: 82, // Highly patriotic local workforce hiring
  },
  {
    id: "co_nabati",
    name: "PT Kaldu Sari Nabati Dawuan",
    logo: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=200&auto=format&fit=crop",
    nib: "8120401831821",
    npwp: "02.567.123.4-439.002",
    address: "Kawasan Industri Dawuan KM 12, Dawuan, Kabupaten Majalengka, Jawa Barat",
    subdistrict: "Dawuan",
    coordinate: { lat: -6.7412, lng: 108.2014 },
    employeeCount: 4200,
    sector: "F&B Manufaktur",
    website: "https://nabatigroup.com",
    csrRating: 4.5,
    rating: 4.4,
    localWorkforcePercent: 78,
  },
  {
    id: "co_gistex",
    name: "PT Gistex Garment Indonesia (Kasokandel)",
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=200&auto=format&fit=crop",
    nib: "9120701192837",
    npwp: "03.789.456.1-439.003",
    address: "Jl. Siliwangi No. 129, Kasokandel, Kabupaten Majalengka",
    subdistrict: "Kasokandel",
    coordinate: { lat: -6.7588, lng: 108.2394 },
    employeeCount: 3100,
    sector: "Tekstil & Garment",
    website: "https://gistexgarment.com",
    csrRating: 4.7,
    rating: 4.5,
    localWorkforcePercent: 89,
  },
  {
    id: "co_pinarr",
    name: "PT Pinarr Kertajati Aviation Services",
    logo: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=200&auto=format&fit=crop",
    nib: "9122001569302",
    npwp: "04.221.930.8-439.005",
    address: "Bandara Internasional Jawa Barat (BIJB) Kertajati, Aerocity Area, Majalengka",
    subdistrict: "Kertajati",
    coordinate: { lat: -6.6432, lng: 108.1882 },
    employeeCount: 850,
    sector: "Logistik & Transportasi Udara",
    website: "https://pinarr-aviation.co.id",
    csrRating: 4.2,
    rating: 4.3,
    localWorkforcePercent: 65,
  },
  {
    id: "co_majalenggaterracotta",
    name: "Koperasi Jatiwangi Terracotta Craft",
    logo: "https://images.unsplash.com/photo-1565192647048-f997ded87ab4?q=80&w=200&auto=format&fit=crop",
    nib: "7120300182736",
    npwp: "08.129.876.3-439.006",
    address: "Situs Kebudayaan Terracotta, Jatiwangi, Desa Jatisura, Majalengka",
    subdistrict: "Jatiwangi",
    coordinate: { lat: -6.7291, lng: 108.2755 },
    employeeCount: 150,
    sector: "Kreatif & Seni Keramik",
    website: "https://jatiwangiclay.com",
    csrRating: 4.9,
    rating: 4.8,
    localWorkforcePercent: 100,
  }
];

export const MOCK_JOBS: JobVacancy[] = [
  {
    id: "job_01",
    companyId: "co_shoetown",
    companyName: "PT Shoetown Ligung Indonesia",
    companyLogo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=200&auto=format&fit=crop",
    title: "Operator Produksi Sepatu Ekspor",
    location: "Kecamatan Ligung",
    salaryRange: "Rp 2.450.000 - Rp 3.100.000",
    jobType: "Full-Time",
    experience: "Lulusan Baru dipersilakan",
    education: "SMA / SMK Sederajat",
    requirements: [
       "Usia minimal 18 tahun",
       "Sehat jasmani dan rohani dibuktikan dengan surat dokter resmi Majalengka",
       "Mampu bekerja dengan target tim yang konsisten",
       "Memiliki ketelitian tinggi dalam proses penjahitan/bonding sol sepatu"
    ],
    responsibilities: [
       "Melakukan pemasangan bagian atas sepatu (upper) dengan sol bawah menggunakan mesin press modern",
       "Melakukan inspeksi kualitas (QC) hasil produksi alas kaki ekspor",
       "Memastikan keselamatan kerja (K3) selalu diterapkan di area lunas produksi"
    ],
    postedAt: "2026-06-05",
    sector: "Manufaktur",
    isKertajatiRebana: true,
    rating: 4.6,
    applicationsCount: 142
  },
  {
    id: "job_02",
    companyId: "co_nabati",
    companyName: "PT Kaldu Sari Nabati Dawuan",
    title: "Quality Assurance Staff (Food & Safety)",
    location: "Kecamatan Dawuan",
    companyLogo: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=200&auto=format&fit=crop",
    salaryRange: "Rp 3.500.000 - Rp 4.800.000",
    jobType: "Full-Time",
    experience: "1-2 Tahun di bidang FMCG",
    education: "D3 / S1 Kimia, Farmasi atau Teknologi Pangan",
    requirements: [
       "Memahami standar mutu keamanan pangan HACCP dan ISO 22000",
       "Memiliki ketelitian tinggi analisis laboratorium mikroba",
       "Bersedia bekerja dengan sistem shift rolling"
    ],
    responsibilities: [
       "Memeriksa kualitas bahan baku krispi wafels sebelum masuk silo pencampuran",
       "Memverifikasi kebersihan sanitasi lini pengemasan otomatis",
       "Membuat laporan audit kebersihan berkala untuk pimpinan pabrik"
    ],
    postedAt: "2026-06-04",
    sector: "Kuliner",
    isKertajatiRebana: false,
    rating: 4.4,
    applicationsCount: 89
  },
  {
    id: "job_03",
    companyId: "co_pinarr",
    companyName: "PT Pinarr Kertajati Aviation Services",
    title: "Warehouse Air Cargo Operator",
    location: "Kecamatan Kertajati (BIJB)",
    companyLogo: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=200&auto=format&fit=crop",
    salaryRange: "Rp 3.000.000 - Rp 4.200.000",
    jobType: "Kontrak",
    experience: "Minimal 1 tahun Logistik",
    education: "SMK Logistik / SMA / Sederajat",
    requirements: [
       "Berdomisili utama di Kabupaten Majalengka (Diutamakan Kertajati/Kadipaten)",
       "Memiliki sertifikat Lisensi SIO Forklift aktif merupakan nilai plus",
       "Fisik prima untuk bongkar muat kargo internasional pesawat Boeing 737 Cargo"
    ],
    responsibilities: [
       "Menerima dan memverifikasi barang kargo masuk berdasarkan manifest bea cukai",
       "Mengoperasikan sistem barcode scanner untuk akurasi pelacakan logistik",
       "Mengatur tata letak baki pallet ekspor di kubah pergudangan Kertajati Aerocity"
    ],
    postedAt: "2026-06-03",
    sector: "Logistik & Transportasi",
    isKertajatiRebana: true,
    rating: 4.3,
    applicationsCount: 74
  },
  {
    id: "job_04",
    companyId: "co_gistex",
    companyName: "PT Gistex Garment Indonesia (Kasokandel)",
    title: "Senior Pattern Maker (Pola Garment)",
    location: "Kecamatan Kasokandel",
    companyLogo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=200&auto=format&fit=crop",
    salaryRange: "Rp 4.000.000 - Rp 5.500.000",
    jobType: "Full-Time",
    experience: "Minimal 3 tahun Pattern Development",
    education: "SMK Tatabusana / D3 / S1 Fashion Design",
    requirements: [
       "Menguasai software pembuatan pola Computer-Aided Design (CAD Gerber / Optitex)",
       "Memahami struktur grading ukuran baju ekspor pasar Eropa dan Amerika",
       "Cekatan berkomunikasi menerjemahkan instruksi buyer asing"
    ],
    responsibilities: [
       "Membuat pola master awal berdasarkan sketsa tech pack dari divisi desain",
       "Memandu asisten penjahit sampel dalam menjahit produk prototipe perdana",
       "Merancang nesting efisiensi bahan kain untuk meminimalisir limbah produksi industri"
    ],
    postedAt: "2026-06-01",
    sector: "Manufaktur",
    isKertajatiRebana: true,
    rating: 4.5,
    applicationsCount: 31
  },
  {
    id: "job_05",
    companyId: "co_majalenggaterracotta",
    companyName: "Koperasi Jatiwangi Terracotta Craft",
    title: "Desainer Produk Keramik Kreatif",
    location: "Kecamatan Jatiwangi",
    companyLogo: "https://images.unsplash.com/photo-1565192647048-f997ded87ab4?q=80&w=200&auto=format&fit=crop",
    salaryRange: "Rp 2.600.000 - Rp 3.500.000",
    jobType: "Magang",
    experience: "Tanpa Pengalaman / Menguasai software modeling 3D",
    education: "SMK Seni Rupa / D3 Desain Produk / Umum",
    requirements: [
       "Jiwa seni tinggi, menghargai budaya genteng tanah liat khas Jatiwangi",
       "Menguasai blender atau AutoCAD untuk menggambar prototipe cetakan genteng artistik",
       "Senang bersosialisasi dengan pengrajin lokal tanah liat"
    ],
    responsibilities: [
       "Mengembangkan motif fungsional baru untuk batu bata dekorasi & genteng artistik",
       "Melakukan eksperimen pernis warna ramah lingkungan bersama pengrajin tungku pembakaran",
       "Membuat konten foto estetik produk terakota untuk diunggah ke etalase digital global"
    ],
    postedAt: "2026-05-28",
    sector: "Kreatif",
    isKertajatiRebana: true,
    rating: 4.8,
    applicationsCount: 46
  }
];

export const MOCK_COMPLAINTS: ComplaintTicket[] = [
  {
    id: "ticket_001",
    trackingNumber: "DISNAKER-COMP-901-2026",
    category: "PHK Sepihak",
    reporterName: "Radit Widjaya",
    reporterNik: "3210120205980003",
    companyName: "PT Global Tekstil Mandiri Majalengka",
    description: "Saya diberhentikan tanpa adanya surat peringatan tertulis terlebih dahulu (SP1-SP3), dan uang pesangon masa bakti 2 tahun belum ditransfer atau dicairkan penuh.",
    createdAt: "2026-06-04",
    status: "Mediasi",
    evidenceUrl: "dummy_notaris_phk.pdf",
    mediationSchedule: "2026-06-12 10:00 WIB via Zoom Online Disnaker"
  },
  {
    id: "ticket_002",
    trackingNumber: "DISNAKER-COMP-902-2026",
    category: "Gaji Tidak Dibayar",
    reporterName: "Indra Lesmana",
    reporterNik: "3210150912950001",
    companyName: "PT Maju Logistik Dawuan",
    description: "Gaji pokok bulan Maret dan April belum dtransfer penuh dengan alasan cashflow terganggu, padahal jam lembur di area pergudangan dipaksakan terus.",
    createdAt: "2026-06-05",
    status: "Diverifikasi",
    evidenceUrl: "rekap_absen_dan_slip.jpg"
  },
  {
    id: "ticket_003",
    trackingNumber: "DISNAKER-COMP-842-2026",
    category: "BPJS Tidak Aktif",
    reporterName: "Siti Rahmawati",
    reporterNik: "3210082403990002",
    companyName: "CV Majalengka Boga Rasa",
    description: "Klaim rumah sakit saya ditolak karena pembayaran premi BPJS Kesehatan dipotong dari slip gaji bulanan namun tidak disetorkan oleh manajemen ke kas negara.",
    createdAt: "2026-05-28",
    status: "Selesai",
    evidenceUrl: "bukti_tagihan_bpjs.pdf",
    mediationSchedule: "Telah diselesaikan secara kekeluargaan; Perusahaan bersedia menutup seluruh tagihan denda rumah sakit."
  }
];

export const MOCK_TRAININGS: TrainingProgram[] = [
  {
    id: "train_01",
    title: "Pengelasan Logam Kombinasi (GMAW / GTAW)",
    duration: "120 Jam Pelajaran (24 Hari)",
    startDate: "2026-06-20",
    quota: 25,
    registeredCount: 19,
    instructor: "Suherman, S.ST (Instruktur BLK Senior)",
    syllabus: [
       "Kesehatan dan Keselamatan Kerja Listrik & Percikan Sinar Las",
       "Teori dasar penetrasi logam las GTAW",
       "Praktik las plat tingkat dasar posisi 1F dan 2F",
       "Praktik pengelasan pipa baja sirkular posisi 5G"
    ],
    isSertifikasi: true,
    videoLessons: [
      { id: "vid_1_1", title: "Mengenal Alat Las & Setelan Tekanan Gas Argon", url: "https://www.w3schools.com/html/mov_bbb.mp4", duration: "12:15" },
      { id: "vid_1_2", title: "Teknik Ayunan Elektrode Las Sempurna", url: "https://www.w3schools.com/html/movie.mp4", duration: "18:45" }
    ],
    description: "Program pelatihan bersertifikat resmi Disnaker dan BNSP untuk mencetak welder profesional siap serap di galangan kapal, konstruksi Rebana, dan otomotif."
  },
  {
    id: "train_02",
    title: "Operator Komputer & Administrasi Perkantoran Modern",
    duration: "80 Jam Pelajaran (16 Hari)",
    startDate: "2026-06-25",
    quota: 30,
    registeredCount: 28,
    instructor: "Dian Novitasari, M.Kom",
    syllabus: [
       "Menguasai Pengolah Data Rumus Excel Lanjut (VLOOKUP, Pivot, Macro)",
       "Efisiensi manajemen arsip digital Google Drive",
       "Korespondensi bisnis surat-menyurat resmi pemerintah/swasta",
       "Dasar-dasar prompt engineering AI untuk sekretariatan"
    ],
    isSertifikasi: true,
    videoLessons: [
      { id: "vid_2_1", title: "Rumus Dahsyat Excel Pengolah Logistik Keuangan", url: "https://www.w3schools.com/html/mov_bbb.mp4", duration: "22:15" }
    ],
    description: "Pelatihan administrasi praktis yang berorientasi pada kebutuhan ketertiban dokumentasi perusahaan pabrik modern di kawasan industri baru Majalengka."
  },
  {
    id: "train_03",
    title: "Desain Grafis & Pembuatan Konten Digital UMKM",
    duration: "60 Jam Pelajaran (12 Hari)",
    startDate: "2026-07-01",
    quota: 20,
    registeredCount: 8,
    instructor: "Ade Terracotta",
    syllabus: [
       "Teori warna, tipografi, dan komposisi visual harmoni",
       "Desain visual media sosial praktis menggunakan Canva & Figma",
       "Mengambil foto produk estetik hanya dengan modal Smartphone",
       "Seni menulis deskripsi penjualan (Copywriting) menarik minat pembeli"
    ],
    isSertifikasi: false,
    videoLessons: [
      { id: "vid_3_1", title: "Komposisi Rule of Third Foto Produk Kerajinan", url: "https://www.w3schools.com/html/movie.mp4", duration: "15:30" }
    ],
    description: "Cocok untuk lulusan baru yang bertekad berkecimpung di industri kreatif lokal atau membantu scale up publikasi kerajinan gerabah di Majalengka."
  }
];

export const MOCK_JOB_FAIR: JobFairEvent = {
  id: "jf_001",
  title: "Majalengka Digital Job Fair 2026 (Rebana Expo)",
  date: "12-14 Juli 2026",
  location: "Gedung Bagas Raya / Virtual Stand Lobby",
  registeredCount: 4520,
  companiesCount: 18,
  qrCodeUrl: "MAJALENGKA-JOBFAIR-2026-SECURE",
  stands: [
    { companyName: "PT Shoetown Ligung Indonesia", logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=100&auto=format&fit=crop", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", hrName: "Bapak Harry Gunawan (HRD Manager)", isOnline: true },
    { companyName: "PT Kaldu Sari Nabati Dawuan", logo: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=100&auto=format&fit=crop", videoUrl: "https://www.w3schools.com/html/movie.mp4", hrName: "Ibu Amanda Safitri (Talent Acquisition)", isOnline: true },
    { companyName: "PT Gistex Garment Indonesia", logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=100&auto=format&fit=crop", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", hrName: "Bapak Agus Salim (Recruitment Staff)", isOnline: false }
  ]
};
