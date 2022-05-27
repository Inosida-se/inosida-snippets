const fadeIn = (element, display = 'flex') => {
    return new Promise((resolve) => {
        element.style.opacity = '0';
        element.style.display = display;
        (function fade() {
            const currentOpacity = parseFloat(element.style.opacity);
            if (currentOpacity >= 1) {
                resolve();
                return;
            }
            const newOpacity = currentOpacity + 0.1;
            element.style.opacity = newOpacity.toString();
            requestAnimationFrame(fade);
        })();
    });
};

const fadeOut = (element) => {
    return new Promise((resolve) => {
        element.style.opacity = '1';
        (function fade() {
            const currentOpacity = parseFloat(element.style.opacity);
            const newOpacity = currentOpacity - 0.1;
            element.style.opacity = newOpacity.toString();
            if (newOpacity <= 0) {
                element.style.display = 'none';
                resolve();
            }
            else    
                requestAnimationFrame(fade);
        })();
    });
};

(() => {
const modals = document.querySelectorAll('[data-modal]');
modals.forEach(modal => {
    // Get modal opener 
    const modalOpen = modal.querySelector('[data-modal-open]') || modal;

    // Get modal closer
    const modalClose = modal.querySelectorAll('[data-modal-close]');

    // Get modal content
    const modalContent = modal.querySelector('[data-modal-content]');

    // Get modal display type
    const displayType = modal.getAttribute('data-display');

    let open = false;
    
    // On modal open
    modalOpen.addEventListener('click', (e) => {
        if (open)
            return;
        fadeIn(modalContent, displayType).then(() => {
            modal.setAttribute('aria-hidden', 'false');
            open = true;
        });
    });

    // On modal close
    modalClose.forEach(close => {
        close.addEventListener('click', () => {
            if (!open) 
                return;
            fadeOut(modalContent).then(() => {
                modal.setAttribute('aria-hidden', 'true');
                open = false;
            });
        });
    });
});
})();