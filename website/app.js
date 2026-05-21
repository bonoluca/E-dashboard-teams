/* ================================
   MODALS (VEILIG)
==================================*/
function setupModal(buttonId, modalId, closeId) {
  const btn = document.getElementById(buttonId);
  const modal = document.getElementById(modalId);
  const close = document.getElementById(closeId);

  // ✅ safety check (belangrijk voor meerdere pagina’s)
  if (!btn || !modal || !close) return;

  // Open modal
  btn.addEventListener("click", () => {
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });

  // Sluit via X
  close.addEventListener("click", () => {
    closeModal();
  });

  // Klik buiten = sluiten
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // ESC sluiten
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") {
      closeModal();
    }
  });

  function closeModal() {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
}

/* ================================
   MODALS ACTIVEREN
==================================*/
setupModal("flyerBtn", "flyerModal", "closeFlyer");
setupModal("pplinfo", "pplModal", "closePpl");
setupModal("hardwareBtn", "HardwareModal", "closeHardware");

/* ================================
   TEMPERATUUR WARNING
==================================*/
(function () {
  const tempCard = document.getElementById("tempCard");
  const tempVal = document.getElementById("tempVal");

  if (!tempCard || !tempVal) return;

  const parsed = parseFloat(
    (tempVal.textContent || "0").replace(/[^\d.]/g, "")
  );

  const THRESHOLD = 65;

  if (!isNaN(parsed) && parsed > THRESHOLD) {
    tempCard.classList.add("temp-alert");
  } else {
    tempCard.classList.remove("temp-alert");
  }
})();

/* ================================
   PROGRESS CIRCLES
==================================*/
function setProgress(selector, percent, labelText) {
  const el = document.querySelector(selector);
  if (!el) return;

  const p = Math.max(0, Math.min(100, Number(percent)));
  el.style.setProperty("--percent", p);

  if (labelText) {
    el.setAttribute("data-label", labelText);
  }
}

/* ================================
   DARK MODE (WERKT OP ALLE PAGINA’S)
==================================*/
const darkBtn = document.getElementById("darkModeBtn");

if (darkBtn) {
  darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
      darkBtn.textContent = "☀️";
    } else {
      localStorage.setItem("theme", "light");
      darkBtn.textContent = "🌙";
    }
  });
}

// ✅ automatisch thema laden (werkt overal)
(function () {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");

    if (darkBtn) {
      darkBtn.textContent = "☀️";
    }
  }
})();

/* ================================
   HARDWARE INFO
==================================*/
function showHardware(type) {
  const details = document.getElementById("hardwareDetails");
  if (!details) return;

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