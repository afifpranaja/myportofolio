/**
 * Portfolio interactions: WIB clock, theme toggle, and document viewer.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Keep the clock anchored to Malang even when the visitor is elsewhere.
  const clock = document.getElementById('malang-time');
  if (clock) {
    let formatJakartaTime;
    try {
      const formatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hourCycle: 'h23'
      });
      formatJakartaTime = (date) => formatter.format(date);
    } catch (error) {
      // Asia/Jakarta is UTC+7; this fallback also works in older browsers.
      formatJakartaTime = (date) => {
        const jakarta = new Date(date.getTime() + 7 * 60 * 60 * 1000);
        return [jakarta.getUTCHours(), jakarta.getUTCMinutes(), jakarta.getUTCSeconds()]
          .map((part) => String(part).padStart(2, '0'))
          .join(':');
      };
    }

    const updateClock = () => {
      const now = new Date();
      clock.textContent = `${formatJakartaTime(now)} WIB`;
      clock.dateTime = now.toISOString();
    };

    updateClock();
    window.setInterval(updateClock, 1000);
  }

  // Theme preference is optional storage: the toggle must still work if
  // browser privacy settings block localStorage.
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  if (themeToggle && themeIcon) {
    let savedTheme = null;
    try {
      savedTheme = window.localStorage.getItem('site-theme');
    } catch (error) {
      // Use the default dark theme for this session.
    }

    const applyTheme = (isLight, persist = false) => {
      document.body.classList.toggle('light', isLight);
      themeIcon.setAttribute('href', isLight ? '#i-sun' : '#i-moon');
      const themeLabel = document.documentElement.lang === 'en'
        ? (isLight ? 'Switch to dark theme' : 'Switch to light theme')
        : (isLight ? 'Ganti ke tema gelap' : 'Ganti ke tema terang');
      themeToggle.setAttribute('aria-label', themeLabel);
      themeToggle.setAttribute('aria-pressed', String(isLight));
      themeToggle.title = themeLabel;

      if (persist) {
        try {
          window.localStorage.setItem('site-theme', isLight ? 'light' : 'dark');
        } catch (error) {
          // Theme switching remains available until the page is closed.
        }
      }
    };

    applyTheme(savedTheme === 'light');
    themeToggle.addEventListener('click', () => {
      applyTheme(!document.body.classList.contains('light'), true);
    });
  }

  // Page language preference; Indonesian remains the first-visit default.
  const languageToggle = document.getElementById('language-toggle');
  const languageLabel = document.getElementById('language-label');
  let documentLanguageRefresh = null;
  const translations = {
    '.topbar-location > span': ['Malang, East Java, Indonesia'],
    '.status': ['Open for Work'],
    '.hero-actions a:first-child span': ['Download CV'],
    '#overview .section-tag': ['Overview'],
    '#overview .section-body p': [
      'Applied Bachelor’s graduate in <strong>Electrical Engineering (Electrical Power Systems) from State Polytechnic of Malang</strong> with a <strong>3.72 GPA</strong> and a vocational background in <strong>Software Engineering (SMKN 4 Malang)</strong>. This combination helps me bridge industrial electrical hardware with modern digital computing.',
      'Hands-on experience in electrical technical drafting (AutoCAD, Fusion 360), control panel assembly (MCBs, magnetic contactors, timers), PLC programming (Schneider TwidoSuite, Omron CX-Programmer, Master-K120s), and Modbus RTU. Skilled in ESP32-based IoT architecture, MQTT brokers, and web telemetry dashboards for real-time energy and industrial machine monitoring.'
    ],
    '#certification .section-tag': ['Awards & Certifications'],
    '#certification .cert-tag': ['National Honorable Mention', 'International Certificate', 'International Certification • Completion', 'Competency Certification • Attainment', 'English Language Certificate'],
    '#certification .cert-title': [
      'Nusantara Writing Festival III — Marine Savior: YOLOv8-Based ROV',
      'Certificate Japan Scholarship & Academic Program',
      'Certificate of Completion — Solar Grid Connect PV Design and Install',
      'Statement of Attainment — Solar Grid Connect PV Design and Install',
      'Test of English for International Communication (TOEIC)'
    ],
    '#certification .cert-issuer': [
      'National Scientific Writing Competition (54 university teams from across Indonesia)',
      'Management & Science University (MSU) & Japan Educational Collaboration',
      'Regen Power Pty. Ltd. Australia & State Polytechnic of Malang (Polinema)',
      'Regen Power Pty. Ltd. Australia & Polinema • Reg. No: SWOP/POLINEMA/LSA1/2026/CT/00003',
      'TOEIC English Proficiency Certificate · Score: 540'
    ],
    '#projects .section-tag': ['Engineering Projects'],
    '#projects .card-title': [
      'IoT Smart Inverter PLTS 400 Wp', 'Real-Time Hoist Crane Telemetry', 'Marine Savior: Underwater ROV',
      'Three-Story Home Electrical Installation & SLD', 'Industrial Distribution & Installation Design',
      '3D Design Portfolio (Fusion 360)', 'Job Description & Time Schedule — PLC Competition 2024'
    ],
    '#projects .card-subtitle': [
      'Applied Bachelor’s Final Project • Polinema (2026)', 'Modbus RTU & IoT • PT WIKA Beton Tbk. (2025)',
      'National Scientific Writing Competition Honorable Mention • YOLOv8 AI (2025)',
      'AutoCAD 2D, SLD & Excel Cost Estimate • Polinema (2024)', 'AutoCAD DWG to PDF • Polinema Installation Project II',
      'A collection of 3D modeling and visualization work', 'WSEC 2024 · Workbook using a Gantt chart system'
    ],
    '#experience .section-tag': ['Industry & Organizational Experience'],
    '#experience .resume-title': [
      'Equipment Division Intern', 'Event Lead, “PLC Competition 2024”', 'Junior Staff, Commission IV (Partnerships & External Affairs)'
    ],
    '#experience .resume-description': [
      'Performed daily maintenance, routine inspections, and operational troubleshooting on batching plant equipment, hoist cranes, and wire caging machines. Implemented <strong>Modbus RTU</strong> communication to read power meter parameters from the <em>GAE EMG 20B</em> through an <em>HF2211 Serial Device Server TCP/IP</em>, integrated the <em>Master-K120s K7M-DR40U</em> PLC into an IoT architecture, and designed a real-time web telemetry dashboard.',
      'Led and coordinated divisions with up to <strong>121 members</strong> and organized a national-level public PLC automation competition attended by 32 participants from institutions across Indonesia. Managed PLC hardware logistics, competition circuit designs, and judge coordination.',
      'Managed the organization’s publications and information, produced more than 30 informative feed and story posts using Canva, and facilitated internal and external program coordination for the student legislative body during a term.'
    ],
    '#education .section-tag': ['Education'],
    '#education .resume-title': [
      'Applied Bachelor’s (D4) — Electrical Engineering (Electrical Power Systems)',
      'Vocational Diploma — Software Engineering'
    ],
    '#education .resume-description': [
      'Studied applied electrical engineering with a <strong>3.72 / 4.00 GPA</strong>. Focused on industrial power systems, power and control panel assembly, AutoCAD and Fusion 360 drafting, PLC programming, and IoT-based automated load management.',
      'Built a foundation in computer programming logic, C++, data structures, web interface development, and relational database management, strengthening skills in microcontroller programming and IoT firmware.'
    ],
    '#tools .section-tag': ['Tools & Technical Skills'],
    '#tools .tool-description': [
      'Single- and three-phase installation design & industrial SLD', '3D mechanical modeling from 2D drawings',
      'Schneider & Omron PLC programming', 'Embedded C++, AC/DC sensors & MQTT',
      'Metering instruments & serial TCP/IP gateways', 'Advanced formulas, data analytics & documents'
    ],
    '.contact-label': ['Professional Email', 'LinkedIn', 'Curriculum Vitae'],
    '.contact-value': ['afifpranaja04@gmail.com', 'Afif Athaullah', 'Download CV Document (PDF)'],
    '.doc-tab-btn > span:nth-of-type(1)': ['Three-Story Home Plan', 'Single Line Diagram (SLD)', 'Cost Estimate & Load Calculation', 'Industrial Installation (PPP)', '3D Portfolio', 'PLC Competition Gantt Chart'],
    '#doc-btn-external span': ['Open in New Tab'],
    '#doc-btn-download span': ['Download File'],
    '.pdf-fallback-notice p': ['This PDF cannot be displayed here. Open it in a new tab or download the file.'],
    '#pdf-fallback-link span': ['Open Document in New Tab'],
    '.stat-pill-label': ['Building', 'Total Downlights', 'Power Sockets', 'Panel & Supply', 'Reference Standards'],
    '.stat-pill-val': ['Luxury Home, Type 124 (3 Floors)', '50 units (Philips SmartBright)', '20 units (Schneider 16A)', 'Three-phase (MCB 3Ø 25A & FORT IP55 box)', 'PUIL 2011 & Electrical SNI standards'],
    '.excel-subtab-btn': ['Bill of Quantities (BOQ & Costs)', 'Lighting & Room Load Calculation (LOAD)'],
    '#doc-excel-container thead th': [
      'No.', 'Component & Technical Specifications', 'Unit', 'Qty', 'Unit Price (IDR)', 'Shipping/Component Cost (IDR)', 'Installation Cost/Point (IDR)',
      'Floor / Zone', 'Room Name', 'Width (m)', 'Length (m)', 'Area (m²)', 'Height (m)', 'Kp Factor', 'Load & Phase Requirements'
    ],
    '.doc-file-hint': ['Download the file to open it in Microsoft Excel, LibreOffice, or a compatible spreadsheet app.'],
    '.gantt-sheet-toolbar > div:first-child > span': ['Gantt Chart · 102 tasks · 22 May–31 October 2024'],
    '.gantt-legend > span > span': ['Schedule', 'Deadline'],
    '.gantt-mini-heading span': ['Task', 'Timeline']
  };
  const originalHtml = new Map();
  Object.keys(translations).forEach((selector) => {
    document.querySelectorAll(selector).forEach((element) => originalHtml.set(element, element.innerHTML));
  });
  const monthNames = { Januari: 'January', Februari: 'February', Maret: 'March', Mei: 'May', Juni: 'June', Juli: 'July', Agustus: 'August', Oktober: 'October', Desember: 'December' };
  const dateTextNodes = [...document.querySelectorAll('.cert-date, .resume-meta .meta-item')]
    .flatMap((element) => [...element.childNodes].filter((node) => node.nodeType === Node.TEXT_NODE && node.nodeValue.trim()).map((node) => ({ node, id: node.nodeValue })));
  const applyLanguage = (language, persist = false) => {
    const english = language === 'en';
    document.documentElement.lang = english ? 'en' : 'id';
    originalHtml.forEach((html, element) => {
      if (!element.isConnected) return;
      const selector = Object.keys(translations).find((key) => document.querySelectorAll(key).length && [...document.querySelectorAll(key)].includes(element));
      if (!selector) return;
      const elements = document.querySelectorAll(selector);
      const index = [...elements].indexOf(element);
      element.innerHTML = english ? (translations[selector][index] ?? html) : html;
    });
    dateTextNodes.forEach(({ node, id }) => {
      node.nodeValue = english ? id.replace(/Januari|Februari|Maret|Mei|Juni|Juli|Agustus|Oktober|Desember/g, (month) => monthNames[month]) : id;
    });
    if (languageLabel) languageLabel.textContent = english ? 'ID' : 'EN';
    if (languageToggle) {
      languageToggle.setAttribute('aria-label', english ? 'Ganti bahasa ke Bahasa Indonesia' : 'Switch language to English');
      languageToggle.title = english ? 'Ganti bahasa ke Bahasa Indonesia' : 'Switch language to English';
    }
    if (themeToggle) {
      const themeLabel = english
        ? (document.body.classList.contains('light') ? 'Switch to dark theme' : 'Switch to light theme')
        : (document.body.classList.contains('light') ? 'Ganti ke tema gelap' : 'Ganti ke tema terang');
      themeToggle.setAttribute('aria-label', themeLabel);
      themeToggle.title = themeLabel;
    }
    const closeDocumentButton = document.getElementById('doc-modal-close');
    if (closeDocumentButton) closeDocumentButton.setAttribute('aria-label', english ? 'Close document' : 'Tutup Dokumen');
    const pdfPreview = document.getElementById('doc-pdf-iframe');
    if (pdfPreview) pdfPreview.title = english ? 'Engineering document preview' : 'Pratinjau Dokumen Rekayasa';
    if (persist) {
      try { window.localStorage.setItem('site-language', language); } catch (error) { /* Session toggle still works. */ }
    }
    if (documentLanguageRefresh) documentLanguageRefresh();
  };
  let initialLanguage = 'id';
  try { initialLanguage = window.localStorage.getItem('site-language') === 'en' ? 'en' : 'id'; } catch (error) { /* Indonesian default. */ }
  applyLanguage(initialLanguage);
  if (languageToggle) languageToggle.addEventListener('click', () => {
    applyLanguage(document.documentElement.lang === 'en' ? 'id' : 'en', true);
  });

  // Engineering document viewer.
  const modal = document.getElementById('doc-modal');
  const closeBtn = document.getElementById('doc-modal-close');
  const modalTitle = document.getElementById('doc-modal-title');
  const modalSubtitle = document.getElementById('doc-modal-subtitle');
  const modalMeta = document.getElementById('doc-modal-meta');
  const btnOpenExternal = document.getElementById('doc-btn-external');
  const btnDownload = document.getElementById('doc-btn-download');
  const pdfContainer = document.getElementById('doc-pdf-container');
  const excelContainer = document.getElementById('doc-excel-container');
  const fileContainer = document.getElementById('doc-file-container');
  const fileName = document.getElementById('doc-file-name');
  const fileDescription = document.getElementById('doc-file-description');
  const ganttContainer = document.getElementById('doc-gantt-container');
  const ganttColgroup = document.getElementById('gantt-colgroup');
  const ganttHead = document.getElementById('gantt-thead');
  const ganttBody = document.getElementById('gantt-tbody');
  const pdfFrame = document.getElementById('doc-pdf-iframe');
  const pdfFallback = document.getElementById('pdf-fallback-notice');
  const pdfFallbackLink = document.getElementById('pdf-fallback-link');
  const tabBtns = document.querySelectorAll('.doc-tab-btn');
  const excelSubtabBtns = document.querySelectorAll('.excel-subtab-btn');
  const excelSheets = document.querySelectorAll('.excel-sheet-content');
  let previouslyFocusedElement = null;

  const documents = {
    'rumah-3-lantai': {
      title: 'Desain Denah Instalasi Kelistrikan Rumah Mewah 3 Lantai',
      subtitle: 'Gambar Kerja AutoCAD 2D • Layout Titik Lampu, Stop Kontak, Saklar & Jalur Conduit',
      en: { title: 'Three-Story Home Electrical Installation Plan', subtitle: 'AutoCAD 2D working drawing • Lighting, power socket, switch & conduit layout', meta: 'AutoCAD 2D • ISO A3 Full Bleed • Scale 1:100 • PUIL 2011 Standard' },
      type: 'pdf',
      file: 'assets/docs/Desain_Instalasi_Rumah_3_Lantai.pdf',
      meta: 'AutoCAD 2D • ISO A3 Full Bleed • Skala 1:100 • Standar PUIL 2011'
    },
    sld: {
      title: 'Single Line Diagram (SLD) & Distribusi Daya 3-Fasa',
      subtitle: 'Diagram Satu Garis Pembagian Fasa R-S-T Seimbang, Proteksi MCB/MCCB & Sistem Grounding',
      en: { title: 'Single Line Diagram (SLD) & Three-Phase Power Distribution', subtitle: 'Balanced R-S-T phase distribution, MCB/MCCB protection & grounding system', meta: 'AutoCAD 2D • Single Line Diagram • Three-phase balance • PUIL / PLN standard' },
      type: 'pdf',
      file: 'assets/docs/SLD_Sistem_Kelistrikan.pdf',
      meta: 'AutoCAD 2D • Single Line Diagram • 3-Phase Balance • Standar PUIL / PLN'
    },
    rab: {
      title: 'Rencana Anggaran Biaya (RAB) & Perhitungan Beban',
      subtitle: 'Kalkulasi Iluminasi Ruangan (Lux/Kp) & Bill of Quantities (BOQ) Tipe 124',
      en: { title: 'Cost Estimate (RAB) & Load Calculation', subtitle: 'Room lighting calculation (Lux/Kp) & Type 124 bill of quantities (BOQ)', meta: 'Microsoft Excel (.xlsx) • Sheets: BOQ & LOAD • Actual component and labor costs' },
      type: 'excel',
      file: 'assets/docs/RAB_Rumah_Mewah_3_Lantai.xlsx',
      meta: 'Microsoft Excel (.xlsx) • Sheet: BOQ & LOAD • Nilai Real Komponen & Upah Kerja'
    },
    'gedung-ppp': {
      title: 'Perancangan Sistem Instalasi Listrik Gedung (Proyek Instalasi II)',
      subtitle: 'Gambar Kerja AutoCAD 2D • Jalur Distribusi Daya, Panel Penerangan & Kabel Tray',
      en: { title: 'Building Electrical Installation System Design (Installation Project II)', subtitle: 'AutoCAD 2D working drawing • Power distribution, lighting panels & cable trays', meta: 'AutoCAD 2D • Installation Project II (Semester 5) • Electrical Power Systems, Polinema' },
      type: 'pdf',
      file: 'assets/docs/Desain_Instalasi_Gedung_PPP.pdf',
      meta: 'AutoCAD 2D • Proyek Instalasi II (Semester 5) • D4 Sistem Kelistrikan Polinema'
    },
    'portofolio-3d': {
      title: 'Portofolio Desain 3D',
      subtitle: 'Kumpulan karya pemodelan dan visualisasi 3D',
      en: { title: '3D Design Portfolio', subtitle: 'A collection of 3D modeling and visualization work', meta: 'Portfolio • PDF' },
      type: 'pdf',
      file: 'assets/docs/Portofolio_3D.pdf',
      meta: 'Portofolio • PDF'
    },
    'jd-ts': {
      title: 'Gantt Chart / Time Schedule PLC Competition 2024',
      subtitle: 'Jadwal kerja panitia, tenggat, Technical Meeting, Penyisihan, dan Final',
      en: { title: 'PLC Competition 2024 Gantt Chart / Time Schedule', subtitle: 'Committee work schedule, deadlines, technical meeting, preliminary round, and final', meta: 'Microsoft Excel • WSEC 2024', fileDescription: 'Workbook containing the JD&TM and Meetings & Sharing sheets.' },
      type: 'gantt',
      file: 'assets/docs/JD-TS_PLC_COMPETITION_WSEC_2024.xlsx',
      meta: 'Microsoft Excel • WSEC 2024',
      fileDescription: 'Workbook berisi sheet JD&TM serta Rapat dan Sharing.'
    }
  };

  documentLanguageRefresh = () => {
    const activeTab = [...tabBtns].find((button) => button.classList.contains('active'));
    const activeDoc = activeTab && documents[activeTab.getAttribute('data-doc-target')];
    const english = document.documentElement.lang === 'en';
    if (activeDoc) {
      if (modalTitle) modalTitle.textContent = english && activeDoc.en ? activeDoc.en.title : activeDoc.title;
      if (modalSubtitle) modalSubtitle.textContent = english && activeDoc.en ? activeDoc.en.subtitle : activeDoc.subtitle;
      if (modalMeta && modalMeta.querySelector('.doc-meta-item span')) {
        modalMeta.querySelector('.doc-meta-item span').textContent = english && activeDoc.en ? activeDoc.en.meta : activeDoc.meta;
      }
      if (fileDescription) fileDescription.textContent = english && activeDoc.en ? (activeDoc.en.fileDescription || '') : (activeDoc.fileDescription || '');
    }
    if (ganttRendered) {
      ganttRendered = false;
      if (ganttContainer && !ganttContainer.hidden) renderGanttSheet();
    }
  };

  let ganttRendered = false;

  function renderGanttSheet() {
    const tasks = Array.isArray(window.ganttTasks) ? window.ganttTasks : [];
    if (!ganttColgroup || !ganttHead || !ganttBody || tasks.length === 0) return;

    const firstExcelDate = 45434; // 22 May 2024
    const lastExcelDate = 45596;  // 31 October 2024
    const dayCount = lastExcelDate - firstExcelDate + 1;
    const excelDate = (serial) => new Date(Date.UTC(1899, 11, 30) + serial * 86400000);
    const language = document.documentElement.lang === 'en' ? 'en-US' : 'id-ID';
    const dateLabel = new Intl.DateTimeFormat(language, {
      day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC'
    });
    const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[character]);

    const dates = Array.from({ length: dayCount }, (_, index) => {
      const serial = firstExcelDate + index;
      return { serial, date: excelDate(serial) };
    });
    const months = [];
    dates.forEach(({ date }) => {
      const key = `${date.getUTCFullYear()}-${date.getUTCMonth()}`;
      const current = months[months.length - 1];
      if (current && current.key === key) current.span += 1;
      else months.push({ key, span: 1, date });
    });

    const fixedColumns = [38, 148, 48, 340, 112, 72];
    ganttColgroup.innerHTML = fixedColumns.map((width) => `<col style="width:${width}px">`).join('')
      + dates.map(() => '<col style="width:20px">').join('');

    const fixedHeaders = [
      [language === 'en-US' ? 'Row' : 'Baris', 'gantt-row-index'], [language === 'en-US' ? 'Position' : 'Jabatan', ''], ['No.', ''],
      [language === 'en-US' ? 'Task' : 'Jobdesk', ''], [language === 'en-US' ? 'Deadline' : 'Deadline', ''], [language === 'en-US' ? 'Duration' : 'Durasi', '']
    ];
    const topHeaders = fixedHeaders.map(([label, className]) =>
      `<th ${className ? `class="${className}"` : ''} rowspan="2">${label}</th>`).join('')
      + months.map(({ date, span }) => {
        const label = new Intl.DateTimeFormat(language, {
          month: 'long', year: 'numeric', timeZone: 'UTC'
        }).format(date);
        return `<th class="gantt-month" colspan="${span}">${escapeHtml(label)}</th>`;
      }).join('');
    const dayHeaders = dates.map(({ date }) => {
      const weekend = date.getUTCDay() === 0 || date.getUTCDay() === 6;
      return `<th class="gantt-day${weekend ? ' is-weekend' : ''}" title="${escapeHtml(dateLabel.format(date))}">${date.getUTCDate()}</th>`;
    }).join('');
    ganttHead.innerHTML = `<tr>${topHeaders}</tr><tr>${dayHeaders}</tr>`;

    ganttBody.innerHTML = tasks.map((task) => {
      const numericDeadline = typeof task.deadline === 'number' && Number.isFinite(task.deadline);
      const deadlineText = numericDeadline ? dateLabel.format(excelDate(task.deadline)) : (task.deadline || '');
      let progressDays = 0;
      let deadlineCell = '';
      if (numericDeadline) {
        const offset = Math.floor(task.deadline - firstExcelDate);
        if (offset >= dayCount) progressDays = dayCount;
        else if (offset >= 0) {
          progressDays = offset;
          deadlineCell = `<td class="gantt-deadline-cell" title="${language === 'en-US' ? 'Deadline' : 'Tenggat'}: ${escapeHtml(deadlineText)}"></td>`;
        }
      }

      let timeline = '';
      if (progressDays > 0) timeline += `<td class="gantt-progress-cell" colspan="${progressDays}" title="${language === 'en-US' ? 'Scheduled through deadline' : 'Jadwal hingga tenggat'}"></td>`;
      timeline += deadlineCell;
      const remainingDays = dayCount - progressDays - (deadlineCell ? 1 : 0);
      if (remainingDays > 0) timeline += `<td class="gantt-empty-cell" colspan="${remainingDays}"></td>`;

      return `<tr>
        <td class="gantt-row-index">${task.row}</td>
        <td class="gantt-department-cell">${escapeHtml(task.department)}</td>
        <td class="gantt-number-cell">${escapeHtml(task.number)}</td>
        <td class="gantt-task-cell">${escapeHtml(task.task)}</td>
        <td class="gantt-deadline-label">${escapeHtml(deadlineText)}</td>
        <td class="gantt-duration-cell"></td>
        ${timeline}
      </tr>`;
    }).join('');
    ganttRendered = true;
  }

  const isModalOpen = () => Boolean(modal && modal.classList.contains('active'));

  function openDocument(docKey) {
    const doc = documents[docKey];
    if (!modal || !doc) return;

    if (!isModalOpen()) previouslyFocusedElement = document.activeElement;
    const english = document.documentElement.lang === 'en';
    if (modalTitle) modalTitle.textContent = english && doc.en ? doc.en.title : doc.title;
    if (modalSubtitle) modalSubtitle.textContent = english && doc.en ? doc.en.subtitle : doc.subtitle;
    if (modalMeta) {
      modalMeta.innerHTML = `
        <span class="doc-meta-item">
          <svg class="icon icon-small" aria-hidden="true"><use href="#i-doc"></use></svg>
          <span></span>
        </span>`;
      modalMeta.querySelector('.doc-meta-item span').textContent = english && doc.en ? doc.en.meta : doc.meta;
    }

    if (btnOpenExternal) btnOpenExternal.href = doc.file;
    if (btnDownload) {
      btnDownload.href = doc.file;
      btnDownload.setAttribute('download', doc.file.split('/').pop());
    }

    tabBtns.forEach((button) => {
      const active = button.getAttribute('data-doc-target') === docKey;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
    });

    const isPdf = doc.type === 'pdf';
    const isExcelPreview = doc.type === 'excel';
    const isDownloadableFile = doc.type === 'file';
    const isGantt = doc.type === 'gantt';
    if (pdfContainer) pdfContainer.hidden = !isPdf;
    if (excelContainer) excelContainer.hidden = !isExcelPreview;
    if (fileContainer) fileContainer.hidden = !isDownloadableFile;
    if (ganttContainer) ganttContainer.hidden = !isGantt;
    if (btnOpenExternal) btnOpenExternal.hidden = !isPdf;
    if (btnDownload) btnDownload.hidden = false;
    if (fileName) fileName.textContent = doc.file.split('/').pop();
    if (fileDescription) fileDescription.textContent = english && doc.en ? (doc.en.fileDescription || '') : (doc.fileDescription || '');
    if (isGantt && !ganttRendered) renderGanttSheet();

    if (isPdf && pdfFrame) {
      const source = `${doc.file}#toolbar=1&navpanes=1&view=FitH`;
      if (pdfFallback) pdfFallback.hidden = true;
      if (pdfFallbackLink) pdfFallbackLink.href = doc.file;
      if (pdfFrame.getAttribute('src') !== source) pdfFrame.setAttribute('src', source);
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    modal.removeAttribute('inert');
    document.body.classList.add('modal-open');
    closeBtn?.focus();
  }

  function closeModal() {
    if (!modal || !isModalOpen()) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('inert', '');
    document.body.classList.remove('modal-open');
    previouslyFocusedElement?.focus?.();
    previouslyFocusedElement = null;
  }

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-open-doc]');
    if (!trigger) return;
    event.preventDefault();
    openDocument(trigger.getAttribute('data-open-doc'));
  });

  tabBtns.forEach((button) => {
    button.addEventListener('click', () => openDocument(button.getAttribute('data-doc-target')));
  });
  closeBtn?.addEventListener('click', closeModal);
  pdfFrame?.addEventListener('error', () => {
    if (pdfFallback) pdfFallback.hidden = false;
  });

  modal?.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
  });

  excelSubtabBtns.forEach((button) => {
    button.addEventListener('click', () => {
      const sheetName = button.getAttribute('data-sheet');
      excelSubtabBtns.forEach((item) => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-selected', String(active));
      });
      excelSheets.forEach((sheet) => {
        sheet.hidden = sheet.getAttribute('data-sheet-name') !== sheetName;
      });
    });
  });
});
