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

  document.body.style.overflow = "hidden"; // ✅ LOCK SCROLL
});


  // Sluit via X
close.addEventListener("click", () => {
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = ""; // ✅ UNLOCK
});

  // Klik buiten de content sluit ook
  modal.addEventListener("click", (e) => {
    // klik op backdrop (dus niet in .modal-content)
    if (e.target === modal) {
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = ""; // ✅ UNLOCK
}
  });

  // ESC sluit modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") {
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = ""; // ✅ UNLOCK
}
  });
}

/* ================================
   Modals activeren
==================================*/

setupModal("flyerBtn", "flyerModal", "closeFlyer");
setupModal("pplinfo", "pplModal", "closePpl");
setupModal("hardwareBtn", "HardwareModal", "closeHardware");

/* ================================
   Tabs in Info-Modal
==================================*/


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

const darkBtn = document.getElementById("darkModeBtn");

darkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  // opslaan
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    darkBtn.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    darkBtn.textContent = "🌙";
  }
});

// onthouden bij reload
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  darkBtn.textContent = "☀️";
}

function showHardware(type) {
  const details = document.getElementById("hardwareDetails");

  if (type === "arduino") {
    details.innerHTML = `
      <h2>Arduino Nano Every</h2>
      <p>De centrale microcontroller van het systeem. Verwerkt alle data van sensoren.</p>
    `;
  }

  if (type === "temp") {
    details.innerHTML = `
      <h2>Temperatuur sensor</h2>
      <p>Meet de temperatuur van de wagen en stuurt dit naar de Arduino.</p>
    `;
  }

  if (type === "amp") {
    details.innerHTML = `
      <h2>Ampère meter</h2>
      <p>Meet het stroomverbruik van de batterij.</p>
    `;
  }

  if (type === "bluetooth") {
    details.innerHTML = `
      <h2>Bluetooth HC‑05</h2>
      <p>Stuurt data draadloos naar de computer of app.</p>
    `;
  }
}