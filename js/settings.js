// ============================================================
// SETTINGS
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    // Theme buttons in settings
    document.getElementById('themeLightBtn')?.addEventListener('click', function() {
        document.documentElement.setAttribute('data-bs-theme', 'light');
        localStorage.setItem('theme', 'light');
        updateThemeIcon('light');
        renderAllCharts();
    });
    document.getElementById('themeDarkBtn')?.addEventListener('click', function() {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon('dark');
        renderAllCharts();
    });
    document.getElementById('themeSystemBtn')?.addEventListener('click', function() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = prefersDark ? 'dark' : 'light';
        document.documentElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
        renderAllCharts();
    });
});
