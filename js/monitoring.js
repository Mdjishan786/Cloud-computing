// ============================================================
// MONITORING
// ============================================================
function refreshMonitoring() {
    showToast('Monitoring data refreshed!', 'info');
    renderMonitoringCharts();
}

// Simulate real-time updates on monitoring page
setInterval(() => {
    if (currentPage === 'monitoring') {
        renderMonitoringCharts();
    }
}, 30000); // every 30 seconds
