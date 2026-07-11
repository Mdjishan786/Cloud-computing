// ============================================================
// PROFILE
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('profileForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        showToast('Profile updated successfully!', 'success');
    });
});
