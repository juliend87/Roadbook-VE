function drapeauPays(pays) {
  if (pays === "France") return "🇫🇷";
  if (pays === "Espagne") return "🇪🇸";
  if (pays === "Portugal") return "🇵🇹";
  return "📍";
}

function borneCompatibleAvecMode(borne) {
  if (borne.pays !== "Espagne") return true;
  if (!mission.modeEspagne) return true;

  return (
    borne.modeRoute === "lesDeux" ||
    borne.modeRoute === mission.modeEspagne
  );
}

function optionsBornes(selectedNom = "") {
  return `
    <option value="">-- Aucune recharge --</option>
    ${bornesStrategiques
      .filter(borneCompatibleAvecMode)
      .map(borne => `
        <option value="${borne.nom}" ${borne.nom === selectedNom ? "selected" : ""}>
          ${drapeauPays(borne.pays)} ${borne.nom}
        </option>
      `).join("")}
  `;
}

function genererSelectBornesVoyage() {
  return `
    <div class="carte">
      <h2>Recharges du voyage</h2>

      <p>
        Choisissez les recharges prévues dans l'ordre du trajet.
      </p>

      <div class="form-grid">

        <div>
          <label>🔋 1re recharge</label>
          <select id="borne1">${optionsBornes(mission.borne1)}</select>
        </div>

        <div>
          <label>🔋 2e recharge</label>
          <select id="borne2">${optionsBornes(mission.borne2)}</select>
        </div>

        <div>
          <label>🔋 3e recharge</label>
          <select id="borne3">${optionsBornes(mission.borne3)}</select>
        </div>

        <div>
          <label>🔋 4e recharge</label>
          <select id="borne4">${optionsBornes(mission.borne4)}</select>
        </div>

        <div>
          <label>🔋 5e recharge</label>
          <select id="borne5">${optionsBornes(mission.borne5)}</select>
        </div>

      </div>

      <button class="primary-btn" onclick="enregistrerVoyage()">
        ⚡ Appliquer les recharges
      </button>
    </div>
  `;
}