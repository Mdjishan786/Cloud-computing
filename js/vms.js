// ============================================================
// VIRTUAL MACHINES
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    // VM Search
    document.getElementById('vmSearch')?.addEventListener('input', function() {
        const q = this.value.toLowerCase();
        const rows = document.querySelectorAll('#vmTableBody tr');
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(q) ? '' : 'none';
        });
    });
});

// Create VM action
function createVM() {
    showToast('Virtual Machine created successfully!', 'success');
    document.querySelector('#createVMModal .btn-close')?.click();
}
