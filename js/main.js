/**
 * Main JavaScript for Afif Athaullah Pranaja Portfolio
 * Handles live clock, dark/light theme switching with persistence,
 * and Interactive Engineering Document Viewer Modal.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Live Malang, Indonesia (WIB) Clock
  const clock = document.getElementById('malang-time');
  if (clock) {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Jakarta',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });

    const updateClock = () => {
      try {
        clock.textContent = `${formatter.format(new Date())} WIB`;
      } catch (e) {
        clock.textContent = new Date().toLocaleTimeString();
      }
    };

    updateClock();
    setInterval(updateClock, 1000);
  }

  // Theme Toggle with LocalStorage persistence
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  if (themeToggle && themeIcon) {
    const savedTheme = localStorage.getItem('site-theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light');
      themeIcon.setAttribute('href', '#i-sun');
      themeToggle.setAttribute('aria-label', 'Switch to dark theme');
    }

    themeToggle.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light');
      themeIcon.setAttribute('href', isLight ? '#i-sun' : '#i-moon');
      themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
      localStorage.setItem('site-theme', isLight ? 'light' : 'dark');
    });
  }

  // ==========================================
  // Engineering Document Viewer Modal System
  // ==========================================
  const modal = document.getElementById('doc-modal');
  const closeBtn = document.getElementById('doc-modal-close');
  const modalTitle = document.getElementById('doc-modal-title');
  const modalSubtitle = document.getElementById('doc-modal-subtitle');
  const modalMeta = document.getElementById('doc-modal-meta');
  const btnOpenExternal = document.getElementById('doc-btn-external');
  const btnDownload = document.getElementById('doc-btn-download');
  const pdfContainer = document.getElementById('doc-pdf-container');
  const excelContainer = document.getElementById('doc-excel-container');
  const pdfFrame = document.getElementById('doc-pdf-iframe');
  const tabBtns = document.querySelectorAll('.doc-tab-btn');

  // Document Registry
  const documents = {
    'rumah-3-lantai': {
      title: 'Desain Denah Instalasi Kelistrikan Rumah Mewah 3 Lantai',
      subtitle: 'Gambar Kerja AutoCAD 2D • Layout Titik Lampu, Stop Kontak, Saklar & Jalur Conduit',
      type: 'pdf',
      file: 'assets/docs/Desain_Instalasi_Rumah_3_Lantai.pdf',
      originalFile: 'assets/docs/project installation rumah 3 lantai_recover-Model.pdf',
      meta: 'AutoCAD 2D • ISO A3 Full Bleed • Skala 1:100 • Standar PUIL 2011',
      formatBadge: 'PDF DRAWING'
    },
    'sld': {
      title: 'Single Line Diagram (SLD) & Distribusi Daya 3-Fasa',
      subtitle: 'Diagram Satu Garis Pembagian Fasa R-S-T Seimbang, Proteksi MCB/MCCB & Sistem Grounding',
      type: 'pdf',
      file: 'assets/docs/SLD_Sistem_Kelistrikan.pdf',
      originalFile: 'assets/docs/SLD.pdf',
      meta: 'AutoCAD 2D • Single Line Diagram • 3-Phase Balance • Standar PUIL / PLN',
      formatBadge: 'SLD SCHEMATIC'
    },
    'rab': {
      title: 'Rencana Anggaran Biaya (RAB) & Perhitungan Beban',
      subtitle: 'Kalkulasi Iluminasi Ruangan (Lux/Kp) & Bill of Quantities (BOQ) Tipe 124',
      type: 'excel',
      file: 'assets/docs/RAB_Rumah_Mewah_3_Lantai.xlsx',
      originalFile: 'assets/docs/RAB_Rumah Mewah 3 lantai.xlsx',
      meta: 'Microsoft Excel (.xlsx) • Sheet: BOQ & LOAD • Nilai Real Komponen & Upah Kerja',
      formatBadge: 'EXCEL DATA'
    },
    'gedung-ppp': {
      title: 'Perancangan Sistem Instalasi Listrik Gedung (Proyek Instalasi II)',
      subtitle: 'Gambar Kerja AutoCAD 2D • Jalur Distribusi Daya, Panel Penerangan & Kabel Tray',
      type: 'pdf',
      file: 'assets/docs/Desain_Instalasi_Gedung_PPP.pdf',
      originalFile: 'assets/docs/project installaion ppp-Model.pdf',
      meta: 'AutoCAD 2D • Proyek Instalasi II (Semester 5) • D4 Sistem Kelistrikan Polinema',
      formatBadge: 'PDF DRAWING'
    }
  };

  let currentDocKey = 'rumah-3-lantai';

  function openDocument(docKey) {
    if (!documents[docKey]) return;
    currentDocKey = docKey;
    const doc = documents[docKey];

    // Update Header & Meta
    if (modalTitle) modalTitle.textContent = doc.title;
    if (modalSubtitle) modalSubtitle.textContent = doc.subtitle;
    if (modalMeta) {
      modalMeta.innerHTML = `
        <span class="doc-meta-item">
          <svg class="icon icon-small" aria-hidden="true"><use href="#i-doc"></use></svg>
          <span>${doc.meta}</span>
        </span>
      `;
    }

    // Update Action Links
    if (btnOpenExternal) {
      btnOpenExternal.href = doc.file;
      btnOpenExternal.target = '_blank';
      btnOpenExternal.rel = 'noopener noreferrer';
    }
    if (btnDownload) {
      btnDownload.href = doc.file;
      btnDownload.setAttribute('download', doc.file.split('/').pop());
    }

    // Update Tab Styles
    tabBtns.forEach(btn => {
      const tabKey = btn.getAttribute('data-doc-target');
      btn.classList.toggle('active', tabKey === docKey);
    });

    // Render Viewport
    if (doc.type === 'pdf') {
      if (excelContainer) excelContainer.style.display = 'none';
      if (pdfContainer) pdfContainer.style.display = 'flex';
      if (pdfFrame) {
        // Only reload if source changed to avoid flash
        if (!pdfFrame.src.endsWith(doc.file)) {
          pdfFrame.src = doc.file + '#toolbar=1&navpanes=1';
        }
      }
    } else if (doc.type === 'excel') {
      if (pdfContainer) pdfContainer.style.display = 'none';
      if (excelContainer) excelContainer.style.display = 'flex';
    }

    // Show Modal
    if (modal) {
      modal.classList.add('active');
      document.body.classList.add('modal-open');
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.classList.remove('modal-open');
    }
  }

  // Attach Open Modal to Trigger Elements
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-open-doc]');
    if (trigger) {
      e.preventDefault();
      const targetDoc = trigger.getAttribute('data-open-doc');
      openDocument(targetDoc);
    }
  });

  // Tab navigation inside modal
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetDoc = btn.getAttribute('data-doc-target');
      openDocument(targetDoc);
    });
  });

  // Close handlers
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Sub-tabs switcher in Excel Viewer (BOQ vs LOAD)
  const excelSubtabBtns = document.querySelectorAll('.excel-subtab-btn');
  const excelSheets = document.querySelectorAll('.excel-sheet-content');

  excelSubtabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const sheetName = btn.getAttribute('data-sheet');
      excelSubtabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      excelSheets.forEach(sheet => {
        sheet.style.display = (sheet.getAttribute('data-sheet-name') === sheetName) ? 'block' : 'none';
      });
    });
  });
});
