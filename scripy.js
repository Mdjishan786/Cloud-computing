// ============================================================
// GLOBALS
// ============================================================
let currentPage = 'dashboard';

// ============================================================
// DOM READY
// ============================================================
document.addEventListener('DOMContentLoaded', function() {

    // --- Theme ---
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
    updateThemeIcon(savedTheme);

    document.getElementById('themeToggle').addEventListener('click', function() {
        const current = document.documentElement.getAttribute('data-bs-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-bs-theme', next);
        localStorage.setItem('theme', next);
        updateThemeIcon(next);
        renderAllCharts();
    });

    // --- Sidebar Toggle ---
    document.getElementById('toggleSidebar').addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('show');
        document.getElementById('sidebarOverlay').classList.toggle('show');
    });

    document.getElementById('sidebarOverlay').addEventListener('click', function() {
        document.getElementById('sidebar').classList.remove('show');
        document.getElementById('sidebarOverlay').classList.remove('show');
    });

    // --- Navigation ---
    document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.dataset.page;
            if (page) navigateTo(page);
        });
    });

    // Also handle "View All" links in cards
    document.querySelectorAll('[data-page]').forEach(el => {
        if (el.classList.contains('nav-link')) return;
        el.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.dataset.page;
            if (page) navigateTo(page);
        });
    });

    // --- Dropzone (click to upload) ---
    document.querySelectorAll('.dropzone').forEach(dz => {
        dz.addEventListener('click', function() {
            const fileInput = this.closest('.modal-body')?.querySelector('input[type="file"]') ||
                document.querySelector('#uploadFileForm input[type="file"]');
            if (fileInput) fileInput.click();
        });
    });

    // --- Initial render ---
    navigateTo('dashboard');

    // --- Accent color pickers ---
    document.querySelectorAll('[data-color]').forEach(btn => {
        btn.addEventListener('click', function() {
            const color = this.dataset.color;
            document.documentElement.style.setProperty('--bs-primary', color);
            document.documentElement.style.setProperty('--bs-primary-rgb', hexToRgb(color));
            document.querySelectorAll('[data-color]').forEach(b => b.style.borderColor = 'var(--bs-border-color)');
            this.style.borderColor = 'var(--bs-primary)';
            showToast('Accent color updated!', 'info');
        });
    });

}); // end DOMContentLoaded

// ============================================================
// NAVIGATION
// ============================================================
function navigateTo(page) {
    // Hide all sections
    document.querySelectorAll('.page-section').forEach(el => el.style.display = 'none');

    // Show target
    const target = document.getElementById('page-' + page);
    if (target) target.style.display = 'block';

    // Update nav
    document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.page === page);
    });

    // Update title
    const titles = {
        dashboard: 'Dashboard',
        vms: 'Virtual Machines',
        storage: 'Cloud Storage',
        monitoring: 'Resource Monitoring',
        profile: 'User Profile',
        admin: 'Admin Panel',
        logs: 'Activity Logs',
        reports: 'Reports',
        settings: 'Settings'
    };
    document.getElementById('pageTitle').textContent = titles[page] || 'Dashboard';

    currentPage = page;

    // Close sidebar on mobile
    if (window.innerWidth <= 992) {
        document.getElementById('sidebar').classList.remove('show');
        document.getElementById('sidebarOverlay').classList.remove('show');
    }

    // Render charts if on relevant pages
    if (page === 'dashboard') {
        setTimeout(renderDashboardCharts, 200);
    } else if (page === 'monitoring') {
        setTimeout(renderMonitoringCharts, 200);
    } else if (page === 'storage') {
        setTimeout(renderStorageChart, 200);
    }

    // Re-render any charts after a moment
    setTimeout(renderAllCharts, 300);
}

// ============================================================
// THEME HELPERS
// ============================================================
function updateThemeIcon(theme) {
    const icon = document.getElementById('themeIcon');
    if (theme === 'dark') {
        icon.className = 'fas fa-moon';
    } else {
        icon.className = 'fas fa-sun';
    }
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1],16)}, ${parseInt(result[2],16)}, ${parseInt(result[3],16)}` :
        '13, 110, 253';
}

function getChartColors() {
    const isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark';
    const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
    const textColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';
    const primary = getComputedStyle(document.documentElement).getPropertyValue('--bs-primary').trim() || '#0d6efd';
    return { gridColor, textColor, primary };
}

// ============================================================
// TOAST
// ============================================================
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const icons = {
        success: 'fas fa-check-circle text-success',
        info: 'fas fa-info-circle text-info',
        warning: 'fas fa-exclamation-triangle text-warning',
        danger: 'fas fa-times-circle text-danger'
    };
    const toast = document.createElement('div');
    toast.className = 'toast-custom';
    toast.innerHTML = `
        <span class="toast-icon ${icons[type] || icons.info}"></span>
        <span class="toast-msg">${message}</span>
        <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
    `;
    container.appendChild(toast);
    setTimeout(() => {
        if (toast.parentElement) toast.remove();
    }, 4000);
}

// ============================================================
// HANDLE RESIZE
// ============================================================
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        renderAllCharts();
    }, 300);
});

// ============================================================
// AUTO-THEME ON LOAD
// ============================================================
window.addEventListener('load', function() {
    setTimeout(renderAllCharts, 500);
});

console.log('☁️ Cloud Resource Management System v2.0');
console.log('📊 Dashboard ready | 🌓 Theme: ' + document.documentElement.getAttribute('data-bs-theme'));
