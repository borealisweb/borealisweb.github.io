document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.portfolio-card').forEach(card => {
        const btn = card.querySelector('.btn-vermas');
        if (btn) {
            card.addEventListener('click', () => {
                window.location.href = btn.href;
            });
        }
    });
});
