// ============================================================
// STORAGE
// ============================================================
// Upload File action
function uploadFile() {
    showToast('File uploaded successfully!', 'success');
    document.querySelector('#uploadFileModal .btn-close')?.click();
}
