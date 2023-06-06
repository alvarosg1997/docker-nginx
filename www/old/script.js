const neonBoxes = document.querySelectorAll('.neon-link');

neonBoxes.forEach(box => {
    box.addEventListener('mouseover', () => {
        box.style.animation = 'none';
    });

    box.addEventListener('mouseout', () => {
        box.style.animation = 'neon-glow 2s ease-in-out infinite alternate';
    });
});
