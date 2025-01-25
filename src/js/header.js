document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    document.querySelectorAll('.menu-item .menu-link').forEach(link => {
        const item = link.closest('.menu-item');
        item.classList.toggle(
            'active',
            currentPath.endsWith(link.getAttribute('href').substring(1))
        );
    });
});

