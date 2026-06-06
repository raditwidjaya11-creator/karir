export type UserRole =
  | "Super Admin"
  | "Admin Pemkab"
  | "Admin Disnaker"
  | "Perusahaan"
  | "Pencari Kerja"
  | "BLK"
  | "Sekolah"
  | "Universitas"
  | "Investor"
  | "Operator Kecamatan"
  | "Operator Desa"
  | "Bupati"; // Bupati roles acts as the executive module

export interface SubdistrictStats {
  id: string;
  name: string;
  unemploymentCount: number;
  workforceCount: number;
  graduatesCount: number;
  companiesCount: number;
  complaintsCount: number;
}

export interface JobVacancy {
  id: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  title: string;
  location: string; // Kecamatan inside Majalengka
  salaryRange: string;
  jobType: "Full-Time" | "Part-Time" | "Kontrak" | "Magang" | "Massal";
  experience: string;
  education: string;
  requirements: string[];
  responsibilities: string[];
  postedAt: string;
  sector: "Manufaktur" | "Logistik & Transportasi" | "Kuliner" | "Teknologi" | "Kreatif" | "Pertanian";
  isKertajatiRebana: boolean; // Flag if located inside Kertajati Aerocity or Rebana Golden Triangle
  rating: number;
  applicationsCount: number;
}

export interface CompanyProfile {
  id: string;
  name: string;
  logo: string;
  nib: string;
  npwp: string;
  address: string;
  subdistrict: string;
  coordinate: { lat: number; lng: number };
  employeeCount: number;
  sector: string;
  website: string;
  csrRating: number;
  rating: number;
  localWorkforcePercent: number; // Percentage of Majalengka local workers
}

export interface ComplaintTicket {
  id: string;
  trackingNumber: string;
  category:
    | "Gaji Tidak Dibayar"
    | "BPJS Tidak Aktif"
    | "PHK Sepihak"
    | "Kecelakaan Kerja"
    | "Diskriminasi"
    | "Pelecehan Kerja"
    | "Penipuan Lowongan"
    | "Perselisihan Hubungan Industrial";
  reporterName: string;
  reporterNik: string;
  companyName: string;
  description: string;
  createdAt: string;
  status: "Masuk" | "Diverifikasi" | "Diproses" | "Mediasi" | "Selesai";
  evidenceUrl?: string;
  mediationSchedule?: string;
}

export interface TrainingProgram {
  id: string;
  title: string;
  duration: string;
  startDate: string;
  quota: number;
  registeredCount: number;
  instructor: string;
  syllabus: string[];
  isSertifikasi: boolean;
  videoLessons: { id: string; title: string; url: string; duration: string }[];
  description: string;
}

export interface JobFairEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  registeredCount: number;
  companiesCount: number;
  qrCodeUrl: string;
  stands: { companyName: string; logo: string; videoUrl: string; hrName: string; isOnline: boolean }[];
}

export interface Ak1Application {
  id: string;
  nik: string;
  fullName: string;
  birthPlaceDate: string;
  gender: string;
  education: string;
  major: string;
  address: string;
  subdistrict: string;
  village: string;
  photoUrl: string;
  status: "Draft" | "Diajukan" | "Diverifikasi" | "Aktif" | "Kedaluwarsa";
  cardNum?: string; // Number on card
  issuedDate?: string;
  expiryDate?: string;
}
