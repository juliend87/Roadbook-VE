let vehicule = {
  modele: "Kia EV4 Grande Autonomie",
  batterie: 81.4,
  soh: 100,
  jantes: 17,
  conso: 18.5
};

let mission = {
  nom: "Portugal 2026",
  depart: "ESTER Limoges",
  arrivee: "Ílhavo, Portugal",
  heureDepart: "03h00",
  modeEspagne: "peage",
  adultes: 2,
  enfants: 2,
  bagages: 80,
  vitesse: 120,
  distanceTotale: 1254,

  troncons: [
    {
      depart: "ESTER Limoges",
      arrivee: "Zunder Saugnac-et-Muret",
      distance: 330,
      route: "peage"
    },

    {
      depart: "Zunder Saugnac-et-Muret",
      arrivee: "Zunder Pancorbo",
      distance: 291,
      route: "peage"
    },

    {
      depart: "Zunder Pancorbo",
      arrivee: "Vilar Formoso",
      distance: 423,
      route: "sans-peage"
    },

    {
      depart: "Vilar Formoso",
      arrivee: "Ílhavo",
      distance: 210,
      route: "peage"
    }
  ],

  etapes: [
    { nom: "Départ ESTER", distance: 0, recharge: null },
    { nom: "Zunder Saugnac-et-Muret", distance: 330, recharge: 75 },
    { nom: "Zunder Pancorbo", distance: 291, recharge: 93 },
    { nom: "Vilar Formoso", distance: 423, recharge: 90 },
    { nom: "Ílhavo", distance: 210, recharge: null }
  ]
};