const recharges = [
  {
    nom: "Zunder Saugnac-et-Muret",
    reseau: "Zunder",
    arrivee: 32,
    depart: 75,
    puissance: 400,
    tarifs: {
      Electroverse: 0.49,
      Shell: 0.59,
      Atlante: 0.54,
      VINCI: 0.56,
      Zunder: 0.45
    },
    planB: "Fastned Labouheyre"
  },
  {
    nom: "Zunder Pancorbo",
    reseau: "Zunder",
    arrivee: 20,
    depart: 93,
    puissance: 360,
    tarifs: {
      Electroverse: 0.49,
      Shell: 0.59,
      Atlante: 0.54,
      VINCI: 0.56,
      Zunder: 0.45
    },
    planB: "Briviesca / Burgos"
  },
  {
    nom: "Vilar Formoso",
    reseau: "À définir",
    arrivee: 18,
    depart: 90,
    puissance: 150,
    tarifs: {
      Electroverse: 0.48,
      Shell: 0.58,
      Atlante: 0.52,
      VINCI: 0.55,
      Zunder: 0.50
    },
    planB: "Guarda"
  }
];

function meilleureCarte(tarifs) {
  let meilleure = null;
  let prix = Infinity;

  for (const carte in tarifs) {
    if (tarifs[carte] < prix) {
      prix = tarifs[carte];
      meilleure = carte;
    }
  }

  return { carte: meilleure, prix };
}

function energieRecharge(r) {
  return batterieReelle() * (r.depart - r.arrivee) / 100;
}

function coutRecharge(r) {
  const meilleur = meilleureCarte(r.tarifs);
  return energieRecharge(r) * meilleur.prix;
}

function coutTotalRecharges() {
  return recharges.reduce((total, r) => total + coutRecharge(r), 0);
}

function genererTableauRecharges() {
  return recharges.map(r => {
    const meilleur = meilleureCarte(r.tarifs);
    const kwh = energieRecharge(r).toFixed(1);
    const cout = coutRecharge(r).toFixed(2);

    return `
      <tr>
        <td>${r.nom}</td>
        <td>${r.reseau}</td>
        <td>${r.arrivee}% → ${r.depart}%</td>
        <td>${kwh} kWh</td>
        <td>${meilleur.carte}</td>
        <td>${meilleur.prix.toFixed(2)} €/kWh</td>
        <td>${cout} €</td>
        <td>${r.planB}</td>
      </tr>
    `;
  }).join("");
}