/* =============================================================
   ROMJAN APPS — script.js   (User-side only)
   ============================================================= */
'use strict';

/* ── UI RENDERING (HTML in JS) ── */
(function renderUI() {
  document.body.innerHTML = `
    <!-- ── Loading Screen ── -->
    <div id="loadingOverlay" class="loading-overlay">
      <div class="loader-logo">📦</div>
      <div style="font-size:1.1rem;font-weight:700;color:var(--text-primary)">Romjan App Hub</div>
      <div class="loader-bar"><div class="loader-bar-fill"></div></div>
    </div>

    <!-- ── Ambient Background ── -->
    <div class="bg-blobs" aria-hidden="true">
      <span></span><span></span><span></span>
    </div>

    <!-- NAVBAR -->
    <nav class="navbar" role="navigation" aria-label="Main navigation">
      <a class="nav-brand" href="#" data-page="home" aria-label="Romjan Apps Home">
        <img src="/letter-r.png" alt="Logo" class="logo-img">
      <span class="logo-text">Romjan App Hub</span>
      </a>
      <div class="nav-center">
        <a class="nav-link active" data-page="home" role="button" tabindex="0">Home</a>
      </div>
      <div class="nav-end">
        <button class="btn btn-secondary btn-sm" id="navLogin" data-page="auth">Sign In</button>
        <button class="btn btn-primary btn-sm" id="navRegister" data-page="register">Register</button>
        <div class="dropdown hidden" id="avatarDropdown">
          <div class="avatar-btn" id="avatarDropdownBtn" role="button" tabindex="0" aria-haspopup="true" aria-expanded="false">
            <div id="navAvatarBtn">
              <div class="avatar-placeholder">?</div>
            </div>
          </div>
          <div class="dropdown-menu" role="menu" aria-label="User menu">
            <div class="dropdown-item" id="ddProfile" role="menuitem">👤 Profile</div>
            <div class="dropdown-divider"></div>
            <div class="dropdown-item danger" id="ddLogout" role="menuitem">🚪 Sign Out</div>
          </div>
        </div>
        <button class="hamburger" id="hamburger" aria-label="Toggle mobile menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
        <div id="navProfile" class="hidden" style="display:contents"></div>
      </div>
    </nav>

    <!-- Mobile Nav -->
    <div class="mobile-nav" id="mobileNav" role="navigation" aria-label="Mobile navigation">
      <a class="nav-link active" data-page="home">🏠 Home</a>
      <a class="nav-link" data-page="auth">🔑 Sign In</a>
      <a class="nav-link" data-page="register">📝 Register</a>
    </div>

    <!-- PAGE: HOME -->
    <main id="page-home" class="page active" role="main">
      <section class="hero container" aria-labelledby="heroHeading">
        <div class="hero-badge" aria-label="Status indicator">Platform is live</div>
        <h1 id="heroHeading">
          Your <span class="gradient-text">App Store</span>,<br>
          Your Rules
        </h1>
        <p>Browse, discover, and download premium Android apps directly. No Play Store needed — just pure, fast access.</p>
        <div class="hero-cta">
          <button class="btn btn-primary btn-lg" id="heroBrowse" aria-label="Browse all apps">
            🚀 Explore Apps
          </button>
        </div>
      </section>

      <section class="search-section" aria-label="Search and filter">
        <div class="container">
          <div class="search-bar" role="search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
            <input type="search" id="searchInput" placeholder="Search apps by name or category…" aria-label="Search apps" autocomplete="off">
          </div>
          <div class="category-tabs" id="categoryTabs" role="tablist" aria-label="Category filter">
            <button class="cat-tab active" data-cat="all" role="tab" aria-selected="true">All</button>
            <button class="cat-tab" data-cat="Productivity" role="tab" aria-selected="false">Productivity</button>
            <button class="cat-tab" data-cat="Photography" role="tab" aria-selected="false">Photography</button>
            <button class="cat-tab" data-cat="Health" role="tab" aria-selected="false">Health</button>
            <button class="cat-tab" data-cat="Finance" role="tab" aria-selected="false">Finance</button>
            <button class="cat-tab" data-cat="Music" role="tab" aria-selected="false">Music</button>
            <button class="cat-tab" data-cat="Navigation" role="tab" aria-selected="false">Navigation</button>
            <button class="cat-tab" data-cat="Developer" role="tab" aria-selected="false">Developer</button>
            <button class="cat-tab" data-cat="Weather" role="tab" aria-selected="false">Weather</button>
            <button class="cat-tab" data-cat="Games" role="tab" aria-selected="false">Games</button>
          </div>
        </div>
      </section>

      <section class="apps-section container" aria-labelledby="appsSectionTitle">
        <div class="section-header">
          <h2 class="section-title" id="appsSectionTitle">Discover Apps</h2>
          <span class="section-count" id="appCount" aria-live="polite">0 apps</span>
        </div>
        <div class="apps-grid" id="appsGrid" role="list" aria-label="Available apps"></div>
      </section>

      <footer role="contentinfo">
        <p>© 2025 <strong>Romjan Apps</strong> — A Premium App Distribution Platform</p>
        <nav class="footer-links" aria-label="Footer navigation">
          <a data-page="home">Home</a>
          <a data-page="auth">Sign In</a>
        </nav>
        <div class="footer-social-links" style="margin-top: 15px; display: flex; justify-content: center; gap: 15px; font-size: 1.5rem;"></div>
        <div class="dev-credit">Develop By <span class="rainbow-text">Romjan</span></div>
      </footer>
    </main>

    <!-- PAGE: PROFILE -->
    <section id="page-profile" class="page" role="main" aria-label="User profile">
      <div class="profile-hero" id="profileHero" role="region" aria-label="Profile header"></div>
      <div class="profile-content" id="profileCards"></div>
    </section>

    <!-- MODALS -->
    <!-- Auth Modal -->
    <div class="modal-overlay" id="authModal" role="dialog" aria-modal="true" aria-labelledby="authModalTitle">
      <div class="modal">
        <div class="modal-header">
          <span class="modal-title" id="authModalTitle">Account</span>
          <button class="modal-close" onclick="closeModal('authModal')" aria-label="Close modal">✕</button>
        </div>
        <div class="modal-body">
          <div class="auth-tabs" role="tablist">
            <div class="auth-tab active" id="authTabLogin" role="tab" tabindex="0" aria-selected="true">Sign In</div>
            <div class="auth-tab" id="authTabRegister" role="tab" tabindex="0" aria-selected="false">Register</div>
          </div>
          <div id="authForm" aria-live="polite"></div>
        </div>
      </div>
    </div>

    <!-- Admin Login Modal -->
    <div class="modal-overlay" id="adminLoginModal" role="dialog" aria-modal="true" aria-labelledby="adminLoginTitle">
      <div class="modal">
        <div class="modal-header">
          <span class="modal-title" id="adminLoginTitle">🛡️ Admin Login</span>
          <button class="modal-close" onclick="closeModal('adminLoginModal')" aria-label="Close modal">✕</button>
        </div>
        <div class="modal-body">
          <div style="background:rgba(108,99,255,.08);border:1px solid rgba(108,99,255,.2);border-radius:var(--radius-md);padding:12px 16px;margin-bottom:20px;font-size:.82rem;color:var(--text-secondary)">
            🔑 Admin credentials are separate from user accounts.
            <br><strong>Demo:</strong> owner@romjanapps.com / romjan123
          </div>
          <div class="form-group">
            <label class="form-label" for="adminEmail">Admin Email</label>
            <input class="form-control" type="email" id="adminEmail" placeholder="admin@romjanapps.com" autocomplete="email">
          </div>
          <div class="form-group">
            <label class="form-label" for="adminPassword">Password</label>
            <input class="form-control" type="password" id="adminPassword" placeholder="••••••••" autocomplete="current-password">
          </div>
          <button class="btn btn-primary btn-full" onclick="handleAdminLogin()">🔐 Sign In as Admin</button>
        </div>
      </div>
    </div>

    <!-- App Detail Modal -->
    <div class="modal-overlay" id="appDetailModal" role="dialog" aria-modal="true" aria-labelledby="appDetailTitle">
      <div class="modal" style="max-width:480px">
        <div class="modal-header">
          <span class="modal-title" id="appDetailTitle">App Details</span>
          <button class="modal-close" onclick="closeModal('appDetailModal')" aria-label="Close modal">✕</button>
        </div>
        <div id="appDetailContent"></div>
      </div>
    </div>

    <!-- Upload / Edit App Modal -->
    <div class="modal-overlay" id="uploadModal" role="dialog" aria-modal="true" aria-labelledby="uploadModalTitle">
      <div class="modal">
        <div class="modal-header">
          <span class="modal-title" id="uploadModalTitle">Upload New App</span>
          <button class="modal-close" onclick="closeModal('uploadModal')" aria-label="Close modal">✕</button>
        </div>
        <div class="modal-body">
          <div id="uploadForm" aria-live="polite"></div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeModal('uploadModal')">Cancel</button>
          <button class="btn btn-primary" id="uploadModalSave">💾 Save App</button>
        </div>
      </div>
    </div>

    <!-- Create / Edit Admin Modal -->
    <div class="modal-overlay" id="createAdminModal" role="dialog" aria-modal="true" aria-labelledby="createAdminTitle">
      <div class="modal">
        <div class="modal-header">
          <span class="modal-title" id="createAdminTitle">Create Admin</span>
          <button class="modal-close" onclick="closeModal('createAdminModal')" aria-label="Close modal">✕</button>
        </div>
        <div class="modal-body">
          <div id="createAdminForm" aria-live="polite"></div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeModal('createAdminModal')">Cancel</button>
          <button class="btn btn-primary" id="createAdminSave">💾 Save Admin</button>
        </div>
      </div>
    </div>

    <!-- Download Confirmation Modal -->
    <div class="modal-overlay" id="downloadConfirmModal" role="dialog" aria-modal="true" aria-labelledby="dlConfirmTitle">
      <div class="modal modal-sm">
        <div class="modal-header">
          <span class="modal-title" id="dlConfirmTitle">Confirm Download</span>
          <button class="modal-close" onclick="closeModal('downloadConfirmModal')" aria-label="Close modal">✕</button>
        </div>
        <div class="modal-body text-center">
          <div class="confirm-icon">📥</div>
          <p class="confirm-msg">Are you sure you want to download this app?</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeModal('downloadConfirmModal')">Cancel</button>
          <button class="btn btn-primary" id="btnConfirmDownload">Yes, Download</button>
        </div>
      </div>
    </div>

    <!-- Download Success Modal -->
    <div class="modal-overlay" id="downloadSuccessModal" role="dialog" aria-modal="true" aria-labelledby="dlSuccessTitle">
      <div class="modal modal-sm">
        <div class="modal-header">
          <span class="modal-title" id="dlSuccessTitle">Success</span>
          <button class="modal-close" onclick="closeModal('downloadSuccessModal')" aria-label="Close modal">✕</button>
        </div>
        <div class="modal-body text-center">
          <div class="confirm-icon">🎉</div>
          <p class="confirm-msg">Thanks for downloading!</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary btn-full" onclick="closeModal('downloadSuccessModal')">Close</button>
        </div>
      </div>
    </div>

    <!-- Custom Popup Modal -->
    <div class="modal-overlay" id="customPopupModal" role="dialog" aria-modal="true">
      <div class="modal modal-sm">
        <div class="modal-header">
          <span class="modal-title" id="popupTitle">Notification</span>
          <button class="modal-close" onclick="handlePopupAction(null)">✕</button>
        </div>
        <div class="modal-body text-center">
          <div id="popupIcon" class="confirm-icon" style="font-size: 3rem; margin-bottom: 15px;">ℹ️</div>
          <p id="popupMsg" class="confirm-msg"></p>
          <div id="popupInputWrap" class="hidden" style="margin-top: 15px;">
            <input type="text" id="popupInput" class="form-control" placeholder="Enter value...">
          </div>
        </div>
        <div class="modal-footer" id="popupFooter"></div>
      </div>
    </div>

    <!-- Toast Container -->
    <div class="toast-container" id="toastContainer" role="status" aria-live="polite" aria-atomic="false"></div>
  `;
})();

/* ── SECURITY MEASURES (Code Protection) ── */
// Disable right-click context menu
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Disable DevTools & View Source keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // F12
  if (e.key === 'F12') e.preventDefault();
  // Ctrl+Shift+I (Inspect)
  if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) e.preventDefault();
  // Ctrl+Shift+J (Console)
  if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j')) e.preventDefault();
  // Ctrl+Shift+C (Select element)
  if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c')) e.preventDefault();
  // Ctrl+U (View Source)
  if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) e.preventDefault();
  // Ctrl+S (Save page)
  if (e.ctrlKey && (e.key === 'S' || e.key === 's')) e.preventDefault();
  // Ctrl+Shift+U (Not common but safe to block)
  if (e.ctrlKey && e.shiftKey && (e.key === 'U' || e.key === 'u')) e.preventDefault();
});

// Advanced: Stop code execution and protect source
const protect = () => {
  // Method 1: Debugger timing (stops execution and detects open DevTools)
  const start = performance.now();
  debugger;
  const end = performance.now();
  
  // Method 2: Check window size (DevTools usually takes up space)
  const threshold = 160;
  const isDevToolsOpen = 
    window.outerWidth - window.innerWidth > threshold || 
    window.outerHeight - window.innerHeight > threshold;

  if (end - start > 100 || isDevToolsOpen) {
    // If detected, clear everything and redirect to prevent code inspection
    document.documentElement.innerHTML = ""; 
    window.location.replace("about:blank");
    alert("Security Alert: Developer Tools are disabled.");
  }
};

setInterval(protect, 1000);

// Disable console methods to prevent logging
(function() {
  const noop = () => {};
  const methods = ['log', 'debug', 'info', 'warn', 'error', 'table', 'clear', 'dir', 'dirxml', 'group', 'groupCollapsed', 'groupEnd', 'count', 'assert', 'profile', 'profileEnd', 'time', 'timeEnd', 'timeStamp', 'trace'];
  methods.forEach(method => {
    try { console[method] = noop; } catch (e) {}
  });
})();

/* ── DATA STORE ── */
const DB = {
  get: k => { try { return JSON.parse(localStorage.getItem('ra_' + k)) || null; } catch { return null; } },
  set: (k, v) => localStorage.setItem('ra_' + k, JSON.stringify(v)),
  remove: k => localStorage.removeItem('ra_' + k),
};

/* ── STATE ── */
const STATE = {
  currentPage:    'home',
  session:        null,
  apps:           [],
  users:          [],
  categories:     [],
  socialLinks:    [],
  searchQuery:    '',
  activeCategory: 'all',
};

/* ── SEED DATA ── */
const DEFAULT_CATS = ['Productivity','Photography','Health','Finance','Music','Navigation','Developer','Weather','Games','Social','Tools','Education'];
const DEFAULT_APPS = [
  { id:'app1', name:'SwiftNotes',  category:'Productivity', desc:'A lightning-fast note-taking app with markdown support and cloud sync.',          icon:'📝', apkName:'swift-notes.apk',  downloads:1240, size:'8.2 MB',  version:'2.1.0', createdAt:Date.now()-864e5*10 },
  { id:'app2', name:'PixelCam',    category:'Photography',  desc:'Pro-grade camera with AI filters, portrait mode, and RAW capture support.',       icon:'📷', apkName:'pixel-cam.apk',    downloads:3820, size:'22.7 MB', version:'1.4.2', createdAt:Date.now()-864e5*7  },
  { id:'app3', name:'FitTracker',  category:'Health',       desc:'Track workouts, calories, sleep and build healthier habits every day.',           icon:'💪', apkName:'fit-tracker.apk',  downloads:2155, size:'14.1 MB', version:'3.0.1', createdAt:Date.now()-864e5*5  },
  { id:'app4', name:'BudgetPal',   category:'Finance',      desc:'Smart expense tracking with analytics, budgets and bill reminders.',              icon:'💸', apkName:'budget-pal.apk',   downloads:980,  size:'6.8 MB',  version:'1.2.3', createdAt:Date.now()-864e5*3  },
  { id:'app5', name:'SoundWave',   category:'Music',        desc:'Equalizer, bass booster and music player with offline playlist support.',         icon:'🎵', apkName:'sound-wave.apk',   downloads:5100, size:'18.3 MB', version:'4.1.0', createdAt:Date.now()-864e5*2  },
  { id:'app6', name:'RouteMap',    category:'Navigation',   desc:'Offline maps with turn-by-turn navigation and live traffic updates.',             icon:'🗺️', apkName:'route-map.apk',    downloads:2670, size:'34.5 MB', version:'2.8.1', createdAt:Date.now()-864e5    },
  { id:'app7', name:'CodePad',     category:'Developer',    desc:'Full-featured code editor with syntax highlighting for 60+ languages.',           icon:'💻', apkName:'code-pad.apk',     downloads:1430, size:'11.2 MB', version:'1.9.4', createdAt:Date.now()-36e5*12  },
  { id:'app8', name:'WeatherNow',  category:'Weather',      desc:'Hyper-local weather forecasts with stunning animated visuals.',                   icon:'🌤️', apkName:'weather-now.apk',  downloads:4320, size:'9.5 MB',  version:'3.3.3', createdAt:Date.now()-36e5*6   },
];
const DEFAULT_OWNER = {
  id:'owner1', type:'admin', role:'owner',
  name:'Romjan', email:'mdromjan9522@gmail.com', password:'kgfstar11',
  permissions:{ upload:true, edit:true, update:true, delete:true },
  createdAt:Date.now()
};

async function seedData() {
  const seeded = DB.get('seeded');
  const storedAdmins = DB.get('admins') || [];
  const mainAdmin = storedAdmins.find(a => a.id === 'owner1');

  // If not seeded OR the main admin email/pass has changed in code, force update
  if (!seeded || (mainAdmin && (mainAdmin.email !== DEFAULT_OWNER.email || mainAdmin.password !== DEFAULT_OWNER.password))) {
    DB.set('apps',   []);
    DB.set('admins', [DEFAULT_OWNER]);
    DB.set('users',  []);
    DB.set('seeded', true);
    // Clear session to force fresh login with new creds
    DB.remove('session');

    // Sync to Remote DB as well if connected
    await REMOTE_DB.saveAdmin(DEFAULT_OWNER);
  }

  // Optimize: Load data in parallel with fallback
  const hasRemoteDB = typeof REMOTE_DB !== 'undefined';
  const safeFetch = async (fn) => {
    try { return await fn(); } catch (e) { console.warn('Fetch failed, using local fallback:', e); return []; }
  };

  const [remoteCats, remoteApps, remoteUsers, remoteSocial] = await Promise.all([
    hasRemoteDB ? safeFetch(() => REMOTE_DB.getCategories()) : Promise.resolve([]),
    hasRemoteDB ? safeFetch(() => REMOTE_DB.getApps()) : Promise.resolve([]),
    hasRemoteDB ? safeFetch(() => REMOTE_DB.getUsers()) : Promise.resolve([]),
    hasRemoteDB ? safeFetch(() => REMOTE_DB.getSocialLinks()) : Promise.resolve([])
  ]);

  // Handle Categories
  if (remoteCats && remoteCats.length > 0) {
    STATE.categories = remoteCats;
  } else {
    STATE.categories = DEFAULT_CATS.map(c => ({ id: uid(), name: c }));
  }

  // Handle Social Links
  STATE.socialLinks = remoteSocial || [];

  // Handle Apps
  if (remoteApps && remoteApps.length > 0) {
    STATE.apps = remoteApps;
    DB.set('apps', remoteApps);
  } else {
    STATE.apps = DB.get('apps') || [];
  }

  // Handle Users
  if (remoteUsers && remoteUsers.length > 0) {
    STATE.users = remoteUsers;
    DB.set('users', remoteUsers);
  } else {
    STATE.users = DB.get('users') || [];
  }
}

const saveUsers = async () => {
  DB.set('users', STATE.users);
  // Optimize: Save users in parallel
  await Promise.all(STATE.users.map(user => REMOTE_DB.saveUser(user)));
};

/* ── UTILS ── */
const uid     = () => Date.now().toString(36) + Math.random().toString(36).slice(2);
const esc     = s  => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmtNum  = n  => n >= 1e6 ? (n/1e6).toFixed(1)+'M' : n >= 1e3 ? (n/1e3).toFixed(1)+'K' : n;
const fmtDate = ts => new Date(ts).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
const hashPw  = pw => { let h=0; for (const c of pw) h=(h<<5)-h+c.charCodeAt(0); return h.toString(36); };
const el      = id => document.getElementById(id);
const val     = id => (el(id)?.value||'').trim();

const GRADIENTS = [
  'linear-gradient(135deg,rgba(108,99,255,.4),rgba(255,101,132,.2))',
  'linear-gradient(135deg,rgba(67,233,123,.3),rgba(56,249,215,.2))',
  'linear-gradient(135deg,rgba(255,193,7,.3),rgba(255,101,132,.2))',
  'linear-gradient(135deg,rgba(56,249,215,.3),rgba(108,99,255,.2))',
  'linear-gradient(135deg,rgba(255,101,132,.3),rgba(255,193,7,.2))',
];

/* ── CUSTOM POPUP LOGIC ── */
let popupResolve = null;

function showPopup({ title = 'Notification', msg = '', icon = 'ℹ️', type = 'alert', placeholder = '' }) {
  return new Promise((resolve) => {
    popupResolve = resolve;
    el('popupTitle').textContent = title;
    el('popupMsg').textContent = msg;
    el('popupIcon').textContent = icon;
    
    const inputWrap = el('popupInputWrap');
    const input = el('popupInput');
    if (type === 'prompt') {
      inputWrap.classList.remove('hidden');
      input.value = '';
      input.placeholder = placeholder;
      setTimeout(() => input.focus(), 300);
    } else {
      inputWrap.classList.add('hidden');
    }

    const footer = el('popupFooter');
    if (type === 'alert') {
      footer.innerHTML = `<button class="btn btn-primary btn-full" onclick="handlePopupAction(true)">OK</button>`;
    } else if (type === 'confirm') {
      footer.innerHTML = `
        <button class="btn btn-secondary" onclick="handlePopupAction(false)">Cancel</button>
        <button class="btn btn-primary" onclick="handlePopupAction(true)">Confirm</button>`;
    } else if (type === 'prompt') {
      footer.innerHTML = `
        <button class="btn btn-secondary" onclick="handlePopupAction(null)">Cancel</button>
        <button class="btn btn-primary" onclick="handlePopupAction(document.getElementById('popupInput').value)">Submit</button>`;
    }

    openModal('customPopupModal');
  });
}

function handlePopupAction(val) {
  closeModal('customPopupModal');
  if (popupResolve) {
    popupResolve(val);
    popupResolve = null;
  }
}

function closePopup() {
  handlePopupAction(null);
}

// Global Popup Overrides (Async)
const Popup = {
  alert:   (msg, title='Notification', icon='ℹ️') => showPopup({ title, msg, icon, type: 'alert' }),
  confirm: (msg, title='Confirm Action', icon='⚠️') => showPopup({ title, msg, icon, type: 'confirm' }),
  prompt:  (msg, placeholder='', title='Input Required', icon='📝') => showPopup({ title, msg, icon, type: 'prompt', placeholder })
};

/* ── TOAST ── */
function toast(msg, type='info') {
  const icons = { success:'✅', error:'❌', info:'ℹ️', warning:'⚠️' };
  const wrap  = el('toastContainer');
  const div   = document.createElement('div');
  div.className = `toast ${type}`;
  div.innerHTML = `<span class="toast-icon">${icons[type]}</span>
    <span class="toast-msg">${esc(msg)}</span>
    <span class="toast-close">✕</span>`;
  div.querySelector('.toast-close').onclick = () => removeToast(div);
  wrap.appendChild(div);
  setTimeout(() => removeToast(div), 4000);
}
function removeToast(el) { el.classList.add('removing'); setTimeout(()=>el.remove(),300); }

/* ── MODAL ── */
function openModal(id)  { el(id).classList.add('open');  document.body.style.overflow='hidden'; }
function closeModal(id) { el(id).classList.remove('open'); document.body.style.overflow=''; }

/* ── NAVIGATION ── */
function navigate(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = el('page-' + page);
  if (target) { target.classList.add('active'); STATE.currentPage = page; }

  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.page === page);
  });

  el('mobileNav').classList.remove('open');
  el('hamburger').classList.remove('open');

  if (page === 'home')    renderApps();
  if (page === 'profile') renderProfile();

  window.scrollTo({ top:0, behavior:'smooth' });
}

/* ── AUTH ── */
function getSession() {
  const s = DB.get('session');
  if (s) { STATE.session = s; updateNav(); }
  return s;
}
function setSession(obj) { STATE.session = obj; DB.set('session', obj); updateNav(); }
function logout() {
  STATE.session = null;
  DB.remove('session');
  updateNav();
  navigate('home');
  toast('Logged out successfully', 'info');
}

function updateNav() {
  const s        = STATE.session;
  const loggedIn = !!s;

  el('navLogin')?.classList.toggle('hidden', loggedIn);
  el('navRegister')?.classList.toggle('hidden', loggedIn);
  el('navProfile')?.classList.toggle('hidden', !loggedIn);
  el('avatarDropdown')?.classList.toggle('hidden', !loggedIn);
  
  // 3-line hamburger only shows when logged out
  el('hamburger')?.classList.toggle('hidden', loggedIn);

  if (loggedIn) {
    const avatarHtml = s.avatar
      ? `<img src="${s.avatar}" alt="${esc(s.name)}">`
      : `<div class="avatar-placeholder">${s.name.charAt(0).toUpperCase()}</div>`;
    el('navAvatarBtn').innerHTML = `${avatarHtml}`;
    
    // Update dropdown menu with navigation links for mobile since hamburger is hidden
    el('avatarDropdown').querySelector('.dropdown-menu').innerHTML = `
      <div class="dropdown-item mobile-only" data-page="home">🏠 Home</div>
      <div class="dropdown-divider mobile-only"></div>
      <div class="dropdown-item" id="ddProfile">👤 Profile</div>
      <div class="dropdown-divider"></div>
      <div class="dropdown-item danger" id="ddLogout">🚪 Sign Out</div>
    `;
    
    // Re-bind dropdown events since we just replaced the innerHTML
    el('ddProfile').addEventListener('click', () => { navigate('profile'); el('avatarDropdown').classList.remove('open'); });
    el('ddLogout').addEventListener('click',  () => { logout(); el('avatarDropdown').classList.remove('open'); });
    el('avatarDropdown').querySelectorAll('.mobile-only[data-page]').forEach(link => {
      link.addEventListener('click', () => { navigate(link.dataset.page); el('avatarDropdown').classList.remove('open'); });
    });
  }
}

function loginUser(email, password) {
  const u = STATE.users.find(u =>
    u.email.toLowerCase() === email.toLowerCase() && u.password === hashPw(password)
  );
  if (!u) return false;
  setSession({ id:u.id, type:'user', name:u.name, email:u.email, avatar:u.avatar||null });
  return true;
}

function registerUser(name, email, password) {
  if (STATE.users.find(u => u.email.toLowerCase() === email.toLowerCase())) return false;
  const u = { id:uid(), name, email, password:hashPw(password), avatar:null, downloads:0, createdAt:Date.now() };
  STATE.users.push(u);
  saveUsers();
  setSession({ id:u.id, type:'user', name:u.name, email:u.email, avatar:null });
  return true;
}

/* ── RENDER: AUTH MODAL ── */
function renderAuthPage(tab='login') {
  const isLogin = tab === 'login';
  el('authForm').innerHTML = isLogin ? loginFormHtml() : registerFormHtml();
  el('authTabLogin').classList.toggle('active', isLogin);
  el('authTabRegister').classList.toggle('active', !isLogin);
}

function loginFormHtml() {
  return `
    <div class="form-group">
      <label class="form-label">Email</label>
      <input class="form-control" type="email" id="loginEmail" placeholder="you@example.com" autocomplete="email">
    </div>
    <div class="form-group">
      <label class="form-label">Password</label>
      <input class="form-control" type="password" id="loginPassword" placeholder="••••••••" autocomplete="current-password">
    </div>
    <button class="btn btn-primary btn-full btn-lg" onclick="handleLogin()">Sign In →</button>
    <p class="auth-switch">Don't have an account? <a onclick="renderAuthPage('register')">Register</a></p>`;
}

function registerFormHtml() {
  return `
    <div class="form-group">
      <label class="form-label">Full Name</label>
      <input class="form-control" type="text" id="regName" placeholder="Your Name">
    </div>
    <div class="form-group">
      <label class="form-label">Email</label>
      <input class="form-control" type="email" id="regEmail" placeholder="you@example.com">
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Password</label>
        <input class="form-control" type="password" id="regPassword" placeholder="Min. 6 chars">
      </div>
      <div class="form-group">
        <label class="form-label">Confirm Password</label>
        <input class="form-control" type="password" id="regPasswordConfirm" placeholder="Repeat password">
      </div>
    </div>
    <button class="btn btn-primary btn-full btn-lg" onclick="handleRegister()">Create Account →</button>
    <p class="auth-switch">Already a member? <a onclick="renderAuthPage('login')">Sign In</a></p>`;
}

function handleLogin() {
  const email = val('loginEmail');
  const pw    = val('loginPassword');
  if (!email || !pw) { toast('Please fill all fields', 'warning'); return; }
  if (loginUser(email, pw)) {
    navigate('home');
    closeModal('authModal');
    toast(`Welcome back, ${STATE.session.name}! 👋`, 'success');
  } else {
    toast('Invalid email or password', 'error');
  }
}

function handleRegister() {
  const name  = val('regName');
  const email = val('regEmail');
  const pw    = val('regPassword');
  const pwC   = val('regPasswordConfirm');
  
  if (!name || !email || !pw) { toast('Please fill all fields', 'warning'); return; }
  if (pw !== pwC) { toast('Passwords do not match', 'error'); return; }
  if (pw.length < 6) { toast('Password must be at least 6 characters', 'warning'); return; }
  
  if (registerUser(name, email, pw)) {
    navigate('home');
    closeModal('authModal');
    toast(`Welcome to Romjan Apps, ${name}! 🎉`, 'success');
  } else {
    toast('Email already registered', 'error');
  }
}

/* ── RENDER: HOME / APP GRID ── */
function renderApps() {
  const grid = el('appsGrid');
  if (!grid) return;

  // Always re-sync from localStorage (admin may have changed data)
  STATE.apps = DB.get('apps') || STATE.apps;

  let apps = [...STATE.apps];
  const q   = STATE.searchQuery.toLowerCase().trim();
  const cat = STATE.activeCategory;

  if (q)             apps = apps.filter(a => a.name.toLowerCase().includes(q) || a.desc.toLowerCase().includes(q) || a.category.toLowerCase().includes(q));
  if (cat !== 'all') apps = apps.filter(a => a.category.toLowerCase() === cat.toLowerCase());

  el('appCount').textContent = `${apps.length} app${apps.length !== 1 ? 's' : ''}`;

  if (!apps.length) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1; padding: 60px 20px; text-align: center;">
      <div class="empty-icon" style="font-size: 4rem; margin-bottom: 20px;">🔍</div>
      <h3 style="font-size: 1.5rem; color: var(--text-primary); margin-bottom: 10px;">no app found</h3>
      <p style="color: var(--text-muted);">Try a different search term or category</p>
    </div>`;
    return;
  }

  grid.innerHTML = apps.map((app, i) => {
    const grad     = GRADIENTS[i % GRADIENTS.length];
    const iconHtml = app.iconData
      ? `<img class="app-icon" src="${app.iconData}" alt="${esc(app.name)}">`
      : `<div class="app-icon-placeholder">${app.icon || '📦'}</div>`;
    return `
    <div class="app-card" onclick="openAppDetail('${app.id}')" data-id="${app.id}" role="listitem" aria-label="${esc(app.name)}">
      <div class="card-banner" style="--card-gradient:${grad}">${iconHtml}</div>
      <div class="card-body">
        <div class="card-meta">
          <span class="app-name">${esc(app.name)}</span>
          <span class="badge badge-primary">${esc(app.category)}</span>
        </div>
        <p class="app-desc">${esc(app.desc)}</p>
        <div class="card-footer">
          <span class="download-count">⬇️ ${fmtNum(app.downloads || 0)}</span>
          <button class="btn btn-success btn-sm" onclick="event.stopPropagation();downloadApp('${app.id}')">
            ⬇ Download
          </button>
        </div>
      </div>
    </div>`;
  }).join('');
}

/* ── APP DETAIL MODAL ── */
function openAppDetail(id) {
  STATE.apps = DB.get('apps') || STATE.apps;
  const app = STATE.apps.find(a => a.id === id);
  if (!app) return;

  const iconHtml = app.iconData
    ? `<img class="app-detail-icon" src="${app.iconData}" alt="${esc(app.name)}">`
    : `<div class="app-detail-icon-placeholder">${app.icon || '📦'}</div>`;

  el('appDetailContent').innerHTML = `
    <div class="app-detail-banner">${iconHtml}</div>
    <div class="modal-body">
      <h2 style="font-size:1.5rem;font-weight:800;margin-bottom:6px">${esc(app.name)}</h2>
      <div class="app-detail-meta">
        <span class="badge badge-primary">${esc(app.category)}</span>
        <span class="badge badge-info">v${esc(app.version || '1.0.0')}</span>
        <span class="badge badge-success">⬇ ${fmtNum(app.downloads || 0)} downloads</span>
      </div>
      <p style="color:var(--text-secondary);margin:16px 0;line-height:1.7">${esc(app.desc)}</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px">
        <div style="background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-md);padding:12px">
          <div style="font-size:.7rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px">File Size</div>
          <div style="font-weight:700">${esc(app.size || 'N/A')}</div>
        </div>
        <div style="background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-md);padding:12px">
          <div style="font-size:.7rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px">Added On</div>
          <div style="font-weight:700">${fmtDate(app.createdAt || Date.now())}</div>
        </div>
      </div>
      <button class="btn btn-success btn-full btn-lg" onclick="downloadApp('${app.id}')">⬇ Download APK</button>
    </div>`;
  openModal('appDetailModal');
}

/* ── DOWNLOAD ── */
function downloadApp(id) {
  STATE.apps = DB.get('apps') || STATE.apps;
  const app = STATE.apps.find(a => a.id === id);
  if (!app) return;

  // 1. Show confirmation modal
  openModal('downloadConfirmModal');

  // 2. Set up confirmation action
  el('btnConfirmDownload').onclick = () => {
    closeModal('downloadConfirmModal');
    
    // Proceed with download
    executeDownload(app);

    // 3. Show success modal after download
    setTimeout(() => {
      openModal('downloadSuccessModal');
    }, 500);
  };
}

async function executeDownload(app) {
  app.downloads = (app.downloads || 0) + 1;
  DB.set('apps', STATE.apps);

  // Sync download count to Remote DB
  await REMOTE_DB.saveApp(app);

  if (STATE.session?.type === 'user') {
    const u = STATE.users.find(u => u.id === STATE.session.id);
    if (u) { u.downloads = (u.downloads || 0) + 1; saveUsers(); }
  }

  // Simulate APK download
  const blob = new Blob(
    [`[Romjan Apps]\nApp: ${app.name}\nVersion: ${app.version||'1.0.0'}\nSimulated APK download.\n`],
    { type:'application/octet-stream' }
  );
  const link = document.createElement('a');
  link.href     = URL.createObjectURL(blob);
  link.download = app.apkName || `${app.name.replace(/\s+/g,'-').toLowerCase()}.apk`;
  link.click();
  URL.revokeObjectURL(link.href);

  toast(`Downloading ${app.name}…`, 'success');
  renderApps();
}

/* ── RENDER: PROFILE ── */
function renderProfile() {
  if (!STATE.session) { openModal('authModal'); renderAuthPage('login'); return; }
  const s = STATE.session;
  const u = STATE.users.find(u => u.id === s.id) || s;

  const avatarHtml = s.avatar
    ? `<img class="profile-avatar" src="${s.avatar}" alt="${esc(s.name)}">`
    : `<div class="profile-avatar-placeholder">${s.name.charAt(0).toUpperCase()}</div>`;

  el('profileHero').innerHTML = `
    <div class="profile-inner">
      <div class="profile-avatar-wrap" onclick="triggerAvatarUpload()">
        ${avatarHtml}
        <div class="avatar-edit-badge">✏️</div>
      </div>
      <div class="profile-info">
        <h2>${esc(s.name)}</h2>
        <p>${esc(s.email)}</p>
        <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap">
          <span class="badge badge-primary">👤 User</span>
          ${u.downloads ? `<span class="badge badge-success">⬇ ${fmtNum(u.downloads)} downloads</span>` : ''}
        </div>
      </div>
    </div>`;

  el('profileCards').innerHTML = `
    <div class="profile-card" style="grid-column:1/-1">
      <h3>Edit Profile</h3>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Full Name</label>
          <input class="form-control" type="text" id="editName" value="${esc(s.name)}">
        </div>
        <div class="form-group">
          <label class="form-label">Email</label>
          <input class="form-control" type="email" id="editEmail" value="${esc(s.email)}" disabled style="opacity:.5">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">New Password</label>
          <input class="form-control" type="password" id="editPw" placeholder="Leave blank to keep current">
        </div>
        <div class="form-group">
          <label class="form-label">Confirm Password</label>
          <input class="form-control" type="password" id="editPwConfirm" placeholder="Repeat new password">
        </div>
      </div>
      <input type="file" id="avatarInput" accept="image/*" style="display:none" onchange="handleAvatarUpload(this)">
      <button class="btn btn-primary" onclick="saveProfile()">💾 Save Changes</button>
    </div>
    <div class="profile-card">
      <h3>Account Stats</h3>
      <div style="display:flex;flex-direction:column;gap:14px">
        <div style="display:flex;justify-content:space-between">
          <span style="color:var(--text-secondary)">Downloads</span>
          <strong>${fmtNum(u.downloads || 0)}</strong>
        </div>
        <div style="display:flex;justify-content:space-between">
          <span style="color:var(--text-secondary)">Member Since</span>
          <strong>${fmtDate(u.createdAt || Date.now())}</strong>
        </div>
        <div style="display:flex;justify-content:space-between">
          <span style="color:var(--text-secondary)">Account Type</span>
          <strong>User</strong>
        </div>
      </div>
    </div>
    <div class="profile-card">
      <h3>Danger Zone</h3>
      <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:16px">Permanently delete your account.</p>
      <button class="btn btn-danger btn-sm" onclick="confirmDeleteAccount()">🗑️ Delete Account</button>
    </div>`;
}

function triggerAvatarUpload() { el('avatarInput')?.click(); }

async function handleAvatarUpload(input) {
  const file = input.files[0]; if (!file) return;
  
  // Resize/Compress image if needed (optional, but good for Firebase performance)
  const reader = new FileReader();
  reader.onload = async e => {
    const data = e.target.result;
    
    // 1. Update local state
    const u = STATE.users.find(u => u.id === STATE.session.id);
    if (u) { 
      u.avatar = data; 
      // 2. Save to Remote DB via saveUsers
      await saveUsers(); 
    }
    
    // 3. Update session
    STATE.session.avatar = data;
    setSession(STATE.session);
    
    // 4. Update UI
    renderProfile();
    updateNav();
    toast('Profile picture updated!', 'success');
  };
  reader.readAsDataURL(file);
}

async function saveProfile() {
  const name = val('editName');
  const pw   = val('editPw');
  const pwC  = val('editPwConfirm');
  if (!name)         { toast('Name cannot be empty', 'warning'); return; }
  if (pw && pw !== pwC) { toast('Passwords do not match', 'error'); return; }
  if (pw && pw.length < 6) { toast('Password too short', 'warning'); return; }

  const u = STATE.users.find(u => u.id === STATE.session.id);
  if (u) { 
    u.name = name; 
    if (pw) u.password = hashPw(pw); 
    await saveUsers(); 
  }
  STATE.session.name = name;
  setSession(STATE.session);
  renderProfile();
  toast('Profile saved!', 'success');
}

async function confirmDeleteAccount() {
  if (!await Popup.confirm('Are you sure? This cannot be undone.', 'Delete Account', '🗑️')) return;
  const userId = STATE.session.id;
  STATE.users = STATE.users.filter(u => u.id !== userId);
  
  // Also delete from Remote DB
  if (typeof REMOTE_DB !== 'undefined') {
    await REMOTE_DB.deleteUser(userId);
  }
  
  DB.set('users', STATE.users);
  logout();
  toast('Account deleted', 'info');
}

/* ── EVENT BINDING ── */
function bindEvents() {
  // Prevent Copy & Right Click
  document.addEventListener('contextmenu', e => e.preventDefault());
  document.addEventListener('copy', e => {
    e.preventDefault();
    toast('Content copying is disabled', 'warning');
  });

  // Hamburger / mobile nav
  el('hamburger').addEventListener('click', () => {
    el('hamburger').classList.toggle('open');
    el('mobileNav').classList.toggle('open');
  });

  // Navbar scroll shadow
  window.addEventListener('scroll', () => {
    document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 10);
  });

  // All [data-page] links
  document.querySelectorAll('[data-page]').forEach(link => {
    link.addEventListener('click', () => {
      const page = link.dataset.page;
      if (page === 'auth' || page === 'login' || page === 'register') {
        openModal('authModal');
        renderAuthPage(page === 'register' ? 'register' : 'login');
      } else {
        navigate(page);
      }
    });
  });

  // Avatar dropdown toggle
  el('avatarDropdownBtn').addEventListener('click', () => {
    el('avatarDropdown').classList.toggle('open');
  });
  document.addEventListener('click', e => {
    if (!el('avatarDropdown').contains(e.target)) el('avatarDropdown').classList.remove('open');
  });

  el('ddProfile').addEventListener('click', () => { navigate('profile'); el('avatarDropdown').classList.remove('open'); });
  el('ddLogout').addEventListener('click',  () => { logout(); el('avatarDropdown').classList.remove('open'); });

  // Auth tab toggles
  el('authTabLogin').addEventListener('click',    () => renderAuthPage('login'));
  el('authTabRegister').addEventListener('click', () => renderAuthPage('register'));

  // Enter key support
  document.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    if (document.activeElement?.id === 'loginEmail' || document.activeElement?.id === 'loginPassword') handleLogin();
  });

  // Hero browse button
  el('heroBrowse').addEventListener('click', () => {
    el('searchInput').scrollIntoView({ behavior:'smooth' });
  });

  // Search
  el('searchInput').addEventListener('input', e => {
    STATE.searchQuery = e.target.value;
    renderApps();
  });

  // Category tabs
  el('categoryTabs').addEventListener('click', e => {
    const tab = e.target.closest('.cat-tab');
    if (!tab) return;
    document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    STATE.activeCategory = tab.dataset.cat;
    renderApps();
  });

  // Close modals on overlay click
  document.querySelectorAll('.modal-overlay').forEach(ov => {
    ov.addEventListener('click', e => { if (e.target === ov) closeModal(ov.id); });
  });
}


/* ── INIT ── */
function renderCategories() {
  const tabs = el('categoryTabs');
  if (!tabs) return;
  tabs.innerHTML = `
    <div class="cat-tab ${STATE.activeCategory === 'all' ? 'active' : ''}" data-cat="all">All Apps</div>
    ${STATE.categories.map(c => `<div class="cat-tab ${STATE.activeCategory === c.name ? 'active' : ''}" data-cat="${esc(c.name)}">${esc(c.name)}</div>`).join('')}
  `;
}

function renderSocialLinks() {
  const container = document.querySelector('.footer-social-links');
  if (!container) return;

  container.innerHTML = STATE.socialLinks.map(link => {
    const platform = detectPlatform(link.url);
    return `<a href="${link.url}" target="_blank" class="social-icon-link" title="${platform.name}">
      <img src="${platform.logo}" alt="${platform.name}" class="social-logo-img">
    </a>`;
  }).join('');
}

function detectPlatform(url) {
  let cleanUrl = url.trim();
  if (!cleanUrl.startsWith('http')) cleanUrl = 'https://' + cleanUrl;
  
  let domain = '';
  try {
    domain = new URL(cleanUrl).hostname;
  } catch (e) {
    domain = cleanUrl.split('/')[0];
  }
  
  const u = cleanUrl.toLowerCase();
  let name = 'Website';
  
  if (u.includes('youtube.com') || u.includes('youtu.be')) name = 'YouTube';
  else if (u.includes('facebook.com') || u.includes('fb.com')) name = 'Facebook';
  else if (u.includes('instagram.com')) name = 'Instagram';
  else if (u.includes('twitter.com') || u.includes('x.com')) name = 'X / Twitter';
  else if (u.includes('github.com')) name = 'GitHub';
  else if (u.includes('linkedin.com')) name = 'LinkedIn';
  else if (u.includes('telegram.me') || u.includes('t.me')) name = 'Telegram';
  else if (u.includes('whatsapp.com') || u.includes('wa.me')) name = 'WhatsApp';

  return { 
    name, 
    logo: `https://www.google.com/s2/favicons?sz=128&domain=${domain}` 
  };
}

async function init() {
  await seedData();
  getSession();
  bindEvents();
  renderAuthPage('login');
  renderCategories();
  renderSocialLinks();
  renderApps();

  // Hide loading overlay
  setTimeout(() => {
    const lo = el('loadingOverlay');
    if (lo) { lo.style.opacity='0'; setTimeout(()=>lo.remove(),500); }
  }, 300);
}

document.addEventListener('DOMContentLoaded', init);
