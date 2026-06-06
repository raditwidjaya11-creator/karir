import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "15mb" }));

// Lazy initializer for Google GenAI safe against missing keys
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("⚠️ GEMINI_API_KEY is not defined. AI Assistant will operate in rich fallback mode.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// ----------------------------------------------------
// AI CAREER ASSISTANT ENDPOINTS
// ----------------------------------------------------

// 1. Career Advice Chatbot
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    const ai = getGenAI();

    // If no real API key is configured, supply an educational and context-rich response
    if (process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY" || !process.env.GEMINI_API_KEY) {
      return res.json({
        text: `[Rich Demo Mode] Halo! Saya adalah AI Career Assistant Disnaker Kabupaten Majalengka. Di Kabupaten Majalengka, kami memiliki Kawasan Industri Kertajati Aerocity dan Rebana yang sedang berkembang pesat.

Untuk pertanyaan Anda: "${message}", saran terbaik saya adalah mendaftarkan diri Anda pada program Pelatihan BLK (Balai Latihan Kerja) Majalengka untuk meningkatkan keterampilan teknis Anda, serta mengajukan AK1 (Kartu Kuning Digital) langsung melalui aplikasi ini untuk mempermudah pemetaan karir oleh dinas.`
      });
    }

    const systemInstruction = 
      "Anda adalah AI Career Assistant resmi dari Dinas Ketenagakerjaan (Disnaker) Kabupaten Majalengka. " +
      "Tugas Anda adalah melayani pencari kerja, memberikan konsultasi karir, membimbing simulasi wawancara kerja, " +
      "menganalisis peluang kerja di kawasan industri Rebana dan Bandara Kertajati, serta merekomendasikan pelatihan di " +
      "BLK Pemkab Majalengka. Berbahasalah secara sopan, inspiratif, profesional dengan bahasa Indonesia yang baik.";

    const formattedContents = [];
    if (history && Array.isArray(history)) {
      for (const h of history) {
        formattedContents.push({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.content }]
        });
      }
    }
    formattedContents.push({ role: "user", parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Chat Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI response" });
  }
});

// 2. Resume / CV Analysis
app.post("/api/gemini/cv-analyze", async (req, res) => {
  try {
    const { cvText, targetJobTitle } = req.body;
    const ai = getGenAI();

    if (process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY" || !process.env.GEMINI_API_KEY) {
      // Return high quality dummy analysis
      return res.json({
        text: JSON.stringify({
          matchScore: 82,
          strengths: ["Keahlian teknis yang memadai", "Domisili strategis di sekitar Majalengka", "Sertifikasi relevan"],
          weaknesses: ["Kurangnya pengalaman proyek skala besar di bidang manufaktur modern", "Kemampuan bahasa asing (Inggris/Mandarin) masih dasar"],
          recommendations: [
            "Ambil sertifikasi pelatihan Manufaktur & Logistik di BLK Majalengka",
            "Tonjolkan portofolio pengerjaan alat perkakas di CV Anda",
            "Ikuti program Bahasa Inggris Komunikasi Industri yang diselenggarakan Disnaker"
          ],
          suggestedJobs: ["Operator Produksi - PT Shoetown Ligung", "Staf Gudang - Kertajati Logistik Aerocity"]
        })
      });
    }

    const prompt = `Analisis CV/Resume berikut untuk kecocokan dengan pekerjaan target: "${targetJobTitle || "Umum/Pabrik Manufaktur Majalengka"}".
    CV Content:
    ${cvText}
    
    Berikan hasil analisis dalam format JSON terstruktur dengan kunci: MatchScore (integer 0-100), Strengths (array of strings), Weaknesses (array of strings), Recommendations (array of strings), dan SuggestedJobs (array of strings).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            matchScore: { type: Type.INTEGER, description: "Skor kecocokan pencari kerja dengan target industri Majalengka (0-100)" },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Poin-poin kekuatan utama kandidat" },
            weaknesses: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Pekerjaan rumah atau kekurangan kompetensi" },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Rekomendasi tindakan konkret (pelatihan BLK / sertifikasi)" },
            suggestedJobs: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Rekomendasi jenis lowongan kerja di Rebana/Kertajati" }
          },
          required: ["matchScore", "strengths", "weaknesses", "recommendations", "suggestedJobs"]
        }
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini CV Analyze Error:", error);
    res.status(500).json({ error: error.message || "Failed to analyze CV" });
  }
});

// 3. Quick AI Matcher (Job Seeker Profile against Job Post details)
app.post("/api/gemini/job-match", async (req, res) => {
  try {
    const { seekerProfile, jobDetails } = req.body;
    const ai = getGenAI();

    if (process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY" || !process.env.GEMINI_API_KEY) {
      // Responsive dynamic score based on profile/job match simulation
      const textMatch = (seekerProfile?.skills || []).some((s: string) => 
        (jobDetails?.requirements || []).some((r: string) => r.toLowerCase().includes(s.toLowerCase()))
      );
      const calculatedScore = textMatch ? 88 : 65;
      return res.json({
        score: calculatedScore,
        justification: "Kandidat memiliki beberapa kesamaan keahlian sesuai dengan kebutuhan lowongan, khususnya dalam bidang operasional administrasi dan manufaktur Majalengka.",
        missingSkills: ["Sertifikasi keselamatan kerja (K3 Umum)", "Pengalaman mengoperasikan mesin CNC tingkat lanjut"]
      });
    }

    const prompt = `Lakukan pencocokan otomatis (AI Matching) antara profil Pencari Kerja dan Detail Lowongan berikut:
    PROFIL PENCARI KERJA:
    ${JSON.stringify(seekerProfile)}

    DETAIL LOWONGAN KERJA:
    ${JSON.stringify(jobDetails)}

    Berikan penilaian objektif dalam format JSON dengan kunci:
    - score (integer 0 sampai 100)
    - justification (penjelasan mengapa skor tersebut diberikan)
    - missingSkills (array of strings berisi keahlian/sertifikat yang belum dipenuhi oleh pencari kerja untuk pekerjaan ini)`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER },
            justification: { type: Type.STRING },
            missingSkills: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["score", "justification", "missingSkills"]
        }
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Gemini Job Match Error:", error);
    res.status(500).json({ error: error.message || "Failed to match job" });
  }
});

// 4. Smart Category Filter (Classify profile skills into Majalengka sectors)
app.post("/api/gemini/suggest-category", async (req, res) => {
  try {
    const { skills, bio } = req.body;
    const skillsText = Array.isArray(skills) ? skills.join(", ") : String(skills || "");
    const fullProfile = `Skills: ${skillsText}. Bio: ${bio || ""}`;
    const ai = getGenAI();

    if (process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY" || !process.env.GEMINI_API_KEY) {
      // High fidelity dynamic simulation
      const text = fullProfile.toLowerCase();
      let sector = "Manufaktur";
      let keySkills = ["Mengoperasikan Alat Kerja", "Disiplin Kerja"];
      let explanation = "Keahlian Anda sangat cocok dengan sektor Manufaktur Majalengka.";
      
      if (text.includes("gudang") || text.includes("cargo") || text.includes("forklift") || text.includes("logistik") || text.includes("transportasi") || text.includes("kirim") || text.includes("port") || text.includes("kargo")) {
        sector = "Logistik & Transportasi";
        keySkills = ["Manajemen Logistik", "Warehouse Operation", "Bongkar Muat Kargo"];
        explanation = "Profil Anda mengarah kuat pada bidang Logistik dan Distribusi di kawasan Aerocity Kertajati.";
      } else if (text.includes("makan") || text.includes("masak") || text.includes("kuliner") || text.includes("resep") || text.includes("boga") || text.includes("pangan") || text.includes("dapur") || text.includes("kue") || text.includes("saji")) {
        sector = "Kuliner";
        keySkills = ["F&B Safety", "Keamanan Pangan (Food Safety)", "Sertifikasi Halal"];
        explanation = "Latar belakang boga / F&B Anda menempatkan Anda sebagai kandidat ideal untuk industri FMCG makanan di Majalengka.";
      } else if (text.includes("desain") || text.includes("seni") || text.includes("gambar") || text.includes("kreatif") || text.includes("creative") || text.includes("keramik") || text.includes("tanah liat") || text.includes("visual") || text.includes("figma")) {
        sector = "Kreatif";
        keySkills = ["Desain Grafis", "Pembuatan Konten Digital", "Seni Terakota Jatiwangi"];
        explanation = "Jiwa kreatif Anda sangat selaras dengan sektor industri kreatif dan kerajinan tanah liat (Terracotta) di Jatiwangi Majalengka.";
      } else if (text.includes("jahit") || text.includes("pola") || text.includes("sepatu") || text.includes("pabrik") || text.includes("operator") || text.includes("las") || text.includes("mesin") || text.includes("produksi") || text.includes("tekstil") || text.includes(" garment")) {
        sector = "Manufaktur";
        keySkills = ["Operator Produksi", "Ketenangan Fisik & K3", "Ketelitian Pola"];
        explanation = "Kompetensi teknis Anda tepat sasaran untuk industri Manufaktur skala ekspor di koridor Ligung atau Kasokandel.";
      }

      return res.json({
        suggestedSector: sector,
        explanation: `${explanation} (Mode Uji Coba Disnaker). Kami mendeteksi keterampilan Anda relevan dengan industri di koridor Rebana Majalengka. Sebaiknya perbarui resume Anda dengan menyisipkan keahlian yang terdeteksi di bawah.`,
        analysisScore: 88,
        keySkillsIdentified: keySkills,
        alternativeSectors: sector === "Manufaktur" ? ["Logistik & Transportasi"] : ["Manufaktur"]
      });
    }

    const prompt = `Analisis profil pencari kerja Majalengka ini dan tentukan sektor industri mana yang paling cocok dari opsi berikut:
    Sektor Tersedia:
    1. "Manufaktur" (Sangat cocok untuk keahlian pabrik, operator produksi, penjahit, pattern maker, pengelasan, operator mesin, tekstil/garment, alas kaki)
    2. "Logistik & Transportasi" (Kargo bandara Kertajati, pergudangan, dsb)
    3. "Kuliner" (Pabrik makanan FMCG, koki, kebersihan pangan, katering)
    4. "Kreatif" (Desain, konten digital, kerajinan keramik terakota Jatiwangi, seni rupa)

    Profil Pencari Kerja:
    ${fullProfile}

    Berikan analisis terstruktur dalam format JSON dengan kunci:
    - suggestedSector (Kategori string persis salah satu dari: "Manufaktur" atau "Logistik & Transportasi" atau "Kuliner" atau "Kreatif")
    - explanation (Kalimat penjelas berwibawa khas Disnaker Majalengka mengapa mereka cocok dan lowongan bidang apa yang sebaiknya diincar)
    - analysisScore (integer 0-100 tingkat confidence kecocokan)
    - keySkillsIdentified (array string keahlian utama yang terdeteksi dari profil mereka)
    - alternativeSectors (array string sekunder sektor cadangan yang juga bisa mereka masuki)`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestedSector: { type: Type.STRING, description: "Kategori sektor terpilih, salah satu dari: Manufaktur, Logistik & Transportasi, Kuliner, Kreatif" },
            explanation: { type: Type.STRING, description: "Penjelasan detail kecocokan kompetensi" },
            analysisScore: { type: Type.INTEGER, description: "Skor persentase keyakinan model (0-100)" },
            keySkillsIdentified: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Daftar keahlian yang terdeteksi dari teks profil" },
            alternativeSectors: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Sektor alternatif yang relevan" }
          },
          required: ["suggestedSector", "explanation", "analysisScore", "keySkillsIdentified", "alternativeSectors"]
        }
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Gemini Suggest Category Error:", error);
    res.status(500).json({ error: error.message || "Failed to analyze skills for category suggestion" });
  }
});

// 5. Admin AI Prepared Answering Suggestion Tool (Disiapkan Jawaban AI)
app.post("/api/gemini/chat-suggest", async (req, res) => {
  try {
    const { contactRole, contactName, messageHistory } = req.body;
    const ai = getGenAI();

    const lastMessage = messageHistory && messageHistory.length > 0 
      ? messageHistory[messageHistory.length - 1].content 
      : "";

    if (process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY" || !process.env.GEMINI_API_KEY) {
      // High fidelity demo suggestions based on incoming message keyword patterns
      const msgLower = (lastMessage || "").toLowerCase();
      
      let suggestions: string[] = [];
      if (contactRole === "Pencari Kerja") {
        if (msgLower.includes("ak1") || msgLower.includes("kuning")) {
          suggestions = [
            `Halo ${contactName}, pengajuan Kartu Kuning AK1 Anda telah terverifikasi oleh sistem Disnaker. Anda bisa mengunduh file PDF resminya langsung dari tab "AK1 Digital" di dashboard. Apakah ada hal lain yang bisa kami bantu?`,
            `Terima kasih sudah menghubungi kami, ${contactName}. Silakan lengkapi pas foto formal berlatar belakang merah/biru serta data NIK Dukcapil Anda agar verifikator kami dapat segera mengaktifkan kartu AK1 Anda.`,
            `Halo ${contactName}, pembuatan Kartu Kuning AK1 di Disnaker Majalengka 100% GRATIS tanpa pungutan biaya apa pun. Jangan ragu untuk melapor jika menemui kendala.`
          ];
        } else if (msgLower.includes("loker") || msgLower.includes("kerja") || msgLower.includes("lowongan")) {
          suggestions = [
            `Halo ${contactName}, saat ini wilayah Rebana & Kertajati sedang membuka banyak loker di bidang manufaktur (PT Shoetown & lainnya). Anda bisa melamar langsung via tab "Lowongan Aktif". Semua proses rekrutmen diprioritaskan untuk warga lokal Majalengka!`,
            `Salam ${contactName}, untuk memperbesar peluang kerja, kami sarankan Anda mengikuti pelatihan keterampilan gratis di Balai Latihan Kerja (BLK) Dinas Majalengka. Apakah Anda tertarik dengan bidang otomotif, garmen, atau IT?`,
            `Hai ${contactName}, kami merekomendasikan Anda untuk melakukan audit CV menggunakan "AI Career Assistant" di portal ini sebelum mengirimkan lamaran ke Mitra Industri.`
          ];
        } else {
          suggestions = [
            `Halo ${contactName}, terima kasih telah menghubungi Disnaker Majalengka. Ada yang dapat kami bantu terkait pembuatan AK1, program pelatihan gratis di BLK, atau informasi lowongan kerja terbaru di wilayah Rebana?`,
            `Pertanyaan Anda mengenai layanan ketenagakerjaan telah kami terima, ${contactName}. Mohon berikan nomor NIK atau nomor pendaftaran Anda agar kami dapat melakukan pengecekan lebih lanjut pada database kami.`,
            `Halo ${contactName}, jika Anda mengalami kendala teknis pada aplikasi, silakan bersihkan cache browser Anda atau hubungi admin via WhatsApp pengaduan resmi Kami.`
          ];
        }
      } else { // Mitra Industri / Perusahaan
        if (msgLower.includes("lapor") || msgLower.includes("wajib") || msgLower.includes("lowongan") || msgLower.includes("buka")) {
          suggestions = [
            `Yth. Perwakilan ${contactName}, terima kasih atas komitmennya membuka lowongan kerja di Majalengka. Sesuai Perda, kami mohon agar perusahaan mengutamakan serapan tenaga kerja lokal minimal 80%. Petugas kami siap membantu proses kurasi pelamar.`,
            `Selamat siang HRD ${contactName}. Lowongan yang Anda ajukan telah kami setujui dan sekarang tayang secara nasional di sistem Rebana Ketenagakerjaan. Kami akan mengirimkan kompilasi CV kandidat terbaik sore ini.`,
            `Terima kasih ${contactName}. Apakah Anda membutuhkan fasilitas tempat seleksi fisik / wawancara langsung di kantor Disnaker Majalengka? Kami menyediakan ruang serbaguna tanpa biaya untuk mitra industri resmi.`
          ];
        } else if (msgLower.includes("akun") || msgLower.includes("verifikasi") || msgLower.includes("nib")) {
          suggestions = [
            `Yth. Tim Rekrutmen ${contactName}, verifikasi akun industri Anda memerlukan waktu maksimal 1x24 jam sejak pengunggahan NIB yang valid. Akun Anda segera kami aktifkan agar Anda dapat mulai memposting lowongan.`,
            `Halo tim HRD ${contactName}. Berdasarkan pemeriksaan database OSS, NIB perusahaan Anda telah terverifikasi. Silakan masuk kembali ke dashboard perwakilan industri menggunakan email terdaftar.`,
            `Mohon maaf atas ketidaknyamanannya, ${contactName}. Mohon lampirkan tangkapan layar (screenshot) kendala verifikasi NIB Anda agar tim teknis Disnaker dapat segera menanganinya.`
          ];
        } else {
          suggestions = [
            `Selamat siang Bapak/Ibu HRD dari ${contactName}. Terima kasih telah menghubungi Dinas Ketenagakerjaan Majalengka. Ada yang bisa kami bantu terkait verifikasi akun, pelaporan WLKP (Wajib Lapor Ketenagakerjaan), atau rekrutmen massal?`,
            `Yth. HRD ${contactName}, tim Disnaker Majalengka siap memfasilitasi program Job Fair atau rekrutmen eksklusif di BLK untuk memenuhi kebutuhan mendesak operator produksi perusahaan Anda.`,
            `Baik Bapak/Ibu ${contactName}, informasi tersebut telah kami catat. Kami akan segera berkoordinasi dengan kepala bidang penempatan tenaga kerja Disnaker Majalengka.`
          ];
        }
      }

      return res.json({ suggestions });
    }

    // Call real Gemini API
    const systemInstruction = 
      `Anda adalah AI Admin Co-pilot Kabupaten Majalengka untuk membantu Admin Dinas Ketenagakerjaan (Disnaker) Kabupaten Majalengka. ` +
      `Tugas Anda adalah merumuskan 3 opsi JAWABAN SINGKAT, PADAT, SOpan, dan SAntun (berbahasa Indonesia yang baik, ramah, dan solutif) yang disiapkan untuk Admin Dinas Ketenagakerjaan ` +
      `untuk menanggapi pesan dari kontakter yang bersangkutan. ` +
      `Kontakter adalah ${contactRole} bernama: "${contactName}". \n` +
      `Pesan terakhir mereka adalah: "${lastMessage}". \n` +
      `Berikan keluaran Anda dalam format JSON murni berupa array string 3 jawaban terbaik dengan kunci "suggestions". JANGAN BERIKAN TEKS PENDAHULUAN ATAUPUN MARKDOWN LAINNYA.`;

    const prompt = `Formulasikan 3 saran balasan admin (short, direct, helpful canned responses) untuk menjawab pesan dari ${contactRole} (${contactName}) berikut:\n"${lastMessage}"`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 Opsi jawaban cepat yang disiapkan untuk diklik admin"
            }
          },
          required: ["suggestions"]
        }
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Gemini Chat Suggest Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI chat suggestions" });
  }
});

// 6. Admin AI Response Assistant (Saran Draf Balasan Registrasi & Aduan)
app.post("/api/gemini/asst-draft", async (req, res) => {
  try {
    const { type, payload } = req.body;
    const ai = getGenAI();

    // Setup high fidelity fallbacks for demo mode if API key is not integrated
    if (process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY" || !process.env.GEMINI_API_KEY) {
      if (type === "complaint") {
        const { category, reporterName, companyName, description } = payload;
        return res.json({
          drafts: [
            {
              label: "1. Surat Panggilan Mediasi Resmi (Tripartit Disnaker)",
              text: `Nomor: 560/DISNAKER-MJL/${new Date().getFullYear()}
Lampiran: -
Sifat: Segera
Perihal: Undangan Musyawarah Klarifikasi Mediasi Tripartit Pertama

Yth. Pimpinan HRD Pekerjaan ${companyName}
dan Sdr/i. ${reporterName} (Pihak Pengadu)
di Tempat

Menindaklanjuti pengaduan resmi dari pelapor tertanggal ${payload.createdAt || 'baru-baru ini'} mengenai sengketa Ketenagakerjaan "${category}" ("${description}"), dengan ini Dinas Ketenagakerjaan Kabupaten Majalengka mengundang kedua belah pihak untuk menghadiri agenda mediasi:

Hari/Tanggal: Senin, [Tanggal Mediasi Terdekat]
Waktu: 10:00 WIB - Selesai
Tempat: Ruang Mediator Lt. 2, Kantor Dinas Ketenagakerjaan Kabupaten Majalengka
Agenda: Sidang Klarifikasi Bipartit/Tripartit dan Penyamaan Persepsi Hukum

Kedua belah pihak dimohon hadir tepat waktu dengan membawa dokumen asli yang relevan (kontrak kerja, kartu keluarga, slip gaji terakhir). Pertemuan ini dilindungi payung hukum UU Republik Indonesia.

Hormat kami,
Kepala Bidang Pembinaan Hubungan Industrial & Syarat Kerja
Dinas Ketenagakerjaan Kabupaten Majalengka
NIP. 19780512 200501 1 002`
            },
            {
              label: "2. Email Peringatan Keras Manajemen Korporasi (Denda Hak Normatif)",
              text: `Subject: TEGURAN PERTAMA RESMI: Laporan Pelanggaran Hak Pekerja Sdr/i. ${reporterName}

Yth. Direktur Utama / Kepala Bagian HRD ${companyName},

Kami menyampaikan teguran pertama menyusul diterimanya berkas pengaduan dari karyawan/mantan karyawan Anda, Sdr/i. ${reporterName} atas tuduhan "${category}".

Rangkuman perkara:
"${description}"

Berdasarkan peraturan perundangan ketenagakerjaan Indonesia yang berlaku, pengabaian hak normatif buruh tanpa dasar hukum memiliki konsekuensi pidana dan administrasi parah. Sebelum berkas penyelidikan ini diteruskan secara formil ke Pengawas Provinsi, kami memberikan waktu maksimal 3 (tiga) hari kerja sejak surat elektronik ini dikirim bagi pihak perusahaan untuk mengirim tanggapan/klarifikasi tandingan tertulis resmi ke dinas.

Terima kasih atas pengertian dan perhatiannya secara mendalam.

Hormat kami,
Tim Mediator Hubungan Industrial Disnaker Majalengka`
            },
            {
              label: "3. Surat Solusi Damai Bipartit Kekeluargaan",
              text: `Subject: Panduan Resolusi Musyawarah Mandiri Harmonis (Bipartit) - Sdr/i. ${reporterName}

Halo Sdr/i. ${reporterName},

Kami telah memverifikasi dokumen laporan Anda terkait kasus "${category}" terhadap ${companyName}.

Sebelum melangkah ke persidangan panjang, Disnaker Kabupaten Majalengka merekomendasikan pelaksanaan forum penyelesaian Bipartit secara kekeluargaan terlebih dahulu. Hal ini sesuai anjuran UU No. 2 Tahun 2004. Mediator dari Disnaker bersedia menyediakan fasilitas ruang pertemuan ber-AC netral tanpa biaya apa pun agar Anda dan HRD perusahaan dapat menandatangani Perjanjian Bersama (PB) damai di atas meterai untuk perlindungan hukum instan.

Harap mengabari staf kami kembali apabila Anda menghendaki opsi jalur damai bipartit fasilitatif ini.

Salam Hormat,
Layanan Aduan Ketenagakerjaan Rakyat Majalengka`
            }
          ]
        });
      } else {
        // type === "company"
        const { companyName, nib, sector, representativeName, email } = payload;
        return res.json({
          drafts: [
            {
              label: "1. Email Persetujuan Akun Mitra Industri & Selamat Bergabung",
              text: `Subject: Akun Industri Perusahaan ${companyName} Berhasil Diverifikasi Aktif!

Selamat Siang Yth. Bapak/Ibu ${representativeName},
Manajemen Humas & Rekrutmen ${companyName},

Terima kasih telah mengajukan pendaftaran kemitraan dengan Dinas Ketenagakerjaan (Disnaker) Kabupaten Majalengka.

Kami menginformasikan bahwa setelah melalui kurasi atas keabsahan dokumen legalitas (NIB: ${nib} pada sektor usaha ${sector}), saat ini akun industri Anda dinyatakan: AKTIF & TERVERIFIKASI RESMI.

Anda dapat segera meluncur ke Dashboard Mitra Industri untuk:
- Memasang pengumuman lowongan kerja gratis di wilayah Rebana/Kertajati.
- Melacak pelamar dengan sistem screening kecerdasan buatan Gemini.
- Melakukan pemesanan kerja sama pelatihan lulusan vokasi BLK.

Selamat berkolaborasi memajukan ekosistem ketenagakerjaan andal dan adil di Kabupaten Majalengka!

Hormat kami,
Kasi Penempatan dan Hubungan Kerja Disnaker`
            },
            {
              label: "2. Email Tolak Sementara & Instruksi Verifikasi Ulang Dokumen (NIB Gagal)",
              text: `Subject: PEMBERITAHUAN: Pending Verifikasi Berkas Perusahaan ${companyName}

Yth. Perwakilan ${companyName} (${representativeName}),
Tim Administrasi Legal,

Kami dari Pelayanan Terpadu Satu Pintu Dinas Ketenagakerjaan Majalengka mengabarkan bahwa berkas registrasi industri Anda saat ini berstatus: PENDING (Ditangguhkan Sementara).

Hal ini disebabkan karena:
- Nomor Induk Berusaha (NIB): ${nib} tidak ditemukan atau berlainan dengan identitas korporasi yang tertera di sistem online single submission (OSS).
- Kategori Sektor: ${sector} tidak cocok dengan klasifikasi KBLI dalam akta pendirian.

Kami mohon agar Anda login kembali ke portal admin perusahaan Anda, kemudian mengupload berkas legalitas terbaru yang sah. Kami siap memfasilitasi jika ada kendala koordinasi teknis.

Hormat kami,
Pelayanan Satu Atap Disnaker Majalengka`
            },
            {
              label: "3. Email Himbauan Kepatuhan Kemitraan Lokal Majalengka (Perda >80%)",
              text: `Subject: Himbauan Komitmen Rekrutmen Tenaga Kerja Lokal Majalengka - ${companyName}

Yth. Manajer HRD / Pimpinan Perusahaan ${companyName},

Salam kemitraan dari Pemerintah Kabupaten Majalengka.

Seiring terdaftar dan aktifnya perusahaan Anda di portal kami, kami sangat mengapresiasi kontribusi pembukaan lapangan kerja baru oleh ${companyName} bagi industri ${sector}.

Sesuai amanat Peraturan Daerah (Perda) Kabupaten Majalengka, kami menghimbau dan menekankan agar perusahaan Anda mengutamakan penyerapan tenaga lokal ber-KTP/domisili Kabupaten Majalengka sekurang-kurangnya 80% dari total tenaga kerja non-medis dan non-teknisi spesifik.

Sebagai bukti timbal balik positif, Disnaker menyediakan layanan penyediaan tempat seleksi psikotes/interview massal di Balai Latihan Kerja (BLK) secara gratis, serta menyalurkan database lulusan unggul bersertifikasi secara kontinu.

Terima kasih banyak atas perhatian, partisipasi, dan kerja sama mulianya.

Salam Silih Asih,
Kepala Dinas Ketenagakerjaan Kabupaten Majalengka`
            }
          ]
        });
      }
    }

    // Call real Gemini API
    const systemInstruction = 
      `Anda adalah AI Co-pilot Hubungan Ketenagakerjaan Kabupaten Majalengka. ` +
      `Tugas Anda adalah memformulasikan 3 OPSI DRAF SURAT / EMAIL resmi yang profesional, bernilai hukum sesuai regulasi Indonesia (termasuk UU Cipta Kerja dan Perda Ketenagakerjaan Majalengka), ` +
      `dan ramah silih asih silih asuh, untuk mempermudah Admin Dinas Ketenagakerjaan Majalengka menanggapi berkas yang masuk. ` +
      `Keluaran Anda harus berformat JSON murni berupa objek yang memiliki kunci "drafts", yang berisi array objek dengan kunci "label" (string singkat penunjuk jenis draf) dan "text" (isi surat lengkap, rapi, terformat paragraf, menggunakan nama, tanggal, dan data dinamis dari payload). ` +
      `JANGAN menggunakan markup markdown di luar format JSON murni. Jangan menulis pembuka seperti "Tentu saja, ini dia..."`;

    let prompt = "";
    if (type === "complaint") {
      const { category, reporterName, companyName, description, createdAt } = payload;
      prompt = `Formulasikan 3 draf balasan untuk pengaduan warga kategori "${category}" yang diajukan oleh Sdr/i. "${reporterName}" terhadap perusahaan "${companyName}" dengan rincian keluhan "${description}" tertanggal "${createdAt}".\n` +
               `Opsi 1: Panggilan Mediasi Resmi Tripartit (Format surat dinas undangan formal).\n` +
               `Opsi 2: Email peringatan keras (warning) regulasi hak normatif ketenagakerjaan ke pihak HRD perusahaan.\n` +
               `Opsi 3: Balasan ramah penawaran perdamaian musyawarah Bipartit ke sdr pelapor selaku warga.`;
    } else {
      const { companyName, nib, sector, representativeName, email } = payload;
      prompt = `Formulasikan 3 draf balasan/respons untuk registrasi instansi/mitra industri baru bernama "${companyName}" (NIB: "${nib}", Sektor: "${sector}") oleh perwakilan "${representativeName}" (${email}).\n` +
               `Opsi 1: Email sambutan hangat persetujuan akun terverifikasi aktif serta petunjuk integrasi loker.\n` +
               `Opsi 2: Email pemberitahuan pending dengan instruksi koreksi dokumen NIB yang tidak sesuai.\n` +
               `Opsi 3: Email himbauan kemitraan kewajiban sinergi rekrutmen pekerja lokal minimal 80% berdasarkan Perda Majalengka.`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            drafts: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING, description: "Nama label jenis draf surat, misal: '1. Email Persetujuan Resmi'" },
                  text: { type: Type.STRING, description: "Teks surat formal/email utuh lengkap dengan kop/footer dinas" }
                },
                required: ["label", "text"]
              }
            }
          },
          required: ["drafts"]
        }
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Gemini Assistant Draft Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI drafts" });
  }
});

// 7. General Notification Blast Polishing/Optimization from Admin
app.post("/api/gemini/polish-blast", async (req, res) => {
  try {
    const { title, message, segment, channel } = req.body;
    const ai = getGenAI();

    if (process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY" || !process.env.GEMINI_API_KEY) {
      // Offline fallback: rewrite nicely
      const polishedTitle = `📢 INFO RESMI DISNAKER: ${title ? title.toUpperCase() : "PENGUMUMAN LAYANAN KETENAGAKERJAAN"}`;
      const polishedMessage = `${message}\n\n---\n*Pemberitahuan Khusus Segmen: ${segment}*\nSistem Integrasi Siaran Terpadu (SISTEM SIARAN DISNAKER MAJALENGKA)\nHubungi kami jika memiliki pertanyaan lanjut terkait info ini.`;
      return res.json({
        polishedTitle,
        polishedMessage
      });
    }

    const systemInstruction = 
      `Anda adalah Humas Disnaker Kabupaten Majalengka Jawa Barat yang profesional. ` +
      `Tugas Anda adalah mengoreksi, merapikan, dan menuangkan tulisan informasi blast/notifikasi massal ` +
      `agar terlihat sangat resmi, menggunakan tata bahasa Indonesia baku (dan dapat disisipi salam khas Sunda 'Sampurasun' di awal jika sesuai), ` +
      `terstruktur, membangkitkan rasa kepercayaan publik, dan mudah dimengerti sesuai dengan segmentasi target pengguna (${segment}) dan saluran pengiriman (${channel}). ` +
      `Tambahkan footer instansi resmi Dinas Ketenagakerjaan Kabupaten Majalengka di bagian akhir. ` +
      `Keluaran harus berformat JSON murni berupa objek dengan dua kunci: "polishedTitle" (string) dan "polishedMessage" (string). ` +
      `Jangan menulis pembuka non-JSON.`;

    const prompt = `Rapikan dan optimalkan pesan siaran massal berikut:\n` +
                   `Kanal Pengiriman: ${channel}\n` +
                   `Target Penerima: ${segment}\n` +
                   `Judul Awal: ${title}\n` +
                   `Konten Kasar: ${message}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            polishedTitle: { type: Type.STRING, description: "Judul notifikasi yang sudah dipoles, ringkas dan memicu klik/dibaca" },
            polishedMessage: { type: Type.STRING, description: "Isi pesan lengkap yang menarik, rapi, bernada ramah resmi dan informatif dengan footer instansi" }
          },
          required: ["polishedTitle", "polishedMessage"]
        }
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Gemini Polish Blast Error:", error);
    res.status(500).json({ error: error.message || "Failed to polish alert message" });
  }
});

// ----------------------------------------------------
// VITE AND ASSET MIDDLEWARE FOR SPA + SERVING
// ----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
