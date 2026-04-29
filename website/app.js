/* ================================
   Modals openen/sluiten (DRY)
==================================*/
function setupModal(buttonId, modalId, closeId) {
  const btn = document.getElementById(buttonId);
  const modal = document.getElementById(modalId);
  const close = document.getElementById(closeId);

  if (!btn || !modal || !close) {
    console.warn("Modal-element niet gevonden:", buttonId, modalId, closeId);
    return;
  }

  // Open modal
  btn.addEventListener("click", () => {
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
  });

  // Sluit via X
  close.addEventListener("click", () => {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  });

  // Klik buiten de content sluit ook
  modal.addEventListener("click", (e) => {
    // klik op backdrop (dus niet in .modal-content)
    if (e.target === modal) {
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
    }
  });

  // ESC sluit modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") {
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
    }
  });
}

/* ================================
   Modals activeren
==================================*/
setupModal("infoBtn", "infoModal", "closeInfo");
setupModal("flyerBtn", "flyerModal", "closeFlyer");
setupModal("pplinfo", "pplModal", "closePpl");
setupModal("hardwareBtn", "HardwareModal", "closeHardware");

/* ================================
   Tabs in Info-Modal
==================================*/
function initInfoTabs() {
  const infoModal = document.getElementById("infoModal");
  if (!infoModal) return;

  const tabButtons = infoModal.querySelectorAll(".tab");
  const tabContents = infoModal.querySelectorAll(".tab-content");

  if (!tabButtons.length || !tabContents.length) {
    console.warn("Tabs niet gevonden in InfoModal!");
    return;
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Active knop wisselen
      const current = infoModal.querySelector(".tab.active");
      if (current) current.classList.remove("active");
      btn.classList.add("active");

      // aria-selected (voor screenreaders)
      tabButtons.forEach((b) => b.setAttribute("aria-selected", b === btn ? "true" : "false"));

      // Content wisselen
      tabContents.forEach((content) => content.classList.add("hidden"));
      const target = infoModal.querySelector("#" + btn.dataset.tab);
      if (target) target.classList.remove("hidden");
    });
  });
}
initInfoTabs();

/* ================================
   Temperatuur-alarm (sterk warning effect)
==================================*/
(function () {
  const tempCard = document.getElementById("tempCard");
  const tempVal = document.getElementById("tempVal");
  if (!tempCard || !tempVal) return;

  // Leest bv. "70°C" als 70
  const parsed = parseFloat((tempVal.textContent || "0").replace(/[^\d.]/g, ""));
  const THRESHOLD = 65; // drempel: pas aan naar wens

  if (!isNaN(parsed) && parsed > THRESHOLD) {
    tempCard.classList.add("temp-alert");
  } else {
    tempCard.classList.remove("temp-alert");
  }
})();

/* ================================
   (Optioneel) Dynamische progress-circles
   Gebruik setProgress(selector, percent, labelText)
==================================*/
function setProgress(selector, percent, labelText) {
  const el = document.querySelector(selector);
  if (!el) return;

  const p = Math.max(0, Math.min(100, Number(percent)));
  el.style.setProperty("--percent", p);

  if (labelText) {
    // Toon label onder/over de cirkel via data-attribute
    el.setAttribute("data-label", labelText);
  }
}

// Voorbeelden (je kunt deze aanpassen of verwijderen):
// setProgress(".circle-grid .progress-circle:nth-child(1)", 75, "75%");
// setProgress(".circle-grid .progress-circle:nth-child(2)", 60, "60%");
// setProgress(".circle-grid .progress-circle:nth-child(3)", 85, "85%");