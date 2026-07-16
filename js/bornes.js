const bornesStrategiques = [
  // =========================
  // 🇫🇷 FRANCE
  // =========================

  {
  nom: "Shell Recharge - Cestas",
  reseau: "Shell Recharge",
  pays: "France",
  gps: "44.7458429762822,-0.7033889891744098",
  puissance: 300,
  nbBornes: 8,
  prix: 0.65,
  type: "secours",
  planB: "Powerdot - Saint-Geours-de-Maremne",
  kmPlanB: 65,
  modeRoute: "lesDeux",
  zone: "France sud-ouest",
  electroverse: true,
  commentaire: "Très bonne borne Shell Recharge. 8 stèles de 300 kW. Bonne alternative avant la descente vers l'Espagne."
},

{
  nom: "TotalEnergies - Mios",
  reseau: "TotalEnergies",
  pays: "France",
  gps: "44.659048351798596,-0.828626414430537",
  puissance: 300,
  nbBornes: 18,
  prix: 0.65,
  type: "principale",
  planB: "Shell Recharge - Cestas",
  kmPlanB: 20,
  modeRoute: "lesDeux",
  zone: "France sud-ouest",
  electroverse: true,
  commentaire: "Très grand hub TotalEnergies. 18 stèles de 300 kW. Excellent arrêt pour les véhicules à autonomie moyenne avant la descente vers l'Espagne."
},

    {
    nom: "Zunder - Saugnac-et-Muret",
    reseau: "Zunder",
    pays: "France",
    gps: "44.36140327658299,-0.8522005526727534",
    puissance: 360,
    nbBornes: 4,
    prix: 0.59,
    type: "secours",
    planB: "Izivia - Mios",
    kmPlanB: 37,
    modeRoute: "lesDeux",
    zone: "France sud-ouest",
    electroverse: true,
    commentaire: "Borne utile en secours sur l'axe Bordeaux / Espagne."
  },
  
  {
    nom: "Powerdot - Saint-Geours-de-Maremne",
    reseau: "Powerdot",
    pays: "France",
    gps: "43.712977659339145,-1.2317523663711896",
    puissance: 200,
    nbBornes: 7,
    prix: 0.53,
    type: "principale",
    planB: "Izivia - Mios",
    kmPlanB: 55,
    modeRoute: "lesDeux",
    zone: "France sud-ouest",
    electroverse: true,
    commentaire: "Très bonne borne avant l'Espagne. Bon arrêt pour sécuriser l'entrée en Espagne."
  },


  // =========================
  // 🇪🇸 ESPAGNE - SENS FRANCE → PORTUGAL
  // =========================

  {
    nom: "Iberdrola - Beasain",
    reseau: "Iberdrola",
    pays: "Espagne",
    gps: "43.02679989346136,-2.219819524626532",
    puissance: 200,
    nbBornes: 7,
    prix: 0.65,
    type: "secours",
    planB: "Iberdrola - Altsasu",
    kmPlanB: 55,
    modeRoute: "sansPeage",
    zone: "Espagne nord",
    electroverse: true,
    commentaire: "Borne de secours sur l'axe A-1. 7 stèles. Visible sur Electroverse, pas vue sur Maps."
  },

  {
    nom: "Iberdrola - Altsasu",
    reseau: "Iberdrola",
    pays: "Espagne",
    gps: "42.88351652389909,-2.1797328346757143",
    puissance: 200,
    nbBornes: 5,
    prix: 0.65,
    type: "secours",
    planB: "Iberdrola - Beasain",
    kmPlanB: 55,
    modeRoute: "sansPeage",
    zone: "Espagne nord",
    electroverse: true,
    commentaire: "Borne de secours. 5 stèles. Un avis signale charge impossible : à surveiller."
  },

  {
    nom: "Iberdrola - Miranda de Ebro",
    reseau: "Iberdrola / bp pulse",
    pays: "Espagne",
    gps: "42.686278,-2.961192",
    puissance: 150,
    nbBornes: 9,
    prix: 0.65,
    type: "principale",
    planB: "Zunder - Pancorbo",
    kmPlanB: 28,
    modeRoute: "lesDeux",
    zone: "Espagne nord",
    electroverse: true,
    commentaire: "Très rassurante grâce aux 9 stèles. Bonne borne avant ou après Burgos."
  },

  {
    nom: "Zunder - Pancorbo",
    reseau: "Zunder",
    pays: "Espagne",
    gps: "42.626375248127374,-3.113364790879562",
    puissance: 360,
    nbBornes: 4,
    prix: 0.59,
    type: "principale",
    planB: "Iberdrola - Miranda de Ebro",
    kmPlanB: 28,
    modeRoute: "sansPeage",
    zone: "Espagne nord",
    electroverse: true,
    commentaire: "Borne importante pour sécuriser le nord de l'Espagne."
  },

  {
    nom: "Zunder - Burgos",
    reseau: "Zunder",
    pays: "Espagne",
    gps: "42.3435,-3.7250",
    puissance: 180,
    nbBornes: 2,
    prix: 0.59,
    type: "secours",
    planB: "Zunder - Pancorbo",
    kmPlanB: 80,
    modeRoute: "lesDeux",
    zone: "Burgos",
    electroverse: true,
    commentaire: "En ville, seulement 2 stèles. À garder en secours."
  },

  {
    nom: "Zunder - Hostal Restaurante Zamorano",
    reseau: "Zunder",
    pays: "Espagne",
    gps: "41.8760,-4.5450",
    puissance: 360,
    nbBornes: 8,
    prix: 0.59,
    type: "principale",
    planB: "Zunder - Burgos",
    kmPlanB: 120,
    modeRoute: "sansPeage",
    zone: "Dueñas",
    electroverse: true,
    commentaire: "Très intéressante sur l'A-62. 8 stèles. Bon arrêt entre Burgos et Salamanca."
  },

  {
    nom: "Zunder - Simancas",
    reseau: "Zunder",
    pays: "Espagne",
    gps: "41.59091259668423,-4.830134828186576",
    puissance: 360,
    nbBornes: 4,
    prix: 0.59,
    type: "secours",
    planB: "Zunder - Hostal Restaurante Zamorano",
    kmPlanB: 65,
    modeRoute: "sansPeage",
    zone: "Valladolid",
    electroverse: true,
    commentaire: "Bonne borne de secours au milieu de l'Espagne."
  },

  {
    nom: "Zunder - Castrillo de la Guareña",
    reseau: "Zunder",
    pays: "Espagne",
    gps: "41.227492,-5.318185",
    puissance: 400,
    nbBornes: 11,
    prix: 0.59,
    type: "principale",
    planB: "Zunder - Salamanca",
    kmPlanB: 70,
    modeRoute: "lesDeux",
    zone: "A-62 Zamora",
    electroverse: true,
    commentaire: "Très rassurante : 11 stèles, 400 kW. Excellent point de sécurité avant Salamanca."
  },

  {
    nom: "Zunder - Salamanca",
    reseau: "Zunder",
    pays: "Espagne",
    gps: "40.955626485087734,-5.70415312414811",
    puissance: 360,
    nbBornes: 6,
    prix: 0.59,
    type: "principale",
    planB: "Wenea - Fuentes de Oñoro",
    kmPlanB: 100,
    modeRoute: "sansPeage",
    zone: "Salamanca",
    electroverse: true,
    commentaire: "Dernière grosse recharge espagnole avant la frontière portugaise."
  },

  {
    nom: "Wenea - Fuentes de Oñoro",
    reseau: "Wenea",
    pays: "Espagne",
    gps: "40.59224309028359,-6.790801670646541",
    puissance: 180,
    nbBornes: 12,
    prix: 0.68,
    type: "secours",
    planB: "Powerdot - Vilar Formoso",
    kmPlanB: 5,
    modeRoute: "sansPeage",
    zone: "Frontière Espagne / Portugal",
    electroverse: true,
    commentaire: "Très rassurante avant le Portugal grâce aux 12 stèles. Bon secours frontière."
  },

  // =========================
  // 🇵🇹 PORTUGAL
  // =========================

  {
    nom: "Powerdot - Vilar Formoso",
    reseau: "Powerdot",
    pays: "Portugal",
    gps: "40.6062,-6.8307",
    puissance: 200,
    nbBornes: 6,
    prix: 0.53,
    type: "principale",
    planB: "Prio - Vilar Formoso",
    kmPlanB: 2,
    modeRoute: "lesDeux",
    zone: "Vilar Formoso",
    electroverse: true,
    commentaire: "Arrêt repas + recharge longue. Point stratégique avant la descente vers Ílhavo."
  },

  {
    nom: "Prio - Vilar Formoso",
    reseau: "Prio",
    pays: "Portugal",
    gps: "40.6071,-6.8323",
    puissance: 160,
    nbBornes: 4,
    prix: 0.55,
    type: "secours",
    planB: "Powerdot - Vilar Formoso",
    kmPlanB: 2,
    modeRoute: "lesDeux",
    zone: "Vilar Formoso",
    electroverse: true,
    commentaire: "Très bon Plan B à Vilar Formoso si Powerdot est occupée."
  },

{
  nom: "Repsol - São João de Lourosa",
  reseau: "Repsol",
  pays: "Portugal",
  gps: "40.62473057689505,-7.93154418246179",
  puissance: 50,
  nbBornes: 3,
  prix: 0.58,
  type: "secours",
  planB: "",
  kmPlanB: 0,
  modeRoute: "lesDeux",
  zone: "Portugal centre",
  electroverse: true,
  commentaire: "Dépannage au milieu du trajet vers Ílhavo. 0,58 €/kWh + 0,30 € de frais de connexion."
}
];

function trouverBorneParNom(nom) {
  return bornesStrategiques.find(borne => borne.nom === nom);
}

function gpsBorneOuAdresse(nom) {
  const borne = trouverBorneParNom(nom);
  return borne ? borne.gps : "";
}

function niveauSecuriteBorne(borne) {
  if (!borne) return "⚫ Inconnue";

  if (borne.nbBornes >= 8) return "🟢 Très rassurant";
  if (borne.nbBornes >= 4) return "🟡 Correct";
  if (borne.nbBornes >= 1) return "🔴 Risqué";

  return "⚫ Inconnu";
}

function texteBorne(borne) {
  if (!borne) return "Borne inconnue";

  return `
    <b>${borne.nom}</b><br>
    ${borne.reseau} - ${borne.pays}<br>
    ⚡ ${borne.puissance} kW<br>
    🔌 ${borne.nbBornes} stèles<br>
    ${niveauSecuriteBorne(borne)}<br>
    💶 ${borne.prix} €/kWh<br>
    ${borne.electroverse ? "✅ Electroverse" : "❌ Pas Electroverse"}<br>
    💬 ${borne.commentaire}
  `;
}

function genererAssistantBornes() {
  return bornesStrategiques.map(borne => `
    <tr>
      <td>${borne.nom}</td>
      <td>${borne.pays}</td>
      <td>${borne.puissance} kW</td>
      <td>${borne.nbBornes}</td>
      <td>${niveauSecuriteBorne(borne)}</td>
    </tr>
  `).join("");
}

function chargerPrixBornes() {
  const data = localStorage.getItem("roadbookPrixBornes");

  if (!data) return;

  const prixSauvegardes = JSON.parse(data);

  bornesStrategiques.forEach(borne => {
    if (prixSauvegardes[borne.nom] !== undefined) {
      borne.prix = prixSauvegardes[borne.nom];
    }
  });
}

function initialiserBornes() {
  chargerPrixBornes();
  console.log("Bornes chargées :", bornesStrategiques.length);
}