/*jshint curly: false */
"use strict";

function initModalToggles() {
    const toggles = Array.from(document.querySelectorAll("[data-toggle-modal]"));
    toggles.forEach(function (toggle) {
        if (toggle.dataset.hasListener)
            return;
        toggle.dataset.hasListener = true;
        toggle.addEventListener("click", toggleClickHandler);
    });
    const backdrops = Array.from(document.querySelectorAll(".modal__backdrop"));
    backdrops.forEach(function (backdrop) {
        if (backdrop.dataset.hasListener)
            return;
        backdrop.dataset.hasListener = true;
        backdrop.addEventListener("click", backdropClickHandler);
    });
}

function toggleClickHandler(event) {
    const toggle = event.target;
    const sel = toggle.getAttribute("data-toggle-modal");
    if (sel == null)
        return;
    const modal = document.querySelector(sel);
    if (!modal)
        return;
    modal.classList.toggle("show");
}

function backdropClickHandler(event) {
    const backdrop = event.target;
    const modal = backdrop.closest(".modal");
    if (!modal)
        return;
    modal.classList.toggle("show");
}
