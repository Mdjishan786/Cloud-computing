// ============================================================
// CHARTS
// ============================================================
let chartInstances = {};

function renderAllCharts() {
    if (currentPage === 'dashboard') renderDashboardCharts();
    if (currentPage === 'monitoring') renderMonitoringCharts();
    if (currentPage === 'storage') renderStorageChart();
}

function renderDashboardCharts() {
    const colors = getChartColors();

    // Resource Chart (line)
    const ctx1 = document.getElementById('resourceChart');
    if (ctx1) {
        if (chartInstances.resource) chartInstances.resource.destroy();
        chartInstances.resource = new Chart(ctx1, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'CPU',
                    data: [32, 45, 28, 52, 38, 42, 35],
                    borderColor: '#0d6efd',
                    backgroundColor: 'rgba(13,110,253,0.08)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 3,
                    pointBackgroundColor: '#0d6efd'
                }, {
                    label: 'RAM',
                    data: [58, 62, 55, 70, 65, 68, 60],
                    borderColor: '#20c997',
                    backgroundColor: 'rgba(32,201,151,0.08)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 3,
                    pointBackgroundColor: '#20c997'
                }, {
                    label: 'Storage',
                    data: [45, 48, 50, 52, 55, 58, 60],
                    borderColor: '#ffc107',
                    backgroundColor: 'rgba(255,193,7,0.08)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 3,
                    pointBackgroundColor: '#ffc107'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: colors.textColor, boxWidth: 12, padding: 12, font: { size: 11 } }
                    }
                },
                scales: {
                    x: {
                        grid: { color: colors.gridColor },
                        ticks: { color: colors.textColor }
                    },
                    y: {
                        grid: { color: colors.gridColor },
                        ticks: { color: colors.textColor, callback: v => v + '%' },
                        min: 0,
                        max: 100
                    }
                }
            }
        });
    }

    // VM Status Chart (doughnut)
    const ctx2 = document.getElementById('vmStatusChart');
    if (ctx2) {
        if (chartInstances.vmStatus) chartInstances.vmStatus.destroy();
        chartInstances.vmStatus = new Chart(ctx2, {
            type: 'doughnut',
            data: {
                labels: ['Running', 'Stopped', 'Pending'],
                datasets: [{
                    data: [14, 7, 3],
                    backgroundColor: ['#198754', '#dc3545', '#ffc107'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
}

function renderMonitoringCharts() {
    const colors = getChartColors();

    // CPU Chart
    const ctx1 = document.getElementById('cpuChart');
    if (ctx1) {
        if (chartInstances.cpu) chartInstances.cpu.destroy();
        chartInstances.cpu = new Chart(ctx1, {
            type: 'line',
            data: {
                labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', 'Now'],
                datasets: [{
                    label: 'CPU %',
                    data: [22, 35, 48, 62, 45, 38, 42],
                    borderColor: '#0d6efd',
                    backgroundColor: 'rgba(13,110,253,0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: colors.textColor, boxWidth: 10, font: { size: 10 } } }
                },
                scales: {
                    x: { grid: { color: colors.gridColor }, ticks: { color: colors.textColor, font: { size: 9 } } },
                    y: { grid: { color: colors.gridColor }, ticks: { color: colors.textColor, callback: v => v + '%' }, min: 0, max: 100 }
                }
            }
        });
    }

    // RAM Chart
    const ctx2 = document.getElementById('ramChart');
    if (ctx2) {
        if (chartInstances.ram) chartInstances.ram.destroy();
        chartInstances.ram = new Chart(ctx2, {
            type: 'line',
            data: {
                labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', 'Now'],
                datasets: [{
                    label: 'RAM %',
                    data: [45, 52, 60, 75, 68, 65, 68],
                    borderColor: '#20c997',
                    backgroundColor: 'rgba(32,201,151,0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: colors.textColor, boxWidth: 10, font: { size: 10 } } }
                },
                scales: {
                    x: { grid: { color: colors.gridColor }, ticks: { color: colors.textColor, font: { size: 9 } } },
                    y: { grid: { color: colors.gridColor }, ticks: { color: colors.textColor, callback: v => v + '%' }, min: 0, max: 100 }
                }
            }
        });
    }

    // Storage Usage Chart
    const ctx3 = document.getElementById('storageUsageChart');
    if (ctx3) {
        if (chartInstances.storageUsage) chartInstances.storageUsage.destroy();
        chartInstances.storageUsage = new Chart(ctx3, {
            type: 'bar',
            data: {
                labels: ['Documents', 'Images', 'Archives', 'Other'],
                datasets: [{
                    label: 'Usage (GB)',
                    data: [420, 180, 380, 220],
                    backgroundColor: ['#0d6efd', '#20c997', '#ffc107', '#6c757d'],
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: { grid: { color: colors.gridColor }, ticks: { color: colors.textColor, font: { size: 9 } } },
                    y: { grid: { color: colors.gridColor }, ticks: { color: colors.textColor, font: { size: 9 } } }
                }
            }
        });
    }

    // Network Chart
    const ctx4 = document.getElementById('networkChart');
    if (ctx4) {
        if (chartInstances.network) chartInstances.network.destroy();
        chartInstances.network = new Chart(ctx4, {
            type: 'line',
            data: {
                labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', 'Now'],
                datasets: [{
                    label: 'Inbound (Mbps)',
                    data: [120, 80, 200, 350, 280, 190, 220],
                    borderColor: '#0d6efd',
                    backgroundColor: 'rgba(13,110,253,0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 2
                }, {
                    label: 'Outbound (Mbps)',
                    data: [60, 40, 120, 200, 160, 110, 130],
                    borderColor: '#dc3545',
                    backgroundColor: 'rgba(220,53,69,0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: colors.textColor, boxWidth: 10, font: { size: 10 } } }
                },
                scales: {
                    x: { grid: { color: colors.gridColor }, ticks: { color: colors.textColor, font: { size: 9 } } },
                    y: { grid: { color: colors.gridColor }, ticks: { color: colors.textColor, font: { size: 9 } } }
                }
            }
        });
    }
}

function renderStorageChart() {
    const colors = getChartColors();
    const ctx = document.getElementById('storageChart');
    if (!ctx) return;
    if (chartInstances.storage) chartInstances.storage.destroy();
    chartInstances.storage = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Documents', 'Images', 'Archives', 'Other'],
            datasets: [{
                data: [420, 180, 380, 220],
                backgroundColor: ['#0d6efd', '#20c997', '#ffc107', '#6c757d'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}
