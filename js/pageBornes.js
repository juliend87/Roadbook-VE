function pageBornes() {

  return `
    <h1>Bornes du trajet</h1>

    <div class="carte">
      <h2>Plans A / B</h2>

      <table>
        <thead>
          <tr>
            <th>Recharge</th>
            <th>Plan A</th>
            <th>Plan B</th>
            <th>Sécurité</th>
          </tr>
        </thead>

        <tbody>
          ${genererTableauBornesTrajet()}
        </tbody>
      </table>
    </div>

    <div class="carte">
      <h2>Carte des bornes</h2>
      <div id="mapBornes" style="height:500px;border-radius:8px;"></div>
    </div>

    <div class="carte">
      <h2>💶 Mise à jour des prix</h2>

      <p>
        Modifie ici les prix avant le départ. Ces prix sont sauvegardés dans le navigateur.
      </p>

      <table>
        <thead>
          <tr>
            <th>Borne</th>
            <th>Réseau</th>
            <th>Pays</th>
            <th>Prix actuel</th>
            <th>Nouveau prix</th>
          </tr>
        </thead>

        <tbody>
          ${genererTableauPrixBornes()}
        </tbody>
      </table>

      <button class="primary-btn" onclick="enregistrerPrixBornes()">
        💾 Enregistrer les prix
      </button>
    </div>

    <div class="carte">
      <h2>Gestion des bornes</h2>

      <p>
        Ici, tu pourras ajouter ou modifier une borne directement depuis Roadbook-VE.
      </p>

      <button class="primary-btn" onclick="afficherFormulaireAjoutBorne()">
        ➕ Ajouter une borne
      </button>

      <div id="formulaireBorne"></div>
    </div>

    <div class="carte">
      <h2>À quoi sert cet onglet ?</h2>

      <p>
        Cet onglet centralise les bornes importantes du trajet.
      </p>

      <p>
        Pour chaque recharge, Roadbook-VE affiche la borne principale,
        le plan B, le nombre de stèles, la puissance, le prix et le niveau
        de sécurité.
      </p>

      <p>
        Objectif : éviter les mauvaises surprises pendant la traversée
        de l'Espagne.
      </p>

      <h3>Fonctions prévues</h3>

      <ul>
        <li>➕ Ajouter une borne</li>
        <li>✏️ Modifier une borne</li>
        <li>🅱️ Choisir un Plan B</li>
        <li>📍 Vérifier le détour</li>
        <li>💶 Mettre à jour les prix</li>
        <li>📝 Ajouter un commentaire après usage</li>
      </ul>
    </div>
  `;
}

function lienMaps(gps) {
  return `https://www.google.com/maps/dir/?api=1&destination=${gps}`;
}

function genererTableauBornesTrajet() {

  return mission.troncons.map((troncon, index) => {

    const borneA = trouverBorneParNom(troncon.arrivee);
    const borneB = borneA ? trouverBorneParNom(borneA.planB) : null;

    if (!borneA) return "";

    return `
      <tr>
        <td>🔋 ${index + 1}re recharge</td>

        <td>
          <b>${borneA.nom}</b><br>
          ${borneA.reseau}<br>
          ⚡ ${borneA.puissance} kW<br>
          🔌 ${borneA.nbBornes} stèles<br>
          💶 ${borneA.prix} €/kWh<br>
          💬 ${borneA.commentaire}<br>
          ${borneA.electroverse ? "💳 Compatible Electroverse" : "❌ Non compatible Electroverse"}<br>
          📍 ${borneA.gps}<br><br>

          <a class="primary-btn"
             href="${lienMaps(borneA.gps)}"
             target="_blank">
             🧭 Naviguer Plan A
          </a>
        </td>

        <td>
          ${borneB ? `
            <b>${borneB.nom}</b><br>
            ${borneB.reseau}<br>
            ⚡ ${borneB.puissance} kW<br>
            🔌 ${borneB.nbBornes} stèles<br>
            📍 Plan B à ${borneA.kmPlanB} km<br>
            💶 ${borneB.prix} €/kWh<br>
            ${borneB.electroverse ? "💳 Compatible Electroverse" : "❌ Non compatible Electroverse"}<br>
            💬 ${borneB.commentaire}<br><br>

            <a class="secondary-btn"
               href="${lienMaps(borneB.gps)}"
               target="_blank">
               🅱️ Naviguer Plan B
            </a>
          ` : "Aucun plan B"}
        </td>

        <td>
          ${niveauSecuriteBorne(borneA)}
        </td>
      </tr>
    `;

  }).join("");
}

function afficherFormulaireAjoutBorne() {

  document.getElementById("formulaireBorne").innerHTML = `
    <div class="carte">
      <h2>Nouvelle borne</h2>

      <div class="form-grid">

        <div>
          <label>Nom</label>
          <input id="newBorneNom">
        </div>

        <div>
          <label>Réseau</label>
          <input id="newBorneReseau">
        </div>

        <div>
          <label>Pays</label>
          <select id="newBornePays">
            <option>France</option>
            <option>Espagne</option>
            <option>Portugal</option>
          </select>
        </div>

        <div>
          <label>GPS</label>
          <input id="newBorneGps" placeholder="latitude, longitude">
        </div>

        <div>
          <label>Puissance kW</label>
          <input id="newBornePuissance" type="number">
        </div>

        <div>
          <label>Nombre de stèles</label>
          <input id="newBorneNb" type="number">
        </div>

        <div>
          <label>Prix €/kWh</label>
          <input id="newBornePrix" type="number" step="0.01">
        </div>

        <div>
          <label>Plan B</label>
          <input id="newBornePlanB">
        </div>

        <div class="full">
          <label>Commentaire</label>
          <input id="newBorneCommentaire">
        </div>

        <div>
          <label>Compatible Electroverse</label>
          <input type="checkbox" id="newBorneElectroverse">
        </div>

      </div>

      <button class="primary-btn" onclick="preparerNouvelleBorne()">
        💾 Préparer la borne
      </button>

      <pre id="resultatNouvelleBorne"></pre>
    </div>
  `;
}

function preparerNouvelleBorne() {

  const borne = {
    nom: document.getElementById("newBorneNom").value,
    reseau: document.getElementById("newBorneReseau").value,
    pays: document.getElementById("newBornePays").value,
    gps: document.getElementById("newBorneGps").value,
    puissance: Number(document.getElementById("newBornePuissance").value),
    nbBornes: Number(document.getElementById("newBorneNb").value),
    prix: Number(document.getElementById("newBornePrix").value),
    type: "secours",
    planB: document.getElementById("newBornePlanB").value,
    kmPlanB: 0,
    modeRoute: "lesDeux",
    zone: "",
    commentaire: document.getElementById("newBorneCommentaire").value,
    electroverse: document.getElementById("newBorneElectroverse").checked
  };

  document.getElementById("resultatNouvelleBorne").textContent =
    JSON.stringify(borne, null, 2);
}
function afficherCarteBornes() {

  if (!document.getElementById("mapBornes")) return;

  const map = L.map("mapBornes").setView([42.0, -3.5], 6);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap"
  }).addTo(map);

  bornesStrategiques.forEach(borne => {
    if (!borne.gps) return;

    const [lat, lng] = borne.gps.split(",").map(Number);

    L.marker([lat, lng])
      .addTo(map)
      .bindPopup(`
        <b>${borne.nom}</b><br>
        ${borne.reseau} - ${borne.pays}<br>
        ⚡ ${borne.puissance} kW<br>
        🔌 ${borne.nbBornes} stèles<br>
        💶 ${borne.prix} €/kWh<br>
        ${borne.electroverse ? "💳 Electroverse" : "❌ Pas Electroverse"}<br>
        💬 ${borne.commentaire}<br><br>
        <a href="https://www.google.com/maps/dir/?api=1&destination=${borne.gps}" target="_blank">
          🧭 Naviguer
        </a>
      `);
  });
}
function genererTableauPrixBornes() {

  chargerPrixBornes();

  return bornesStrategiques.map((borne, index) => `
    <tr>
      <td>${borne.nom}</td>
      <td>${borne.reseau}</td>
      <td>${borne.pays}</td>
      <td>${borne.prix} €/kWh</td>
      <td>
        <input
          id="prixBorne${index}"
          type="number"
          step="0.01"
          value="${borne.prix}"
        >
      </td>
    </tr>
  `).join("");
}

function enregistrerPrixBornes() {

  const prixSauvegardes = {};

  bornesStrategiques.forEach((borne, index) => {
    const nouveauPrix = Number(document.getElementById(`prixBorne${index}`).value);

    if (!isNaN(nouveauPrix)) {
      borne.prix = nouveauPrix;
      prixSauvegardes[borne.nom] = nouveauPrix;
    }
  });

  localStorage.setItem("roadbookPrixBornes", JSON.stringify(prixSauvegardes));

  alert("Prix des bornes enregistrés.");
  changerPage("bornes");
}