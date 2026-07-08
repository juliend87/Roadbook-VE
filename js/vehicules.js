console.log("vehicules.js chargé");
let vehicules = [
  {
    nom: "Kia EV4 Grande Autonomie",
    batterie: 81.4,
    soh: 100,
    jantes: 17,
    conso: 18.5,
    km: 0,
    temperatureBatterie: 25,
    source: "La Chaine EV / manuel"
  },
  {
    nom: "DS N°4",
    batterie: 58,
    soh: 100,
    jantes: 19,
    conso: 17.5,
    km: 0,
    temperatureBatterie: 25,
    source: "À compléter"
  }
];

let vehiculeIndex = 0;

function sauvegarderVehicules() {
  localStorage.setItem("roadbookVehicules", JSON.stringify(vehicules));
  localStorage.setItem("roadbookVehiculeIndex", vehiculeIndex);
}

function chargerVehicules() {
  const data = localStorage.getItem("roadbookVehicules");
  const index = localStorage.getItem("roadbookVehiculeIndex");

  if (data) vehicules = JSON.parse(data);
  if (index !== null) vehiculeIndex = Number(index);

  vehicule = {
    modele: vehicules[vehiculeIndex].nom,
    batterie: vehicules[vehiculeIndex].batterie,
    soh: vehicules[vehiculeIndex].soh,
    jantes: vehicules[vehiculeIndex].jantes,
    conso: vehicules[vehiculeIndex].conso
  };
}

function choisirVehicule(index) {
  vehiculeIndex = Number(index);
  sauvegarderVehicules();
  chargerVehicules();
  changerPage("vehicule");
}

function enregistrerVehicule() {
  vehicules[vehiculeIndex].nom = document.getElementById("vehiculeNom").value;
  vehicules[vehiculeIndex].batterie = Number(document.getElementById("vehiculeBatterie").value);
  vehicules[vehiculeIndex].soh = Number(document.getElementById("vehiculeSoh").value);
  vehicules[vehiculeIndex].jantes = Number(document.getElementById("vehiculeJantes").value);
  vehicules[vehiculeIndex].conso = Number(document.getElementById("vehiculeConso").value);
  vehicules[vehiculeIndex].km = Number(document.getElementById("vehiculeKm").value);
  vehicules[vehiculeIndex].temperatureBatterie = Number(document.getElementById("vehiculeTemp").value);
  vehicules[vehiculeIndex].source = document.getElementById("vehiculeSource").value;

  sauvegarderVehicules();
  chargerVehicules();
  changerPage("vehicule");
}

function ajouterVehicule() {
  vehicules.push({
    nom: "Nouveau véhicule",
    batterie: 60,
    soh: 100,
    jantes: 17,
    conso: 18,
    km: 0,
    temperatureBatterie: 25,
    source: "Manuel"
  });

  vehiculeIndex = vehicules.length - 1;
  sauvegarderVehicules();
  chargerVehicules();
  changerPage("vehicule");
}

function supprimerVehicule() {
  if (vehicules.length <= 1) {
    alert("Tu dois garder au moins un véhicule.");
    return;
  }

  vehicules.splice(vehiculeIndex, 1);
  vehiculeIndex = 0;

  sauvegarderVehicules();
  chargerVehicules();
  changerPage("vehicule");
}
function pageVehicules() {
  const v = vehicules[vehiculeIndex];

  return `
    <h1>Véhicules</h1>

    <div class="carte">
      <h2>Véhicule sélectionné</h2>

      <select onchange="choisirVehicule(this.value)">
        ${vehicules.map((v, i) => `
          <option value="${i}" ${i === vehiculeIndex ? "selected" : ""}>
            ${v.nom}
          </option>
        `).join("")}
      </select>
    </div>

    <div class="carte">
      <h2>Fiche véhicule</h2>

      <div class="form-grid">
        <div class="full">
          <label>Nom du véhicule</label>
          <input id="vehiculeNom" value="${v.nom}">
        </div>

        <div>
          <label>Batterie utile (kWh)</label>
          <input id="vehiculeBatterie" type="number" step="0.1" value="${v.batterie}">
        </div>

        <div>
          <label>SOH batterie (%)</label>
          <input id="vehiculeSoh" type="number" value="${v.soh}">
        </div>

        <div>
          <label>Jantes (pouces)</label>
          <input id="vehiculeJantes" type="number" value="${v.jantes}">
        </div>

        <div>
          <label>Conso référence (kWh/100)</label>
          <input id="vehiculeConso" type="number" step="0.1" value="${v.conso}">
        </div>

        <div>
          <label>Kilométrage OBD</label>
          <input id="vehiculeKm" type="number" value="${v.km}">
        </div>

        <div>
          <label>Température batterie OBD</label>
          <input id="vehiculeTemp" type="number" value="${v.temperatureBatterie}">
        </div>

        <div class="full">
          <label>Source des données</label>
          <input id="vehiculeSource" value="${v.source}">
        </div>
      </div>

      <button class="primary-btn" onclick="enregistrerVehicule()">💾 Enregistrer</button>
      <button class="secondary-btn" onclick="ajouterVehicule()">➕ Ajouter un véhicule</button>
      <button class="secondary-btn" onclick="supprimerVehicule()">🗑️ Supprimer</button>
    </div>

    <div class="carte">
      <h2>Résumé calculé</h2>
      <p>Batterie réelle : <b>${batterieReelle().toFixed(1)} kWh</b></p>
      <p>Autonomie estimée : <b>${autonomie()} km</b></p>
      <p>Conso mission actuelle : <b>${consoReelle().toFixed(1)} kWh/100 km</b></p>
    </div>
  `;
}

chargerVehicules();
console.log("vehicules =", vehicules);
console.log("vehiculeIndex =", vehiculeIndex);
console.log("vehicule actif =", vehicule);