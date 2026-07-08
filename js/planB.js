function optionsBornesPlanB() {

  return bornesStrategiques.map(borne => `
    <option value="${borne.nom}">
      ${drapeauPays(borne.pays)} ${borne.nom}
    </option>
  `).join("");
}

function trouverBorneExacte(nom) {
  return bornesStrategiques.find(borne => borne.nom === nom);
}

async function calculerPlanB() {
  const nomDepart = document.getElementById("planBDepart").value;
  const nomArrivee = document.getElementById("planBArrivee").value;
  const batterie = Number(document.getElementById("planBBatterie").value);

  const depart = trouverBorneExacte(nomDepart);
  const arrivee = trouverBorneExacte(nomArrivee);

  if (!depart || !arrivee) {
    alert("Borne introuvable.");
    return;
  }

  const distance = await calculerDistance(
    depart.nom,
    arrivee.nom,
    depart.gps,
    arrivee.gps
  );

  const pourcentageNecessaire = Math.ceil(
    consoPourcentage(distance)
  );

  const marge = batterie - pourcentageNecessaire;

const statut =
  marge >= 10
    ? "🟢 OK"
    : marge >= 5
      ? "🟠 Possible mais faible marge"
      : marge >= 0
        ? "🔴 Trop juste"
        : "⚫ Impossible";

  document.getElementById("planBResultat").innerHTML = `
    <p><b>Distance :</b> ${distance} km</p>
    <p><b>Batterie nécessaire estimée :</b> ${pourcentageNecessaire} %</p>
    <p><b>Batterie actuelle :</b> ${batterie} %</p>
    <p><b>Marge :</b> ${marge} %</p>
    <p><b>Statut :</b> ${statut}</p>

    <button class="primary-btn" onclick="ouvrirGoogleMapsPlanB('${depart.gps}', '${arrivee.gps}')">
      🗺️ Ouvrir Google Maps vers le plan B
    </button>
  `;
}

function ouvrirGoogleMapsPlanB(gpsDepart, gpsArrivee) {
  const depart = convertirGps(gpsDepart);
  const arrivee = convertirGps(gpsArrivee);

  if (!depart || !arrivee) {
    alert("GPS invalide.");
    return;
  }

  const origin = `${depart[1]},${depart[0]}`;
  const destination = `${arrivee[1]},${arrivee[0]}`;

  const url =
    `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;

  window.open(url, "_blank");
}

function genererBlocPlanB() {
  return `
    <div class="carte">
      <h2>Plan B immédiat</h2>

      <div class="form-grid">
        <div>
          <label>Borne actuelle</label>
          <select id="planBDepart">
            ${optionsBornesPlanB()}
          </select>
        </div>

        <div>
          <label>Borne de secours</label>
          <select id="planBArrivee">
            ${optionsBornesPlanB()}
          </select>
        </div>

        <div>
          <label>Batterie actuelle (%)</label>
          <input id="planBBatterie" type="number" value="20">
        </div>
      </div>

      <button class="primary-btn" onclick="calculerPlanB()">
        ⚡ Vérifier le plan B
      </button>

      <div id="planBResultat" style="margin-top:20px;"></div>
    </div>
  `;
}