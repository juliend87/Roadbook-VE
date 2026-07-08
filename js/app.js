async function enregistrerVoyage() {

  mission.nom = document.getElementById("nomMission").value;
  mission.depart = document.getElementById("departMission").value;
  mission.arrivee = document.getElementById("arriveeMission").value;
  mission.heureDepart = document.getElementById("heureDepart").value;
  mission.adultes = Number(document.getElementById("adultes").value);
  mission.enfants = Number(document.getElementById("enfants").value);
  mission.bagages = Number(document.getElementById("bagages").value);
  mission.vitesse = Number(document.getElementById("vitesse").value);
mission.modeEspagne = document.getElementById("modeEspagne").value;
mission.sensTrajet = document.getElementById("sensTrajet").value;

if (mission.sensTrajet === "retour") {
  mission.depart = "16 rua do corgo da rainha ilhavo";
  mission.arrivee = "10 allée marguerite moreno limoges";
}

mission.borne1 = document.getElementById("borne1").value;
mission.borne2 = document.getElementById("borne2").value;
mission.borne3 = document.getElementById("borne3").value;

const b4 = document.getElementById("borne4");
const b5 = document.getElementById("borne5");

mission.borne4 = b4 ? b4.value : "";
mission.borne5 = b5 ? b5.value : "";

  if (mission.troncons.length > 0) {
    mission.troncons[0].depart = mission.depart;
    mission.troncons[mission.troncons.length - 1].arrivee = mission.arrivee;
  }

sauvegarderMission();
construireTrajetAutomatique();
await recalculerDistances();
ajouterHistorique();
changerPage("voyages");
}

async function recalculerDistances() {

 
  for (let i = 0; i < mission.troncons.length; i++) {

    const troncon = mission.troncons[i];

  troncon.distance = await calculerDistance(
  troncon.depart,
  troncon.arrivee,
  gpsBorneOuAdresse(troncon.depart),
  gpsBorneOuAdresse(troncon.arrivee)
);
  }

  mission.distanceTotale = mission.troncons.reduce(
    (total, t) => total + t.distance, 0
  );

  sauvegarderMission();
  changerPage("voyages");
}

function ajouterTroncon() {

  const depart = document.getElementById("tronconDepart").value;
  const arrivee = document.getElementById("tronconArrivee").value;
  const distance = Number(document.getElementById("tronconDistance").value);
  const route = document.getElementById("tronconRoute").value;

  if (!depart || !arrivee || !distance) {
    alert("Remplis tous les champs.");
    return;
  }

  mission.troncons.push({
    depart,
    arrivee,
    distance,
    route
  });

  mission.distanceTotale = mission.troncons.reduce(
    (total, t) => total + t.distance, 0
  );

  sauvegarderMission();
  changerPage("voyages");
}

function supprimerDernierTroncon() {

  if (mission.troncons.length === 0) return;

  mission.troncons.pop();

  mission.distanceTotale = mission.troncons.reduce(
    (total, t) => total + t.distance, 0
  );

  sauvegarderMission();
  changerPage("voyages");
}

function pageAccueil() {

  return `
    <h1>Tableau de bord</h1>

    <div class="stats">
      <div class="stat">
        <span>Mission</span>
        <strong>${mission.nom}</strong>
      </div>

      <div class="stat">
        <span>Distance</span>
        <strong>${mission.distanceTotale} km</strong>
      </div>

      <div class="stat">
        <span>Temps trajet</span>
        <strong>${formatTemps(tempsTrajetEstime())}</strong>
      </div>

      <div class="stat">
        <span>Arrivée estimée</span>
        <strong>${heureArriveeEstimee()}</strong>
      </div>
    </div>

    <div class="stats">
      <div class="stat">
        <span>Départ</span>
        <strong>${mission.heureDepart}</strong>
      </div>

      <div class="stat">
        <span>Budget recharge</span>
        <strong>${coutTotalRecharges().toFixed(2)} €</strong>
      </div>

      <div class="stat">
        <span>Conso estimée</span>
        <strong>${consoReelle().toFixed(1)}</strong>
      </div>

      <div class="stat">
        <span>Autonomie</span>
        <strong>${autonomie()} km</strong>
      </div>
    </div>

    <div class="carte">
  <h2>Carte du trajet</h2>
  <div id="map"></div>
</div>
    <div class="carte">
      <h2>Mission en cours</h2>
<p>
  <button class="primary-btn" onclick="ouvrirGoogleMaps()">
    🗺️ Ouvrir dans Google Maps
  </button>
</p>
      <p><b>Départ :</b> ${mission.depart}</p>
      <p><b>Arrivée :</b> ${mission.arrivee}</p>
      <p><b>Véhicule :</b> ${vehicule.modele}</p>
      <p><b>Passagers :</b> ${mission.adultes} adultes + ${mission.enfants} enfants</p>
      <p><b>Bagages :</b> ${mission.bagages} kg</p>
      <p><b>Vitesse max :</b> ${mission.vitesse} km/h</p>
      <p><b>Conso estimée :</b> ${consoReelle().toFixed(1)} kWh/100 km</p>
      <p><b>Budget recharge :</b> ${coutTotalRecharges().toFixed(2)} €</p>
      <p><b>Statut :</b> 🟢 Préparation OK</p>
    </div>
  `;
}
function pageVoyages() {

  return `
    <h1>Voyages</h1>

    <div class="carte">

      <h2>Préparation du voyage</h2>

      <div class="form-grid">

        <div>
          <label>Nom du voyage</label>
          <input id="nomMission" value="${mission.nom}">
        </div>

        <div>
          <label>Heure de départ</label>
          <input id="heureDepart" value="${mission.heureDepart}">
        </div>

        <div class="full">
          <label>Adresse de départ</label>
          <input id="departMission" value="${mission.depart}">
        </div>

        <div class="full">
          <label>Adresse d'arrivée</label>
          <input id="arriveeMission" value="${mission.arrivee}">
        </div>

        <div>
          <label>Adultes</label>
          <input id="adultes" type="number" value="${mission.adultes}">
        </div>

        <div>
          <label>Enfants</label>
          <input id="enfants" type="number" value="${mission.enfants}">
        </div>

        <div>
          <label>Bagages (kg)</label>
          <input id="bagages" type="number" value="${mission.bagages}">
        </div>

        <div>
          <label>Vitesse max</label>
          <input id="vitesse" type="number" value="${mission.vitesse}">
        </div>
        
        <div>
  <label>Sens du trajet</label>
  <select id="sensTrajet">
    <option value="aller" ${mission.sensTrajet === "aller" ? "selected" : ""}>
      Aller Portugal
    </option>
    <option value="retour" ${mission.sensTrajet === "retour" ? "selected" : ""}>
      Retour France
    </option>
  </select>
</div>

        <div>

  <label>Espagne</label>
  <select id="modeEspagne">
    <option value="peage" ${mission.modeEspagne === "peage" ? "selected" : ""}>
      Avec péage
    </option>
    <option value="sansPeage" ${mission.modeEspagne === "sansPeage" ? "selected" : ""}>
      Sans péage
    </option>
  </select>
</div>

      </div>

      <button class="primary-btn"
      onclick="enregistrerVoyage()">
      💾 Enregistrer et recalculer
      </button>

    </div>

 ${genererSelectBornesVoyage()}

<div class="carte">
  <h2>Carte du voyage</h2>
  <div id="map"></div>
</div>

<div class="carte">
  <h2>Tronçons du voyage</h2>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Départ</th>
            <th>Arrivée</th>
            <th>Distance</th>
            <th>Route</th>
          </tr>
        </thead>

        <tbody>
          ${genererTroncons()}
        </tbody>
      </table>
    </div>
  `;
}

function pageBudget() {

  return `
    <h1>Recharges prévues</h1>

    <div class="stats">

      <div class="stat">
        <span>Nombre de recharges</span>
        <strong>${recharges.length}</strong>
      </div>

      <div class="stat">
        <span>Coût estimé</span>
        <strong>${coutTotalRecharges().toFixed(2)} €</strong>
      </div>

      <div class="stat">
        <span>Conso estimée</span>
        <strong>${consoReelle().toFixed(1)} kWh/100</strong>
      </div>

      <div class="stat">
        <span>Autonomie</span>
        <strong>${autonomie()} km</strong>
      </div>

    </div>
<div class="carte">
  <h2>Assistant choix de borne</h2>

  <table>
    <thead>
      <tr>
        <th>Charge départ</th>
        <th>Distance max avec 20 % réserve</th>
        <th>Bornes conseillées</th>
      </tr>
    </thead>
    <tbody>
      ${genererAssistantBornes()}
    </tbody>
  </table>
</div>
    <table>

      <thead>
        <tr>
          <th>Borne</th>
          <th>Réseau</th>
          <th>Recharge</th>
          <th>Énergie</th>
          <th>Carte conseillée</th>
          <th>Prix</th>
          <th>Coût</th>
          <th>Plan B</th>
        </tr>
      </thead>

      <tbody>
        ${genererTableauRecharges()}
      </tbody>

    </table>

       ${genererBlocPlanB()}

    <div class="carte">

      <h2>Budget total estimé</h2>

      <p>
        💶 Coût estimé du voyage :
        <b>${coutTotalRecharges().toFixed(2)} €</b>
      </p>

    </div>
  `;
}

function pageRFID() {

  return `
    <h1>Cartes RFID</h1>

    <div class="carte">
      <p>Electroverse</p>
      <p>Shell Recharge</p>
      <p>Atlante</p>
      <p>VINCI</p>
    </div>
  `;
}

function pageParametres() {

  return `
    <h1>Paramètres</h1>

    <div class="carte">
      <h2>Sauvegarde rapide</h2>

      <p>Crée un point de retour avant les grosses modifications.</p>

      <button class="primary-btn" onclick="creerPointDeRetour()">
        💾 Créer un point de retour
      </button>

      <button class="secondary-btn" onclick="revenirPointDeRetour()">
        ↩️ Revenir au point de départ
      </button>
    </div>

    <div class="carte">
      <h2>À venir</h2>
      <p>Bornes automatiques, plans B, péages, profils Julien / frère.</p>
    </div>
  `;
}

function changerPage(page) {

  const contenu = document.getElementById("contenu");

  if (page === "accueil") {
    contenu.innerHTML = pageAccueil();
  } else if (page === "vehicule") {
    contenu.innerHTML = pageVehicules();
  } else if (page === "voyages") {
    contenu.innerHTML = pageVoyages();
  } else if (page === "planificateurVoiture") {
    contenu.innerHTML = pagePlanificateurVoiture();
  } else if (page === "bornes") {
    contenu.innerHTML = pageBornes();
  } else if (page === "budget") {
    contenu.innerHTML = pageBudget();
  } else if (page === "rfid") {
    contenu.innerHTML = pageRFID();
  } else if (page === "parametres") {
    contenu.innerHTML = pageParametres();
  }

  majSidebar();

  if (page === "accueil" || page === "voyages") {
    setTimeout(afficherCarte, 100);
  }

  if (page === "bornes") {
    setTimeout(afficherCarteBornes, 100);
  }
}
  majSidebar();

chargerMission();
chargerHistorique();

if (!mission.borne1) mission.borne1 = "";
if (!mission.borne2) mission.borne2 = "";
if (!mission.borne3) mission.borne3 = "";
if (!mission.borne4) mission.borne4 = "";
if (!mission.borne5) mission.borne5 = "";

if (!mission.voitureRecharge1) mission.voitureRecharge1 = "";
if (!mission.voitureRecharge2) mission.voitureRecharge2 = "";
if (!mission.voitureRecharge3) mission.voitureRecharge3 = "";
if (!mission.voitureRecharge4) mission.voitureRecharge4 = "";
if (!mission.voitureRecharge5) mission.voitureRecharge5 = "";

if (!mission.sensTrajet) mission.sensTrajet = "aller";

chargerVehicules();
chargerPrixBornes();
changerPage("accueil");