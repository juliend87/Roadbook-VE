// ======================================================
// TRAJETS DE RÉFÉRENCE
// Kia EV4 / DS N°4 / MG S5 EV
// ======================================================

const trajetsReference = {

  // ====================================================
  // KIA EV4
  // ====================================================

  kia: {
    nomVehicule: "Kia EV4 Grande Autonomie",

    aller: {
      titre: "Kia EV4 — Limoges vers Ílhavo",
      depart: "10 allée marguerite moreno limoges",
      arrivee: "16 rua do corgo da rainha ilhavo",
      socDepart: 100,
      socRecharge: 80,
      modeEspagne: "sansPeage",

      bornes: [
        "Powerdot - Saint-Geours-de-Maremne",
        "Iberdrola - Altsasu",
        "Zunder - Hostal Restaurante Zamorano",
        "Zunder - Salamanca",
        "Powerdot - Vilar Formoso"
      ]
    },

    retour: {
      titre: "Kia EV4 — Ílhavo vers Limoges",
      depart: "16 rua do corgo da rainha ilhavo",
      arrivee: "10 allée marguerite moreno limoges",
      socDepart: 100,
      socRecharge: 80,
      modeEspagne: "sansPeage",

      bornes: [
        "Powerdot - Vilar Formoso",
        "Zunder - Salamanca",
        "Zunder - Hostal Restaurante Zamorano",
        "Iberdrola - Altsasu",
        "Powerdot - Saint-Geours-de-Maremne"
      ]
    }
  },

// ====================================================
// DS N°4
// ====================================================

ds: {
  nomVehicule: "DS N°4",

  aller: {
    titre: "DS N°4 — Limoges vers Ílhavo",
    depart: "10 allée marguerite moreno limoges",
    arrivee: "16 rua do corgo da rainha ilhavo",
    socDepart: 100,
    socRecharge: 80,
    modeEspagne: "peage",

    bornes: [
      "Zunder - Saugnac-et-Muret",
      "Powerdot - Saint-Geours-de-Maremne",
      "Iberdrola - Altsasu",
      "Zunder - Pancorbo",
      "Zunder - Hostal Restaurante Zamorano",
      "Zunder - Castrillo de la Guareña",
      "Powerdot - Vilar Formoso"
    ]
  },

  retour: {
    titre: "DS N°4 — Ílhavo vers Limoges",
    depart: "16 rua do corgo da rainha ilhavo",
    arrivee: "10 allée marguerite moreno limoges",
    socDepart: 100,
    socRecharge: 80,
    modeEspagne: "peage",

    bornes: [
      "Wenea - Fuentes de Oñoro",
      "Zunder - Castrillo de la Guareña",
      "Zunder - Hostal Restaurante Zamorano",
      "Zunder - Pancorbo",
      "Iberdrola - Altsasu",
      "Powerdot - Saint-Geours-de-Maremne",
      "TotalEnergies - Mios"
    ]
  }
},
    
  // ====================================================
  // MG S5 EV
  // ====================================================

  mg: {
    nomVehicule: "MG S5 EV Luxury 64 kWh",

    aller: {
      titre: "MG S5 EV — Limoges vers Ílhavo",
      depart: "10 allée marguerite moreno limoges",
      arrivee: "16 rua do corgo da rainha ilhavo",
      socDepart: 100,
      socRecharge: 80,
      modeEspagne: "peage",

     bornes: [
  "Zunder - Saugnac-et-Muret",
  "Powerdot - Saint-Geours-de-Maremne",
  "Iberdrola - Altsasu",
  "Zunder - Pancorbo",
  "Zunder - Hostal Restaurante Zamorano",
  "Zunder - Castrillo de la Guareña",
  "Powerdot - Vilar Formoso"
]
    },

    retour: {
      titre: "MG S5 EV — Ílhavo vers Limoges",
      depart: "16 rua do corgo da rainha ilhavo",
      arrivee: "10 allée marguerite moreno limoges",
      socDepart: 100,
      socRecharge: 80,
      modeEspagne: "peage",

      bornes: [
        "Wenea - Fuentes de Oñoro",
        "Zunder - Castrillo de la Guareña",
        "Zunder - Hostal Restaurante Zamorano",
        "Zunder - Pancorbo",
        "Iberdrola - Altsasu",
        "Zunder - Saugnac-et-Muret",
        "TotalEnergies - Mios"
      ]
    }
  }
};


// ======================================================
// SÉLECTION ACTUELLE
// ======================================================

let vehiculeReferenceActif =
  localStorage.getItem("roadbookReferenceVehicule") || "ds";

let sensReferenceActif =
  localStorage.getItem("roadbookReferenceSens") || "retour";

let carteTrajetReference = null;


// ======================================================
// RÉCUPÉRATION DU TRAJET
// ======================================================

function obtenirTrajetReference() {

  const vehicule = trajetsReference[vehiculeReferenceActif];

  if (!vehicule) return null;

  return vehicule[sensReferenceActif] || null;
}


// ======================================================
// RÉCUPÉRATION DES BORNES
// ======================================================

function bornesDuTrajetReference(trajet) {

  if (!trajet || !Array.isArray(trajet.bornes)) {
    return [];
  }

  return trajet.bornes
    .map(nom => trouverBorneParNom(nom))
    .filter(Boolean);
}


// ======================================================
// VÉRIFICATION DES BORNES MANQUANTES
// ======================================================

function bornesManquantesTrajetReference(trajet) {

  if (!trajet || !Array.isArray(trajet.bornes)) {
    return [];
  }

  return trajet.bornes.filter(nom => !trouverBorneParNom(nom));
}


// ======================================================
// CHANGER DE VÉHICULE
// ======================================================

function changerVehiculeReference(valeur) {

  vehiculeReferenceActif = valeur;

  localStorage.setItem(
    "roadbookReferenceVehicule",
    vehiculeReferenceActif
  );

  changerPage("trajetsReference");
}


// ======================================================
// CHANGER LE SENS
// ======================================================

function changerSensReference(valeur) {

  sensReferenceActif = valeur;

  localStorage.setItem(
    "roadbookReferenceSens",
    sensReferenceActif
  );

  changerPage("trajetsReference");
}


// ======================================================
// PRIX D'UNE BORNE
// ======================================================

function prixAfficheBorneReference(borne) {

  if (!borne || typeof borne.prix !== "number") {
    return "Prix inconnu";
  }

  let texte = `${borne.prix.toFixed(2)} €/kWh`;

  if (
    typeof borne.fraisConnexion === "number" &&
    borne.fraisConnexion > 0
  ) {
    texte += ` + ${borne.fraisConnexion.toFixed(2)} €`;
  }

  return texte;
}


// ======================================================
// PLAN B
// ======================================================

function planBReference(borne) {

  if (!borne || !borne.planB) {
    return null;
  }

  return trouverBorneParNom(borne.planB);
}


// ======================================================
// LIEN GOOGLE MAPS
// ======================================================

function lienMapsReference(gps) {

  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(gps)}`;
}


// ======================================================
// TABLEAU DES BORNES
// ======================================================

function genererTableauTrajetReference(trajet) {

  const bornes = bornesDuTrajetReference(trajet);

  if (bornes.length === 0) {
    return `
      <tr>
        <td colspan="8">
          Aucune borne trouvée pour ce trajet.
        </td>
      </tr>
    `;
  }

  return bornes.map((borne, index) => {

    const planB = planBReference(borne);

    return `
      <tr>

        <td>
          ${index + 1}
        </td>

        <td>
          <b>${borne.nom}</b><br>
          ${borne.reseau}<br>
          ${borne.pays}
        </td>

        <td>
          ⚡ ${borne.puissance} kW
        </td>

        <td>
          🔌 ${borne.nbBornes}
        </td>

        <td>
          💶 ${prixAfficheBorneReference(borne)}
        </td>

        <td>
          ${planB ? `
            <b>${planB.nom}</b><br>
            ${planB.reseau}<br>
            ${borne.kmPlanB || 0} km
          ` : "Aucun Plan B"}
        </td>

        <td>
          ${borne.electroverse
            ? "💳 Electroverse"
            : "❌ Hors Electroverse"
          }
        </td>

        <td>
          <a
            class="primary-btn"
            href="${lienMapsReference(borne.gps)}"
            target="_blank"
          >
            🧭 Naviguer
          </a>
        </td>

      </tr>
    `;

  }).join("");
}


// ======================================================
// PRIX MOYEN DU TRAJET
// ======================================================

function prixMoyenTrajetReference(trajet) {

  const bornes = bornesDuTrajetReference(trajet)
    .filter(borne => typeof borne.prix === "number");

  if (bornes.length === 0) {
    return 0;
  }

  const total = bornes.reduce(
    (somme, borne) => somme + borne.prix,
    0
  );

  return total / bornes.length;
}


// ======================================================
// PAGE TRAJETS DE RÉFÉRENCE
// ======================================================

function pageTrajetsReference() {

  chargerPrixBornes();

  const trajet = obtenirTrajetReference();

  if (!trajet) {
    return `
      <h1>Trajets de référence</h1>

      <div class="carte">
        <p>Trajet introuvable.</p>
      </div>
    `;
  }

  const bornes = bornesDuTrajetReference(trajet);
  const manquantes = bornesManquantesTrajetReference(trajet);
  const prixMoyen = prixMoyenTrajetReference(trajet);

  return `
    <h1>📚 Trajets de référence</h1>

    <div class="carte">

      <h2>Choisir le trajet</h2>

      <div class="trajet-reference-actions">

        <div>
          <label>Véhicule</label>

          <select
            id="vehiculeReference"
            onchange="changerVehiculeReference(this.value)"
          >
            <option
              value="kia"
              ${vehiculeReferenceActif === "kia" ? "selected" : ""}
            >
              Kia EV4 Grande Autonomie
            </option>

            <option
              value="ds"
              ${vehiculeReferenceActif === "ds" ? "selected" : ""}
            >
              DS N°4
            </option>

            <option
              value="mg"
              ${vehiculeReferenceActif === "mg" ? "selected" : ""}
            >
              MG S5 EV
            </option>
          </select>
        </div>

        <div>
          <label>Sens du trajet</label>

          <select
            id="sensReference"
            onchange="changerSensReference(this.value)"
          >
            <option
              value="aller"
              ${sensReferenceActif === "aller" ? "selected" : ""}
            >
              Aller — Limoges vers Ílhavo
            </option>

            <option
              value="retour"
              ${sensReferenceActif === "retour" ? "selected" : ""}
            >
              Retour — Ílhavo vers Limoges
            </option>
          </select>
        </div>

      </div>
    </div>


    <div class="carte">

      <h2>${trajet.titre}</h2>

      <p>
        <b>Départ :</b> ${trajet.depart}
      </p>

      <p>
        <b>Arrivée :</b> ${trajet.arrivee}
      </p>

      <p>
        <b>Espagne :</b>
        ${trajet.modeEspagne === "peage"
          ? "Avec péage"
          : "Sans péage"
        }
      </p>

      <div class="stats">

        <div class="stat">
          <span>Nombre d'arrêts</span>
          <strong>${bornes.length}</strong>
        </div>

        <div class="stat">
          <span>Batterie départ</span>
          <strong>${trajet.socDepart} %</strong>
        </div>

        <div class="stat">
          <span>Départ après recharge</span>
          <strong>${trajet.socRecharge} %</strong>
        </div>

        <div class="stat">
          <span>Prix moyen</span>
          <strong>${prixMoyen.toFixed(2)} €/kWh</strong>
        </div>

      </div>

      ${manquantes.length > 0 ? `
        <div class="alerte-erreur">
          <b>⚠️ Bornes absentes de bornes.js :</b><br>
          ${manquantes.join("<br>")}
        </div>
      ` : ""}

      <br>

      <button
        class="primary-btn"
        onclick="utiliserTrajetReference()"
      >
        🚗 Utiliser ce trajet
      </button>

    </div>


    <div class="carte">

      <h2>🗺️ Carte du trajet</h2>

      <div id="mapTrajetReference"></div>

    </div>


    <div class="carte">

      <h2>⚡ Bornes prévues</h2>

      <table>

        <thead>
          <tr>
            <th>#</th>
            <th>Plan A</th>
            <th>Puissance</th>
            <th>Stèles</th>
            <th>Prix</th>
            <th>Plan B</th>
            <th>Paiement</th>
            <th>Navigation</th>
          </tr>
        </thead>

        <tbody>
          ${genererTableauTrajetReference(trajet)}
        </tbody>

      </table>

    </div>
  `;
}


// ======================================================
// CARTE LEAFLET
// ======================================================

function afficherCarteTrajetReference() {

  const conteneur = document.getElementById(
    "mapTrajetReference"
  );

  if (!conteneur) {
    return;
  }

  const trajet = obtenirTrajetReference();

  if (!trajet) {
    return;
  }

  const bornes = bornesDuTrajetReference(trajet);

  if (carteTrajetReference) {
    carteTrajetReference.remove();
    carteTrajetReference = null;
  }

  carteTrajetReference = L.map(
    "mapTrajetReference"
  ).setView([42.2, -3.5], 6);

  L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution: "© OpenStreetMap"
    }
  ).addTo(carteTrajetReference);

  const groupe = L.featureGroup()
    .addTo(carteTrajetReference);

  bornes.forEach((borne, index) => {

    if (!borne.gps) {
      return;
    }

    const coordonnees = borne.gps
      .split(",")
      .map(Number);

    const lat = coordonnees[0];
    const lng = coordonnees[1];

    if (
      !Number.isFinite(lat) ||
      !Number.isFinite(lng)
    ) {
      return;
    }

    L.marker([lat, lng])
      .addTo(groupe)
      .bindPopup(`
        <b>Arrêt ${index + 1}</b><br>
        <b>${borne.nom}</b><br>
        ${borne.reseau} — ${borne.pays}<br>
        ⚡ ${borne.puissance} kW<br>
        🔌 ${borne.nbBornes} stèles<br>
        💶 ${prixAfficheBorneReference(borne)}<br>
        ${borne.electroverse
          ? "💳 Electroverse"
          : "❌ Hors Electroverse"
        }
        <br><br>
        <a
          href="${lienMapsReference(borne.gps)}"
          target="_blank"
        >
          🧭 Naviguer
        </a>
      `);
  });

  if (groupe.getLayers().length > 0) {
    carteTrajetReference.fitBounds(
      groupe.getBounds(),
      {
        padding: [30, 30]
      }
    );
  }
}


// ======================================================
// UTILISER LE TRAJET DANS L'ONGLET VOYAGES
// ======================================================

async function utiliserTrajetReference() {

  const trajet = obtenirTrajetReference();

  if (!trajet) {
    alert("Trajet introuvable.");
    return;
  }

  mission.depart = trajet.depart;
  mission.arrivee = trajet.arrivee;
  mission.socDepart = trajet.socDepart;
  mission.socRecharge = trajet.socRecharge;
  mission.modeEspagne = trajet.modeEspagne;

  mission.sensTrajet =
    sensReferenceActif === "aller"
      ? "aller"
      : "retour";

  mission.borne1 = trajet.bornes[0] || "";
  mission.borne2 = trajet.bornes[1] || "";
  mission.borne3 = trajet.bornes[2] || "";
  mission.borne4 = trajet.bornes[3] || "";
  mission.borne5 = trajet.bornes[4] || "";
  mission.borne6 = trajet.bornes[5] || "";
  mission.borne7 = trajet.bornes[6] || "";

  sauvegarderMission();

  construireTrajetAutomatique();

  await recalculerDistances();

  changerPage("voyages");
}