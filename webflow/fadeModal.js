(() => {
const modals = document.querySelectorAll('[data-modal]');
modals.forEach(modal => {
    // Get modal opener 
    const openModal = modal.querySelector('[data-modal-open]') || modal;

    // Get modal closer
    const closeModals = modal.querySelectorAll('[data-modal-close]');

    // Get modal content
    const modalContent = modal.querySelector('[data-modal-content]');

    // Get modal display type
    const displayType = modal.getAttribute('data-display');

    // Create style
    createStyle(`[data-modal-content]`, displayType);
    
    openModal.addEventListener("click", () => {
        modalContent.setAttribute("open", "")
    });
      
    // On modal close
    closeModals.forEach(closeModal => {
        closeModal.addEventListener("click", () => {
            modalContent.setAttribute("closing", "");
            
            modalContent.addEventListener(
                "animationend",
                () => {
                modalContent.removeAttribute("closing");
                modalContent.removeAttribute("open");
                },
                { once: true }
            );
        });
    });
});
})();


const modal = document.querySelector("#modal");
const openModal = document.querySelector(".open-button");
const closeModal = document.querySelector(".close-button");

openModal.addEventListener("click", () => {
  modal.setAttribute("open", "")
});

closeModal.addEventListener("click", () => {
  modal.setAttribute("closing", "");

  modal.addEventListener(
    "animationend",
    () => {
      modal.removeAttribute("closing");
      modal.removeAttribute("open");
    },
    { once: true }
  );
});



function createStyle(selector, displayType) {
    const style = document.createElement('style');
    style.innerHTML = `
    ${selector}[open] {
        animation: fade-in 500ms forwards;
        display: ${displayType};
    }
    
    ${selector}[closing] {
        display: ${displayType};
        pointer-events: none;
        inset: 0;
        animation: fade-out 500ms forwards;
    }
    
    @keyframes fade-in {
        0% {
        opacity: 0;
        }
        100% {
        opacity: 1;
        }
    }
    
    @keyframes fade-out {
        0% {
        opacity: 1;
        }
        100% {
        opacity: 0;
        }
    }
    `;
    document.head.appendChild(style);
}
