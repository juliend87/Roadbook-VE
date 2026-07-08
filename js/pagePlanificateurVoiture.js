function optionsBornesPlanificateur(selectedNom = "") {
  return `
    <option value="">-- Choisir une borne --</option>
    ${bornesStrategiques.map(borne => `
      <option value="${borne.nom}" ${borne.nom === selectedNom ? "selected" : ""}>
        ${borne.pays} - ${borne.nom}
      </option>
    `).join("")}
  `;
}

function pagePlanificateurVoiture() {

  return `
    <h1>Planificateur voiture</h1>

    <div class="carte">
      <h2>Recharges proposées par la voiture</h2>

      <p>
        Recopie ici les arrêts proposés par le planificateur de la voiture.
        Si une borne n'existe pas, ajoute-la d'abord dans l'onglet Bornes.
      </p>

      <div class="form-grid">

        <div>
          <label>🔋 Recharge 1</label>
          <select id="voitureRecharge1">
            ${optionsBornesPlanificateur(mission.voitureRecharge1)}
          </select>
        </div>

        <div>
          <label>🔋 Recharge 2</label>
          <select id="voitureRecharge2">
            ${optionsBornesPlanificateur(mission.voitureRecharge2)}
          </select>
        </div>

        <div>
          <label>🔋 Recharge 3</label>
          <select id="voitureRecharge3">
            ${optionsBornesPlanificateur(mission.voitureRecharge3)}
          </select>
        </div>

        <div>
          <label>🔋 Recharge 4</label>
          <select id="voitureRecharge4">
            ${optionsBornesPlanificateur(mission.voitureRecharge4)}
          </select>
        </div>

        <div>
          <label>🔋 Recharge 5</label>
          <select id="voitureRecharge5">
            ${optionsBornesPlanificateur(mission.voitureRecharge5)}
          </select>
        </div>

      </div>

      <button class="primary-btn" onclick="enregistrerPlanificateurVoiture()">
        💾 Enregistrer les recharges voiture
      </button>
    </div>

    <div class="carte">
      <h2>À quoi sert cet onglet ?</h2>

      <p>
        Cet onglet correspond aux arrêts proposés par le GPS ou le planificateur de la voiture.
      </p>

      <p>
        Roadbook-VE utilisera ensuite ces bornes pour afficher les Plans B,
        les stèles, la puissance et les commentaires dans l'onglet Bornes.
      </p>
    </div>
  `;
}

function enregistrerPlanificateurVoiture() {

  mission.voitureRecharge1 = document.getElementById("voitureRecharge1").value;
  mission.voitureRecharge2 = document.getElementById("voitureRecharge2").value;
  mission.voitureRecharge3 = document.getElementById("voitureRecharge3").value;
  mission.voitureRecharge4 = document.getElementById("voitureRecharge4").value;
  mission.voitureRecharge5 = document.getElementById("voitureRecharge5").value;

  mission.borne1 = mission.voitureRecharge1;
  mission.borne2 = mission.voitureRecharge2;
  mission.borne3 = mission.voitureRecharge3;
  mission.borne4 = mission.voitureRecharge4;
  mission.borne5 = mission.voitureRecharge5;

  sauvegarderMission();
  construireTrajetAutomatique();
  recalculerDistances();

  changerPage("bornes");
}