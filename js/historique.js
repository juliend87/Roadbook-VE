let historiqueVoyages = [];

function chargerHistorique() {

  historiqueVoyages =
    JSON.parse(localStorage.getItem("historiqueVoyages")) || [];

}

function sauvegarderHistorique() {

  localStorage.setItem(
    "historiqueVoyages",
    JSON.stringify(historiqueVoyages)
  );

}

function ajouterHistorique() {

  historiqueVoyages.push({

    date: new Date().toLocaleString(),

    nom: mission.nom,

    depart: mission.depart,

    arrivee: mission.arrivee,

    distance: mission.distanceTotale,

    modeEspagne: mission.modeEspagne,

    recharges: mission.troncons.length - 1

  });

  sauvegarderHistorique();

}