function construireTrajetAutomatique() {

  mission.troncons = [];

  const listeBornes = [];

  if (mission.borne1) listeBornes.push(mission.borne1);
  if (mission.borne2) listeBornes.push(mission.borne2);
  if (mission.borne3) listeBornes.push(mission.borne3);
  if (mission.borne4) listeBornes.push(mission.borne4);
  if (mission.borne5) listeBornes.push(mission.borne5);

  let liste;

  if (listeBornes.length > 0) {
    liste = listeBornes;
  } else if (mission.sensTrajet === "retour") {
    liste = itineraires.portugalFrance;
  } else if (mission.modeEspagne === "peage") {
    liste = itineraires.francePortugalPeage;
  } else {
    liste = itineraires.francePortugalSansPeage;
  }

  let precedent = mission.depart;

  for (const nomBorne of liste) {

    mission.troncons.push({
      depart: precedent,
      arrivee: nomBorne,
      distance: 0,
      route: mission.modeEspagne
    });

    precedent = nomBorne;
  }

  mission.troncons.push({
    depart: precedent,
    arrivee: mission.arrivee,
    distance: 0,
    route: mission.modeEspagne
  });
}