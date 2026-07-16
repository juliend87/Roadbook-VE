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
    source: "La Chaine EV / manuel",
    image: "assets/ev4.jpg"
  },
  {
    nom: "DS N°4",
    batterie: 58,
    soh: 100,
    jantes: 19,
    conso: 17.5,
    km: 0,
    temperatureBatterie: 25,
    source: "À compléter",
    image: "assets/ds4.jpg"
  },
  {
  nom: "MG S5 EV Luxury 64 kWh",
  batterie: 63.0,
  soh: 100,
  jantes: 18,
  conso: 19.0,
  km: 0,
  temperatureBatterie: 25,
  source: "La Chaîne EV",
  image: "assets/mgs5.png"
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

  // Ajoute l'image si elle n'existe pas (anciens véhicules)
  vehicules.forEach(v => {
    if (!v.image) {
      if (v.nom.includes("Kia")) {
        v.image = "assets/ev4.jpg";
      } else if (v.nom.includes("DS")) {
        v.image = "assets/ds4.jpg";
      }
      if (v.nom.includes("MG")) {
  v.image = "assets/mgs5.png";
}
    }
  });

  vehicule = {
    modele: vehicules[vehiculeIndex].nom,
    batterie: vehicules[vehiculeIndex].batterie,
    soh: vehicules[vehiculeIndex].soh,
    jantes: vehicules[vehiculeIndex].jantes,
    conso: vehicules[vehiculeIndex].conso,
    image: vehicules[vehiculeIndex].image
  };

  sauvegarderVehicules();
  appliquerFondVehicule();
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

function appliquerFondVehicule() {
  if (!vehicule || !vehicule.image) return;

  document.body.style.backgroundImage =
    `linear-gradient(rgba(255,255,255,0.75), rgba(255,255,255,0.75)), url('${vehicule.image}')`;

  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "right bottom";
  document.body.style.backgroundSize = "45%";
  document.body.style.backgroundAttachment = "fixed";

  console.log("Fond véhicule :", vehicule.image);
}