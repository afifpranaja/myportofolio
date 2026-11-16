# Master Template & Layouting Guide: Portofolio Profesional (Web & PDF)

Dokumen ini disusun sebagai panduan arsitektur layout, *wireframe*, sistem visual, dan template *copywriting* modular untuk pembuatan portofolio profesional (Teknik Elektro, Otomasi, IoT, Software, maupun Kreatif). Template ini dapat diadaptasi langsung ke **Framer**, **HTML/CSS**, **Figma**, **Canva**, maupun **InDesign / Dokumen PDF Multi-halaman**.

---

## 1. Design System & Token Visual

Kombinasi warna dan tipografi dirancang agar memberikan kesan **presisi, modern, terpercaya, dan teknis**.

### A. Palet Warna (Dark Mode / Technical Modern)
| Token | Hex | Penerapan |
|---|---|---|
| **Surface Dark (Canvas)** | `#121316` | Background utama halaman / canvas |
| **Surface Card** | `#1A1C22` | Background kartu komponen, bento box |
| **Surface Hover / Highlight** | `#22252D` | State interaktif, card border hover |
| **Border / Divider** | `#2D313B` | Garis batas tipis 1px sub-komponen |
| **Text Primary (Heading)** | `#FFFFFF` | Judul, angka metrik, nama |
| **Text Secondary (Body)** | `#A6ADBB` | Paragraf, deskripsi tugas, konteks |
| **Text Muted** | `#64748B` | Timestamp, metadata, footer notes |
| **Accent Primary (Cyan Tech)** | `#38BDF8` | Tag spesialisasi, tautan aktif, highlight IoT |
| **Status Active (Emerald Green)** | `#10B981` | Status "Available for Work", indikator sinyal |
| **Award / Milestone (Amber Gold)** | `#F59E0B` | Juara kompetisi, sertifikasi, beasiswa |

> **Alternatif Light Mode (Formal Print/A4 Recruiter):**  
> Canvas: `#F8FAFC` · Card: `#FFFFFF` (border `#E2E8F0`) · Text: `#0F172A` / `#475569` · Accent: `#0284C7`.

### B. Tipografi & Hierarki Font
- **Primary Body & Titles:** `Geist Sans`, `Inter`, atau `Plus Jakarta Sans`.
- **Technical & Code Accent:** `Geist Mono`, `JetBrains Mono`, atau `Fira Code` (untuk chips protokol, pinout, tag teknologi).
- **Scale:**
  - `Hero Title / Name`: 32px – 44px (Bold, -0.02em letter spacing)
  - `Section Label / Tag`: 11px – 13px (Uppercase, SemiBold, +0.05em tracking)
  - `Card Title`: 18px – 22px (SemiBold)
  - `Body Text`: 14px – 15px (Regular, 1.6 line height)
  - `Caption / Meta`: 12px – 13px (Medium / Muted)

---

## 2. Peta Layout Wireframe (Visual Blueprint)

Struktur ini mengadopsi kombinasi **Split Hero + Bento Grid Layout** yang sangat efektif di Framer dan mudah ditransformasikan ke PDF berhalaman A4.

```text
+---------------------------------------------------------------------------------+
| TOPBAR: [Status Lokasi: Kota, Negara]               [Jam Lokal]  [Theme / Switch] |
+---------------------------------------------------------------------------------+
| HERO PROFILE PANEL                                                              |
| +-------------------+  +------------------------------------------------------+ |
| |                   |  | (•) Status: Tersedia untuk Posisi Kerja / Open for Work  | |
| |   FOTO PORTRAIT   |  | NAMA LENGKAP PROFESIONAL                             | |
| |    RASIO 4:5      |  | Role Utama · Sub-Spesialisasi 1 · Sub-Spesialisasi 2 | |
| | (Rounded corner)  |  +------------------------------------------------------+ |
| |                   |  | [ Download CV ]   [ WhatsApp ]   [ Email ]   [LinkedIn]| |
| +-------------------+  +------------------------------------------------------+ |
+---------------------------------------------------------------------------------+
| OVERVIEW & IMPACT METRICS                                                       |
| "Ringkasan eksekutif 2-3 paragraf menghubungkan background edukasi, hard-skill,  |
|  dan fokus solusi industri yang ditawarkan."                                    |
| +-----------------+ +-----------------+ +-----------------+ +-----------------+ |
| | IPK / Predikat  | | Proyek Selesai  | | Sertifikasi/Juara| | Pengalaman Tim  | |
| |     3.72/4.00   | |       10+       | | 2 Penghargaan   | | 120+ Anggota    | |
| +-----------------+ +-----------------+ +-----------------+ +-----------------+ |
+---------------------------------------------------------------------------------+
| FEATURED PROJECTS (BENTO GRID 2-KOLOM / CAROUSEL)                               |
| +--------------------------------------+ +------------------------------------+ |
| | [GAMBAR PROYEK 1 - 16:9 / 4:3]       | | [GAMBAR PROYEK 2]                  | |
| | Judul Proyek Utama                   | | Judul Proyek Industri              | |
| | Instansi / Konteks · Tahun           | | Instansi / Konteks · Tahun         | |
| | [Tag 1] [Tag 2] [Tag 3]              | | [Tag 1] [Tag 2] [Tag 3]            | |
| | Problem -> Solution -> Impact        | | Problem -> Solution -> Impact      | |
| | [ Detail Proyek -> ]                 | | [ Detail Proyek -> ]               | |
| +--------------------------------------+ +------------------------------------+ |
+---------------------------------------------------------------------------------+
| EXPERIENCE & LEADERSHIP (TIMELINE VERTICAL WITH BADGES)                         |
| [2025] PT Wijaya Karya Beton Tbk. — Equipment Division Intern                   |
|        - Point STAR 1 (Hasil terukur & protokol yang dipakai)                  |
|        - Point STAR 2 (Integrasi hardware ke IoT dashboard)                    |
| [2024] Workshop Electro — Ketua Pelaksana PLC Competition                       |
|        - Memimpin 121 panitia, mengelola 32 tim nasional, hardware testing     |
+---------------------------------------------------------------------------------+
| TECHNICAL SKILLS MATRIX (CHIPS / PILLS GROUPING)                                |
| • Hardware & Drafting : AutoCAD, Fusion 360, Panel Wiring, SLD                  |
| • Otomasi & PLC       : Schneider TwidoSuite, Omron CX-Prog, Modbus RTU/RS-485  |
| • IoT & Embedded      : ESP32, PlatformIO, MQTT, C++, Web Telemetry Dashboard  |
+---------------------------------------------------------------------------------+
| FOOTER & DIRECT CONTACT CALL-TO-ACTION                                          |
| "Tertarik berkolaborasi atau mendiskusikan peluang kerja? Mari terhubung."      |
| [Email Button]   [WhatsApp Button]   [Unduh PDF Portofolio]                     |
+---------------------------------------------------------------------------------+
```

---

## 3. Template Naskah & Konten Siap Pakai (Modular Copy)

Ganti teks di dalam tanda kurung `[...]` dengan profil Anda.

### A. Bagian Header & Hero
- **Status Badge:** `● Tersedia untuk Posisi Kerja / Open for Work` *(Ganti warna hijau bila aktif, abu-abu jika sedang tidak open)*
- **Nama Utama:** `[Nama Lengkap Anda, Gelar jika relevan]`
- **Sub-judul (Value Proposition):** `[Disiplin Utama] • [Fokus Spesialisasi] • [Domain Spesifik]`  
  *Contoh:* `Electrical Engineer • Control & Panel System • IoT Specialist`
- **Lokasi:** `[Kota, Provinsi, Negara]`
- **Tombol Aksi (CTA):**
  1. `Download CV` *(Link langsung ke PDF)*
  2. `WhatsApp / Chat` *(Link langsung dengan pesan pre-filled)*
  3. `Email` *(mailto link)*
  4. `LinkedIn / GitHub`

### B. Bagian Overview (Executive Summary)
Gunakan rumus **Kredensial + Jembatan Unik + Nilai Tambah**:
> Lulusan **[Pendidikan & Jurusan]** dari **[Nama Universitas/Politeknik]** dengan **IPK [Angka]** dan latar belakang di bidang **[Keahlian Sekunder / Vokasi]**. Kombinasi ini memungkinkan saya menjembatani ranah **[Perangkat Keras/Teknik Lapangan]** dengan **[Logika Komputasi/Digital Modern]**.
>
> Berpengalaman langsung dalam **[Keahlian 1: misal drafting & perakitan panel]**, **[Keahlian 2: PLC & otomasi industri]**, serta **[Keahlian 3: Arsitektur IoT & telemetri real-time]**. Terbiasa bekerja dengan pendekatan terstruktur mulai dari desain skematik, komisioning sistem, hingga pemecahan masalah (*troubleshooting*) di lingkungan industri.

### C. Formula Penulisan Proyek (STAR Case-Study)
Setiap proyek unggulan sebaiknya memuat 5 elemen ini:
1. **Title & Thumbnail:** Foto perangkat nyata / UI dashboard / skematik AutoCAD (bukan mock up generik).
2. **Context:** `[Kategori: Tugas Akhir / Magang Industri / Riset Kompetisi] • [Tahun]`
3. **Problem Statement:** Masalah apa yang diselesaikan? *(Contoh: Ketiadaan sistem pemantauan beban solar panel secara real-time yang menyebabkan degradasi efisiensi).*
4. **Action & Technology:** Apa yang Anda bangun? *(Contoh: Merancang inverter pintar berbasis ESP32, sensor arus/tegangan, dan transmisi protokol MQTT).*
5. **Measurable Result:** Apa hasilnya? *(Contoh: Mampu mendeteksi anomali daya dalam delay < 500ms dan menghemat konsumsi energi cadangan hingga 18%).*

### D. Pengalaman Kerja & Kepemimpinan (Format Google X-Y-Z)
Gunakan rumus: *"Mencapai **[X]** yang diukur dengan **[Y]**, dengan melakukan **[Z]**"*.

*Contoh Template:*
- **Perusahaan / Organisasi:** `[Nama Perusahaan / Organisasi]`
- **Peran:** `[Posisi / Jabatan]`
- **Periode & Lokasi:** `[Bulan Tahun – Bulan Tahun] • [Kota]`
- **Poin Pencapaian:**
  - Melakukan inspeksi berkala dan *troubleshooting* pada **[mesin/alat/sistem]** untuk memastikan *uptime* operasional mencapai **[persentase]%**.
  - Mengimplementasikan komunikasi **[nama protokol: Modbus RTU / MQTT]** untuk menghubungkan **[nama alat/sensor]** dengan **[server/dashboard]**, menghasilkan pemantauan real-time tanpa *packet loss*.
  - Mengoordinasikan **[jumlah]** anggota tim dalam menyelenggarakan **[event/proyek]**, mencakup pengelolaan logistik teknis, skema rangkaian, dan pengujian kualitas.

### E. Matriks Keahlian Teknis (Skill Groups)
Kelompokkan keahlian agar rekruter dapat membaca dalam waktu **5 detik**:
- **Hardware & Drafting:** `AutoCAD (SLD 1-3 Fasa)`, `Autodesk Fusion 360`, `Perakitan Panel Distribusi & Kontrol`, `Wiring Skematik`
- **Otomasi & Kontrol:** `PLC (CX-Programmer, TwidoSuite, Master-K)`, `Modbus RTU / RS-485`, `Inverter / VFD`, `Relay Logic`
- **IoT & Embedded Systems:** `ESP32 / Arduino`, `PlatformIO`, `Embedded C++`, `MQTT Protocol`, `HTTP REST API`, `Web Telemetry Dashboard`
- **Software & Tools:** `Git / GitHub`, `VS Code`, `Excel (Data Logging)`, `Canva`

---

## 4. Tiga Inspirasi Gaya Layouting Portofolio

### Gaya 1: Framer Modern Bento Grid (Rekomendasi untuk Web Portofolio)
- **Karakteristik:** Tampilan modular kotak-kotak (*bento cards*), latar belakang gelap elegan (`#121316`), aksen neon biru muda, micro-interaction halus saat hover.
- **Cocok untuk:** Portofolio web interaktif yang dikirim ke rekruter teknologi modern, startup IoT, atau agensi otomasi.
- **Kunci Visual:** Foto profil di kiri atas, metrik angka di kanan atas, proyek besar membentang lebar di tengah dengan gambar berkualitas tinggi.

### Gaya 2: Clean Swiss / A4 PDF Minimalist (Rekomendasi untuk Dokumen Lamaran Formal)
- **Karakteristik:** Latar putih bersih, font sans-serif geometris tegas (`Inter` / `Helvetica`), layout 2-kolom seimbang, penggunaan garis pemisah abu-abu netral 1px.
- **Cocok untuk:** Format PDF A4 yang dilampirkan via portal lowongan kerja (Jobstreet, LinkedIn, Portal BUMN / Korporat Manufaktur).
- **Kunci Visual:** Kontras tinggi saat diprint di kertas hitam-putih, link teks berwarna biru dengan underline tipis agar ATS dan rekruter tetap bisa mengklik kontak.

### Gaya 3: Technical Blueprint / Industrial Dark (Rekomendasi untuk Portofolio Engineering)
- **Karakteristik:** Sentuhan aksen font *monospaced* pada kode komponen dan spesifikasi teknis, skema diagram alir sistem (*system flow diagram*), badge pinout/protokol.
- **Cocok untuk:** Engineer spesialis kontrol, mekatronika, embedded hardware, dan instrumentasi.
- **Kunci Visual:** Tampilkan diagram wiring / blok sistem IoT di samping foto prototipe fisik untuk membuktikan keahlian teknis nyata.

---

## 5. Checklist Validasi Kualitas Portofolio

Sebelum mempublikasikan website atau mengirimkan file PDF ke perusahaan:
- [ ] **Foto Profil:** Resolusi tinggi, pencahayaan jelas, ekspresi profesional, background tidak ramai.
- [ ] **Tautan Aktif:** Tombol WhatsApp langsung membuka chat dengan nomor tujuan yang benar; link email memicu `mailto:`; link LinkedIn membuka profil spesifik (bukan beranda umum).
- [ ] **Klaim Proyek:** Setiap proyek memiliki bukti visual otentik (foto prototipe, tangkapan layar dashboard, skema diagram, atau sertifikat).
- [ ] **Keterbacaan Mobile / Responsive:** Layout tidak pecah saat dibuka di smartphone layar 360px–414px.
- [ ] **Ukuran Berkas PDF:** Di bawah 5 MB agar mudah dikirim melalui email tanpa terkena bounce limit.
- [ ] **Typo & Istilah Teknis:** Penulisan akronim industri sudah tepat (contoh: *Modbus RTU*, *RS-485*, *ESP32*, *MQTT*, *Wp*, *PLC*).
