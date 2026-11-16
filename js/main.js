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
      themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
      themeToggle.setAttribute('aria-pressed', String(isLight));
      themeToggle.title = isLight ? 'Switch to dark theme' : 'Switch to light theme';

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
      type: 'pdf',
      file: 'assets/docs/Desain_Instalasi_Rumah_3_Lantai.pdf',
      meta: 'AutoCAD 2D • ISO A3 Full Bleed • Skala 1:100 • Standar PUIL 2011'
    },
    sld: {
      title: 'Single Line Diagram (SLD) & Distribusi Daya 3-Fasa',
      subtitle: 'Diagram Satu Garis Pembagian Fasa R-S-T Seimbang, Proteksi MCB/MCCB & Sistem Grounding',
      type: 'pdf',
      file: 'assets/docs/SLD_Sistem_Kelistrikan.pdf',
      meta: 'AutoCAD 2D • Single Line Diagram • 3-Phase Balance • Standar PUIL / PLN'
    },
    rab: {
      title: 'Rencana Anggaran Biaya (RAB) & Perhitungan Beban',
      subtitle: 'Kalkulasi Iluminasi Ruangan (Lux/Kp) & Bill of Quantities (BOQ) Tipe 124',
      type: 'excel',
      file: 'assets/docs/RAB_Rumah_Mewah_3_Lantai.xlsx',
      meta: 'Microsoft Excel (.xlsx) • Sheet: BOQ & LOAD • Nilai Real Komponen & Upah Kerja'
    },
    'gedung-ppp': {
      title: 'Perancangan Sistem Instalasi Listrik Gedung (Proyek Instalasi II)',
      subtitle: 'Gambar Kerja AutoCAD 2D • Jalur Distribusi Daya, Panel Penerangan & Kabel Tray',
      type: 'pdf',
      file: 'assets/docs/Desain_Instalasi_Gedung_PPP.pdf',
      meta: 'AutoCAD 2D • Proyek Instalasi II (Semester 5) • D4 Sistem Kelistrikan Polinema'
    },
    'portofolio-3d': {
      title: 'Portofolio Desain 3D',
      subtitle: 'Kumpulan karya pemodelan dan visualisasi 3D',
      type: 'pdf',
      file: 'assets/docs/Portofolio_3D.pdf',
      meta: 'Portofolio • PDF'
    },
    'jd-ts': {
      title: 'JD-TS PLC Competition WSEC 2024',
      subtitle: 'Workbook kompetisi PLC untuk WSEC 2024',
      type: 'file',
      file: 'assets/docs/JD-TS_PLC_COMPETITION_WSEC_2024.xlsx',
      meta: 'Microsoft Excel • WSEC 2024',
      fileDescription: 'Workbook berisi sheet JD&TM serta Rapat dan Sharing.'
    }
  };

  const isModalOpen = () => Boolean(modal && modal.classList.contains('active'));

  function openDocument(docKey) {
    const doc = documents[docKey];
    if (!modal || !doc) return;

    if (!isModalOpen()) previouslyFocusedElement = document.activeElement;
    if (modalTitle) modalTitle.textContent = doc.title;
    if (modalSubtitle) modalSubtitle.textContent = doc.subtitle;
    if (modalMeta) {
      modalMeta.innerHTML = `
        <span class="doc-meta-item">
          <svg class="icon icon-small" aria-hidden="true"><use href="#i-doc"></use></svg>
          <span></span>
        </span>`;
      modalMeta.querySelector('.doc-meta-item span').textContent = doc.meta;
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
    if (pdfContainer) pdfContainer.hidden = !isPdf;
    if (excelContainer) excelContainer.hidden = !isExcelPreview;
    if (fileContainer) fileContainer.hidden = !isDownloadableFile;
    if (btnOpenExternal) btnOpenExternal.hidden = !isPdf;
    if (btnDownload) btnDownload.hidden = false;
    if (fileName) fileName.textContent = doc.file.split('/').pop();
    if (fileDescription) fileDescription.textContent = doc.fileDescription || '';

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
