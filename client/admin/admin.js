/* =============================================================
   ROMJAN APPS — admin.js
   Standalone Admin Panel Logic  (shares localStorage with user side)
   ============================================================= */
'use strict';

/* ── UI RENDERING (HTML in JS) ── */
(function renderUI() {
  document.body.innerHTML = `
    <!-- ── Ambient Background ── -->
    <div class="bg-blobs" aria-hidden="true">
      <span></span><span></span><span></span>
    </div>

    <!-- ── Loading Screen ── -->
    <div id="loadingScreen" class="loading-overlay">
      <div class="loader-logo">🛡️</div>
      <div style="font-size: 1rem; font-weight: 700; color: var(--text-primary)">Romjan Apps Admin</div>
      <div class="loader-bar"><div class="loader-bar-fill"></div></div>
    </div>

    <!-- LOGIN SCREEN -->
    <div id="loginScreen" class="hidden">
      <div class="bg-blobs" aria-hidden="true"><span></span><span></span></div>
      <div class="login-card" role="main">
        <div class="login-header">
          <div class="login-logo">🛡️</div>
          <h1>Admin Login</h1>
          <p>Romjan Apps Control Panel</p>
        </div>
        <div class="login-body">
          <div id="loginError" class="login-error hidden"></div>
          <div class="form-group">
            <label class="form-label" for="loginEmail">Admin Email</label>
            <input class="form-control" type="email" id="loginEmail" placeholder="Enter your admin email" autocomplete="email">
          </div>
          <div class="form-group">
            <label class="form-label" for="loginPw">Password</label>
            <input class="form-control" type="password" id="loginPw" placeholder="••••••••" autocomplete="current-password">
          </div>
          <button class="btn btn-primary btn-full btn-lg" id="loginBtn">🔐 Sign In to Admin Panel</button>
          <p style="text-align: center; margin-top: 16px; font-size: 0.82rem; color: var(--text-muted);">
            <a href="../index.html" style="color: var(--primary-light); font-weight: 600">← Back to main site</a>
          </p>
          <div class="dev-credit" style="margin-top: 24px; border-top: 1px solid var(--border); padding-top: 16px;">Develop By <span class="rainbow-text">Romjan</span></div>
        </div>
      </div>
    </div>

    <!-- APP SHELL -->
    <div id="appShell" class="hidden">
      <aside class="sidebar" id="adminSidebar" role="navigation" aria-label="Admin sidebar">
        <div class="sidebar-header">
          <div class="admin-logo">
            <img src="/letter-r.png" alt="Admin Logo">
            <span>Admin Hub</span>
          </div>
        </div>
        <nav class="sidebar-nav">
          <div class="sidebar-group">
            <div class="sidebar-label">Overview</div>
            <div class="sidebar-item active" data-section="dashboard" role="button" tabindex="0" aria-label="Dashboard">
              <span class="sidebar-item-icon">📊</span> Dashboard
            </div>
          </div>
          <div class="sidebar-group">
            <div class="sidebar-label">Manage</div>
            <div class="sidebar-item" data-section="apps" role="button" tabindex="0" aria-label="Apps">
              <span class="sidebar-item-icon">📦</span> Apps <span class="sidebar-count" id="countApps">0</span>
            </div>
            <div class="sidebar-item" data-section="admins" role="button" tabindex="0" aria-label="Admins">
              <span class="sidebar-item-icon">🛡️</span> Admins <span class="sidebar-count" id="countAdmins">0</span>
            </div>
            <div class="sidebar-item" data-section="users" role="button" tabindex="0" aria-label="Users">
              <span class="sidebar-item-icon">👥</span> Users <span class="sidebar-count" id="countUsers">0</span>
            </div>
            <div class="sidebar-item" data-section="social" role="button" tabindex="0" aria-label="Social Links">
              <span class="sidebar-item-icon">🔗</span> Social Links
            </div>
          </div>
        </nav>
        <div class="sidebar-footer">
          <button class="view-site-btn" id="viewSiteBtn" aria-label="View public site">🌐 View Public Site</button>
          <div class="dev-credit">Develop By <span class="rainbow-text">Romjan</span></div>
        </div>
      </aside>

      <header class="topbar" role="banner">
        <div class="topbar-left">
          <button class="mobile-menu-btn" id="mobileSidebarBtn" aria-label="Toggle sidebar" style="display: none">☰</button>
          <div><div class="topbar-title" id="topbarTitle">Dashboard</div></div>
        </div>
        <div class="topbar-right">
          <span id="topbarRoleBadge" class="badge badge-warning">👑 Owner</span>
          <div class="admin-badge" id="adminBadge" aria-label="Admin info">
            <div class="admin-avatar" id="topbarAdminInitial">A</div>
            <span id="topbarAdminName">Admin</span>
          </div>
          <button class="btn btn-danger btn-sm" id="logoutBtn" aria-label="Sign out">🚪 Sign Out</button>
        </div>
      </header>

      <main class="admin-main" role="main">
        <div class="admin-content">
          <!-- SECTION: DASHBOARD -->
          <div id="sec-dashboard" class="section active" aria-label="Dashboard">
            <div class="stat-grid">
              <div class="stat-card" style="--stat-color: rgba(108, 99, 255, 0.08); --stat-border: rgba(108, 99, 255, 0.3);">
                <div class="stat-icon purple">📦</div>
                <div class="stat-info"><div class="num" id="dTotalApps">0</div><div class="lbl">Total Apps</div></div>
              </div>
              <div class="stat-card" style="--stat-color: rgba(255, 101, 132, 0.08); --stat-border: rgba(255, 101, 132, 0.3);">
                <div class="stat-icon red">🛡️</div>
                <div class="stat-info"><div class="num" id="dTotalAdmins">0</div><div class="lbl">Admins</div></div>
              </div>
              <div class="stat-card" style="--stat-color: rgba(67, 233, 123, 0.08); --stat-border: rgba(67, 233, 123, 0.3);">
                <div class="stat-icon green">⬇️</div>
                <div class="stat-info"><div class="num" id="dTotalDownloads">0</div><div class="lbl">Total Downloads</div></div>
              </div>
              <div class="stat-card" style="--stat-color: rgba(56, 249, 215, 0.08); --stat-border: rgba(56, 249, 215, 0.3);">
                <div class="stat-icon cyan">👥</div>
                <div class="stat-info"><div class="num" id="dTotalUsers">0</div><div class="lbl">Registered Users</div></div>
              </div>
            </div>
            <div class="dashboard-grid">
              <div class="dash-card">
                <div class="dash-card-header"><span class="dash-card-title">📅 Recently Added</span><button class="btn btn-secondary btn-sm" onclick="navigateTo('apps')">View All</button></div>
                <div class="dash-card-body" id="dashRecentApps"><div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">Loading…</div></div>
              </div>
              <div class="dash-card">
                <div class="dash-card-header"><span class="dash-card-title">🏆 Most Downloaded</span><button class="btn btn-secondary btn-sm" onclick="navigateTo('apps')">View All</button></div>
                <div class="dash-card-body" id="dashTopApps"><div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">Loading…</div></div>
              </div>
            </div>
          </div>

          <!-- SECTION: APPS -->
          <div id="sec-apps" class="section" aria-label="App Management">
            <div class="panel-header">
              <span class="panel-title">📦 App Management</span>
              <div class="panel-actions">
                <div class="search-box"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg><input type="search" id="searchApps" placeholder="Search apps…"></div>
                <button class="btn btn-primary btn-sm" id="btnUploadApp">⬆ Upload App</button>
              </div>
            </div>
            <div class="table-wrap">
              <table class="data-table">
                <thead><tr><th>App</th><th>Category</th><th>Version</th><th>Size</th><th>Downloads</th><th>Added</th><th>Actions</th></tr></thead>
                <tbody id="appsTableBody"><tr class="empty-row"><td colspan="7">Loading…</td></tr></tbody>
              </table>
            </div>
          </div>

          <!-- SECTION: ADMINS -->
          <div id="sec-admins" class="section" aria-label="Admin Management">
            <div class="panel-header">
              <span class="panel-title">🛡️ Admin Management</span>
              <div class="panel-actions">
                <div class="search-box"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg><input type="search" id="searchAdmins" placeholder="Search admins…"></div>
                <button class="btn btn-primary btn-sm" id="btnCreateAdmin">+ Create Admin</button>
              </div>
            </div>
            <div class="table-wrap">
              <table class="data-table">
                <thead><tr><th>Admin</th><th>Role</th><th>Permissions</th><th>Created</th><th>Actions</th></tr></thead>
                <tbody id="adminsTableBody"><tr class="empty-row"><td colspan="5">Loading…</td></tr></tbody>
              </table>
            </div>
          </div>

          <!-- SECTION: USERS -->
          <div id="sec-users" class="section" aria-label="User Management">
            <div class="panel-header">
              <span class="panel-title">👥 User Management</span>
              <div class="panel-actions">
                <div class="search-box"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg><input type="search" id="searchUsers" placeholder="Search users by name or email…"></div>
              </div>
            </div>
            <div class="table-wrap">
              <table class="data-table">
                <thead><tr><th>User</th><th>Joined</th><th>Downloads</th><th>Actions</th></tr></thead>
                <tbody id="usersTableBody"><tr class="empty-row"><td colspan="4">Loading…</td></tr></tbody>
              </table>
            </div>
          </div>

          <!-- SECTION: SOCIAL LINKS -->
          <div id="sec-social" class="section" aria-label="Social Links Management">
            <div class="panel-header"><span class="panel-title">🔗 Social Links</span><div class="panel-actions"><button class="btn btn-primary btn-sm" onclick="openSocialModal()">➕ Add New Link</button></div></div>
            <div class="table-wrap">
              <table class="data-table">
                <thead><tr><th>Platform</th><th>URL</th><th>Logo</th><th>Actions</th></tr></thead>
                <tbody id="socialTableBody"><tr class="empty-row"><td colspan="4">No social links added yet.</td></tr></tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- MODALS -->
    <div class="modal-overlay" id="appModal" role="dialog" aria-modal="true">
      <div class="modal">
        <div class="modal-header"><span class="modal-title" id="appModalTitle">Upload New App</span><button class="modal-close" onclick="closeModal('appModal')">✕</button></div>
        <div class="modal-body"><div id="appModalForm" aria-live="polite"></div></div>
        <div class="modal-footer"><button class="btn btn-secondary" onclick="closeModal('appModal')">Cancel</button><button class="btn btn-primary" id="appModalSave">💾 Save</button></div>
      </div>
    </div>

    <div class="modal-overlay" id="adminModal" role="dialog" aria-modal="true">
      <div class="modal">
        <div class="modal-header"><span class="modal-title" id="adminModalTitle">Create Admin</span><button class="modal-close" onclick="closeModal('adminModal')">✕</button></div>
        <div class="modal-body"><div id="adminModalForm" aria-live="polite"></div></div>
        <div class="modal-footer"><button class="btn btn-secondary" onclick="closeModal('adminModal')">Cancel</button><button class="btn btn-primary" id="adminModalSave">💾 Save</button></div>
      </div>
    </div>

    <div class="modal-overlay" id="confirmModal" role="dialog" aria-modal="true">
      <div class="modal modal-sm">
        <div class="modal-header"><span class="modal-title" id="confirmTitle">Confirm Action</span><button class="modal-close" onclick="closeModal('confirmModal')">✕</button></div>
        <div class="modal-body"><div class="confirm-icon">⚠️</div><p class="confirm-msg" id="confirmMsg">Are you sure?</p></div>
        <div class="modal-footer"><button class="btn btn-secondary" onclick="closeModal('confirmModal')">Cancel</button><button class="btn btn-danger" id="confirmOk">Yes, Delete</button></div>
      </div>
    </div>

    <div class="modal-overlay" id="socialModal" role="dialog" aria-modal="true">
      <div class="modal modal-sm">
        <div class="modal-header"><span class="modal-title">Add Social Link</span><button class="modal-close" onclick="closeModal('socialModal')">✕</button></div>
        <div class="modal-body"><div class="form-group"><label class="form-label">Link URL *</label><input type="url" id="socialUrl" class="form-control" placeholder="https://youtube.com/..." required></div><p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 8px;">ℹ️ Platform and logo will be detected automatically.</p></div>
        <div class="modal-footer"><button class="btn btn-secondary" onclick="closeModal('socialModal')">Cancel</button><button class="btn btn-primary" onclick="saveSocialLink()">💾 Save Link</button></div>
      </div>
    </div>

    <div class="modal-overlay" id="customPopupModal" role="dialog" aria-modal="true">
      <div class="modal modal-sm">
        <div class="modal-header"><span class="modal-title" id="popupTitle">Notification</span><button class="modal-close" onclick="handlePopupAction(null)">✕</button></div>
        <div class="modal-body text-center"><div id="popupIcon" class="confirm-icon" style="font-size: 3rem; margin-bottom: 15px;">🛡️</div><p id="popupMsg" class="confirm-msg"></p><div id="popupInputWrap" class="hidden" style="margin-top: 15px;"><input type="text" id="popupInput" class="form-control" placeholder="Enter value..."></div></div>
        <div class="modal-footer" id="popupFooter"></div>
      </div>
    </div>

    <div class="toast-container" id="toastWrap" role="status" aria-live="polite" aria-atomic="false"></div>
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

/* ─────────────────────────────── DATA STORE ─── */
const DB = {
  get: k => { try { return JSON.parse(localStorage.getItem('ra_' + k)) || null; } catch { return null; } },
  set: (k, v) => localStorage.setItem('ra_' + k, JSON.stringify(v)),
  del: k => localStorage.removeItem('ra_' + k),
};

/* ─────────────────────────────── STATE ─── */
const S = {
  session:  null,   // current admin session
  section:  'dashboard',
  apps:     [],
  admins:   [],
  users:    [],
  categories: [],
  socialLinks: [],
  search:   { apps:'', admins:'', users:'' },
};

/* ─────────────────────────────── SEED DATA ─── */
const DEFAULT_CATS = ['Productivity','Photography','Health','Finance','Music','Navigation','Developer','Weather','Games','Social','Tools','Education'];
const SEED_APPS = [
  { id:'app1', name:'SwiftNotes',   category:'Productivity', desc:'A lightning-fast note-taking app with markdown support and cloud sync.',          icon:'📝', apkName:'swift-notes.apk',   downloads:1240, size:'8.2 MB',  version:'2.1.0', createdAt:Date.now()-864e5*10 },
  { id:'app2', name:'PixelCam',     category:'Photography',  desc:'Pro-grade camera with AI filters, portrait mode, and RAW capture support.',       icon:'📷', apkName:'pixel-cam.apk',     downloads:3820, size:'22.7 MB', version:'1.4.2', createdAt:Date.now()-864e5*7  },
  { id:'app3', name:'FitTracker',   category:'Health',       desc:'Track workouts, calories, sleep and build healthier habits every day.',           icon:'💪', apkName:'fit-tracker.apk',   downloads:2155, size:'14.1 MB', version:'3.0.1', createdAt:Date.now()-864e5*5  },
  { id:'app4', name:'BudgetPal',    category:'Finance',      desc:'Smart expense tracking with analytics, budgets and bill reminders.',              icon:'💸', apkName:'budget-pal.apk',    downloads:980,  size:'6.8 MB',  version:'1.2.3', createdAt:Date.now()-864e5*3  },
  { id:'app5', name:'SoundWave',    category:'Music',        desc:'Equalizer, bass booster and music player with offline playlist support.',         icon:'🎵', apkName:'sound-wave.apk',    downloads:5100, size:'18.3 MB', version:'4.1.0', createdAt:Date.now()-864e5*2  },
  { id:'app6', name:'RouteMap',     category:'Navigation',   desc:'Offline maps with turn-by-turn navigation and live traffic updates.',             icon:'🗺️', apkName:'route-map.apk',     downloads:2670, size:'34.5 MB', version:'2.8.1', createdAt:Date.now()-864e5    },
  { id:'app7', name:'CodePad',      category:'Developer',    desc:'Full-featured code editor with syntax highlighting for 60+ languages.',           icon:'💻', apkName:'code-pad.apk',      downloads:1430, size:'11.2 MB', version:'1.9.4', createdAt:Date.now()-36e5*12  },
  { id:'app8', name:'WeatherNow',   category:'Weather',      desc:'Hyper-local weather forecasts with stunning animated visuals.',                   icon:'🌤️', apkName:'weather-now.apk',   downloads:4320, size:'9.5 MB',  version:'3.3.3', createdAt:Date.now()-36e5*6   },
];
const SEED_OWNER = {
  id:'owner1', type:'admin', role:'owner',
  name:'Romjan', email:'mdromjan9522@gmail.com', password:'kgfstar11',
  permissions:{ upload:true, edit:true, update:true, delete:true },
  createdAt:Date.now(),
};

async function seedData() {
  const seeded = DB.get('seeded');
  const storedAdmins = DB.get('admins') || [];
  const mainAdmin = storedAdmins.find(a => a.id === 'owner1');

  // Force update if not seeded or if credentials changed in code
  if (!seeded || (mainAdmin && (mainAdmin.email !== SEED_OWNER.email || mainAdmin.password !== SEED_OWNER.password))) {
    DB.set('apps',   []);
    DB.set('admins', [SEED_OWNER]);
    DB.set('users',  []);
    DB.set('seeded', true);
    // Clear admin session to force re-login
    DB.del('admin_sess');

    // Sync to Remote DB
    await REMOTE_DB.saveAdmin(SEED_OWNER);
  }

  // Optimize: Load data in parallel
  const [remoteApps, remoteAdmins, remoteUsers, remoteCats, remoteSocial] = await Promise.all([
    REMOTE_DB.getApps(),
    REMOTE_DB.getAdmins(),
    REMOTE_DB.getUsers(),
    REMOTE_DB.getCategories(),
    REMOTE_DB.getSocialLinks()
  ]);

  // Handle Apps
  if (remoteApps.length > 0) {
    S.apps = remoteApps;
    DB.set('apps', remoteApps);
  } else {
    S.apps = DB.get('apps') || [];
  }

  // Handle Admins
  if (remoteAdmins.length > 0) {
    S.admins = remoteAdmins;
    DB.set('admins', remoteAdmins);
  } else {
    S.admins = DB.get('admins') || [];
  }

  // Handle Users
  if (remoteUsers.length > 0) {
    S.users = remoteUsers;
    DB.set('users', remoteUsers);
  } else {
    S.users = DB.get('users') || [];
  }

  // Handle Categories
  if (remoteCats.length > 0) {
    S.categories = remoteCats;
  } else {
    // Seed default categories if none in DB
    S.categories = DEFAULT_CATS.map(c => ({ id: uid(), name: c }));
    for (const c of S.categories) await REMOTE_DB.saveCategory(c);
  }

  // Handle Social Links
  S.socialLinks = remoteSocial || [];

  updateSidebarCounts();
}

const saveApps   = async () => {
  DB.set('apps', S.apps);
  await Promise.all(S.apps.map(app => REMOTE_DB.saveApp(app)));
};
const saveAdmins = async () => {
  DB.set('admins', S.admins);
  await Promise.all(S.admins.map(admin => REMOTE_DB.saveAdmin(admin)));
};
const saveUsers  = async () => {
  DB.set('users', S.users);
  await Promise.all(S.users.map(user => REMOTE_DB.saveUser(user)));
};

/* ─────────────────────────────── UTILS ─── */
const uid     = () => Date.now().toString(36) + Math.random().toString(36).slice(2);
const esc     = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmtNum  = n => n >= 1e6 ? (n/1e6).toFixed(1)+'M' : n >= 1e3 ? (n/1e3).toFixed(1)+'K' : n;
const fmtDate = ts => new Date(ts).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
const el      = id => document.getElementById(id);
const val     = id => (el(id)?.value||'').trim();
const totalDl = () => S.apps.reduce((s, a) => s + Number(a.downloads || 0), 0);

/* ─────────────────────────────── CATEGORY MGMT ─── */
async function addCategory() {
  const name = await Popup.prompt('Enter new category name:', 'Category Name', 'Create Category', '📁');
  if (!name) return;
  if (S.categories.find(c => c.name.toLowerCase() === name.toLowerCase())) {
    toast('Category already exists', 'warning');
    return;
  }
  const newCat = { id: uid(), name };
  S.categories.push(newCat);
  await REMOTE_DB.saveCategory(newCat);
  toast('Category added!', 'success');
  // Re-render app modal if open
  if (el('appModal').classList.contains('open')) {
    const editId = el('appModal').dataset.editId;
    openAppModal(editId);
  }
}

async function deleteCategory(id) {
  if (!await Popup.confirm('Are you sure you want to delete this category?', 'Delete Category', '🗑️')) return;
  S.categories = S.categories.filter(c => c.id !== id);
  await REMOTE_DB.deleteCategory(id);
  toast('Category deleted', 'info');
}

/* ─────────────────────────────── CUSTOM POPUP LOGIC ─── */
let popupResolve = null;

function showPopup({ title = 'Notification', msg = '', icon = '🛡️', type = 'alert', placeholder = '' }) {
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

const Popup = {
  alert:   (msg, title='Admin Notification', icon='🛡️') => showPopup({ title, msg, icon, type: 'alert' }),
  confirm: (msg, title='Confirm Admin Action', icon='⚠️') => showPopup({ title, msg, icon, type: 'confirm' }),
  prompt:  (msg, placeholder='', title='Admin Input', icon='📝') => showPopup({ title, msg, icon, type: 'prompt', placeholder })
};

/* ─────────────────────────────── TOAST ─── */
function toast(msg, type='info') {
  const icons = { success:'✅', error:'❌', info:'ℹ️', warning:'⚠️' };
  const wrap = el('toastWrap');
  const div  = document.createElement('div');
  div.className = `toast ${type}`;
  div.innerHTML = `<span class="toast-icon">${icons[type]}</span>
    <span class="toast-msg">${esc(msg)}</span>
    <span class="toast-x" onclick="rmToast(this.parentElement)">✕</span>`;
  wrap.appendChild(div);
  setTimeout(() => rmToast(div), 4000);
}
function rmToast(el) { el.classList.add('out'); setTimeout(()=>el.remove(),300); }

/* ─────────────────────────────── MODAL ─── */
function openModal(id)  { el(id).classList.add('open');  document.body.style.overflow='hidden'; }
function closeModal(id) { el(id).classList.remove('open'); document.body.style.overflow=''; }

/* ─────────────────────────────── SESSION ─── */
function getAdminSession() {
  const sess = DB.get('admin_sess');
  if (sess) { S.session = sess; return true; }
  return false;
}
function setAdminSession(obj) { S.session = obj; DB.set('admin_sess', obj); }
function logoutAdmin() {
  DB.del('admin_sess');
  S.session = null;
  showLogin();
  toast('Signed out', 'info');
}

/* ─────────────────────────────── LOGIN ─── */
function showLogin() {
  el('loginScreen').classList.remove('hidden');
  el('appShell').classList.add('hidden');
}
function showApp() {
  el('loginScreen').classList.add('hidden');
  el('appShell').classList.remove('hidden');
  updateTopbar();
  navigateTo(S.section);
}

function handleLogin() {
  const email = val('loginEmail');
  const pw    = val('loginPw');
  el('loginError').classList.add('hidden');

  if (!email || !pw) { showLoginError('Please fill in both fields.'); return; }

  const admin = S.admins.find(a =>
    a.email.toLowerCase() === email.toLowerCase() && a.password === pw
  );
  if (!admin) { showLoginError('Invalid email or password.'); return; }

  setAdminSession({
    id: admin.id, name: admin.name, email: admin.email,
    role: admin.role, permissions: admin.permissions,
  });
  showApp();
  toast(`Welcome back, ${admin.name}! 👋`, 'success');
}
function showLoginError(msg) {
  el('loginError').textContent = '⚠️ ' + msg;
  el('loginError').classList.remove('hidden');
}

/* ─────────────────────────────── TOP BAR ─── */
function updateTopbar() {
  const s = S.session;
  if (!s) return;
  el('topbarAdminName').textContent = s.name;
  el('topbarAdminInitial').textContent = s.name.charAt(0).toUpperCase();
  el('topbarRoleBadge').textContent = s.role === 'owner' ? '👑 Owner' : '🛡️ Admin';
}

/* ─────────────────────────────── NAVIGATION ─── */
function navigateTo(section) {
  S.section = section;
  document.querySelectorAll('.sidebar-item').forEach(i => i.classList.toggle('active', i.dataset.section === section));
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));

  const secEl = el('sec-' + section);
  if (secEl) secEl.classList.add('active');

  el('topbarTitle').textContent = {
    dashboard:'Dashboard', apps:'App Management',
    admins:'Admin Management', users:'User Management',
  }[section] || section;

  // Close sidebar on mobile after navigation
  el('adminSidebar').classList.remove('open');

  if (section === 'dashboard')  renderDashboard();
  if (section === 'apps')       renderAppsTable();
  if (section === 'admins')     renderAdminsTable();
  if (section === 'users')      renderUsersTable();
  if (section === 'social')     renderSocialLinksTable();
}

/* ═══════════════════════════════════════════════
   SECTION: SOCIAL LINKS
═══════════════════════════════════════════════ */
function renderSocialLinksTable() {
  const body = el('socialTableBody');
  if (!body) return;

  body.innerHTML = S.socialLinks.length ? S.socialLinks.map(link => {
    const platform = detectPlatform(link.url);
    return `<tr>
      <td><strong>${platform.name}</strong></td>
      <td><a href="${link.url}" target="_blank" style="color:var(--primary-light); text-decoration:underline;">${link.url}</a></td>
      <td><img src="${platform.logo}" alt="" class="social-logo-img" style="width: 24px; height: 24px;"></td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="confirmDeleteSocialLink('${link.id}')">🗑️ Remove</button>
      </td>
    </tr>`;
  }).join('')
  : `<tr class="empty-row"><td colspan="4">No social links added yet.</td></tr>`;
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

function openSocialModal() {
  el('socialUrl').value = '';
  openModal('socialModal');
}

async function saveSocialLink() {
  const url = val('socialUrl');
  if (!url) { toast('Please enter a URL', 'warning'); return; }
  
  const newLink = { id: uid(), url, createdAt: Date.now() };
  S.socialLinks.push(newLink);
  await REMOTE_DB.saveSocialLink(newLink);
  
  closeModal('socialModal');
  renderSocialLinksTable();
  toast('Social link added!', 'success');
}

async function confirmDeleteSocialLink(id) {
  if (!await Popup.confirm('Are you sure you want to remove this social link?', 'Remove Link', '🗑️')) return;
  S.socialLinks = S.socialLinks.filter(l => l.id !== id);
  await REMOTE_DB.deleteSocialLink(id);
  renderSocialLinksTable();
  toast('Social link removed', 'info');
}

/* ═══════════════════════════════════════════════
   SECTION: DASHBOARD
═══════════════════════════════════════════════ */
function renderDashboard() {
  el('dTotalApps').textContent     = S.apps.length;
  el('dTotalAdmins').textContent   = S.admins.length;
  el('dTotalDownloads').textContent = fmtNum(totalDl());
  el('dTotalUsers').textContent    = S.users.length;

  // Recent apps
  const recentApps = [...S.apps].sort((a,b)=>b.createdAt-a.createdAt).slice(0,5);
  el('dashRecentApps').innerHTML = recentApps.length
    ? recentApps.map(a => `
      <div class="dash-row">
        <div class="dash-row-icon" style="background:rgba(108,99,255,0.12)">${a.icon||'📦'}</div>
        <div class="dash-row-info">
          <div class="dash-row-name">${esc(a.name)}</div>
          <div class="dash-row-meta">${esc(a.category)} · v${esc(a.version||'1.0')}</div>
        </div>
        <div class="dash-row-val">⬇ ${fmtNum(a.downloads||0)}</div>
      </div>`).join('')
    : '<div style="padding:24px;text-align:center;color:var(--text-muted);font-size:.85rem">No apps yet</div>';

  // Top downloaders
  const topApps = [...S.apps].sort((a,b)=>(b.downloads||0)-(a.downloads||0)).slice(0,5);
  el('dashTopApps').innerHTML = topApps.length
    ? topApps.map((a,i) => `
      <div class="dash-row">
        <div class="dash-row-icon" style="background:rgba(67,233,123,0.1);font-weight:700;font-size:.85rem;color:var(--accent)">#${i+1}</div>
        <div class="dash-row-info">
          <div class="dash-row-name">${esc(a.name)}</div>
          <div class="dash-row-meta">${esc(a.category)}</div>
        </div>
        <div class="dash-row-val">${fmtNum(a.downloads||0)}</div>
      </div>`).join('')
    : '<div style="padding:24px;text-align:center;color:var(--text-muted);font-size:.85rem">No data yet</div>';
}

/* ═══════════════════════════════════════════════
   SECTION: APPS
═══════════════════════════════════════════════ */
function renderAppsTable(filter='') {
  const isOwner = S.session?.role === 'owner';
  const perm  = S.session?.permissions || {};
  const query = (filter || S.search.apps).toLowerCase();
  const apps  = query ? S.apps.filter(a =>
    a.name.toLowerCase().includes(query) ||
    a.category.toLowerCase().includes(query)
  ) : S.apps;

  el('appsTableBody').innerHTML = apps.length ? apps.map(app => `
    <tr>
      <td>
        <div class="cell-user">
          <div class="cell-thumb" style="border-radius:10px;font-size:1.1rem">${app.iconData?`<img src="${app.iconData}" alt="">`:app.icon||'📦'}</div>
          <div>
            <div class="cell-main">${esc(app.name)}</div>
            <div class="cell-sub">${esc(app.apkName||'—')}</div>
          </div>
        </div>
      </td>
      <td><span class="badge badge-primary">${esc(app.category)}</span></td>
      <td><code style="font-size:.8rem;color:var(--text-secondary)">v${esc(app.version||'1.0.0')}</code></td>
      <td>${esc(app.size||'—')}</td>
      <td><span class="badge badge-success">⬇ ${fmtNum(app.downloads||0)}</span></td>
      <td>${fmtDate(app.createdAt||Date.now())}</td>
      <td>
        <div class="cell-actions">
          ${(isOwner || perm.edit || perm.update) ? `<button class="btn btn-secondary btn-sm" onclick="openAppModal('${app.id}')">✏️ Edit</button>` : ''}
          ${(isOwner || perm.edit) ? `<button class="btn btn-danger btn-sm" onclick="confirmDeleteApp('${app.id}')">🗑️</button>` : ''}
        </div>
      </td>
    </tr>`) .join('')
    : `<tr class="empty-row"><td colspan="7" style="padding: 40px; text-align: center; color: var(--text-muted);">
        <div style="font-size: 2rem; margin-bottom: 10px;">🔍</div>
        <div>apni ai name er kono app upload koren nai</div>
      </td></tr>`;
}

let pendingIcon = null;
function openAppModal(editId=null) {
  pendingIcon = null;
  const isOwner = S.session?.role === 'owner';
  const perm = S.session?.permissions || {};
  const app = editId ? S.apps.find(a=>a.id===editId) : null;
  
  // Permission flags
  const canEditInfo = isOwner || perm.edit;
  const canUpdateApk = isOwner || perm.update;

  el('appModal').dataset.editId = editId || '';
  el('appModalTitle').textContent = app ? 'Edit App' : 'Upload New App';
  el('appModalForm').innerHTML = `
    <div class="form-group">
      <label class="form-label">App Name *</label>
      <input class="form-control" id="fName" value="${app?esc(app.name):''}" placeholder="e.g. SwiftNotes" ${!canEditInfo ? 'disabled' : ''}>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label" style="display:flex; justify-content:space-between; align-items:center;">
          Category *
          ${canEditInfo ? `<button class="btn btn-secondary btn-sm" style="padding: 2px 8px; font-size: 0.7rem;" onclick="addCategory()">+ Add New</button>` : ''}
        </label>
        <select class="form-control" id="fCat" ${!canEditInfo ? 'disabled' : ''}>
          ${S.categories.map(c=>`<option value="${esc(c.name)}"${app&&app.category===c.name?' selected':''}>${esc(c.name)}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Version</label>
        <input class="form-control" id="fVer" value="${app?esc(app.version):'1.0.0'}" placeholder="e.g. 1.2.0" ${!canEditInfo ? 'disabled' : ''}>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Description *</label>
      <textarea class="form-control" id="fDesc" placeholder="Describe the app features..." ${!canEditInfo ? 'disabled' : ''}>${app?esc(app.desc):''}</textarea>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">App Icon (Emoji or Upload)</label>
        <div style="display:flex; gap:10px;">
          <input class="form-control" id="fEmoji" value="${app?esc(app.icon):'📦'}" style="width:60px; text-align:center;" ${!canEditInfo ? 'disabled' : ''}>
          <div style="flex:1;">
            <input type="file" id="fIconFile" accept="image/*" style="display:none;" onchange="previewAppIcon(this)">
            <button class="btn btn-secondary btn-full" onclick="el('fIconFile').click()" ${!canEditInfo ? 'disabled' : ''}>🖼️ Upload Icon</button>
            <div id="iconChosen" style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">${app&&app.iconData?'✅ Icon uploaded':''}</div>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">APK File (Required)</label>
        <input type="hidden" id="fApk" value="${app?esc(app.apkName):''}">
        <input type="hidden" id="fSize" value="${app?esc(app.size):''}">
        <input type="file" id="fApkFile" accept=".apk" style="display:none;" onchange="handleApkUpload(this)">
        <button class="btn btn-primary btn-full" onclick="el('fApkFile').click()" ${!canUpdateApk ? 'disabled' : ''}>📦 Choose APK</button>
        <div id="apkChosen" style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">${app?`✅ ${app.apkName}`:''}</div>
      </div>
    </div>`;

  el('appModalSave').onclick = () => saveApp(editId);
  openModal('appModal');
}

function handleApkUpload(input) {
  const f = input.files[0]; if(!f) return;
  el('fApk').value = f.name;
  el('fSize').value = (f.size / (1024 * 1024)).toFixed(1) + ' MB';
  el('apkChosen').textContent = '✅ ' + f.name;
}

function previewAppIcon(input) {
  const f = input.files[0]; if(!f) return;
  const r = new FileReader();
  r.onload = e => { pendingIcon = e.target.result; el('iconChosen').textContent = '✅ ' + f.name; };
  r.readAsDataURL(f);
}

function saveApp(editId) {
  const isOwner = S.session?.role === 'owner';
  const perm = S.session?.permissions || {};
  
  const name  = val('fName');
  const cat   = val('fCat');
  const desc  = val('fDesc');
  const ver   = val('fVer')   || '1.0.0';
  const size  = val('fSize');
  const emoji = val('fEmoji') || '📦';
  const apk   = val('fApk');

  if (!name || !desc) { toast('Name and description are required', 'warning'); return; }

  if (editId) {
    const app = S.apps.find(a=>a.id===editId);
    if (app) {
      // If user has edit permission, update info
      if (isOwner || perm.edit) {
        Object.assign(app, { name, category:cat, desc, version:ver, icon:emoji });
        if (pendingIcon) app.iconData = pendingIcon;
      }
      
      // If user has update permission, update APK & Size
      if (isOwner || perm.update) {
        app.apkName = apk;
        app.size = size;
      }
    }
    toast('App updated successfully!', 'success');
  } else {
    // For new uploads, must have upload permission
    if (!isOwner && !perm.upload) {
      toast('You do not have permission to upload apps', 'error');
      return;
    }
    S.apps.push({ id:uid(), name, category:cat, desc, version:ver, size, icon:emoji, apkName:apk,
      iconData: pendingIcon||null, downloads:0, createdAt:Date.now() });
    toast('App uploaded!', 'success');
  }
  pendingIcon = null;
  saveApps();
  closeModal('appModal');
  renderAppsTable();
  updateSidebarCounts();
}

function confirmDeleteApp(id) {
  const app = S.apps.find(a=>a.id===id);
  if (!app) return;
  el('confirmMsg').innerHTML = `Delete app <strong>${esc(app.name)}</strong>?<br>This action cannot be undone.`;
  el('confirmOk').onclick = () => { deleteApp(id); closeModal('confirmModal'); };
  openModal('confirmModal');
}
function deleteApp(id) {
  S.apps = S.apps.filter(a=>a.id!==id);
  REMOTE_DB.deleteApp(id);
  DB.set('apps', S.apps);
  renderAppsTable();
  updateSidebarCounts();
  toast('App deleted', 'info');
}

/* ═══════════════════════════════════════════════
   SECTION: ADMINS
═══════════════════════════════════════════════ */
function renderAdminsTable(filter='') {
  const isOwner = S.session?.role === 'owner';
  const query   = (filter || S.search.admins).toLowerCase();
  const admins  = query ? S.admins.filter(a =>
    a.name.toLowerCase().includes(query) || a.email.toLowerCase().includes(query)
  ) : S.admins;

  el('adminsTableBody').innerHTML = admins.length ? admins.map(a => {
    const perms = a.permissions || {};
    const badges = Object.entries(perms).filter(([,v])=>v)
      .map(([k]) => `<span class="badge badge-info" style="font-size:.65rem">${k}</span>`).join('');
    return `<tr>
      <td>
        <div class="cell-user">
          <div class="cell-thumb" style="background:linear-gradient(135deg,var(--primary),var(--secondary))">${a.name.charAt(0).toUpperCase()}</div>
          <div>
            <div class="cell-main">${esc(a.name)}</div>
            <div class="cell-sub">${esc(a.email)}</div>
          </div>
        </div>
      </td>
      <td><span class="badge ${a.role==='owner'?'badge-warning':'badge-primary'}">${a.role==='owner'?'👑':'🛡️'} ${a.role}</span></td>
      <td><div style="display:flex;flex-wrap:wrap;gap:4px">${badges||'<span style="color:var(--text-muted);font-size:.8rem">None</span>'}</div></td>
      <td>${fmtDate(a.createdAt||Date.now())}</td>
      <td>
        <div class="cell-actions">
          ${isOwner?`<button class="btn btn-secondary btn-sm" onclick="openAdminModal('${a.id}')">✏️ Edit</button>`:''}
          ${isOwner && a.role!=='owner'?`<button class="btn btn-danger btn-sm" onclick="confirmDeleteAdmin('${a.id}')">🗑️</button>`:'—'}
        </div>
      </td>
    </tr>`;
  }).join('')
  : `<tr class="empty-row"><td colspan="5" style="padding: 40px; text-align: center; color: var(--text-muted);">
      <div style="font-size: 2rem; margin-bottom: 10px;">🔍</div>
      <div>apni ai name er kono admin create koren nai</div>
    </td></tr>`;
}

function openAdminModal(editId=null) {
  const a = editId ? S.admins.find(x=>x.id===editId) : null;
  el('adminModalTitle').textContent = a ? 'Edit Admin' : 'Create Admin';

  el('adminModalForm').innerHTML = `
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Full Name *</label>
        <input class="form-control" id="aN" value="${a?esc(a.name):''}" placeholder="Admin Name">
      </div>
      <div class="form-group">
        <label class="form-label">Gmail *</label>
        <input class="form-control" type="email" id="aE" value="${a?esc(a.email):''}" placeholder="admin@gmail.com" ${a?'disabled style="opacity:.5"':''}>
      </div>
    </div>
    ${a ? `
    <div class="form-row" style="margin-top: 15px; padding-top: 15px; border-top: 1px solid var(--border);">
      <div class="form-group">
        <label class="form-label">New Password (Optional)</label>
        <input class="form-control" type="password" id="aPw" placeholder="Leave blank to keep current">
      </div>
      <div class="form-group">
        <label class="form-label">Confirm New Password</label>
        <input class="form-control" type="password" id="aPwC" placeholder="Repeat new password">
      </div>
    </div>` : `
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Password *</label>
        <input class="form-control" type="password" id="aPw" placeholder="Min. 6 characters">
      </div>
      <div class="form-group">
        <label class="form-label">Confirm Password *</label>
        <input class="form-control" type="password" id="aPwC" placeholder="Repeat password">
      </div>
    </div>`}
    <div class="form-group">
      <label class="form-label">Role</label>
      <select class="form-control" id="aRole">
        <option value="admin"${a&&a.role==='admin'?' selected':''}>Admin</option>
        <option value="owner"${a&&a.role==='owner'?' selected':''}>Owner</option>
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Permissions</label>
      <div class="perm-grid">
        <div class="perm-grid-head"><span>Permission</span><span>Allow</span></div>
        ${['upload', 'edit', 'update'].map(p => `
        <div class="toggle-row">
          <span class="toggle-label">${p === 'upload' ? 'Upload App' : p === 'edit' ? 'Edit App (Name, Desc, Icon, Delete)' : 'Update App (Change APK)'}</span>
          <label class="toggle">
            <input type="checkbox" id="perm_${p}" ${!a || a.permissions?.[p] ? 'checked' : ''}>
            <span class="toggle-slider"></span>
          </label>
        </div>`).join('')}
      </div>
    </div>`;

  el('adminModalSave').onclick = () => saveAdmin(editId);
  openModal('adminModal');
}

function saveAdmin(editId) {
  const name  = val('aN');
  const email = editId ? null : val('aE');
  const pw    = val('aPw');
  const pwC   = val('aPwC');
  const role  = val('aRole');
  const perms = {
    upload: el('perm_upload')?.checked,
    edit:   el('perm_edit')?.checked,
    update: el('perm_update')?.checked,
  };

  if (!name) { toast('Name is required', 'warning'); return; }
  
  if (!editId) {
    if (!email || !pw) { toast('All fields are required', 'warning'); return; }
    if (pw !== pwC)    { toast('Passwords do not match', 'error'); return; }
    if (pw.length < 6) { toast('Password must be at least 6 characters', 'warning'); return; }
    if (S.admins.find(a=>a.email.toLowerCase()===email.toLowerCase()))
      { toast('Email already in use', 'error'); return; }
    S.admins.push({ id:uid(), name, email, password:pw, role, permissions:perms, createdAt:Date.now() });
    toast('Admin created!', 'success');
  } else {
    const a = S.admins.find(a=>a.id===editId);
    if (a) { 
      a.name = name; 
      a.role = role; 
      a.permissions = perms; 
      
      // Update password if provided
      if (pw) {
        if (pw !== pwC) { toast('Passwords do not match', 'error'); return; }
        if (pw.length < 6) { toast('Password must be at least 6 characters', 'warning'); return; }
        a.password = pw;
        toast('Admin updated with new password!', 'success');
      } else {
        toast('Admin updated!', 'success');
      }
    }
  }
  saveAdmins();
  closeModal('adminModal');
  renderAdminsTable();
  updateSidebarCounts();
}

function confirmDeleteAdmin(id) {
  const a = S.admins.find(x=>x.id===id);
  if (!a) return;
  el('confirmMsg').innerHTML = `Delete admin <strong>${esc(a.name)}</strong>?<br>They will lose all access immediately.`;
  el('confirmOk').onclick = () => { deleteAdmin(id); closeModal('confirmModal'); };
  openModal('confirmModal');
}
function deleteAdmin(id) {
  S.admins = S.admins.filter(a=>a.id!==id);
  REMOTE_DB.deleteAdmin(id);
  DB.set('admins', S.admins);
  renderAdminsTable();
  updateSidebarCounts();
  toast('Admin deleted', 'info');
}

/* ═══════════════════════════════════════════════
   SECTION: USERS
═══════════════════════════════════════════════ */
function renderUsersTable(filter='') {
  const query = (filter || S.search.users).toLowerCase();
  const users = query ? S.users.filter(u =>
    u.name.toLowerCase().includes(query) || u.email.toLowerCase().includes(query)
  ) : S.users;

  el('usersTableBody').innerHTML = users.length ? users.map(u => `
    <tr>
      <td>
        <div class="cell-user">
          ${u.avatar
            ? `<div class="cell-thumb"><img src="${u.avatar}" alt="${esc(u.name)}"></div>`
            : `<div class="cell-thumb">${u.name.charAt(0).toUpperCase()}</div>`}
          <div>
            <div class="cell-main">${esc(u.name)}</div>
            <div class="cell-sub">${esc(u.email)}</div>
          </div>
        </div>
      </td>
      <td>${fmtDate(u.createdAt||Date.now())}</td>
      <td><span class="badge badge-success">⬇ ${fmtNum(u.downloads||0)}</span></td>
      <td>
        <div class="cell-actions">
          <button class="btn btn-danger btn-sm" onclick="confirmRemoveUser('${u.id}')">🗑️ Remove</button>
        </div>
      </td>
    </tr>`).join('')
  : `<tr class="empty-row"><td colspan="4" style="padding: 40px; text-align: center; color: var(--text-muted);">
        <div style="font-size: 2rem; margin-bottom: 10px;">🔍</div>
        <div>no user found</div>
      </td></tr>`;
}

function confirmRemoveUser(id) {
  const u = S.users.find(x=>x.id===id);
  if (!u) return;
  el('confirmMsg').innerHTML = `Remove user <strong>${esc(u.name)}</strong> (${esc(u.email)})?<br>This will permanently delete their account.`;
  el('confirmOk').onclick = () => { removeUser(id); closeModal('confirmModal'); };
  openModal('confirmModal');
}
function removeUser(id) {
  S.users = S.users.filter(u=>u.id!==id);
  REMOTE_DB.deleteUser(id);
  DB.set('users', S.users);
  renderUsersTable();
  updateSidebarCounts();
  toast('User removed', 'info');
}

/* ─────────────────────────────── SIDEBAR COUNTS ─── */
function updateSidebarCounts() {
  el('countApps').textContent   = S.apps.length;
  el('countAdmins').textContent = S.admins.length;
  el('countUsers').textContent  = S.users.length;
}

/* ─────────────────────────────── PERMISSION CHECK ─── */
function hasPerm(p) { return S.session?.permissions?.[p] !== false; }

function applyPermissions() {
  const perm = S.session?.permissions || {};
  // Show/hide upload button
  el('btnUploadApp').classList.toggle('hidden', perm.upload === false);
  // Show/hide create admin (owner only)
  el('btnCreateAdmin').classList.toggle('hidden', S.session?.role !== 'owner');
}

/* ─────────────────────────────── EVENT BINDING ─── */
function bindEvents() {
  // Prevent Copy & Right Click
  document.addEventListener('contextmenu', e => e.preventDefault());
  document.addEventListener('copy', e => {
    e.preventDefault();
    toast('Content copying is disabled', 'warning');
  });

  // Login
  el('loginBtn').addEventListener('click', handleLogin);
  el('loginPw').addEventListener('keydown', e => { if(e.key==='Enter') handleLogin(); });
  el('loginEmail').addEventListener('keydown', e => { if(e.key==='Enter') handleLogin(); });

  // Sidebar
  document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', () => navigateTo(item.dataset.section));
  });

  // Logout
  el('logoutBtn').addEventListener('click', logoutAdmin);

  // Mobile sidebar toggle
  el('mobileSidebarBtn').addEventListener('click', () => {
    el('adminSidebar').classList.toggle('open');
  });

  // App search
  el('searchApps').addEventListener('input', e => {
    S.search.apps = e.target.value;
    renderAppsTable();
  });

  // Admin search
  el('searchAdmins').addEventListener('input', e => {
    S.search.admins = e.target.value;
    renderAdminsTable();
  });

  // User search
  el('searchUsers').addEventListener('input', e => {
    S.search.users = e.target.value;
    renderUsersTable();
  });

  // Upload button
  el('btnUploadApp').addEventListener('click', () => openAppModal());

  // Create admin button
  el('btnCreateAdmin').addEventListener('click', () => openAdminModal());

  // Close modals on overlay click
  document.querySelectorAll('.modal-overlay').forEach(ov => {
    ov.addEventListener('click', e => { if(e.target===ov) closeModal(ov.id); });
  });

  // View site link
  el('viewSiteBtn').addEventListener('click', () => window.open('../index.html','_blank'));
}


/* ─────────────────────────────── INIT ─── */
async function init() {
  await seedData();

  // Hide loading screen
  setTimeout(() => {
    const lo = el('loadingScreen');
    if (lo) {
      lo.style.opacity = '0';
      setTimeout(() => lo.remove(), 500);
    }

    if (getAdminSession()) showApp();
    else showLogin();
  }, 300);

  bindEvents();
}

window.onload = init;
